// module.exports = () => {

// };
let c = console.log;
c("*******Bienvenides*******");
c("******Coloca la ruta o archivo a examinar*******");

let arrayTerminal = [];
let File = [];
const marked = require ('marked');
const fs = require ('fs');
const process = require('process'); 
const FileHound = require ('filehound');
const path = require ('path');



process.argv.forEach((val, index) => {
   arrayTerminal.push (process.argv[index]);
   //c(`${index}: ${val}`);
   });
c(arrayTerminal);
//c(arrayTerminal[2]);


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
c(File);
});
 
}
arrayFile(arrayTerminal[2]);









// const files = FileHound.create()
// .paths("/home/laboratoria/Desktop/SCL009-md-links")
// .ext('md')
// .find();
//  files.then(console.log);


