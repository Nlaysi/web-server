import express, {urlencoded} from "express"
import path from "path"

import routes from "./routes/routes.js"

const app = express(),
    dirname = path.resolve(),
    router = express.Router,
    port = 3000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.resolve(dirname, 'www/belonet.ru')));

app.use(routes)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(dirname, 'www/belonet.ru', 'index.html'));
});

app.listen(port, () => {
    console.log("Сервер запущен на localhost:" + port);
});
