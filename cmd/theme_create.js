const THEME_CONFIG = require('../src/configs/themes.json');

const slugify  = require('slugify');
const inquirer = require('inquirer');
const fs       = require('fs');

const THEME_CONTENT_TEMPLATE = fs.readFileSync('./cmd/theme_content_template.scss', 'utf8');

const presence = x => !!x;

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the name of this theme:',
    validate: presence,
  },
  {
    type: 'input',
    name: 'author',
    message: 'Enter the username of the author:',
    validate: presence,
  },
  {
    type: 'list',
    name: 'variant',
    choices: ['light', 'dark'],
    message: 'Is this a light or dark theme?',
  },
  {
    type: 'input',
    name: 'image',
    message: 'Enter the URL to an image of this theme being used on the index. Use a PC 3.0 image if possible. 2.0 is also acceptable but you should swap it out later:',
    validate: presence,
  },
  {
    type: 'number',
    name: 'bridge',
    message: 'Does this theme already exist as a PC 2.0 theme? If so, enter its theme id number. If not, just press enter:'
  },
];

inquirer.prompt(questions).then(({ name, author, variant, image, bridge }) => {
  let jsonChanged = false;

  const slug = slugify(name).toLowerCase();

  if (!(slug in THEME_CONFIG.themes)) {
    jsonChanged = true;
    THEME_CONFIG.themes[slug] = { name, variant, image, author };
    console.log('Configured theme settings...');
  }

  if (!isNaN(bridge) && !(bridge in THEME_CONFIG.vbThemeBridge)) {
    jsonChanged = true;
    THEME_CONFIG.vbThemeBridge[bridge.toString()] = slug;
    console.log('Configured vBulletin bridge...');
  }

  if (jsonChanged) {
    const json = JSON.stringify(THEME_CONFIG, null, 2);
    fs.writeFile('./src/configs/themes.json', json, err => {
      if (err) {
        console.log(err);
      } else {
        console.log('Saved themes.json...');
      }
    })
  }

  const themePath = `./src/styles/themes/${slug}.scss`;

  if (!(fs.existsSync(themePath))) {
    const template = THEME_CONTENT_TEMPLATE
      .replace(/THEME_NAME_HERE/g, name)
      .replace(/THEME_SLUG_HERE/g, slug);

    fs.writeFile(themePath, template, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Saved ${themePath}...`);
      }
    });
  }

  fs.appendFile('./src/all-themes.scss', `@import "themes/${slug}.scss;\n`, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Saved all-themes.scss...`);
    }
  });

  console.log(`\n\nYour theme should be ready to go! You can start editing its CSS in './src/styles/themes/${slug}.scss'! A tutorial is also present there. To modify configuration such as author name, check out './src/configs/themes.json'. Have fun themeing!\n\n`)
});