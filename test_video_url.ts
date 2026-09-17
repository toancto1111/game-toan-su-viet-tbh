import { INITIAL_HEROES } from './constants';

const h1_2 = INITIAL_HEROES.find(h => h.id === 'h1_2');
const h3_4 = INITIAL_HEROES.find(h => h.id === 'h3_4');

console.log('h1_2 (Lạc Long Quân) skillVideoUrl:', h1_2?.skillVideoUrl);
console.log('h3_4 (Phùng Hưng) skillVideoUrl:', h3_4?.skillVideoUrl);
