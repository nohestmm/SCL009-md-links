const mdLinks = require('../mdLinks');


describe('mdLinks', () => {
    describe('Leyendo archivos', () => {
        test('Deberia retornar el objeto con el file, href y text', async (done) => {
            await expect
            mdLinks('prueba.md', []).then(data => {
                expect(data).toStrictEqual([{
                    file: 'prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial'
                },
                {
                    file: 'prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial'
                },
                {
                    file: 'prueba.md',
                    href: 'https://nodejs.org/afs.html',
                    text: 'Node.js file system - Documentación oficial'
                },
                {
                    file: 'prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines'
                },
                {
                    file: 'prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines'
                }]); done();
            });
        });
        test('Deberia retornar el objeto con el file, href, text,  status, statusText', async (done) => {
            await expect
            mdLinks('prueba.md', [{ validate: true }]).then(data => {
                expect(data).toStrictEqual([{
                    file: 'prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: 'prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: 'prueba.md',
                    href: 'https://nodejs.org/afs.html',
                    text: 'Node.js file system - Documentación oficial',
                    status: 404,
                    statusText: 'Not Found'
                },
                {
                    file: 'prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines',
                    status: 404,
                    statusText: 'Not Found'
                },
                {
                    file: 'prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines',
                    status: 404,
                    statusText: 'Not Found'
                }]); done();
            });
        });
        test('Deberia retornar el objeto con el total de links y los links unicos', async (done) => {
            await expect
            mdLinks('prueba.md', [{ stats: true }]).then(data => {
                expect(data).toStrictEqual({ Total: 5, Unique: 3 }); done();
            });
        });
        test('Deberia retornar el objeto con  el total de links y los links unicos y los rotos', async (done) => {
           await expect
            mdLinks('prueba.md', [{ stats: true }, { validate: true }]).then(data => {
                expect(data).toStrictEqual({ Total: 5, Unique: 3, Broken: 3 }); done();
            });
        });

        test('Deberia retornar el objeto con el total de links y los links unicos y los rotos', async (done) => {
           await expect
            mdLinks('prueba.md', [{ validate: true }, { stats: true }]).then(data => {
                expect(data).toStrictEqual({ Total: 5, Unique: 3, Broken: 3 }); done();
            });
        });
    });

    describe('Leyendo Directorios', () => {
        test('Deberia retornar el objeto con el href, file y text', async (done) => {
            await expect
            mdLinks('/home/laboratoria/Desktop/SCL009-md-links', []).then(data => {
                expect(data).toStrictEqual([{
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://es.wikipedia.org/wiki/Markdown',
                    text: 'Markdown'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/es/',
                    text: 'Node.js'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/en/',
                    text: 'Node.js'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
                    text: 'módulos (CommonJS)'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/api/fs.html',
                    text: 'file system'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://nodejs.org/afs.html',
                    text: 'Node.js file system - Documentación oficial'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines'
                }]); done();
            });
        });
        test('Deberia retornar el objeto con el href, text, file, status, statusText', async (done) => {
            await expect
            mdLinks('/home/laboratoria/Desktop/SCL009-md-links', [{ validate: true }]).then(data => {
                expect(data).toStrictEqual([{
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://es.wikipedia.org/wiki/Markdown',
                    text: 'Markdown',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/es/',
                    text: 'Node.js',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/en/',
                    text: 'Node.js',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
                    text: 'módulos (CommonJS)',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/directorio.md',
                    href: 'https://nodejs.org/api/fs.html',
                    text: 'file system',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://nodejs.org/es/about/',
                    text: 'Acerca de Node.js - Documentación oficial',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://nodejs.org/afs.html',
                    text: 'Node.js file system - Documentación oficial',
                    status: 404,
                    statusText: 'Not Found'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines',
                    status: 404,
                    statusText: 'Not Found'
                },
                {
                    file: '/home/laboratoria/Desktop/SCL009-md-links/prueba.md',
                    href: 'https://www.figma.com/file/',
                    text: 'Figma Marines',
                    status: 404,
                    statusText: 'Not Found'
                }]); done();
            });
        });

        test('Deberia retornar el objeto con el total de links y los links unicos', async (done) => {
            await expect
            mdLinks('/home/laboratoria/Desktop/SCL009-md-links', [{ stats: true }]).then(data => {
                expect(data).toStrictEqual({ Total: 10, Unique: 8 }); done();
            });
        });


        test('Deberia retornar el objeto con  el total de links y los links unicos y los rotos', async (done) => {
           await expect
            mdLinks('/home/laboratoria/Desktop/SCL009-md-links', [{ stats: true }, { validate: true }]).then(data => {
                expect(data).toStrictEqual({ Total: 10, Unique: 8, Broken: 3 }); done();
            });
        });

        test('Deberia retornar el objeto con el total de links y los links unicos y los rotos', async (done) => {
            await expect
            mdLinks('/home/laboratoria/Desktop/SCL009-md-links', [{ validate: true }, { stats: true }]).then(data => {
                expect(data).toStrictEqual({ Total: 10, Unique: 8, Broken: 3 }); done();
            });
        });

    });



});
