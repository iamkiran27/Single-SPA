import axios from "axios";
import { properties } from "../../properties";

export const getCalenderEvent = (userID: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'get',
            url: `${properties.DB_URL}/events?userID=${userID}`
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

export const createCalenderEvent = (request: any): Promise<any> => {
    let data: any = {
        userID: request.userID
    }
    if(request.title) data['title'] = request.title
    if(request.start) data['start'] = request.start
    if(request.end) data['end'] = request.end

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'post',
            url: `${properties.DB_URL}/events`,
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

export const updateCalenderEvent = (request: any): Promise<any> => {
    let data: any = {}
    if(request.title) data['title'] = request.title
    if(request.start) data['start'] = request.start
    if(request.end) data['end'] = request.end

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'patch',
            url: `${properties.DB_URL}/events/${request.eventID}`,
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


export const deleteCalenderEvent = (eventID: string): Promise<any> => {

    return new Promise<any>((resolve, reject) => {
        axios({
            method: 'delete',
            url: `${properties.DB_URL}/events/${eventID}`
        })
        .then(res => {
            resolve(eventID)
        })
        .catch((err) => {
            // console.log("in err...", err.response)
            reject(err)
        });
    })
}

