
const fs = require ('fs');
const marked = require ('marked');
const FileHound = require ('filehound');
const path = require ('path');
const fetch = require('node-fetch');

const mdLinks = (path, options) => {
let c = console.log;
let arrayLinks =[];
   fs.stat(path,(error, stats) => {

      if (error){ 
         c(error);
      }
      
      if (stats.isFile()){
      c("**************************************************");
      c("*           Extrayendo links de un Archivo       *");
      c("**************************************************");
      
      // llamar a la funcion para imprimir los links en la consola
      arrayFile(path)
      .then(res =>{
         if (options.length === 0){
            //console log para ver los links
            //c(File);
            // arrayLinks.forEach((el, index)=> {
               
            //    c(`${index}: href: ${el.href}`);
            //    c(`   texto: ${el.text}`);
            //    c(`   file: ${el.file}`);
            
            // });
            c(arrayLinks);

            }
            //funcion que muestra los link ok para validate o stats
            if (options.length>0){
                    fetchlinks(path);
                  }
      })
      .catch(error=> c(error));
   
      }
      if (stats.isDirectory()){
      c("***************************************************");
      c("*        Extrayendo links de Un Directorio        *");
      c("***************************************************");
      searchfileinDirectory(path);
      }
      });


//funcion para capturar los links
const arrayFile =(path) =>{
return new Promise ((resolved, rejected) => {
fs.readFile(path,"utf-8", (error, data) =>{
if (error){
rejected (error);

}
else{

const renderer = new marked.Renderer();
renderer.link =(href,title,text) =>{
arrayLinks.push({
href:href,
text:text,
file:path
});
}
marked(data, {renderer:renderer});
//condicional para imprimir sin options
resolved(arrayLinks);
}

});
});
}

//funcion para imprimir los links ok y no ok
const fetchlinks = (arrayLinks) => {
let arrayObjectFetch = [];
arrayLinks.forEach(el => {
   
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
   // c(`${index}: ${path.basename(el)}`);
   arrayFile(el)
   .then(res=>{
      
      if (options.length === 0){
         //console log para ver los links
         //c(File);
         // arrayLinks.forEach((el, index)=> {
            
         //    c(`${index}: href: ${el.href}`);
         //    c(`   texto: ${el.text}`);
         //    c(`   file: ${el.file}`);
         
         // });
         c(arrayLinks);

         }
         //funcion que muestra los link ok para validate o stats
         if (options.length>0){
                 fetchlinks(path);
               }
      })
     .catch(error => c(error));

});
})
.catch(error =>{
   c(error);
});

}


   



    

}
  
module.exports = mdLinks;