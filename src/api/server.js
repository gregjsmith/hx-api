import express from 'express';
import bodyParser from 'body-parser';
import AppRouter from './AppRouter';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let router = new AppRouter(app, express.Router());
router.initApiRoutes();
app.use(express.static('src/web/dist'));

app.listen(3000, () => { console.log("app running..."); });
