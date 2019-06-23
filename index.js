// module.exports = () => {

// };


const process = require('process'); 
let arrayTerminal = [];
// const marked = require ('marked');
// const fs = require ('fs');
// const path = require ('path');


// const array =(path) =>{
// let array = [];
// fs.readFile(path,"utf-8", (error, data) =>{
// if (error)
// throw error;
// const renderer = new marked.Renderer();
// renderer.link =(href,title,text) =>{
//   array.push({
//     href:href,
//     text:text,
//     file:path
//   });
// }
//  marked(data, {renderer:renderer});
//     console.log(array);
//   });
 
// }
// console.log(array("./prueba.md"));

process.argv.forEach((val, index) => {
   arrayTerminal.push (process.argv[index]);
   console.log(`${index}: ${val}`);
   
     
});
console.log(arrayTerminal);
console.log(arrayTerminal[2]);





// const files = FileHound.create()
//   .paths("/home/laboratoria/Desktop/SCL009-md-links")
//   .ext('md')
//   .find();
 
// files.then(console.log);


