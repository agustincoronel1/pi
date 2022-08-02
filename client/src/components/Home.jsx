import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCountries,filterCountriesByContinent, filterActivity,getActivity, filterByName, filterByPopulation} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Detail from "./Detail";
import style from "./Home.module.css"

export default function Home(){
    const dispatch = useDispatch() //para ir despachando las acciones
    const allCountries = useSelector((state)=> state.countries)    //es lo mismo que usar el mapStateToProps //con useSelector traeme todo lo que esta en el estado de countries en vez de hacer el mapstatetoprpos 
    const allActivity = useSelector((state) => state.actividad);
    const [orden,setOrden]=useState('')
    const [currentPage,setCurrentPage]=useState(1)//cual va a ser la pagina actual, empieza en uno
    const [countriesPerPage,setCountriesPerPage]= useState(9)//paises por pagina
    const indexOfLastCountrie=currentPage * countriesPerPage //10 //necesito saber el ultimo
    const indexOfFirstCountrie=indexOfLastCountrie - countriesPerPage //0 necesito saber el primero
    const currentCountries= allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie) //todos los paises
  
const paginado=(pageNumber)=>{
  setCurrentPage(pageNumber)
  if(pageNumber === 1){setCountriesPerPage(9) } 
  else {setCountriesPerPage(10)}
}

useEffect(() => {
  dispatch(getCountries());
  dispatch(getActivity());
}, [dispatch]);

function handlePage(e){
  if(e.target.value==="prev" && currentPage>1){
      setCurrentPage(currentPage-1)
  }
  if(e.target.value==="next" && currentPage+1 < indexOfLastCountrie){
      setCurrentPage(currentPage+1)
  }

}
 
function handleClick(e){
  dispatch(getCountries())
}
 function handleFilterContinent(e){
   dispatch(filterCountriesByContinent(e.target.value))
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
    <nav >

      <div className={style.reload}>
        <Link to='/activities'>
        <button className={style.button}><span> Creá una actividad</span>
</button> 
        </Link>
      <button className={style.orden} onClick={()=>window.location.reload()}>
        Reload
      </button>
      </div>

      <nav className={style.opciones}>
      <select className={style.orden}  onChange={e=>handleFilterName(e)}>
        <option value="" disabled selected hidden>ORDEN</option>
                    <option value='asc' >Ascendente</option>
                    <option value='des' >Descendente</option>
        </select>

        <select className={style.orden} onChange={e=>handleFilterPopulation(e)}>
        <option value="" disabled selected hidden>POBLACION</option>
                    <option value='asc' >Asc</option>
                    <option value='des' >Des</option>
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
        </nav>

        <SearchBar page={setCurrentPage}/>
        {/* //necesita el componente paginado para funcionar */}
        <div className={style.pag}>
        <button className={style.buttonPrevNext} onClick={e=>handlePage(e)} value="prev">←</button>
        <Paginado
            countriesPerPage={countriesPerPage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            />
        <button className={style.buttonPrevNext} onClick={e=>handlePage(e)} value="next">→</button>
        </div>  

       
        <div className={style.cardContent} >
        
        {
          currentCountries?.map(el=>{ 
            return(
              <div>            
                 <Link to={'/countries/'+ el.id}>
                <Card id={el.id} name={el.name} flag={el.flag} continent={el.continent}/>
                </Link>
                </div> 
            )})}

</div>

            </nav>
    </div>
    
)
}