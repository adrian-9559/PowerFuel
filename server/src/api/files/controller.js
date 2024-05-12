const fs = require('fs');
const path = require('path');

const uploadProduct = (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    console.log(req.params); 
    const newPath = path.join(appRoot, '/../public/images/product/', productId);

    const files = req.files.images;

    let fileIndex = 1;

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
    } else {
        // If the folder exists, get the number of existing files to continue the numbering
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
    // Check if the folder exists
    if (fs.existsSync(imagePath)) {
        // Delete all files in the folder
        fs.readdirSync(imagePath).forEach((file) => {
            fs.unlinkSync(path.join(imagePath, file));
        });
        // Remove the folder
        fs.rmdirSync(imagePath);
        res.send('Images deleted successfully');
    } else {
        res.status(404).send('Images not found');
    }
};

const uploadUser = (req, res) => {
    const userId = req.user.userId;
    const newPath = path.join(appRoot, `/../public/images/user/${userId}` );
    const file = req.body.image;
    
    const filename = `1.png`;

    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
    }

    file.mv(path.join(newPath, filename), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error uploading image');
        } else {
            res.status(200).send('Image uploaded successfully');
        }
    });
} 

module.exports = {
    uploadProduct,
    uploadUser,
    deleteImages
};
