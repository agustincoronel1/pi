import React from "react";
import style from './Card.module.css'
import {Link} from 'react-router-dom'

export default function Card({name,flag,continent,id}) {
return(
    <div className={style.borde}>
        <div className={style.contenido}>
  <div><img className={style.imagen} src={flag} alt="img not found" /></div>
        <h2 className={style.pais}>{name}</h2>
        <h3><p>{continent}</p></h3>
        <div className={style.detalle}> <Link to={`/countries/${id}`} >
                <button className={style.button}>DETALLE</button>
            </Link></div>
            </div>
    </div>
)
}