import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: Guitar}} |
    { type: 'remove-from-cart', payload: {id : Guitar['id']}} |
    { type: 'decrease-Quantity', payload: {id : Guitar['id']}} |
    { type: 'increase-Quantity', payload: {id : Guitar['id']}} |
    { type: 'clear-cart'} 

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
}

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

//algunas const utiles
const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => { 
    if (action.type === 'add-to-cart') {
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updateCart : CartItem[] = [];
        if (itemExists) {
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return {...item, quantity: item.quantity++}
                    } else {
                        return item
                    }
                } else{
                    return item
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity:1}           
            updateCart = [...state.cart, newItem]  
        }

        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'remove-from-cart') {
        const updateCart = state.cart.filter(guitar => guitar.id !== action.payload.id)
        return {
            ...state,
            cart: updateCart
        }
    }
    if (action.type === 'decrease-Quantity') {

        const updateCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                }
            }
            return item
        })

        return {
            ...state,
            cart: updateCart
        }
    }
    if (action.type === 'increase-Quantity') {

        const updateCart = state.cart.map(item => {

            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            }
            return item
        })

        return {
            ...state,
            cart: updateCart, 
        }
    }
    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }
    }
    
    
    
}
