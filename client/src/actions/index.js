import axios from 'axios'

//ACA SUCEDE LA CONEXION ENTRE EL BACK Y EL FRONT
export function getCountries(){
return async function(dispatch){
    var json =await axios.get('http://localhost:3001/countries')
    return dispatch({
        type: 'GET_COUNTRIES',
        payload: json.data
    })
}
}

 export function filterCountriesByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
 }

 export function filterActivity(payload){
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
 }

 export function getActivity(){
    return async function(dispatch){
        var json =await axios.get('http://localhost:3001/activities')
       // console.log(json.data)
        return dispatch({
            type: 'GET_ACTIVITY',
            payload: json.data
        })
    }
 }
 export function filterByName(payload){
    return{
        type: 'FILTER_BY_NAME',
        payload
    }
 }

 export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/countries?name='+ name)
            return dispatch({
                type: 'GET_NAME_COUNTRIES',
                payload: json.data
            })
        }catch(error){
            console.log(error)
            alert('Pais inexistente')

            

        }
    }
 }
export function postActivity(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/activities',payload) //en esta ruta hacer el post del payload q me llega del front
        return response;
    }
}



 export function filterByPopulation(payload){
    return{
        type: 'FILTER_BY_POPULATION',
        payload
    }
 }

 export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/countries/' + id)
            return dispatch({
                type: "GET_DETAILS",
                payload:json.data
            })
        }catch(e){
            console.log(e)        }
    }
 }