import React from "react";

import {Link} from 'react-router-dom'

import style from './LandingPage.module.css'

import Button from 'react-bootstrap/Button';

export default function LandingPage(){
    return(
        <div className={style.background}>
            <div className="container">
              <h1 className={style.titulo}>Countries</h1>
              <Link to= '/home'>
               <Button variant="dark" className={style.button}>Inicio</Button>
              </Link>
            </div>
         </div>

    )
}  