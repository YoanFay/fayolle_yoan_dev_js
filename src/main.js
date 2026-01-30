import express from 'express'
import { readFile } from 'fs/promises';

const app = express();

const appPort = 3000

const data = await readFile('./public/countries.json');
const json = JSON.parse(data);

function version(version = "full", ccn3 = null) {

    let countries = []

    for(let country in json){
        if(!ccn3 || ccn3 == json[country].ccn3){
            if(version == "short")
                countries.push(
                    {
                    'name': json[country].name.common??null,
                    'cca2': json[country].cca2??null,
                    'cca3': json[country].cca3??null,
                    'flag': json[country].flag??null,
                    }
                ) 
            else if(version == "normal"){
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
            }else{
                countries.push(json[country])
            }
        }     
    }

    return countries
    
}

app.get('{/:version}{/:ccn3}', (req, res) => {
    let response = version(req.params.version, req.params.ccn3)

    console.log(req.params.version, req.params.ccn3, response)

    res.send(response)
})

app.listen(appPort, () => {
    console.log(`app launched on port ${appPort}`);
})