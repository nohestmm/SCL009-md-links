#!/usr/bin/env node


let c = console.log;
let options = [];
let arrayTerminal = [];
const chalk = require('chalk');
const path = require('path');
const process = require('process');
const mdLinks = require('./mdLinks');
process.argv.forEach((val, index) => {
   arrayTerminal.push(process.argv[index]);
   //c(`${index}: ${val}`);
});
//leyendo las opciones de la terminal
if (arrayTerminal[3] && arrayTerminal[4]) {
   if ((arrayTerminal[3] === "--validate" && arrayTerminal[4] === "--stats") || (arrayTerminal[3] === "--v" && arrayTerminal[4] === "--s")) {
      options.push(
         { validate: true },
         { stats: true }
      );
   }
   if ((arrayTerminal[3] === "--stats" && arrayTerminal[4] === "--validate") || (arrayTerminal[3] === "--s" && arrayTerminal[4] === "--v")) {
      options.push(
         { stats: true },
         { validate: true }
      );
   }
}
else if (arrayTerminal[3]) {
   if (arrayTerminal[3] === "--validate" || arrayTerminal[3] === "--v") {
      options.push(
         { validate: true }
      );
   }
   if (arrayTerminal[3] === "--stats" || arrayTerminal[3] === "--s") {
      options.push(
         { stats: true }
      );
  }
}
//llamando a la funcion mdLinks
if (arrayTerminal[2]) {
   mdLinks(arrayTerminal[2], options)
      .then(res => {
         if (options.length === 0) {
            res.forEach(el => {
               c(`${chalk.white.bgRed.bold(el.file)} ${chalk.green.bold(el.href)} ${chalk.white.bold(el.text)}`)
            });
         }
         if (options.length === 2 && ((options[0].validate && options[1].stats) || (options[1].validate && options[0].stats))) {
            c(chalk.white.bgRed.bold(`Total:`), res.Total);
            c(chalk.white.bgGreen.bold(`Unique:`), res.Unique);
            c(chalk.white.bgMagenta.bold(`Broken:`), res.Broken);


         }

         if (options.length === 1 && options[0].validate) {

            res.forEach(el => {

               c(`${chalk.white.bgRed.bold(el.file)} ${chalk.green.bold(el.href)} ${chalk.blue.bold(el.status)} ${chalk.blue.bold(el.statusText)} ${chalk.white.bold(el.text)}`)

            });

         }
         if (options.length === 1 && options[0].stats) {

            c(chalk.white.bgRed.bold(`Total:`), res.Total);
            c(chalk.white.bgGreen.bold(`Unique:`), res.Unique);
         }


      })
      .catch(error => c(error));
}

else { c(chalk.bgRed("No hay archivo para leer")) }