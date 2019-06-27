#!/usr/bin/env node
// module.exports = () => {

// };
let options = [];
let c = console.log;
c("****************Bienvenidos*********************");
c("******Coloca la ruta o archivo a examinar*******");

let arrayTerminal = [];
let File = [];
const marked = require ('marked');
const fs = require ('fs');
const process = require('process'); 
const FileHound = require ('filehound');
const path = require ('path');
const fetch = require('node-fetch');



process.argv.forEach((val, index) => {
   arrayTerminal.push (process.argv[index]);
   //c(`${index}: ${val}`);
   });
c(arrayTerminal);

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
  




const arrayFile =(path) =>{

fs.readFile(path,"utf-8", (error, data) =>{
if (error)
throw error;
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
//funcion que muestra los link ok
if (options.length>0)
fetchlinks(File);
});
}



//funcion para imprimir los links ok y no ok
const fetchlinks = (File) => {
File.forEach(el => {
fetch(el.href)
    .then(res => {
       //c(res);
       
     c(`url: ${res.url}`);
       c(`boolean: ${res.ok}`);
       c(`status: ${res.status}`);
       c(`status texto: ${res.statusText}`);
      //   console.log(res.headers.raw());
      //   console.log(res.headers.get('content-type'));
    })
    .catch(error =>{
       c(error);
    })
   

   });

}

const searchfileinDirectory = (directory) =>{

const files = FileHound.create()
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
