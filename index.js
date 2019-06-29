#!/usr/bin/env node
// module.exports = () => {

// };

let c = console.log;
let options = [];
let arrayTerminal = [];
let arrayLinks = [];

const process = require('process'); 
const mdLinks= require('./mdLinks');

process.argv.forEach((val, index) => {
   arrayTerminal.push(process.argv[index]);
   //c(`${index}: ${val}`);
   });
c(arrayTerminal);

//c(arrayTerminal[2]);
// fs.stat(arrayTerminal[2],(error, stats) =>{

//    if (error){ 
//       c(error);
//    }
   
//    if (stats.isFile()){
//    c("**************************************************");
//    c("*                   Soy un Path                  *");
//    c("**************************************************");
   
   
   
//    // llamar a la funcion para imprimir los links en la consola
//    arrayFile(arrayTerminal[2])
//    .then(res =>{
//       if (options.length === 0){
//          //console log para ver los links
//          //c(File);
//          arrayLinks.forEach((el, index)=> {
            
//             c(`${index}: href: ${el.href}`);
//             c(`   texto: ${el.text}`);
//             c(`   file: ${el.file}`);
         
//          });
//          }
//          //funcion que muestra los link ok para validate o stats
//          if (options.length>0){
//                  fetchlinks(arrayLinks);
//                }
//    })
//    .catch(error=> c(error));

//    }
//    if (stats.isDirectory()){
//    c("***************************************************");
//    c("*                Soy Un Directorio                *");
//    c("***************************************************");
//    searchfileinDirectory(arrayTerminal[2]);
//    }
//    });

if (arrayTerminal[3] && arrayTerminal[4]){
   if ((arrayTerminal[3] === "--validate" && arrayTerminal[4] === "--stats" ) || (arrayTerminal[3] === "--v" && arrayTerminal[4] === "--s" ) ){
      options.push(
      {validate:true},
      {stats:true}
      );
 }
   if ((arrayTerminal[3] === "stats" && arrayTerminal[4] === "validate") || (arrayTerminal[3] === "--s" && arrayTerminal[4] === "--v" )){
      options.push(
      {stats:true},
      {validate:true}
      );
     }
    }
else if (arrayTerminal[3]){
if (arrayTerminal[3] === "validate" || arrayTerminal[3] === "--v"){
   options.push(
   {validate:true}
   );
}
if (arrayTerminal[3] === "stats"  || arrayTerminal[3] === "--s"){
   options.push(
   {stats:true}
   );
}

}

mdLinks(arrayTerminal[2],options);
//   .then(res => {
  
//   })
//   .catch(error => c(error));


  



// //cambiar readfile a promesas
// const arrayFile =(path) =>{
// return new Promise ((resolved, rejected) => {
// fs.readFile(path,"utf-8", (error, data) =>{
// if (error){
// rejected (error);

// }
// else{

// const renderer = new marked.Renderer();
// renderer.link =(href,title,text) =>{
// arrayLinks.push({
// href:href,
// text:text,
// file:path
// });
// }
// marked(data, {renderer:renderer});
// //condicional para imprimir sin options

// }
// resolved(arrayLinks);
// });
// });
// }



// //funcion para imprimir los links ok y no ok
// const fetchlinks = (arrayLinks) => {
// let arrayObjectFetch = [];
// arrayLinks.forEach(el => {
   
// fetch(el.href)
//     .then(res => {
//        //c(res);
       
//      c(`${res.url} ${res.ok} ${res.status} ${res.statusText}`);
      
//       //   console.log(res.headers.raw());
//       //   console.log(res.headers.get('content-type'));
//     })
//     .catch(error =>{
//        c(error);
//     })
   

//    });

// }



// //colocar una promesa
// const searchfileinDirectory = (directory) =>{

// const files = FileHound.create()
// .discard('node_modules')
// .paths(directory)
// .ext('md')
// .find();

// files
// .then(res =>{
//    //c(res);
// res.forEach((el, index)=> {
//    //imprimir los archivos con basename
//    c(`${index}: ${path.basename(el)}`);
//    arrayFile(el)
//    .then(res=>{
      
//          if (options.length === 0){
//             //console log para ver los links
//             //c(File);
//             arrayLinks.forEach((el, index)=> {
               
//                c(`${index}: href: ${el.href}`);
//                c(`   texto: ${el.text}`);
//                c(`   file: ${el.file}`);
            
//             });
//             }
//             //funcion que muestra los link ok para validate o stats
//             else if (options.length>0){
//                     fetchlinks(arrayLinks);
//                   }
//       })
//      .catch(error => c(error));

// });
// })
// .catch(error =>{
//    c(error);
// });

// }
