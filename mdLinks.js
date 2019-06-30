const fs = require('fs');
const marked = require('marked');
const FileHound = require('filehound');
const path = require('path');
const fetch = require('node-fetch');

const mdLinks = (pathFile, options) => {
   let c = console.log;

   fs.stat(pathFile, (error, stats) => {

      if (error) {
         c(error);
      }

      if (stats.isFile()) {
         c("**************************************************");
         c("*           Extrayendo links de un Archivo       *");
         c("**************************************************");

         // llamar a la funcion para imprimir los links en la consola
         arrayFile(pathFile)
            .then(res => {
               if (options.length === 0) {
                  c(res);

               }
               //funcion que muestra los link ok para validate o stats
               if (options.length > 0 && options[0].validate) {
                  fetchlinks(res)
                  .then(res =>{
                     
                  })
                  .catch(error => c(error));
               }
               if(options.length > 0 && options[0].stats){
               statsForLinksFromFile(res);

               }

            })
            .catch(error => c(error));

      }
      if (stats.isDirectory()) {
         c("***************************************************");
         c("*        Extrayendo links de Un Directorio        *");
         c("***************************************************");
         searchfileinDirectory(pathFile);
      }
   });


   //funcion para capturar los links
   const arrayFile = (pathFile) => {
      return new Promise((resolved, rejected) => {
         fs.readFile(pathFile, "utf-8", (error, data) => {
            if (error) {
               rejected(error);

            }
            else {
               let arrayLinks = [];
               const renderer = new marked.Renderer();
               renderer.link = (href, title, text) => {
                  arrayLinks.push({
                     href: href,
                     text: text,
                     file: pathFile
                  });
               }
               marked(data, { renderer: renderer });
               //condicional para imprimir sin options
               resolved(arrayLinks);
            }

         });
      });
   }

   //funcion para imprimir los links ok y no ok
   const fetchlinks = (pathFile) => {

       let arrayObjectFetch = [];
       return new Promise((resolved, rejected) => {
    
      pathFile.forEach((el,index )=> {

         fetch(el.href)
            .then(res => {
               //c(res);
            
               arrayObjectFetch.push({
                   href: res.url,
                   text: el.text,
                   file: path.basename(el.file),
                   status:res.status,
                   statusText: res.statusText


               });

              if (index === pathFile.length-1) {

                resolved(c(arrayObjectFetch));
               
              }

              
               //   console.log(res.headers.raw());
               //   console.log(res.headers.get('content-type'));
            })
            .catch(error => {
               c(error);
            })
  

      });

       });

   }


   //colocar una promesa
   const searchfileinDirectory = (pathFile) => {

      const files = FileHound.create()
         .discard('node_modules')
         .paths(pathFile)
         .ext('md')
         .find();

        files
         .then(res => {
            //c(res);
            res.forEach((el, index) => {
               //imprimir los archivos con basename
               c(`${index}: ${path.basename(el)}`);
               arrayFile(el)
                  .then(res => {

                     if (options.length === 0) {
                        //console log para ver los links
                        //c(File);
                        // arrayLinks.forEach((el, index)=> {

                        //    c(`${index}: href: ${el.href}`);
                        //    c(`   texto: ${el.text}`);
                        //    c(`   file: ${el.file}`);

                        // });
                        c(res);

                     }
                     //funcion que muestra los link ok para validate o stats
                     if (options.length > 0 && options[0].validate) {
                        fetchlinks(res);
                     }
                  })
                  .catch(error => c(error));

            });
         })
         .catch(error => {
            c(error);
         });

   }

const statsForLinksFromFile = (res) => {
let linksUnique = [];

res.forEach(el => {

   linksUnique.push(el.href);
});
linksUnique = [...new Set(linksUnique)];
c(linksUnique);

      c(`Total: ${res.length}`);
      c(`Unique: ${linksUnique.length}`);

   }






}

module.exports = mdLinks;