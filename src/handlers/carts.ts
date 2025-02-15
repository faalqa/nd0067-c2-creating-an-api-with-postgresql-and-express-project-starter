import express, { Request, Response } from 'express'
import { Cart, TCart } from '../models/cart'
import authorization from '../middlewares/authorization'

const carts = new Cart()

const index = async (_req: Request, res: Response) => {
    try {
        const cartsList = await carts.index()
        res.json(cartsList)
    } catch (error) {
        res.status(400)
        res.json(error) 
    }
} 


const show = async (req: Request, res: Response) => {
    try {
        const cart = await carts.show(req.params.id)
        res.json(cart)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addToCart = async (req: Request, res: Response) => {
    try {
        const cart: TCart = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        }

        const newCart = await carts.addToCart(cart)
        res.status(201)
        res.json(newCart)
    } catch(error) {
        res.status(400)
        res.json(error)
    }
}

const cartsRoute = (app: express.Application) => {
    app.get('/carts', authorization, index)
    app.get('/carts/:id', authorization, show)
    app.post('/carts', authorization, addToCart)
}

export default cartsRoute