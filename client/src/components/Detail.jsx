import React, { useState } from "react";

import {useEffect } from "react";

import {useDispatch, useSelector} from 'react-redux'

import { getDetail} from "../actions/index";

import {deleteCountrie} from "../actions/index";

import {Link,useHistory} from 'react-router-dom';

import style from './Detail.module.css';

import fotoLoading from './img/loading-loading-forever.gif'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Detail(props){
    console.log(props)
    const dispatch=useDispatch()
    const history=useHistory()
    const [loading,setLoading]=useState(true)
    const myCountry= useSelector ((state)=>state.detail)
    
    useEffect(()=>{
    dispatch(getDetail(props.match.params.id));
    },[dispatch])

    function handleDelete(id){
        dispatch(deleteCountrie(id))
        alert("Pais eliminado")
       history.push("/home")
     }

if(loading === true){

        setTimeout(() => {
          setLoading(false)
        }, 200)
    
        return(
            <div  className={style.loading}>
            <img src={fotoLoading}  className={style.imagenLoading}/>
        </div>
        )
      }else if(loading === false){
return(
    <div className={style.background}>
        {/* <Link to='/home'>
           <button className={style.button}>Volver</button>
        </Link>  */}
        {
            
     <div>
         {[false].map((expand) => (
    <Navbar key={expand} bg="dark" expand={expand} variant="dark" className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/home">COUNTRIES by Agustin Coronel</Navbar.Brand>  
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/activities">Crear actividad</Nav.Link>
                  <NavDropdown
                    title="Sobre mi"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">GitHub</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                    LinkedIn
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
))}
        <h1 className={style.titulo}>Descripcion de {myCountry.name}</h1>
          <div className={style.contenedor} > 
             <img  className={style.imagen} src={myCountry.flag} alt='flags'/>
             <div className={style.detalles} >
             <p>Nombre: {myCountry?.name}</p>
             <p>ID: {myCountry?.id}</p>
             <p>Capital: {myCountry?.capital}</p>
             <p>Poblacion: {myCountry?.population}</p>
             <p>Area: {myCountry?.area}</p>
             <p>Subregion: {myCountry.subregion?myCountry.subregion:"Este pais no posee Subregion"}</p>
             <Button variant="danger" onClick={()=>handleDelete(myCountry.id)} >DELETE</Button>

          </div>
       
    </div>
            <div className={style.activity} >
            {myCountry.Actividads?.map( actividad => 
                { return (
                    <div className={style.boxActivity} >
                    <h3>Actividad</h3>
                    <p>Nombre: {actividad.name}</p>
                    <p>Dificultad: {actividad.dificultad}</p>
                    <p>Temporada: {actividad.season}</p>
                    <p>Duracion: {actividad.duracion}</p>
                    </div>
                )}
            )} 
            </div>
            </div>
        }
       <Link to='/home'>
           <Button variant="secondary" className={style.Button}>Volver</Button>
        </Link> 
    </div>
      
)
      }
}