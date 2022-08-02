 import React from "react";
 import style from "./Paginado.module.css"
 
 export default function Paginado ({countriesPerPage, allCountries, paginado}) {
    const pageNumbers = [];

    for ( let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){  
        pageNumbers.push(i)        
    }

    return(
        <div>
             <ul className='paginado'>
                 { pageNumbers && pageNumbers.map(number =>(           
                <span className={style.button} key={number}>
                    <button className={style.button} onClick={()=>paginado(number)}> {number}</button>
                </span>
            ))}
            </ul>
      </div>
    )
}
