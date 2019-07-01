# Markdown Links / md-links-nohestmm ![package](images/package.jpg)


![logo](images/logo-md-links.jpg)

## Qué es Markdown? ![mdicon](images/md.jpg)

Es un lenguaje de marcado, que se utiliza para publicar contenido, con etiquetas y delimitar cuando es un titulo, una imagen, un parrafo, un texto cursivo y links. Dichos links muchas veces dejan de funcionar, por lo que de alli surge la creacion de esta libreria que permita determinar cuales estan operando aun.

La siguiente librería tiene como finalidad permitirle al usuario examinar archivos o directorios que contengan alguna extensión .md y conocer el estatus, la cantidad de links, el origen, la referencia y los links que no estan en funcionamiento.

## Cómo funciona md-links-nohestmm v0.1.1?  ![settings](images/settings.jpg)

La aplicacion permite examinar links colocando en la terminal el comando md-links  `archivo.md` o md-links `directorio`, lo que mostrará un objeto de links contenidos dentro de el o los archivos md, encontrados. Tambien permite utilizar dos opciones `--validate o --v` y `--stats o --v`. La primera para mostrar los links con su estatus y la referencia a la cual hace, y la segunda muestra la totalidad de los links y cuales son únicos. 

Por otra parte se permite al usurio combinar las opciones validate y stats, ya sea md-links ` archivo o directorio --s --v` o  md-links ` archivo o directorio --v --s`, como tambien  md-links ` archivo o directorio --stats --validate` o ` archivo o directorio --validate --stats`. El resultado de esto seria la cantidad de links examinados, los unico y los que estan rotos.


## Cómo instalar md-links-nohestmm? ![configuration](images/configuration.jpg)



