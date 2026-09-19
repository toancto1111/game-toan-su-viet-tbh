import React, { useMemo } from 'react';

interface GeoPoint { x: number; y: number; }
interface GeoContext { [name: string]: GeoPoint; }

const getIntersection = (A: GeoPoint, B: GeoPoint, C: GeoPoint, D: GeoPoint): GeoPoint | null => {
  const a1 = B.y - A.y;
  const b1 = A.x - B.x;
  const c1 = a1 * A.x + b1 * A.y;

  const a2 = D.y - C.y;
  const b2 = C.x - D.x;
  const c2 = a2 * C.x + b2 * C.y;

  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-6) return null; // parallel
  return { x: (b2 * c1 - b1 * c2) / det, y: (a1 * c2 - a2 * c1) / det };
};

const getProjection = (P: GeoPoint, A: GeoPoint, B: GeoPoint): GeoPoint => {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const t = ((P.x - A.x) * dx + (P.y - A.y) * dy) / (dx * dx + dy * dy);
  return { x: A.x + t * dx, y: A.y + t * dy };
};

const getCircumcenter = (A: GeoPoint, B: GeoPoint, C: GeoPoint): GeoPoint => {
  const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  if (Math.abs(D) < 1e-6) return { x: 0, y: 0 };
  const Ax2y2 = A.x * A.x + A.y * A.y;
  const Bx2y2 = B.x * B.x + B.y * B.y;
  const Cx2y2 = C.x * C.x + C.y * C.y;
  const x = (Ax2y2 * (B.y - C.y) + Bx2y2 * (C.y - A.y) + Cx2y2 * (A.y - B.y)) / D;
  const y = (Ax2y2 * (C.x - B.x) + Bx2y2 * (A.x - C.x) + Cx2y2 * (B.x - A.x)) / D;
  return { x, y };
};

const getIncenter = (A: GeoPoint, B: GeoPoint, C: GeoPoint): GeoPoint => {
  const a = Math.hypot(B.x - C.x, B.y - C.y);
  const b = Math.hypot(A.x - C.x, A.y - C.y);
  const c = Math.hypot(A.x - B.x, A.y - B.y);
  const sum = a + b + c;
  return {
    x: (a * A.x + b * B.x + c * C.x) / sum,
    y: (a * A.y + b * B.y + c * C.y) / sum,
  };
};

const getDistance = (A: GeoPoint, B: GeoPoint) => Math.hypot(B.x - A.x, B.y - A.y);

