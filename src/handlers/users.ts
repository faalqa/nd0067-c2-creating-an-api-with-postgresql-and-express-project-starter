import express, { Request, Response } from 'express'
import { User, TUser } from '../models/user'
import jwt from 'jsonwebtoken'
import authorization from '../middlewares/authorization'

const users = new User()

const index = async (_req: Request, res: Response) => {
    try {
        const usersList = await users.index()
        res.json(usersList)
    } catch (error) {
        res.status(400)
        res.json(error)
    } 
} 


const show = async (req: Request, res: Response) => {
    try {
        const user = await users.show(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: TUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        }

        const newUser = await users.create(user)
        const token = jwt.sign(newUser, process.env.JWT_KEY as string)
        res.status(201)
        res.json({newUser, token})
    } catch(error) {
        res.status(400)
        res.json(error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
        } = req.body

        const auth = await users.login(email, password)

        if (auth) {
            const token = jwt.sign(auth, process.env.JWT_KEY as string)
            const message = `Welcome ${auth.firstname} ${auth.lastname}`
            res.json({message, token}) 
        } else {
            res.send('Invalid Credentials!')
        }
    } catch(error) {
        res.status(400)
        res.json(error)
    }
}

const usersRoute = (app: express.Application) => {
    app.get('/users', authorization, index)
    app.get('/users/:id', authorization, show)
    app.post('/users', create)
    app.post('/login', login)
}

export default usersRoute