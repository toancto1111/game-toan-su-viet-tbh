const fs = require('fs');
let content = fs.readFileSync('chatbotPrompt.ts', 'utf8');

// The error is because I inserted unescaped backticks into a template literal.
// I will replace `<circle ...>` with <circle ...> (removing backticks).
content = content.replace(/`(<circle[^>]+>)`/g, '$1');
content = content.replace(/`(<text[^>]+>A<\/text>)`/g, '$1');
content = content.replace(/`(<polyline[^>]+>)`/g, '$1');

// And I also inserted ```html and ```svg
content = content.replace(/```html/g, '\\`\\`\\`html');
content = content.replace(/```svg/g, '\\`\\`\\`svg');

fs.writeFileSync('chatbotPrompt.ts', content);
