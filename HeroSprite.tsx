import React from 'react';

interface HeroSpriteProps {
    /** Đường dẫn đến ảnh sprite sheet (ví dụ: 'quangtrung_attack_sheet.png') */
    imageUrl: string;
    /** Số lượng khung hình (frame) trong sprite sheet */
    frames?: number;
    /** Thời gian hoàn thành 1 chu kỳ animation (ví dụ: '0.8s', '1s') */
    duration?: string;
    /** Chiều rộng của 1 khung hình hiển thị (px hoặc chuỗi) */
    width?: number | string;
    /** Chiều cao của 1 khung hình hiển thị (px hoặc chuỗi) */
    height?: number | string;
    /** Lật ảnh theo chiều ngang (dùng cho phe địch đứng bên phải quay sang trái) */
    flip?: boolean;
    /** Các class CSS bổ sung */
    className?: string;
}

export const HeroSprite: React.FC<HeroSpriteProps> = ({ 
    imageUrl, 
    frames = 6, 
    duration = "0.8s",
    width = 150,
    height = 150,
    flip = false,
    className = ""
}) => {
    // Tạo tên animation độc nhất dựa trên số khung hình
    const animationName = `sprite-play-${frames}`;

    return (
        <div 
            className={`hero-sprite-container ${className}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                overflow: 'hidden', // Chỉ hiển thị đúng 1 frame, phần còn lại bị ẩn đi
                position: 'relative',
                transform: flip ? 'scaleX(-1)' : 'none',
                display: 'inline-block'
            }}
        >
            <div 
                className="hero-sprite-track"
                style={{
                    display: 'flex',
                    // Track này rộng bằng tổng tất cả các frames cộng lại
                    width: `${frames * 100}%`,
                    height: '100%',
                    // Dùng animation với steps() để nhảy từng frame thay vì trượt mượt mà
                    animation: `${animationName} ${duration} steps(${frames}) infinite`
                }}
            >
                <img 
                    src={imageUrl} 
                    alt="Hero Sprite" 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        pointerEvents: 'none'
                    }} 
                />
            </div>
            {/* Inject CSS animation */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes ${animationName} {
                    from { transform: translateX(0); }
                    /* Di chuyển nguyên chiều dài của track về bên trái */
                    to { transform: translateX(-100%); }
                }
            `}} />
        </div>
    );
};
