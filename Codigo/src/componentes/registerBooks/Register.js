import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import './register.css'
import { Modal, Button } from 'react-bootstrap';


export default function Registro({ show, handleClose}) {
    let URL = process.env.REACT_APP_ENVIRONMENT
    const [TitleError, setTitleError] = useState(false)
    const [AuthorError, setAuthorError] = useState(false)
    const [YearError, setYearError] = useState(false)
    const [GenreError, setGenreError] = useState(false)

    const form = useRef()
    const [values, setValues] = useState({
        title: "",
        author: "",
        yearPublished: "",
        genre:""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.title.length < 3 || values.title.length > 20 || values.title.length === 0) {
            setTitleError(true)
            return;
        }else if (values.author.length < 3 || values.author.length > 20 || values.author.length === 0) {         
            setAuthorError(true)
            return;
        } else if (values.yearPublished.toString().length < 3 || values.yearPublished.toString().length > 4) {
            setYearError(true);
            return;
        } else if (values.genre.length < 3 || values.genre.length > 20 || values.genre.length === 0) {
            setGenreError(true)
            return;
        }
        console.log(values)
        console.log("--------------->>>",URL)
        const formData = JSON.stringify(values);
        console.log("formData",formData)
        fetch(`${URL}/registro-libro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Libro registrado con éxito",
                        icon: "success",
                    });
                    form.current.reset()

                }
                if (response.status === 400) {
                    Swal.fire({
                        title: "No fue posible registrar el libro porque ya existe",
                        icon: "warning"
                    })

                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "No fue posible finalizar el proceso de registro por un error interno del servidor ",
                    icon: "error"
                })
            })
    }

    return (
        <div className="body">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="principal" onSubmit={handleSubmit} ref={form} encType='multipart/form-data'>
                    <h2>REGISTRO</h2>
                        <div className="mb-3">
                            <label className="form-label">Titulo</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Debe ser de mínimo 3 caracteres " 
                                name="title" 
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
                                onChange={handleChange} 
                            />
                            {AuthorError && <p>El autor debe contener mínimo 3 caracteres</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Año de Publicacion</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Mínimo 3 números, máximo 4" 
                                name="yearPublished"  
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
                                onChange={handleChange} 
                            />
                            {GenreError && <p>El género debe contener mínimo 3 caracteres</p>}
                        </div>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                </form> 
                </Modal.Body>
            </Modal>

        </div>
    )
}