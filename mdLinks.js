const fs = require('fs');
const marked = require('marked');
const FileHound = require('filehound');
const path = require('path');
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
                        fetchlinks(res, moreOptions = true)
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
                                 }, 500);
                                 resolved(res);

                              });
                           })
                           .catch(error => c(error));
                     }
                     if (options.length === 1 && options[0].stats) {
                        resolved(statsForLinksFromFileorDirectory(res, options));
                     }
                  })
                  .catch(error => c(error));
            }
            if (stats.isDirectory()) {
               searchfileinDirectory(pathFile, options)
                  .then(res => {
                     resolved(fetchlinks(res));
                  })
                  .catch(error => c(error));
            }
         }
      });
   });
}
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
            if (arrayLinks.length !== 0)
               resolved(arrayLinks);
         }
      });
   });
}
//funcion para imprimir los links ok y no ok
const fetchlinks = (pathFile) => {
   let arrayObjectFetch = [];
   return new Promise((resolved, rejected) => {
      pathFile.forEach((el) => {
         fetch(el.href)
            .then(res => {
               arrayObjectFetch.push({
                  file: path.basename(el.file),
                  href: res.url,
                  status: res.status,
                  statusText: res.statusText,
                  text: el.text
               });
               //pasarlo a la promesa del fetch

               setTimeout(() => {
                  resolved(arrayObjectFetch);
               }, 1000);
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
            resolved(res);
            //c(res);
            // res.forEach((el, index) => {
            //    //imprimir los archivos con basename
            //    arrayFile(el)
            //       .then(res => {
            //          if (options.length === 0) {
            //             if (res.length) {
            //                res.forEach(el => {
            //                   c(`${chalk.green(path.basename(el.file))} ${chalk.yellowBright(el.href)} ${el.text}`);
            //                });
            //             }
            //          }
            //          //condicion para validate y stats extrayendo el status
            //          if (options.length === 2 && ((options[0].validate && options[1].stats) || (options[1].validate && options[0].stats))) {
            //             fetchlinks(res)
            //                .then(res => {
            //                   setTimeout(() => {
            //                statsForLinksFromFileorDirectory(res,options);
            //             }, 2000);
            //                })
            //                .catch(error => c(error));
            //          }
            //          if (options.length === 1 && (options[0].validate)) {
            //             fetchlinks(res)
            //                .then(res => {
            //                   res.forEach(el => {
            //                      c(` ${chalk.green(el.file)} ${chalk.yellowBright(el.href)} ${chalk.yellowBright(el.url)} ${chalk.blue(el.statusText)} ${chalk.blue(el.status)} ${el.text}`);
            //                   });
            //                })
            //                .catch(error => c(error));
            //          }
            //          if (options.length === 1 && (options[0].stats)) {
            //             fetchlinks(res)
            //                .then(res => {
            //                   setTimeout(() => {
            //                    statsForLinksFromFileorDirectory(res);  
            //                   }, 2000);
            //                })
            //                .catch(error => c(error));
            //          }
            //       })
            //       .catch(error => c(error));
            // });
         })
         .catch(error => {
            rejected(c(error));
         });
   });
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
      objectStatsValidate.Archivo = arrayToStats[0].file;
      objectStatsValidate.Total = arrayToStats.length;
      objectStatsValidate.Unicos = linksUnique.length;


      if (options.length === 2) {
         let brokenLinkStatus = [];
         let arrayWithoutRepeat = arrayToStats.filter((el, index, array) => {
            return array.findIndex(valueArray => JSON.stringify(valueArray) === JSON.stringify(el)) === index
         });
         arrayWithoutRepeat.forEach(el => {
            brokenLinkStatus.push(el.statusText);
         });
         let brokenLink = brokenLinkStatus.filter(el => el === "Not Found");
         objectStatsValidate.Broken = brokenLink.length;
      }

      resolved(objectStatsValidate);
   });
}



module.exports = mdLinks;