const fs = require('fs');
const path = require('path');

// Aquí defines la carpeta donde están las imágenes
// Modifica esta línea para especificar la ruta cimagesorrecta de tu carpeta de imágenes
const imagesFolder = path.join(__dirname, './images'); // Cambia 'images' por la ruta correcta

// Función para obtener el siguiente archivo de imagen a procesar
const getNextImage = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(imagesFolder, (err, files) => {
            if (err) {
                return reject("No se pudo enumerar el directorio.");
            }

            // Filtra solo los archivos de imagen
            const imageFiles = files.filter(file => 
                ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase())
            );

            if (imageFiles.length > 0) {
                // Devuelve el nombre del primer archivo de imagen encontrado
                resolve(path.join(imagesFolder, imageFiles[0]));
            } else {
                resolve(null); // No se encontraron archivos de imagen
            }
        });
    });
};

// Función para eliminar un archivo
const deleteImage = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                return reject("No se pudo eliminar el archivo.");
            }
            resolve();
        });
    });
};

module.exports = { getNextImage, deleteImage };
