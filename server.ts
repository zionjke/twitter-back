import dotenv from 'dotenv'

dotenv.config(); // ОБЯЗАТЕЛЬНО ДЕЛАТЬ ИМПОРТ ВЫШЕ ВСЕХ!!!!

import './core/db'

import express from 'express'

import {UserCtrl} from "./controlers/UserController";
import {registerValidations} from "./validations/register";
import {passport} from "./core/passport";


const app = express()


app.use(express.json())
app.use(passport.initialize())

app.get('/hello', (_, res: express.Response) => {
    res.send('Hello!')
})

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);


app.post('/auth/register', registerValidations, UserCtrl.create);
app.get('/auth/verify', registerValidations, UserCtrl.verify);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.listen(process.env.PORT, () => {
    console.log('SERVER IS RUNNING')
})


// ПОРЯДОК РОУТОВ ОЧЕНЬ ВАЖЕН!!!!!
