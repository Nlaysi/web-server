import {Router} from "express"
import {addCity, getCities, deleteCity} from "../controllers/favourites.js"
import {getCoordWeather, getWeather} from "../controllers/weather.js";
const router = Router()

router.get('/city', getWeather)

router.get('/coordinates', getCoordWeather)

router.get('/favourites', getCities)

router.post('/favourites', addCity)

router.delete('/favourites', deleteCity)

export default router