export const GeometryRenderer: React.FC<{ jsonStr: string }> = ({ jsonStr }) => {
  const data = useMemo(() => {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return null;
    }
  }, [jsonStr]);

  if (!data || !data.points || !data.draw) {
    return <div style={{ color: '#ef4444', fontSize: '0.8rem', padding: '10px' }}>⚠️ Dữ liệu vẽ hình JSON không hợp lệ.</div>;
  }

  const ctx: GeoContext = {};

  // Tính tọa độ tất cả các điểm theo thứ tự
  data.points.forEach((pt: any) => {
    try {
      if (pt.type === 'free') {
        ctx[pt.name] = { x: pt.x, y: pt.y };
      } else if (pt.type === 'midpoint') {
        const A = ctx[pt.p1];
        const B = ctx[pt.p2];
        ctx[pt.name] = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      } else if (pt.type === 'intersection') {
        const A = ctx[pt.line1[0]];
        const B = ctx[pt.line1[1]];
        const C = ctx[pt.line2[0]];
        const D = ctx[pt.line2[1]];
        const res = getIntersection(A, B, C, D);
        if (res) ctx[pt.name] = res;
      } else if (pt.type === 'projection') {
        const P = ctx[pt.point];
        const A = ctx[pt.line[0]];
        const B = ctx[pt.line[1]];
        ctx[pt.name] = getProjection(P, A, B);
      } else if (pt.type === 'circumcenter') {
        ctx[pt.name] = getCircumcenter(ctx[pt.p1], ctx[pt.p2], ctx[pt.p3]);
      } else if (pt.type === 'incenter') {
        ctx[pt.name] = getIncenter(ctx[pt.p1], ctx[pt.p2], ctx[pt.p3]);
      } else if (pt.type === 'symmetry') {
        const P = ctx[pt.point];
        const C = ctx[pt.center];
        ctx[pt.name] = { x: 2 * C.x - P.x, y: 2 * C.y - P.y };
      }
    } catch (e) {
      console.error(`Lỗi tính điểm ${pt.name}:`, e);
      ctx[pt.name] = { x: 0, y: 0 };
    }
  });

  const renderShape = (cmd: any, idx: number) => {
    try {
      if (cmd.type === 'polygon' || cmd.type === 'triangle') {
        const pts = cmd.points.map((p: string) => `${ctx[p].x},${ctx[p].y}`).join(' ');
        return <polygon key={idx} points={pts} stroke="white" strokeWidth="1.5" fill="none" strokeDasharray={cmd.dashed ? '5,5' : 'none'} />;
      }
      if (cmd.type === 'segment') {
        const A = ctx[cmd.points[0]];
        const B = ctx[cmd.points[1]];
        return <line key={idx} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="white" strokeWidth="1.5" strokeDasharray={cmd.dashed ? '5,5' : 'none'} />;
      }
      if (cmd.type === 'ray' || cmd.type === 'line') {
        const A = ctx[cmd.points[0]];
        const B = ctx[cmd.points[1]];
        const dx = B.x - A.x, dy = B.y - A.y;
        const len = Math.hypot(dx, dy);
        const extend = cmd.type === 'ray' ? 50 : 200; // Extend beyond B
        const extA = cmd.type === 'line' ? -extend : 0;
        const x1 = A.x + (dx / len) * extA;
        const y1 = A.y + (dy / len) * extA;
        const x2 = B.x + (dx / len) * extend;
        const y2 = B.y + (dy / len) * extend;
        return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.5" strokeDasharray={cmd.dashed ? '5,5' : 'none'} />;
      }
      if (cmd.type === 'circle') {
        const C = ctx[cmd.center];
        let r = cmd.radius || 0;
        if (cmd.radiusPoint) r = getDistance(C, ctx[cmd.radiusPoint]);
        return <circle key={idx} cx={C.x} cy={C.y} r={r} stroke="white" strokeWidth="1.5" fill="none" strokeDasharray={cmd.dashed ? '5,5' : 'none'} />;
      }
      if (cmd.type === 'rightAngle') {
        const V = ctx[cmd.vertex];
        const P1 = ctx[cmd.p1], P2 = ctx[cmd.p2];
        const L = 12; // Kích thước góc vuông
        const d1 = getDistance(P1, V), d2 = getDistance(P2, V);
        if (d1 === 0 || d2 === 0) return null;
        const ux1 = (P1.x - V.x) / d1, uy1 = (P1.y - V.y) / d1;
        const ux2 = (P2.x - V.x) / d2, uy2 = (P2.y - V.y) / d2;
        const M1 = { x: V.x + ux1 * L, y: V.y + uy1 * L };
        const M2 = { x: V.x + ux2 * L, y: V.y + uy2 * L };
        const M3 = { x: M1.x + ux2 * L, y: M1.y + uy2 * L };
        return <polyline key={idx} points={`${M1.x},${M1.y} ${M3.x},${M3.y} ${M2.x},${M2.y}`} stroke="white" strokeWidth="1.5" fill="none" />;
      }
      if (cmd.type === 'equalSegments') {
        const A = ctx[cmd.p1], B = ctx[cmd.p2];
        const M = { x: (A.x + B.x)/2, y: (A.y + B.y)/2 };
        const dx = B.x - A.x, dy = B.y - A.y;
        const len = Math.hypot(dx, dy);
        if (len === 0) return null;
        const nx = -dy / len, ny = dx / len; 
        const L = 5;
        const marks = cmd.marks || 1;
        const els = [];
        for (let i = 0; i < marks; i++) {
          const offset = (i - (marks-1)/2) * 5;
          const px = M.x + (dx/len) * offset;
          const py = M.y + (dy/len) * offset;
          els.push(<line key={`${idx}-${i}`} x1={px - nx*L} y1={py - ny*L} x2={px + nx*L} y2={py + ny*L} stroke="white" strokeWidth="1.5" />);
        }
        return <g key={idx}>{els}</g>;
      }
      if (cmd.type === 'equalAngles') {
        const V = ctx[cmd.vertex], P1 = ctx[cmd.p1], P2 = ctx[cmd.p2];
        const r = cmd.radius || 15;
        const d1 = getDistance(P1, V), d2 = getDistance(P2, V);
        if (d1 === 0 || d2 === 0) return null;
        const M1 = { x: V.x + (P1.x - V.x)/d1 * r, y: V.y + (P1.y - V.y)/d1 * r };
        const M2 = { x: V.x + (P2.x - V.x)/d2 * r, y: V.y + (P2.y - V.y)/d2 * r };
        
        const cross = (M1.x - V.x)*(M2.y - V.y) - (M1.y - V.y)*(M2.x - V.x);
        const sweep = cross > 0 ? 1 : 0;
        const path = `M ${M1.x},${M1.y} A ${r},${r} 0 0,${sweep} ${M2.x},${M2.y}`;
        const els = [<path key={`${idx}-arc`} d={path} stroke="white" strokeWidth="1.5" fill="none" />];
        
        if (cmd.marks) {
          let midA = Math.atan2(M1.y - V.y, M1.x - V.x);
          let midB = Math.atan2(M2.y - V.y, M2.x - V.x);
          if (Math.abs(midA - midB) > Math.PI) {
            if (midA < 0) midA += 2*Math.PI;
            if (midB < 0) midB += 2*Math.PI;
          }
          const angleMid = (midA + midB) / 2;
          const mx = V.x + Math.cos(angleMid) * r;
          const my = V.y + Math.sin(angleMid) * r;
          const nx = Math.cos(angleMid), ny = Math.sin(angleMid);
          
          for (let i = 0; i < cmd.marks; i++) {
            const L = 4;
            const tx1 = mx - nx*L, ty1 = my - ny*L;
            const tx2 = mx + nx*L, ty2 = my + ny*L;
            els.push(<line key={`${idx}-tick-${i}`} x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="white" strokeWidth="1.5" />);
          }
        }
        return <g key={idx}>{els}</g>;
      }
    } catch (e) {
      console.error("Lỗi vẽ hình", cmd, e);
    }
    return null;
  };

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  Object.values(ctx).forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  });
  
  if (minX === Infinity) { minX = 0; minY = 0; maxX = 300; maxY = 300; }
  
  const pad = 50;
  const w = Math.max(maxX - minX + pad * 2, 200);
  const h = Math.max(maxY - minY + pad * 2, 200);
  const viewBox = `${minX - pad} ${minY - pad} ${w} ${h}`;

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', margin: '16px 0', border: '1px solid rgba(255,255,255,0.1)' }}>
      <svg viewBox={viewBox} style={{ width: '100%', maxHeight: '400px', display: 'block', margin: '0 auto' }}>
        {/* Draw Shapes */}
        {data.draw.map((cmd: any, i: number) => renderShape(cmd, i))}
        
        {/* Draw Points & Labels */}
        {data.points.map((pt: any, i: number) => {
          const P = ctx[pt.name];
          if (!P) return null;
          
          const cx = (minX + maxX)/2;
          const cy = (minY + maxY)/2;
          const dx = P.x - cx;
          const dy = P.y - cy;
          const len = Math.hypot(dx, dy) || 1;
          const labelDist = 20;
          const lx = P.x + (dx/len) * labelDist;
          let ly = P.y + (dy/len) * labelDist;
          
          let anchor = 'middle';
          let baseline = 'middle';
          if (Math.abs(dx/len) > 0.4) anchor = dx > 0 ? 'start' : 'end';
          if (Math.abs(dy/len) > 0.4) baseline = dy > 0 ? 'hanging' : 'baseline';
          
          // Khắc phục ly khi anchor là middle để chữ không đè lên điểm
          if (Math.abs(dy/len) <= 0.4 && dy > 0) ly += 5;
          if (Math.abs(dy/len) <= 0.4 && dy < 0) ly -= 5;

          return (
            <g key={`pt-${i}`}>
              <circle cx={P.x} cy={P.y} r="3.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1" />
              <text x={lx} y={ly} fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial" textAnchor={anchor} alignmentBaseline={baseline}>
                {pt.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
