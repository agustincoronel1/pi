 //manejamos el estado de la app con el reducer
//devuelve el estado
 const initialState = {
    countries : [],
    allCountries:[],
    actividad: [],
    allCountries2:[],
    detail:[]
    // allCountries3:[]
 }

 //en mi estado countries que en principio esta vacio
 // manda todo lo que te mande la accion GET_COUNTRIES
function rootReducer(state=initialState,action){
switch (action.type) {
   case 'GET_COUNTRIES':
    return{
        ...state,
        countries:action.payload,
        allCountries:action.payload
    }
    case 'FILTER_BY_CONTINENT' :
        var allCountries=state.allCountries
        const continentFiltered= action.payload==='todos' ? allCountries : allCountries.filter(el=>el.continent===action.payload)
        return{
             ...state,
             countries: continentFiltered
        }
         case 'FILTER_BY_ACTIVITY':
         const mapeoCountries= state.allCountries.filter(c => {
            let mapeo = c.Actividads?.map(d => d.name)
            if (mapeo.includes(action.payload)){
                return c 
            }
        })
        
        return{
            ...state,
            countries: mapeoCountries
        }
    case 'GET_ACTIVITY':
        return{
            ...state,
          actividad:action.payload
        }
      case 'FILTER_BY_NAME':
        let sortPayload= action.payload==='asc'? 
        state.countries.sort(function (a,b){ //el sort ordena mueve para la izq o der
          if (a.name>b.name) { //el nombre a es mayor q b? si lo es devuelvo 1 
            return 1;
          }
          if (b.name>a.name) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a,b){
          if (a.name>b.name) {
            return -1
          }
          if (b.name>a.name) {
            return 1
          }
        })
        return {
        ...state,
        countries:sortPayload
        
        }
        case 'GET_NAME_COUNTRIES':
          return{
            ...state,
            countries:action.payload //countries pq es el arreglo que vamos a mostrar
          }

        case 'FILTER_BY_POPULATION':
          let sortPayload2= action.payload==='asc'? 
        state.countries.sort(function (a,b){ //el sort ordena mueve para la izq o der
          if (a.population>b.population) { //el nombre a es mayor q b? si lo es devuelvo 1 
            return 1;
          }
          if (b.population>a.population) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a,b){
          if (a.population>b.population) {
            return -1
          }
          if (b.population>a.population) {
            return 1
          }
        })
        return {
        ...state,
        countries:sortPayload2
        
        }
        case "POST_ACTIVITY":
          return{
            ...state,
          }
          case "GET_DETAILS":
            return{
              ...state,
              detail:action.payload
            }
    default : return state
}
    
}
export default rootReducer;