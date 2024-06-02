const fs = require('fs');
const path = require('path');

const appRoot = path.dirname(require.main.filename);

const uploadProduct = (productId, files) => {
    const newPath = path.join(appRoot, '/../public/images/product/', productId);

    let fileIndex = 1;

    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
    } else {
        const existingFiles = fs.readdirSync(newPath);
        fileIndex = existingFiles.length + 1;
    }

    if(Array.isArray(files)) {
        files.forEach((file, index) => {
            const filename = `${fileIndex + index}.png`;
            file.mv(path.join(newPath, filename));
        });
    } else {
        const filename = `${fileIndex}.png`;
        files.mv(path.join(newPath, filename));
    }

    res.send('Files uploaded successfully');
};

const deleteProductImages = (productId, imageId) => {
    const newPath = path.join(appRoot, '/../public/images/product/', productId);
    const tempPath = path.join(appRoot, '/../public/images/temp/', productId);

    if (fs.existsSync(newPath)) {
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
};

const uploadUser = (userId, files) => {
    const newPath = path.join(appRoot, '/../public/images/user/', userId);
    
    let fileIndex = 1;

    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
    } else {
        const existingFiles = fs.readdirSync(newPath);
        fileIndex = existingFiles.length + 1;
    }

    if(Array.isArray(files)) {
        files.forEach((file, index) => {
            const filename = `${fileIndex + index}.png`;
            file.mv(path.join(newPath, filename));
        });
    } else {
        const filename = `${fileIndex}.png`;
        files.mv(path.join(newPath, filename));
    }

    res.send('Files uploaded successfully');
};

module.exports = {
    uploadProduct,
    uploadUser,
    deleteProductImages
};
