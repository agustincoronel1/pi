import React from "react";

import {useEffect,useState} from "react"

import { Link,useHistory } from "react-router-dom";

import {postActivity,getActivity, getCountries} from '../actions/index'

import { useDispatch,useSelector } from "react-redux";

import style from './ActivityCreate.module.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

 export default function ActivityCreate(){
    const dispatch = useDispatch();
    const history=useHistory()
    const countries= useSelector((state)=>state.countries)
    // const [error, setError] = useState('');
    // const [mostrarError, setMostrarError] = useState(false)

    const [input,setInput]=useState({
        name:"",
        dificultad: "",
        duracion: "",
        season:"",
        countries:[]
    })

    useEffect(()=> {
        dispatch(getActivity());
        dispatch(getCountries())
    },[])

   function handleChange(e){
    setInput({
        ...input,
    [e.target.name]: e.target.value
    })
    }

    function handleCheck(e){
        if (e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }
    function handleDelete(el){
        setInput({
            ...input,
            countries:input.countries.filter(c=>c!==el)
        })
    }
    function handleSelect(e){
        if(input.countries.includes(e.target.value)){
            console.log('No se pueden repetir el mismo pais  🥳 ')
        } else {

            setInput({
                ...input,
                countries: [...input.countries, e.target.value],
                
            })
        }
    }
    
function handleSubmit(e){
    e.preventDefault();
    const {name, dificultad,duracion, season, countries} = input;
    if(!name.trim() || !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name) || name.length <= 3){
       return alert('El nombre no debe contener caracteres especiales y debe ser mayor a dos')
       
    } 
    if(!dificultad ){
        return alert('Debes de seleccionar un nivel de Dificultad')
       
    }
    if(!duracion ){
        return alert('Debes de seleccionar un nivel de Duracion')
        
     }
    if(!season.trim()){
        return alert('Debes de seleccionar alguna estacion del año')
        
    }
    if(countries.length < 1 ){
        return  alert('Debes de seleccionar al menos un Pais')
       
    }
    dispatch(postActivity(input)) //pase la info del form a la bd
    // console.log(input)
    alert('Actividad creada con exito!')
    setInput({
        name:"",
        dificultad:"",
        duracion:"",
        season:"",
        countries:[]
    })
    history.push('/home')
}

    return(
        <div className={style.background}>
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
<h1> Crea tu actividad
    </h1>            
    <Form  onSubmit={(e)=>handleSubmit(e)}>

    <div>
        <Form.Group  controlId="formBasicEmail">
        <p>Nombre</p>
        <Form.Control className={style.formulario}  type="text" value={input.name} placeholder="Nombre de la actividad..." name="name" onChange={(e)=>{handleChange(e)}} required />
        </Form.Group>
     </div>
  <p></p>

        <Form.Group  controlId="formBasicEmail">
        <Form.Label>Dificultad</Form.Label>
        <Form.Control className={style.formulario}  type="number" size={2} min={1} max={5} id="1" placeholder="Dificultad de la actividad"  value={input.dificultad} name='dificultad' onChange={(e)=>{handleChange(e)}} />
        </Form.Group>

<p></p>

<Form.Group  controlId="formBasicEmail">
        <Form.Label>Duracion</Form.Label>
        <Form.Control className={style.formulario}   type="time" value={input.duracion} name="duracion"  min="01:00" max="12:00"   onChange={(e)=>{handleChange(e)}} required />
      </Form.Group>
<p></p>
<p></p>
                <div  >
                    <label>Temporada:</label>
                    <div className={style.temp}> 

                    <input className={style.inputTemp}  type="radio" id="Summer" value="Verano" name="season" onChange={(e)=>{handleCheck(e)}}/>
                     <label>Verano 🥵</label>

                     <input className={style.inputTemp}  type="radio" id="Autumn" value="Otoño" name="season" onChange={(e)=>{handleCheck(e)}}/>
                     <label>Otoño 🍁</label>

                      <input className={style.inputTemp}   type="radio" id="Winter" value="Invierno" name="season" onChange={(e)=>{handleCheck(e)}}/>
                     <label>Invierno 🥶</label>

                     <input className={style.inputTemp}  type="radio" id="Spring" value="Primavera" name="season" onChange={(e)=>{handleCheck(e)}}/> 
                     <label>Primavera 🌸</label>
                    
                     </div>
                </div>
<p></p>
                <div>
                    <label>Pais</label>
                    <select  name="countries" onChange={(e)=>{handleSelect(e)}}required>
                        <option>Elige los paises</option>
                        {countries?.map(element=> {
                        return (
                            <option  value={element.id} key={element.id}>{element.name}</option>
                        )
                    })}
                    </select>
                </div>

                    <button className={style.button} type="submit"> CREAR </button>
                    <div>
                    
                    {input.countries?.map(country => {
                        return (
                            <div key={Math.random()}>
                                <div>
                                <button onClick={()=>handleDelete(country)} >X</button>
                                    <p>{countries.find(c => c.id === country).name}</p>
                                </div>
                            </div> 
                        )
                    })}
                    </div>
            </Form>
            <Link to='/home'>
           <Button variant="secondary" className={style.Button}>Volver</Button>
        </Link> 
        </div>
    )

 }