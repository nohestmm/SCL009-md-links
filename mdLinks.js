const fs = require('fs');
const marked = require('marked');
const FileHound = require('filehound');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk')

const mdLinks = (pathFile, options) => {


   let c = console.log;


   fs.stat(pathFile, (error, stats) => {

      if (error) {
         c(error);
      }

      if (stats.isFile()) {
         c(chalk.cyan("**************************************************"));
         c(chalk.cyan("*            Leyendo links de un Archivo         *"));
         c(chalk.cyan("**************************************************"));

         // llamar a la funcion para imprimir los links en la consola
         arrayFile(pathFile)
            .then(res => {
               if (options.length === 0) {
                  //c(`${res.file} ${res.href} ${res.text}`);
                  res.forEach(el => {
                     c(` ${chalk.green(el.file)} ${chalk.yellowBright(el.href)} ${el.text}`);
                  });

               }
               if (options.length === 2 && ((options[0].validate && options[1].stats) || (options[1].validate && options[0].stats))) {
                  fetchlinks(res, moreOptions = true)
                     .then(res => {
                        setTimeout(() => {
                           statsForLinksFromFileorDirectory(res);
                        }, 2000);

                     })
                     .catch(error => c(error));

               }

               if (options.length === 1 && options[0].validate) {
                  fetchlinks(res)
                     .then(res => {
                        res.forEach(el => {
                           c(` ${chalk.green(el.file)} ${chalk.yellowBright(el.href)} ${chalk.yellowBright(el.url)} ${chalk.blue(el.statusText)} ${chalk.blue(el.status)} ${el.text}`);
                        });

                     })
                     .catch(error => c(error));
               }
               if (options.length === 1 && options[0].stats) {
                  setTimeout(() => {
                     statsForLinksFromFileorDirectory(res);
                  }, 2000);
               }



            })
            .catch(error => c(error));

      }
      if (stats.isDirectory()) {
         c(chalk.cyan("***************************************************"));
         c(chalk.cyan("*           Leyendo links de Un Directorio        *"));
         c(chalk.cyan("***************************************************"));
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
         pathFile.forEach((el, index) => {
            fetch(el.href)
               .then(res => {
                arrayObjectFetch.push({
                     href: res.url,
                     text: el.text,
                     file: path.basename(el.file),
                     status: res.status,
                     statusText: res.statusText
                  });
                  //pasarlo a la promesa del fetch

                  setTimeout(() => {
                     resolved(arrayObjectFetch);
                  }, 2000);
                  })
               .catch(error => {
                  rejected(c(error));
               });

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
               arrayFile(el)
                  .then(res => {
                     if (options.length === 0) {
                        if (res.length) {
                           res.forEach(el => {
                              c(`${chalk.green(path.basename(el.file))} ${chalk.yellowBright(el.href)} ${el.text}`);
                           });
                        }

                     }
                     //condicion para validate y stats extrayendo el status
                     if (options.length === 2 && ((options[0].validate && options[1].stats) || (options[1].validate && options[0].stats))) {
                        fetchlinks(res)
                           .then(res => {
                              statsForLinksFromFileorDirectory(res);

                           })
                           .catch(error => c(error));

                     }

                     if (options.length === 1 && (options[0].validate)) {
                        fetchlinks(res)
                           .then(res => {
                              res.forEach(el => {
                                 c(` ${chalk.green(el.file)} ${chalk.yellowBright(el.href)} ${chalk.yellowBright(el.url)} ${chalk.blue(el.statusText)} ${chalk.blue(el.status)} ${el.text}`);
                              });

                           })
                           .catch(error => c(error));
                     }

                     if (options.length === 1 && (options[0].stats)) {
                        fetchlinks(res)
                           .then(res => {
                              statsForLinksFromFileorDirectory(res);

                           })
                           .catch(error => c(error));
                     }
                  })
                  .catch(error => c(error));

            });
         })
         .catch(error => {
            c(error);
         });

   }
   //funcion para contar links unicos, reptidos y rotos
   const statsForLinksFromFileorDirectory = (arrayToStats) => {
      //c(arrayToStats);
      let linksUnique = [];

      c(chalk.green(arrayToStats[0].file));
      arrayToStats.forEach(el => {
         linksUnique.push(el.href);
      });

      linksUnique = [...new Set(linksUnique)];
      c(`Total: ${chalk.yellowBright(arrayToStats.length)}`);
      c(`Unique: ${chalk.yellowBright(linksUnique.length)}`);

      if (options.length === 2) {
         let brokenLinkStatus = [];


         let arrayWithoutRepeat = arrayToStats.filter((el, index, array) => {

            return array.findIndex(valueArray => JSON.stringify(valueArray) === JSON.stringify(el)) === index
         });

         arrayWithoutRepeat.forEach(el => {
            brokenLinkStatus.push(el.statusText);
         });


         let brokenLink = brokenLinkStatus.filter(el => el === "Not Found");
         c(`Broken: ${chalk.yellowBright(brokenLink.length)}`);
      }
      c(arrayToStats);

   }

}

module.exports = mdLinks;