import redis from "redis"
import fetch from "node-fetch"

const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});

client.on("connect", function (error) {
    console.log("Redis соединение установлено");
});

let cities;

client.get("FavoriteCities", (err, res) => {
    if(res != null) {
        cities = new Set(JSON.parse(res));
    }
    else {
        cities = new Set();
    }
})


export const getCities = async (req, res) => {
    res.status(200).json(Array.from(cities.values()));
    console.log(cities)
}

export const addCity = async (req, res) => {
    if (!cities.has(req.body.city)) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
        var value;

        let response = await fetch(url);

        if (response.ok) {
            value = await response.json();
            cities.add(value['name']);
            client.set("FavoriteCities", JSON.stringify(Array.from(cities.values())));
            console.log(value);
            res.status(201).json(value);
        } else {
            console.log(response.status);
            res.status(response.status).json();
        }
    }
    //console.log(cities)
}

export const deleteCity = async (req, res) => {
    cities.delete(req.body.city);
    client.set("FavoriteCities", JSON.stringify(Array.from(cities.values())));
    res.sendStatus(200);
    console.log(cities)
}