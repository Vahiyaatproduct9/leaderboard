import express from 'express'
import cors from 'cors'
import { updatePlayerPoints, Player } from './logic.js'

const app = express()
app.use(cors())
app.use(express.json())


// app.get('/api/adduser', (req, res) => {
//     const { name, age } = req.body;
//     console.log('New User', name, age)
//     res.json({ message: "New User Added" + name })
// })

app.get('/api/data', async (req, res) => {
    const newData = await Player.find().sort({ points: -1 });
    res.status(200).send(newData)
    console.log(newData)
})

app.post('/api/data', async (req, res) => {
    const receivedPlayer = req.body.player;
    const result = await updatePlayerPoints(receivedPlayer)
    console.log(result)
    res.send(result);
});

app.listen(5000, () => {
    console.log('Connected !')
})