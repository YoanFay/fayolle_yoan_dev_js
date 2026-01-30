import express from 'express'
import { readFile } from 'fs/promises';

const app = express();

const appPort = 3000

const data = await readFile('./public/countries.json');
const json = JSON.parse(data);

function normalVersion() {

    let countries = []

    for(let country in json){
        countries.push(
            {
            'name': json[country].name.common??null,
            'cca2': json[country].cca2??null,
            'cca3': json[country].cca3??null,
            'currencies': json[country].currencies??null,
            'languages': json[country].languages??null,
            'flag': json[country].flag??null,
            'capital': json[country].capital??null,
            'population': json[country].population??null,
            'continents': json[country].continents??null,
            }
        )        
    }

    return countries
    
}

function shortVersion() {

    let countries = []

    for(let country in json){
        countries.push(
            {
            'name': json[country].name.common??null,
            'cca2': json[country].cca2??null,
            'cca3': json[country].cca3??null,
            'flag': json[country].flag??null,
            }
        )        
    }

    return countries
    
}

app.get('/', (req, res) => {

    res.send(normalVersion())
    
})

app.get('/:version', (req, res) => {
    if(req.params.version == "full"){
        res.send(json)
    }else if(req.params.version == "short"){
        res.send(shortVersion())
    }else if(req.params.version == "normal"){
        res.send(shortVersion())
    }
})

app.listen(appPort, () => {
    console.log(`app launched on port ${appPort}`);
})