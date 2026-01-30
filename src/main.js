import express from 'express'

const app = express();

const appPort = 3000

app.get('/', (req, res) => {
})

app.listen(appPort, () => {
    console.log(`app launched on port ${appPort}`)
})