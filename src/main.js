import express from 'express'
import { readFile } from 'fs/promises';

const app = express();

const appPort = 3000

const data = await readFile('./public/countries.json');
const json = JSON.parse(data);

app.get('/', (req, res) => {
    console.log('req')
    res.send(json)
})

app.listen(appPort, () => {
    console.log(`app launched on port ${appPort}`);
})