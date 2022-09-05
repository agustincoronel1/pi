 import React from "react";
 import style from "./Paginado.module.css"
 import Button from 'react-bootstrap/Button';

 export default function Paginado ({countriesPerPage, allCountries, paginado,currentPage,setCurrentPage}) {
    const pageNumbers = [];

    for ( let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){   //calculo de cuantas pags
        pageNumbers.push(i)        
    }

    function handlePage(e){
        if(e.target.value==="prev" && currentPage>1){
            setCurrentPage(currentPage-1)
        }
        if(e.target.value==="next" && currentPage+1 < pageNumbers.length){
            setCurrentPage(currentPage+1)
        }
      
      }


    return(
        <div>
             
              <ul className='paginado'>
              <Button variant="outline-primary" onClick={e=>handlePage(e)} value="prev">«</Button> 

                 { pageNumbers && pageNumbers.map(number =>(      // && pasa a la segunda accion si la primera es verdadera    
                
                    <Button variant="outline-primary"  onClick={()=>paginado(number)}> {number}</Button>
                
                 ))}
                  <Button variant="outline-primary" onClick={e=>handlePage(e)} value="next">»</Button>

              </ul>
           

        </div>
    )
}
