import React from "react";

import {useEffect,useState} from "react"

import { Link,useHistory } from "react-router-dom";

import {postActivity,getActivity, getCountries} from '../actions/index'

import { useDispatch,useSelector } from "react-redux";

import style from './ActivityCreate.module.css'

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
    console.log(input)
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
    dispatch(postActivity(input))
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
            <Link to='/home'><button className={style.button}>Volver</button> </Link>
            {/* <h1>Creá una actividad!</h1> */}
            <form onSubmit={(e)=>handleSubmit(e)}>

                <div className={style.form}>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} placeholder="Nombre de la actividad..." name="name" onChange={(e)=>{handleChange(e)}} required/>
                </div>
                


                <div className={style.form}>
                    <label>Dificultad:</label>
                    
                    <input type="number" size={2} min={1} max={5}id="1" placeholder="Dificultad de la actividad"  value={input.dificultad} name='dificultad' onChange={(e)=>{handleChange(e)}}/>
                    
                </div>
                

                <div className={style.form}>
                    <label>Duracion:</label>
                    <input type="time" value={input.duracion} name="duracion"  min="01:00" max="12:00"   onChange={(e)=>{handleChange(e)}} required />
                </div>

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
            </form>
        </div>
    )

 }