const fs = require('fs');
const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.prod.ts';
const targetPath2 = './src/environments/environment.ts';

// Load node modules
const colors = require('colors');
require('dotenv').config({
  path: '.env',
});
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   production:true,
   baseUrl: '${process.env.BASE_URL}',
};
`;

console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
);
console.log(colors.grey(envConfigFile));

const envConfigFile2 = `export const environment = {
  production:false,
  baseUrl: '${process.env.BASE_URL}',
};
`;

console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
);
console.log(colors.grey(envConfigFile2));

writeFile(targetPath, envConfigFile, function (err: any) {
  if (err) {
    console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});

writeFile(targetPath2, envConfigFile2, function (err: any) {
  if (err) {
    console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});
