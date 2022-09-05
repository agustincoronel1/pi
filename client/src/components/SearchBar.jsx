import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import style from "./SearchBar.module.css"
import Button from 'react-bootstrap/Button';


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
return(
    <div className={style.barra}>
    <input className={style.input} type="input" placeholder="Por ejemplo: Argentina" name="text" onChange={(e)=>handleInputChange(e)} />
    <Button variant="dark" type='submit' className={style.button} onClick={(e)=>handleSubmit(e)}>Buscar</Button>
    </div>
)





}