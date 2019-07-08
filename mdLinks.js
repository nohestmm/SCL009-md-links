const fs = require('fs');
const marked = require('marked');
const FileHound = require('filehound');
const fetch = require('node-fetch');
const c = console.log;

const mdLinks = (pathFile, options) => {


   return new Promise((resolved, rejected) => {
      fs.stat(pathFile, (error, stats) => {
         if (error) {
            rejected(error);
         }
         else {
            if (stats.isFile()) {
               // llamar a la funcion para imprimir los links en la consola
               arrayFile(pathFile)
                  .then(res => {
                     if (options.length === 0) {
                        resolved(res);
                     }
                     if (options.length === 2 && ((options[0].validate && options[1].stats) || (options[1].validate && options[0].stats))) {
                        fetchlinks(res)
                           .then(res => {

                              resolved(statsForLinksFromFileorDirectory(res, options));
                              
                           })
                           .catch(error => c(error));
                     }
                     if (options.length === 1 && options[0].validate) {
                        fetchlinks(res)
                           .then(res => {
                              res.forEach(el => {
                                 setTimeout(() => {
                                    resolved(res);
                                 }, 1000);
                                 

                              });
                           })
                           .catch(error => c(error));
                     }
                     if (options.length === 1 && options[0].stats) {

                        resolved(statsForLinksFromFileorDirectory(res, options));
                     }
                  })
                  .catch(error => (error));
            }
            if (stats.isDirectory()) {
               resolved(searchfileinDirectory(pathFile, options));
            
            }
         }
      });
   });
}
//funcion para capturar los links
const arrayFile = (pathFile) => {
   //return Promise.all(pathFile.map(file => {
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
                  file: pathFile,
                  href: href,
                  text: text
                 
               });
            }
            marked(data, { renderer: renderer });
         
            resolved(arrayLinks); 
            
               
         }
      });
   });
//}));
}
//funcion para imprimir los links ok y no ok
const fetchlinks = (pathFile) => {
   let arrayObjectFetch =[];
   arrayObjectFetch = pathFile;
   return new Promise((resolved, rejected) => {
      arrayObjectFetch.forEach((el,index) => {
         fetch(el.href)
            .then(res => {
             
                 
               arrayObjectFetch[index].status = res.status;
               arrayObjectFetch[index].statusText= res.statusText,
                 
               
               //pasarlo a la promesa del fetch

               setTimeout(() => {
                  resolved(arrayObjectFetch);
               }, 2000);
            })
            .catch(error => {
               rejected(error);
            });
      });
   });
}
//colocar una promesa
const searchfileinDirectory = (pathFile, options) => {
   return new Promise((resolved, rejected) => {
      const files = FileHound.create()
         .discard('node_modules')
         .paths(pathFile)
         .ext('md')
         .find();
      files
         .then(res => {
       let arrayDirectory =[];
       res.forEach(element => {
         arrayDirectory.push(element);
       });
      Promise.all(arrayDirectory.map(el => {

        return arrayFile(el);
    
  }))
  .then(res=>{
   let newArrayFile = Array.prototype.concat.apply([], res);
      if(options.length === 0){
     resolved(newArrayFile);
    }

    if (options.length === 2 && ((options[0].validate && options[1].stats) || (options[1].validate && options[0].stats))) {
      fetchlinks(newArrayFile)
         .then(res => {
            
            resolved(statsForLinksFromFileorDirectory(res, options));
         })
         .catch(error => (error));
   }

    if (options.length === 1 && options[0].validate) {
      fetchlinks(newArrayFile)
         .then(res => {
         resolved(res);
         
         })
         .catch(error => c(error));

      }
      if (options.length === 1 && options[0].stats) {

         resolved(statsForLinksFromFileorDirectory(newArrayFile, options));
      }

     })
  })
  })
.catch(error => (error))
           
           
     
}
//funcion para contar links unicos, reptidos y rotos
const statsForLinksFromFileorDirectory = (arrayToStats, options) => {
   return new Promise((resolved, rejected) => {
      let objectStatsValidate = {};
      let linksUnique = [];
      arrayToStats.forEach(el => {
         linksUnique.push(el.href);
      });
      linksUnique = [...new Set(linksUnique)];
      objectStatsValidate.Total = arrayToStats.length;
      objectStatsValidate.Unique = linksUnique.length;
      if (options.length === 2) {
         let brokenLinkStatus =[];
         arrayToStats.forEach(el => {
            brokenLinkStatus.push(el.statusText);
         });
       
         let allBrokenLink = brokenLinkStatus.filter(el => el === "Not Found");
         objectStatsValidate.Broken = allBrokenLink.length;
      }

      resolved(objectStatsValidate);
   });
}



module.exports = mdLinks;