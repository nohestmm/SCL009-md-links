#!/usr/bin/env node
// module.exports = () => {

// };
let options = [{"validate": 0},
                {"stats" : 0}];
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
//console log para ver los links
c(File);
//funcion que muestra los link ok
fetchlinks(File);
});
}



//funcion para imprimir los links ok y no ok
const fetchlinks = (File) => {
File.forEach(el => {
fetch(el.href)
    .then(res => {
     c(res.url);
       c(res.ok);
       c(res.status);
       c(res.statusText);
      //   console.log(res.headers.raw());
      //   console.log(res.headers.get('content-type'));
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
   c(`${index}:` + el);


});
arrayFile(res[0]);

})
.catch(error =>{
   c(error);
});

}
