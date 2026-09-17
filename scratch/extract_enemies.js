const fs = require('fs');
const content = fs.readFileSync('d:/Downloads/copy-of-v5-sử-việt-anh-hùng-truyện/constants.ts', 'utf8');

const enemyRegex = /createHero2\('([^']+)',\s*'([^']+)'/g;
let match;
const enemies = [];
while ((match = enemyRegex.exec(content)) !== null) {
  if (match[1].startsWith('e')) {
    enemies.push({ id: match[1], name: match[2] });
  }
}
fs.writeFileSync('d:/Downloads/copy-of-v5-sử-việt-anh-hùng-truyện/scratch/enemy_list.json', JSON.stringify(enemies, null, 2));
console.log('Saved to enemy_list.json');
