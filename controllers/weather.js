import fetch from "node-fetch";

export const parseWeather = async (city) => {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
    var value;

    let response = await fetch(url);

    value = await response.json();
    return value;
}

export const getCoordWeather = async (req, res) =>  {
    var latitude = req.query.lat;
    var longitude = req.query.long;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";

    var value;
    let response = await fetch(url);
    value = await response.json();

    if(typeof value.cod  !== 'undefined'){
        res.status(value.cod).json(value);
    }
    else {
        res.sendStatus(404);
    }
}

export const getWeather = async (req, res) => {
    {
        const city = req.query.q;

        var value = await parseWeather(city);

        if(typeof value.cod  !== 'undefined'){
            res.status(value.cod).json(value);
        }
        else {
            res.sendStatus(404);
        }
    }
}

