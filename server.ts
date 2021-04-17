import dotenv from 'dotenv'
dotenv.config(); // ОБЯЗАТЕЛЬНО ДЕЛАТЬ ИМПОРТ ВЫШЕ ВСЕХ!!!!

import './core/db'

import express from 'express'

import {UserCtrl} from "./controlers/UserController";
import {registerValidations} from "./validations/register";



const app = express()


app.use(express.json())

app.get('/hello', (_, res: express.Response) => {
    res.send('Hello!')
})

app.get('/users', UserCtrl.index);

app.post('/auth/register', registerValidations, UserCtrl.create);
app.get('/auth/verify', registerValidations, UserCtrl.verify);

app.listen(process.env.PORT, () => {
    console.log('SERVER IS RUNNING')
})
