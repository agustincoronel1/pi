import React from "react";

import { useState, useEffect } from "react";

import {useDispatch, useSelector} from 'react-redux'

import { getCountries,filterCountriesByContinent, filterActivity,getActivity, filterByName, filterByPopulation,cleanDetail} from "../actions";

import {Link} from 'react-router-dom';

import Card from './Card';

import Paginado from "./Paginado";

import SearchBar from "./SearchBar";

import Detail from "./Detail";

import style from "./Home.module.css"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TextField from '@mui/material/TextField';

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// import 'bootstrap/dist/css/bootstrap.min.css' ;

// import logo from "./img/logo_small.png"

export default function Home(){
    const dispatch = useDispatch() //para ir despachando las acciones

    const allCountries = useSelector((state)=> state.countries) //estado global   //es lo mismo que usar el mapStateToProps //con useSelector traeme todo lo que esta en el estado de countries en vez de hacer el mapstatetoprpos 
    const allActivity = useSelector((state) => state.actividad);
    
    const [orden,setOrden]=useState('') //crea un estado local solo home

    const [currentPage,setCurrentPage]=useState(1)//cual va a ser la pagina actual, empieza en uno
    const [countriesPerPage,setCountriesPerPage]= useState(10)//paises por pagina
    const indexOfLastCountrie=currentPage * countriesPerPage //10 //necesito saber el ultimo
    const indexOfFirstCountrie=indexOfLastCountrie - countriesPerPage //0 necesito saber el primero
    const currentCountries= allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie) //corta los paises por pag

const paginado=(pageNumber)=>{
  setCurrentPage(pageNumber)
  // if(pageNumber === 1){setCountriesPerPage(9) } 
  // else {setCountriesPerPage(10)}
}

useEffect(() => { //me trae los paises y actividades
  dispatch(getCountries());
  dispatch(getActivity());
}, [dispatch]); 

   
useEffect(()=>{
  dispatch(cleanDetail());
  },[dispatch])
// function handleClick(e){
//   dispatch(getCountries())
// }

 function handleFilterContinent(e){
   dispatch(filterCountriesByContinent(e.target.value))
   setCurrentPage(1)
 }

 //despachamos accion
 function handleFilterActivity(e){
   e.preventDefault();
   dispatch(filterActivity(e.target.value))
   setCurrentPage(1)
 }

 function handleFilterName(e){
   e.preventDefault();
   dispatch(filterByName(e.target.value))
   setCurrentPage(1)
   setOrden(`Ordenado ${e.target.value}`)
 }
 
 function handleFilterPopulation(e){
   e.preventDefault();
   dispatch(filterByPopulation(e.target.value))
   setCurrentPage(1)
   setOrden(`Ordenado ${e.target.value}`)
 }

return(
    <div className={style.background}>
    <main >
      

        {[false].map((expand) => (
    <Navbar key={expand} bg="dark" expand={expand} variant="dark" className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/home">COUNTRIES APP</Navbar.Brand>  
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
                    <NavDropdown.Item target="_blank" href="https://github.com/agustincoronel1">GitHub</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="https://www.linkedin.com/in/agustincoronel">LinkedIn</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
))}
{/* <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box> */}
    <SearchBar page={setCurrentPage}/>
      <div className={style.opciones}>
     
      <select className={style.orden}  onChange={e=>handleFilterName(e)}>
        
        <option  disabled selected hidden>ORDEN</option>
                    <option value='ascendente' >Ascendente</option>
                    <option value='descendente' >Descendente</option>
        </select>


        <select className={style.orden} onChange={e=>handleFilterPopulation(e)}>
        <option  disabled selected hidden>POBLACION</option>
                    <option value='asc' >Ascendente</option>
                    <option value='des' >Descendente</option>
        </select>


        <select className={style.orden} onChange={e=>handleFilterContinent(e)} >
        <option value="" disabled selected hidden>CONTINENTE</option>
                    <option value='todos' >Todos los continentes</option>
                    <option value='Africa' >Africa</option>
                    <option value='South America' >South America</option>
                    <option value='Antarctica' >Antarctica</option>
                    <option value='Asia' >Asia</option>
                    <option value='Europe' >Europe</option>
                    <option value='North America' >North America</option>
                    <option value='Oceania' >Oceania</option>
        </select>

        <select className={style.orden} onChange={e=>handleFilterActivity(e)}>
         <option value="" disabled selected hidden> ACTIVIDADES </option>
         {allActivity?.map((e) => (
            <option value={e.name}>
              {e.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

        
        <div className={style.cardContent}>
        {
          currentCountries?.map(el=>{ 
            return(
              <div>            
                <Card id={el.id} name={el.name} flag={el.flag} continent={el.continent}/>
              </div> 
            )})}
       </div>
       
       <div className={style.pag}>
     
     <Paginado
         countriesPerPage={countriesPerPage}
         allCountries = {allCountries.length}
         paginado = {paginado}
         currentPage={currentPage}
         setCurrentPage={setCurrentPage}
         />
      
  </div> 
  </main>
 </div>
    
)
}