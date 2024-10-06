import React, {useEffect } from "react";
import './header.css';

function Header() {

    useEffect(() => {
        const list = document.querySelectorAll(".list");

        function activeLink() {
        list.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        }
        list.forEach((item) => item.addEventListener("click", activeLink));
    })
    
    return (
        <div className="contenedor">
            <nav className="navbar navbar-expand-lg">
            <div className="contImagen">
                    <img src="libro.png" className="logo"/>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <i class="bi bi-house-heart-fill"></i>
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                <i class="bi bi-book"></i>
                    <a className="nav-link" href="#">Inventario Libros</a>
                </li>
                <li className="nav-item">
                    <i class="bi bi-sliders"></i>
                    <a className="nav-link" href="#">Categorias</a>
                </li>
                <li className="nav-item">
                    <i class="bi bi-pc-display-horizontal"></i>
                    <a className="nav-link" href="#">Libros prestados</a>
                </li>
                <li className="nav-item">
                <i class="bi bi-people-fill"></i>
                    <a className="nav-link" href="#">Clientes registrados</a>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-info" type="submit">Search</button>
            </form>
        </div>
        </nav>

    </div>
    )

}
export default Header