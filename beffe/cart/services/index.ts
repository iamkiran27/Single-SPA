import axios from "axios";
import { properties } from "../../properties";


export const getCartItems = (userID: string): Promise<any> => {

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'get',
            url: `${properties.DB_URL}/cart?userID=${userID}`
        })
        .then(res => {
            resolve(res.data)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        });
    })

}

export const addItemtoCart = (request: any): Promise<any> => {
    let data: any = {
        userID: request.userID,
        productID: request. productID,
        quantity: request.quantity
    }

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'post',
            url: `${properties.DB_URL}/cart`,
            data
        })
        .then(res => {
            resolve(res.data.id)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        });
    })
}

export const removeItemFromCart = (cartItemID: string): Promise<any> => {

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'delete',
            url: `${properties.DB_URL}/cart/${cartItemID}`,
        })
        .then(res => {
            resolve(cartItemID)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        });
    })
}

export const updateCartItem = (request: any): Promise<any> => {
    let data = {
        quantity: request.quantity
    }

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'patch',
            url: `${properties.DB_URL}/cart/${request.cartItemID}`,
            data
        })
        .then(res => {
            resolve(res.data.id)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        });
    })
}
