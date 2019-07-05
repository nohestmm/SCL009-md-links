#!/usr/bin/env node


let c = console.log;
let options = [];
let arrayTerminal = [];

const process = require('process'); 
const mdLinks= require('./mdLinks');
const chalk = require('chalk');

process.argv.forEach((val, index) => {
   arrayTerminal.push(process.argv[index]);
   //c(`${index}: ${val}`);
   });

   //leyendo las opciones de la terminal
if (arrayTerminal[3] && arrayTerminal[4]){
   if ((arrayTerminal[3] === "--validate" && arrayTerminal[4] === "--stats" ) || (arrayTerminal[3] === "--v" && arrayTerminal[4] === "--s" ) ){
      options.push(
      {validate:true},
      {stats:true}
      );
 }
   if ((arrayTerminal[3] === "--stats" && arrayTerminal[4] === "--validate") || (arrayTerminal[3] === "--s" && arrayTerminal[4] === "--v" )){
      options.push(
      {stats:true},
      {validate:true}
      );
     }
    }
else if (arrayTerminal[3]){
if (arrayTerminal[3] === "--validate" || arrayTerminal[3] === "--v"){
   options.push(
   {validate:true}
   );
}
if (arrayTerminal[3] === "--stats"  || arrayTerminal[3] === "--s"){
   options.push(
   {stats:true}
   );
}

}
//llamando a la funcion mdLinks
 if(arrayTerminal[2]){
mdLinks(arrayTerminal[2],options)
.then(res => {
  
      
   
c(res);
c(options);
   
   
})
.catch(error=> c(error));
 }

 else { c(chalk.blue("No hay archivo para leer"))}