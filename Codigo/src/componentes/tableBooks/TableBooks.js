import React, { useEffect, useState } from 'react';
import './TableBooks.css'
import RegistroModal from '../registerBooks/Register';
import Delete from '../deleteBook/Delete'
import Update from '../updateBooks/FormUpdate'


function TablaLibros() {
  const [libros, setLibros] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const [selectedLibro, setSelectedLibro] = useState(null);

  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleOpenUpdate = (libro) => {
    setSelectedLibro(libro)
    setShowUpdateModal(true);
  }
  const handleCloseUpdate = () => {
    setShowUpdateModal(false);
    setSelectedLibro(null);
  }

  const [selectedBookId, setSelectedBookId] = useState(null);  // Estado para almacenar el ID del libro a eliminar

    const handleOpenDelete = (id) => {
        setSelectedBookId(id); // Almacena el ID del libro seleccionado
        setShowDeleteModal(true); // Muestra el modal de eliminación
    };

    const handleCloseDelete = () => {
        setShowDeleteModal(false);
        setSelectedBookId(null); // Resetea el ID del libro cuando se cierra el modal
    };


  const fetchLibros = async () => {
    try {
      const response = await fetch('http://localhost:3001/'); 
      const data = await response.json();
      setLibros(data); // Guardar los libros en el estado
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  
  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <div>
      <h2>Lista de Libros</h2>
      <button type="button" class="btn btn-info" onClick={handleShow}>INSERTAR</button>
      <Update show={showUpdateModal} handleClose={handleCloseUpdate} book={selectedLibro}/>
      <RegistroModal show={showModal} handleClose={handleClose}/>
      <Delete show={showDeleteModal} handleClose={handleCloseDelete} bookId={selectedBookId} />
      <div className='table-container'>
        <table className='table table-success table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Año Publicado</th>
              <th>Género</th>
              <th>Fecha de Registro</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.title}</td>
                <td>{libro.author}</td>
                <td>{libro.yearPublished}</td>
                <td>{libro.genre}</td>
                <td>{new Date(libro.fecha_Registro).toLocaleDateString()}</td>
                <td><button type="button" class="btn btn-info"><i class="bi bi-pencil-square" onClick={() => handleOpenUpdate(libro)}></i></button></td>
                <td><button type="button" class="btn btn-danger"><i class="bi bi-trash3-fill " onClick={() => handleOpenDelete(libro.id)}></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
  )
}

export default TablaLibros;
