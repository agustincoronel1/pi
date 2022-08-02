const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Country,Actividad}= require('../db');
const e = require('express');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//trae info de la api //una con axios para traer la data de la api y formateo con el map lo que quiero
const apiInfo = async () =>{
    const AllApi = await axios.get('https://restcountries.com/v3/all')
  
        const allCountries = AllApi.data.map(item =>{
            return {
                id:item.cca3,
                name:item.name.common,
                flag:item.flags[0],
                continent:item.continents[0],
                capital: item.capital ? item.capital[0] : 'doesnt have capital',
                subregion:item.subregion,
                area:item.area,
                population:item.population
            }
        })
        await Country.bulkCreate(allCountries) 
}
router.get("/activities", async (req, res) => {
    try {
      const findActivity = await Actividad.findAll({
        include: {
          model: Country,
        },
      });
      return res.json(findActivity);
    } catch (error) {
      res.status(400).send(error);
    }
  });
router.get('/countries' , async (req,res,next)=>{
    try {
        //get de query name
        const {name} = req.query
        if(name){
            const response = await Country.findAll()
            const data = await response.filter(item=>item.name.toLowerCase().includes(name.toLowerCase()))
            data ? res.json(data) : res.status(404).send("not found")

        }else{
        //PARA NO TUMBAR EL SERVIDOR VERIFICAMOS pq si hacia /countries desp otra por id y volvia a /Countries me aparecia error  
            const verification= await Country.count() //pregunto si hay algo
            if(verification > 1){ // si es mayor significa q esta llena
                 const data = await Country.findAll({
                    include:[
                      {
                    model: Actividad,
                      attributes: ["name"], // se relacionan las actividades de cada país
                      through: {
                        attributes: []
                  }
                 }
                ]}
                 )
                  // trae esa info de la bd
                res.json(data)
            }else{
                await apiInfo() //relleno la bd
                const data = await Country.findAll()// traigo y muestro
                res.json(data)
            }
        }
    } catch (error) {
       next(error)
    }
})


// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

router.get('/countries/:id', async (req,res) =>{
    try {
     const {id} = req.params
     const data = await Country.findByPk(id,{
         include: Actividad
     })
    
     if(data){
         res.json(data)
     }else{
         res.json('id of city not found, please write id valid')
     }
 
    } catch (error) {
         res.status(404).json(error)
    }
     
 })

 router.post('/activities', async (req,res)=>{
    const {
        name,
        dificultad,
        duracion,
       temporada,
       countries
        } = req.body
        console.log(temporada)
    const newActivity = await Actividad.create({
        name,
        dificultad,
        duracion,
        temporada, 
        
    })
     
      countries.map( async c => {
        let search = await Country.findAll(
            {where: {id : c}}
        )
        if (search) {
            newActivity.addCountry(search)
        }
      })
    //country1.addActivity(newActivity)

    res.send('actividad creada')

 })
module.exports = router;
