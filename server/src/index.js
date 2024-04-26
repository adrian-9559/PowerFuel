const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// Función para inicializar la aplicación Express
function startExpress() {
    const express = require('express');
    const cors = require('cors');
    const jwt = require('jsonwebtoken');
    const session = require('express-session');
    const fileUpload = require('express-fileupload');
    const app = express();
    const PORT = process.env.PORT || 4001;
    const path = require('path');


    // Obtén la ruta absoluta del directorio principal
    const mainDirname = path.dirname(require.main.filename);
    global.appRoot = path.resolve(__dirname);

    // Usar el middleware fileUpload para poder subir archivos
    app.use(fileUpload());

    // Servir archivos estáticos
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // Especifica dónde se encuentran las vistas y cuál es el motor de las vistas
    app.set('api', path.join(mainDirname, 'api'));

    app.use(express.json(), express.urlencoded({ extended: true }), cors(), session({
        secret: 'tiendamysqlsession',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 86400000 },
    }));

    app.use((req, res, next) => {
        console.log('URL:', req.url);
        let token = req.headers['authorization'];
        if (token) {
            token = token.split('Bearer ')[1];
            try {
                req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'La sesión ha expirado. Por favor, inicia sesión de nuevo.' });
                }
                console.error('Token inválido:', error.message);
            }
        }
        next();
    });

    app.use('/api/users', require('./api/users/routes'));
    app.use('/api/products', require('./api/products/routes'));
    app.use('/api/roles', require('./api/roles/routes'));
    app.use('/api/categories', require('./api/categories/routes'));
    app.use('/api/brands', require('./api/brands/routes'));
    app.use('/api/files', require('./api/files/routes'));
    app.use('/api/address', require('./api/addresses/routes'));
    
    app.listen(PORT, () => {
        console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    });

    
    // Middleware para loggear las pe
}

// Función para iniciar un nuevo subproceso
function startWorker() {
    const worker = cluster.fork();
}

// Si el proceso actual es el proceso maestro (master)
if (cluster.isMaster) {

    // Forkeamos un proceso hijo por cada CPU disponible
    for (let i = 0; i < numCPUs; i++) {
        startWorker();
    }

    // Manejamos la muerte de un subproceso
    cluster.on('exit', (worker, code, signal) => {
        // Reiniciamos el subproceso que murió
        startWorker();
    });
} else {
    // Si el proceso actual es un subproceso (worker), iniciamos la aplicación Express en ese subproceso
    startExpress();
}