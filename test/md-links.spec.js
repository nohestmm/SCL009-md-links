const mdLinks = require('../mdLinks');


describe('mdLinks', () => {
    describe('Funcion mdLinks para leer los archivos o directorios Markdonw y extraer objetos', () => {
        test('Deberia retornar el objeto con el href, file y text',  (done) => {
             expect
            mdLinks('prueba.md', []).then(data => {
                expect(data).toStrictEqual([{
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial',
                    file: 'prueba.md'
                },
                {
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial',
                    file: 'prueba.md'
                },
                {
                    href: 'https://nodejs.org/afs.html',
                    text: 'Node.js file system - Documentación oficial',
                    file: 'prueba.md'
                },
                {
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines',
                    file: 'prueba.md'
                },
                {
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines',
                    file: 'prueba.md'
                }]);done();
            });
        });
        test('Deberia retornar el objeto con el href, text, file, status, statusText',(done) => {
             expect
            mdLinks('prueba.md', [{ validate: true }]).then(data => {
                expect(data).toStrictEqual([ { file: 'prueba.md',
                href: 'https://nodejs.org/es/about/',
                status: 200,
                statusText: 'OK',
                text: 'Acerca de Node.js - Documentación oficial' },
              { file: 'prueba.md',
                href: 'https://nodejs.org/es/about/',
                status: 200,
                statusText: 'OK',
                text: 'Acerca de Node.js - Documentación oficial' },
              { file: 'prueba.md',
                href: 'https://nodejs.org/afs.html',
                status: 404,
                statusText: 'Not Found',
                text: 'Node.js file system - Documentación oficial' },
              { file: 'prueba.md',
                href: 'https://www.figma.com/file/',
                status: 404,
                statusText: 'Not Found',
                text: 'Figma Marines' },
              { file: 'prueba.md',
                href: 'https://www.figma.com/file/',
                status: 404,
                statusText: 'Not Found',
                text: 'Figma Marines' } ]);done();
            });
        });
        test('Deberia retornar el objeto con nombre del archivo, el total de links y los links unicos', (done) => {
             expect
            mdLinks('prueba.md', [{ stats: true }]).then(data => {
                expect(data).toStrictEqual({ Archivo: 'prueba.md', Total: 5, Unicos: 3 });done();
            });
        });
        test('Deberia retornar el objeto con nombre del archivo, el total de links y los links unicos y los rotos', (done) => {
             expect
            mdLinks('prueba.md', [{ stats: true }, { validate: true }]).then(data => {
                expect(data).toStrictEqual({ Archivo: 'prueba.md', Total: 5, Unicos: 3, Broken: 2 });done();
            });
        });

        test('Deberia retornar el objeto con nombre del archivo, el total de links y los links unicos y los rotos', (done) => {
             expect
            mdLinks('prueba.md', [{ validate: true }, { stats: true }]).then(data => {
                expect(data).toStrictEqual({ Archivo: 'prueba.md', Total: 5, Unicos: 3, Broken: 2 });done();
            });
        });
    });
});
