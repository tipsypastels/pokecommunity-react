const fs = require('fs');

const BASE_FOLDER = `./src/styles/modules/`;

const walk = function(dir) {
  let results = [];

  const files = fs.readdirSync(dir) || [];
  for (const file of files) {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      results = [...results, ...walk(fullPath)];
    } else {
      const importablePath = 
        `@import '.${fullPath.replace('./src/styles', '')}';`;
      results = results.concat(importablePath);
    }
  }

  return results;
}

const imports = `
  /*
    This file is auto-generated. If you need to add a new SCSS module, create the file and run "yarn css:modules:bundle". Or, you know, just add the import youself.
  */

${walk(BASE_FOLDER).join("\n")}
`;

fs.writeFile('./src/styles/all-modules.scss', imports, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('CSS module imports re-generated!');
  }
});