const fs = require('fs');
const path = require('path');

// Create index.css
const indexCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`;

// Create App.css
const appCSS = `.App {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.btn-primary {
  background-color: #ff6b8b;
  border-color: #ff6b8b;
}

.btn-primary:hover {
  background-color: #ff4b6e;
  border-color: #ff4b6e;
}`;

// Write files
fs.writeFileSync(path.join('src', 'index.css'), indexCSS);
fs.writeFileSync(path.join('src', 'App.css'), appCSS);

console.log('✅ Created CSS files!');
console.log('Now restart React: npm start');