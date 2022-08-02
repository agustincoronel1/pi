import React from "react";

import {useEffect } from "react";

import {useDispatch, useSelector} from 'react-redux'

import { getDetail} from "../actions/index";

import {Link} from 'react-router-dom';

import style from './Detail.module.css'

export default function Detail(props){
    console.log(props)
    const dispatch=useDispatch()

useEffect(()=>{
dispatch(getDetail(props.match.params.id))
},[dispatch])

const myCountry= useSelector ((state)=>state.detail)
return(
   
    <div className={style.background}>
        <Link to='/home'>
           <button className={style.button}>Volver</button>
        </Link> 
        {
     <div>
        <h1 className={style.titulo}>Descripcion de {myCountry.name}</h1>
                <div className={style.contenedor} > 
             {/* <h1>Descripcion de {myCountry.name}</h1> */}
             <img  className={style.imagen} src={myCountry.flag} alt='flags'/>
             <div className={style.detalles} >
             <p>Nombre: {myCountry?.name}</p>
             <p>ID: {myCountry?.id}</p>
             <p>Capital: {myCountry?.capital}</p>
             <p>Poblacion: {myCountry?.population}</p>
             <p>Area: {myCountry?.area}</p>
             <p>Subregion: {myCountry.subregion?myCountry.subregion:"Este pais no posee Subregion"}</p>
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
    </div>
    
)
    
}