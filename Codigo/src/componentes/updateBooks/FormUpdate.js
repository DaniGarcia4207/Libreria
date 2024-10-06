import React, { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Update({ show, handleClose, book }) {
    let URL = process.env.REACT_APP_ENVIRONMENT;
    const [TitleError, setTitleError] = useState(false);
    const [AuthorError, setAuthorError] = useState(false);
    const [YearError, setYearError] = useState(false);
    const [GenreError, setGenreError] = useState(false);

    const form = useRef();
    const [values, setValues] = useState({
        title: "",
        author: "",
        yearPublished: "",
        genre: ""
    });

    // useEffect para inicializar los valores del formulario
    useEffect(() => {
        if (book) {
            setValues({
                title: book.title || "",
                author: book.author || "",
                yearPublished: book.yearPublished || "",
                genre: book.genre || ""
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones de entrada
        if (values.title.length < 3 || values.title.length > 20 || values.title.length === 0) {
            setTitleError(true);
            return;
        } else if (values.author.length < 3 || values.author.length > 20 || values.author.length === 0) {
            setAuthorError(true);
            return;
        } else if (values.yearPublished.toString().length < 3 || values.yearPublished.toString().length > 4) {
            setYearError(true);
            return;
        } else if (values.genre.length < 3 || values.genre.length > 20 || values.genre.length === 0) {
            setGenreError(true);
            return;
        }

        // Realiza la solicitud para actualizar el libro
        const formData = JSON.stringify(values);
        fetch(`${URL}/actualizar-libro/${book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Libro actualizado con éxito",
                        icon: "success",
                    });
                    form.current.reset(); // Opcional: reinicia el formulario
                    handleClose(); // Cerrar el modal después de la actualización
                }
                if (response.status === 400) {
                    Swal.fire({
                        title: "No fue posible actualizar el libro",
                        icon: "warning"
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "No fue posible finalizar el proceso de actualización por un error interno del servidor",
                    icon: "error"
                });
            });
    };

    return (
        <div className="body">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="principal" onSubmit={handleSubmit} ref={form}>
                        <h2>Actualizar Libro</h2>
                        <div className="mb-3">
                            <label className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Debe ser de mínimo 3 caracteres"
                                name="title"
                                value={values.title} // Mostrar el valor del estado
                                onChange={handleChange}
                            />
                            {TitleError && <p>El título debe contener mínimo 3 caracteres</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Autor</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Debe ser de mínimo 3 caracteres"
                                name="author"
                                value={values.author} // Mostrar el valor del estado
                                onChange={handleChange}
                            />
                            {AuthorError && <p>El autor debe contener mínimo 3 caracteres</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Año de Publicación</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Mínimo 3 números, máximo 4"
                                name="yearPublished"
                                value={values.yearPublished} // Mostrar el valor del estado
                                onChange={handleChange}
                            />
                            {YearError && <p>El año debe contener entre 3 y 4 dígitos</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Género Literario</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mínimo 3 caracteres"
                                name="genre"
                                value={values.genre} // Mostrar el valor del estado
                                onChange={handleChange}
                            />
                            {GenreError && <p>El género debe contener mínimo 3 caracteres</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
