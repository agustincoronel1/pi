import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import style from "./SearchBar.module.css"

export default function SearchBar({page}){
    const dispatch = useDispatch()
    const [name,setName]=useState("")

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameCountries(name))
    page(1)
}
////////////FALTA VALIDAR ESTE INPUT
return(
    <div>
    <input className={style.input} type="input" placeholder="Por ejemplo: Argentina" name="text" onChange={(e)=>handleInputChange(e)} />
    <button type='submit' className={style.button} onClick={(e)=>handleSubmit(e)}>BUSCAR</button>
    </div>
)





}