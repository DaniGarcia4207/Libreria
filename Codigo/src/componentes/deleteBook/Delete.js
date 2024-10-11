import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

export default function Delete({ show, handleClose, bookId}) {
    let URL = process.env.REACT_APP_ENVIRONMENT
    const handleDelete = async () => {
        try {
            const response = await fetch(`${URL}/eliminar-libro/${bookId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Swal.fire({
                    title: "Libro eliminado exitosamente",
                    icon: "success",
                });
                handleClose();
                window.location.reload()
            } else {
                alert('Error al eliminar el libro');
            }
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Esta seguro de eliminar el libro</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
