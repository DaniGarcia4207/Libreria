const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const controller = {
    create: async function(req, res) {
        try {
            let config = {
                method: "GET",
                maxBodyLength: Infinity,
                url: 'https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": "$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"
                }
            };
    
            // Obtener los registros de libros usando axios
            const result = await axios(config);
    
            // Validación de la estructura de los datos
            if (!result.data || !result.data.record) {
                throw new Error("Formato de datos incorrecto recibido desde JSONBin");
            }
    
            let id = result.data.record.length + 1;
    
            const newBook = {
                id: id,
                title: req.body.title,
                author: req.body.author,
                yearPublished: req.body.yearPublished,
                genre: req.body.genre,
                fecha_Registro: new Date(),
            };
    
            const bookExists = result.data.record.some(book => book.title === req.body.title);
            if (bookExists) {
                return res.status(400).send("El libro ya existe en la base de datos");
            }
    
         
            result.data.record.push(newBook);
    
            const updateResponse = await fetch('https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"
                },
                body: JSON.stringify(result.data.record),
            });
    
            if (updateResponse.status === 200) {
                return res.status(200).send("Libro registrado con éxito");
            } else {
                throw new Error("Error al actualizar el bin en JSONBin");
            }
    
        } catch (error) {
            console.error("Error en el proceso de creación:", error.message);
            if (error.response) {
                res.status(error.response.status).send(`Error en la API: ${error.response.data}`);
            } else if (error.request) {
                res.status(500).send("No se pudo conectar a JSONBin, verifique su red.");
            } else {
                res.status(500).send(`Error interno: ${error.message}`);
            }
        }
    },

    update:async function (req, res) {
        try {
            let config = {
                method: "GET",
                maxBodyLength: Infinity,
                url: 'https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": "$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"
                }
            };
    
            const result = await axios(config);
    
            if (!result.data || !result.data.record) {
                throw new Error("Formato de datos incorrecto recibido desde JSONBin");
            }
    
            const bookId = req.params.id; 
            const bookIndex = result.data.record.findIndex(book => book.id === parseInt(bookId));
    
            if (bookIndex === -1) {
                return res.status(404).send("Libro no encontrado");
            }
    
            result.data.record[bookIndex] = {
                ...result.data.record[bookIndex],
                title: req.body.title,
                author: req.body.author,
                yearPublished: req.body.yearPublished,
                genre: req.body.genre,
                fecha_Registro: new Date(),
            };
    
            const updateResponse = await fetch('https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"
                },
                body: JSON.stringify(result.data.record), // Enviar el array actualizado
            });
    
            if (updateResponse.status === 200) {
                return res.status(200).send("Libro actualizado con éxito");
            } else {
                throw new Error("Error al actualizar el bin en JSONBin");
            }
    
        } catch (error) {
            console.error("Error en el proceso de actualización:", error.message);
            if (error.response) {
                res.status(error.response.status).send(`Error en la API: ${error.response.data}`);
            } else if (error.request) {
                res.status(500).send("No se pudo conectar a JSONBin, verifique su red.");
            } else {
                res.status(500).send(`Error interno: ${error.message}`);
            }
        }
    },

    delete:async function (req, res) {
        try {
            const bookId = req.params.id;
    
            let config = {
                method: "GET",
                url: 'https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": "$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"
                }
            };
    
            const result = await axios(config);
            let libros = result.data.record;
    
            
            const libroIndex = libros.findIndex(libro => libro.id === parseInt(bookId));
    
            
            if (libroIndex === -1) {
                return res.status(404).send("Libro no encontrado");
            }
    
            // Eliminar el libro del array
            libros.splice(libroIndex, 1);
    
            // Actualizar el JSON en el servidor con el array actualizado
            await axios({
                method: "PUT",
                url: 'https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": "$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"
                },
                data: JSON.stringify(libros)
            });
    
            
            res.status(200).send("Libro eliminado con éxito");
    
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
};


module.exports = controller;
