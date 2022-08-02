import React from "react";
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage(){
    return(

        <div className={style.background}>
            <div className="container">
            <h1 className={style.titulo}>Countries</h1>
            <Link to= '/home'>
            <button className={style.button}>Inicio</button>
            </Link>
            </div>
         </div>

    )
}  