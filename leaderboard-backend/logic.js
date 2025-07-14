import mongoose from 'mongoose'
import conn from './lib/createClient.js'
await conn()
const PlayerSchema = new mongoose.Schema({
    name: String,
    points: Number,
    pointHistory: [Number]
});
function rand() {
    return Math.ceil(Math.random() * 10)
}
export const Player = mongoose.model('Player', PlayerSchema);

export async function updatePlayerPoints(name) {
    const points = rand();
    const existingPlayer = await Player.findOne({ name });
    if (existingPlayer) {
        existingPlayer.points += points;
        existingPlayer.pointHistory.push(points);
        await existingPlayer.save();
        const newList = await Player.find().sort({ points: -1 });
        return { data: newList, message: 'Updated Points for ' + name + '.' };
    } else {
        const newPlayer = new Player({ name, points: 0, pointHistory: [] });
        await newPlayer.save();
        const newList = await Player.find().sort({ points: -1 });
        return { data: newList, message: 'Player Name ' + name + ' added with ' + points + ' points.' }
    }
}


