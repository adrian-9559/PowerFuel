const fs = require('fs');
const path = require('path');
const errorDisplay = "(Error en el controlador de Productos)";
const appRoot = path.dirname(require.main.filename);

const uploadProduct = (productId, files) => {
    const newPath = path.join(appRoot, '/../public/images/product/', productId);

    let fileIndex = 1;

    try {
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath, { recursive: true });
        } else {
            const existingFiles = fs.readdirSync(newPath);
            fileIndex = existingFiles.length + 1;
        }
    } catch (error) {
        throw new Error(`Error al intentar crear el directorio o leer los archivos existentes ${errorDisplay}`, error);
    }

    if(Array.isArray(files)) {
        files.forEach((file, index) => {
            const filename = `${fileIndex + index}.png`;
            try{
                file.mv(path.join(newPath, filename));
            }catch(error) {
                throw new Error(`Error al intentar mover las imagenes del producto ${errorDisplay}`, error);
            }
        });
    } else {
        const filename = `${fileIndex}.png`;
        try{
            files.mv(path.join(newPath, filename));
        }catch(error) {
            throw new Error(`Error al intentar mover la imagen del producto ${errorDisplay}`, error);
        }
    }
};

const deleteProductImages = (productId, imageId=null) => {
    const newPath = path.join(appRoot, '/../public/images/product/', productId);
    const tempPath = path.join(appRoot, '/../public/images/temp/', productId);

    try {
        if (fs.existsSync(newPath)) {
            if (imageId === null) {
                fs.rmSync(newPath, { recursive: true });
            } else {
                let files = fs.readdirSync(newPath);
                const image = files.find(file => file.includes(imageId));

                if (image) {
                    fs.unlinkSync(path.join(newPath, image));
                    files = fs.readdirSync(newPath);
                    
                    files.sort((a, b) => {
                        const numA = parseInt(a.split('.')[0]);
                        const numB = parseInt(b.split('.')[0]);
                        return numA - numB;
                    });
                    
                    if (!fs.existsSync(tempPath)) {
                        fs.mkdirSync(tempPath, { recursive: true });
                    }
                    for (let i = 0; i < files.length; i++) {
                        const oldPath = path.join(newPath, files[i]);
                        const newFileName = `${i + 1}.png`;
                        const newPathTemp = path.join(tempPath, newFileName);
                        fs.renameSync(oldPath, newPathTemp);
                    }

                    files = fs.readdirSync(tempPath);
                    for (let i = 0; i < files.length; i++) {
                        const oldPath = path.join(tempPath, files[i]);
                        const newFileName = `${i + 1}.png`;
                        const newPathFinal = path.join(newPath, newFileName);
                        fs.renameSync(oldPath, newPathFinal);
                    }

                    fs.rmdirSync(tempPath, { recursive: true });
                }
            }
        }
    } catch (error) {
        throw new Error(`Error al intentar eliminar las imágenes del producto ${errorDisplay}`, error);
    }
};

const uploadUser = (userId, files) => {
    const newPath = path.join(appRoot, '/../public/images/user/', userId);
    
    let fileIndex = 1;

    try {
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath, { recursive: true });
        } else {
            const existingFiles = fs.readdirSync(newPath);
            fileIndex = existingFiles.length + 1;
        }
    } catch (error) {
        throw new Error(`Error al intentar crear el directorio o leer los archivos existentes ${errorDisplay}`, error);
    }

    if(Array.isArray(files)) {
        files.forEach((file, index) => {
            const filename = `${fileIndex + index}.png`;
            try {
                file.mv(path.join(newPath, filename));
            } catch (error) {
                throw new Error(`Error al intentar mover las imagenes del usuario ${errorDisplay}`, error);
            }
        });
    } else {
        const filename = `${fileIndex}.png`;
        try {
            files.mv(path.join(newPath, filename));
        } catch (error) {
            throw new Error(`Error al intentar mover la imagen del usuario ${errorDisplay}`, error);
        }
    }

    res.send('Files uploaded successfully');
};

module.exports = {
    uploadProduct,
    uploadUser,
    deleteProductImages
};
