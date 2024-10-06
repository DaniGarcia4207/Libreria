import request from 'supertest';
import app from '../server/index';

describe('Books API', () => {
    // Prueba para agregar un libro
    describe('POST /registro-libro', () => {
        it('should add a new book', async () => {
            const response = await request(app)
                .post('/registro-libro')
                .send({
                    title: 'El Principito',
                    author: 'Antoine de Saint-Exupéry',
                    yearPublished: 1943,
                    genre: 'Ficción'
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Libro registrado con éxito');
        });

        it('should not add a book without required fields', async () => {
            const response = await request(app)
                .post('/registro-libro')
                .send({
                    title:'hola',
                    author: 'Antoine de Saint-Exupéry',
                    yearPublished: 1943,
                    genre: 'Ficción'
                });
            expect(response.status).toBe(400); 
            expect(response.text).toBe('Los campos requeridos son: title, author, yearPublished y genre.'); 
        });
    });

    // Prueba para editar un libro
    describe('PUT /actualizar-libro/:id', () => {
        it('should update an existing book', async () => {
            const response = await request(app)
                .put('/actualizar-libro/5') 
                .send({
                    title: 'El Principito - Edición Revisada',
                    author: 'Antoine de Saint-Exupéry',
                    yearPublished: 1943,
                    genre: 'Ficción'
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Libro actualizado con éxito');
        });

        it('should not update a book without required fields', async () => {
            const response = await request(app)
                .put('/actualizar-libro/3') 
                .send({
                    // Falta el título
                    author: 'Antoine de Saint-Exupéry',
                    yearPublished: 1943,
                    genre: 'Ficción'
                });
            expect(response.status).toBe(400); 
            expect(response.text).toBe('Los campos requeridos son: title, author, yearPublished y genre.'); // Cambia esto según tu implementación
        });
    });

    // Prueba para eliminar un libro
    describe('DELETE /eliminar-libro/:id', () => {
        it('should delete an existing book', async () => {
            const response = await request(app)
                .delete('/eliminar-libro/2') 
                .send();
            expect(response.status).toBe(200);
            expect(response.text).toBe('Libro eliminado con éxito');
        });
    });

    // Prueba para obtener todos los libros
    describe('GET /libros', () => {
        it('should get all books', async () => {
            const response = await request(app).get('/libros');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});
