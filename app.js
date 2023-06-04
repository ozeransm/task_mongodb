// Щоб запустити локальний сервер потрібно в терміналі написати => npm start
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = express.Router();
const Model = require('./models/question');
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
// const db = 'mongodb+srv://arysich:oBe3d0ukBZX2xOyC@cluster0.plp6laf.mongodb.net/?retryWrites=true&w=majority';
const db = 'mongodb+srv://ozeransm:gQDN5u9JLD7ei86h@cluster0.mqtkp0k.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then(res => console.log('conneсt'))
    .catch(err => console.log(err));

router.post('/question', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        comment: req.body.comment
    })

    try {
        const saved = await data.save();
        res
            .status(201)
            .json(saved)
    } catch (err) {
        res
            .status(400)
            .json({ message: err.message })
    }

})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/mutation', async (req, res)=>{
    try{
        const obj = {};
        if (req.body.name){obj.name=req.body.name}
        if (req.body.phone){obj.phone=req.body.phone}
        if (req.body.email){obj.email=req.body.email}
        if (req.body.comment){obj.comment=req.body.comment}

        const data = await Model.updateOne({_id: req.body._id}, {$set: obj});
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
    
})

router.delete('/delete', async (req, res)=>{
    try{
        const data = await Model.deleteOne({_id: req.body._id});
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
})