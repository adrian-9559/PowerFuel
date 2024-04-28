const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const routes = require('./routes');
require('dotenv').config();


// Función para inicializar la aplicación Express
function startExpress() {
    const express = require('express');
    const cors = require('cors');
    const jwt = require('jsonwebtoken');
    const session = require('express-session');
    const fileUpload = require('express-fileupload');
    const app = express();
    const PORT = process.env.SERVER_PORT || 4001;
    const HOST = process.env.SERVER_HOST || 'localhost';
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

    

    // Usar el middleware routes
    app.use(routes);

    
    app.listen(PORT, HOST, () => {
        console.log(`Servidor Express corriendo en http://${HOST}:${PORT}`);
    });
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