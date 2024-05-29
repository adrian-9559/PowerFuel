const fs = require('fs');
const path = require('path');

const appRoot = path.dirname(require.main.filename);

const uploadProduct = (req, res) => {
    const productId = req.params.id;
    const newPath = path.join(appRoot, '/../public/images/product/', productId);

    const files = req.files.images;

    let fileIndex = 1;

    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
    } else {
        const existingFiles = fs.readdirSync(newPath);
        fileIndex = existingFiles.length + 1;
    }

    if(Array.isArray(files)) {
        // Move each file to the new folder and number them
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

const deleteImages = (req, res) => {
    const productId = req.params.id;
    const imagePath = path.join(appRoot, '/../public/images/product/', productId);
    if (fs.existsSync(imagePath)) {
        fs.readdirSync(imagePath).forEach((file) => {
            fs.unlinkSync(path.join(imagePath, file));
        });
        fs.rmdirSync(imagePath);
        res.send('Images deleted successfully');
    } else {
        res.status(404).send({message: 'Images not found'});
    }
};

const uploadUser = (req, res) => {
    const userId = req.user.userId.toString();
    const newPath = path.join(appRoot, '/../public/images/user/', userId);

    const files =  req.body.images;

    let fileIndex = 1;

    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
    } else {
        const existingFiles = fs.readdirSync(newPath);
        fileIndex = existingFiles.length + 1;
    }

    if(Array.isArray(files)) {
        // Move each file to the new folder and number them
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
    deleteImages
};
