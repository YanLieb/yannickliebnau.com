import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import api from './routes/api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(express.json());

app.use('/', api)

export default app;