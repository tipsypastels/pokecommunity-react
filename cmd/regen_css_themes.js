const fs = require('fs');
const { themes } = require('../src/configs/themes.json');

const THEME_CONTENT_TEMPLATE = fs.readFileSync('./cmd/theme_content_template.scss', 'utf8');

for (let theme in themes) {
  const themePath = `./src/styles/themes/${theme}.scss`;

  const template = THEME_CONTENT_TEMPLATE
    .replace(/THEME_NAME_HERE/g, themes[theme].name)
    .replace(/THEME_SLUG_HERE/g, theme);
  
  fs.writeFile(themePath, template, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Regenerated ${themePath}...`);
    }
  });
}
