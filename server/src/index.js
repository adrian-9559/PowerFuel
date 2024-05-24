const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const routes = require('./routes');
const authTokenInterceptor = require('./middlewares/authTokenInterceptor');
require('dotenv').config();

function startExpress() {
    const express = require('express');
    const cors = require('cors');
    const session = require('express-session');
    const fileUpload = require('express-fileupload');
    const app = express();
    const PORT = process.env.SERVER_PORT || 4001;
    const HOST = process.env.SERVER_HOST || 'localhost';
    const path = require('path');

    app.use(fileUpload());
    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use(express.json(), express.urlencoded({ extended: true }), cors(), session({
        secret: 'tiendamysqlsession',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 86400000 },
    }));

    app.use(authTokenInterceptor);
    app.use(routes);

    app.listen(PORT, HOST, () => {
        console.log(`Servidor Express corriendo en http://${HOST}:${PORT}`);
    });
}

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });
} else {
    startExpress();
}
