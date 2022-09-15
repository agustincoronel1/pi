import axios from 'axios'

//ACA SUCEDE LA CONEXION ENTRE EL BACK Y EL FRONT
export function getCountries(){
return async function(dispatch){
    var json =await axios.get('/countries')
    return dispatch({
        type: 'GET_COUNTRIES',
        payload: json.data
    })
}
}

export function getActivity(){
    return function(dispatch){
        axios.get('/activities')
        .then(json=> 
            dispatch({
            type: 'GET_ACTIVITY',
            payload: json.data
            }))
    }
}



 export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get('/countries?name='+ name)
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


 export function getContinentCountries(continent){
    return async function(dispatch){
        try{
            var json = await axios.get('/countries?continent='+ continent)
            return dispatch({
                type: 'GET_CONTINENT_COUNTRIES',
                payload: json.data
            })
        }catch(error){
            console.log(error)
            alert('Pais inexistente')

            

        }
    }
 }
 export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('/countries/' + id)
            return dispatch({
                type: "GET_DETAILS",
                payload:json.data
            })
        }catch(e){
            console.log(e)        }
    }
 }
 
 export function postActivity(payload){
    return async function(dispatch){
        const response = await axios.post('/activities',payload) //en esta ruta hacer el post del payload q me llega del front
        return response;
    }
}

export function cleanDetail(){
    return{
        type: "CLEAN_DETAILS"
    }
}

export function deleteCountrie(id){
    return async function (){
        console.log(id)
        try {
            var json= await axios.delete('/countries/' + id)
            console.log(json)
            return json
        } catch (error) {
            
        }
    }
}

// export function deleteActivity(name){
//     return async function (){
//         console.log(id)
//         try {
//             var json= await axios.delete('http://localhost:3001/activities/' + nombre)
//             console.log(json)
//             return json
//         } catch (error) {
            
//         }
//     }
// }

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

 export function filterByName(payload){
    return{
        type: 'FILTER_BY_NAME',
        payload
    }
 }

 export function filterByPopulation(payload){
    return{
        type: 'FILTER_BY_POPULATION',
        payload
    }
 }

