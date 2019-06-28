#!/usr/bin/env node
// module.exports = () => {

// };

let c = console.log;
let options = [];
let arrayTerminal = [];
let File = [];
const marked = require ('marked');
const fs = require ('fs');
const process = require('process'); 
const FileHound = require ('filehound');
const path = require ('path');
const fetch = require('node-fetch');
const mdLinks= require('./mdLinks');

c("****************Bienvenidos*********************");
c("******Coloca la ruta o archivo a examinar*******");


process.argv.forEach((val, index) => {
   arrayTerminal.push(process.argv[index]);
   //c(`${index}: ${val}`);
   });
c(arrayTerminal);

if (arrayTerminal[3] && arrayTerminal[4]){
   if ((arrayTerminal[3] === "--validate" && arrayTerminal[4] === "--stats" ) || (arrayTerminal[3] === "--v" && arrayTerminal[4] === "--s" ) ){
      options.push({
      validate:true},
      {stats:true
      });
   }
   if ((arrayTerminal[3] === "stats" && arrayTerminal[4] === "validate") || (arrayTerminal[3] === "--s" && arrayTerminal[4] === "--v" )){
      options.push({
      stats:true},
      {validate:true
      });
     }
    }
else if (arrayTerminal[3]){
if (arrayTerminal[3] === "validate" || arrayTerminal[3] === "--v"){
   options.push({
   validate:true
   });
}
if (arrayTerminal[3] === "stats"  || arrayTerminal[3] === "--s"){
   options.push({
   stats:true
   });
}
}
c(options);
c(options.length);



mdLinks(5,options)
  .then(res => {
  
  })
  .catch(error => c(error));

//c(arrayTerminal[2]);
fs.stat(arrayTerminal[2],(error, stats) =>{

if (error){ 
   c(error);
   
}


if (stats.isFile()){
c("**************************************************");
c("*                   Soy un Path                  *");
c("**************************************************");



// llamar a la funcion para imprimir los links en la consola
arrayFile(arrayTerminal[2]);
}
if (stats.isDirectory()){
c("***************************************************");
c("*                Soy Un Directorio                *");
c("***************************************************");
searchfileinDirectory(arrayTerminal[2]);
}
});
  



//cambiar readfile a promesas
const arrayFile =(path) =>{
return new Promise ((resolved, rejected) => {
fs.readFile(path,"utf-8", (error, data) =>{
if (error){
rejected (error);

}
else{
resolved(data);
const renderer = new marked.Renderer();
renderer.link =(href,title,text) =>{
File.push({
href:href,
text:text,
file:path
});
}
marked(data, {renderer:renderer});
//condicional para imprimir sin options
if (options.length === 0){
//console log para ver los links
//c(File);
File.forEach((el, index)=> {
   
   c(`${index}: href: ${el.href}`);
   c(`   texto: ${el.text}`);
   c(`   file: ${el.file}`);

});
}
//funcion que muestra los link ok para validate o stats
//if (options.length>0)
fetchlinks(File);
}
});
});
}




//funcion para imprimir los links ok y no ok
const fetchlinks = (File) => {

File.forEach(el => {
fetch(el.href)
    .then(res => {
       //c(res);
       
     c(`${res.url} ${res.ok} ${res.status} ${res.statusText}`);
      
      //   console.log(res.headers.raw());
      //   console.log(res.headers.get('content-type'));
    })
    .catch(error =>{
       c(error);
    })
   

   });

}
//colocar una promesa
const searchfileinDirectory = (directory) =>{

const files = FileHound.create()
.discard('node_modules')
.paths(directory)
.ext('md')
.find();

files
.then(res =>{
   //c(res);
res.forEach((el, index)=> {
   //imprimir los archivos con basename
   c(`${index}: ${path.basename(el)}`);
   arrayFile(el);

});
})
.catch(error =>{
   c(error);
});

}
