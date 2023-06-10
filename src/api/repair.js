import {url} from "../constants"

export const create = async(repair,token)=>{
    const request = new Request(
        `${url}/repairs`,
        {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(repair)
        }
    )

    return await fetch(request)
}

export const update = async(repair,token)=>{
    const request = new Request(
        `${url}/repairs/${repair._id}`,
        {
            method: 'PATCH', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(repair)
        }
    )

    return await fetch(request)
}

export const eliminate = async(repairId,token)=>{
    const request = new Request(
        `${url}/repairs/${repairId}`,
        {
            method: 'DELETE', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        }
    )

    return await fetch(request)
}

export const getById = async(repairId,token)=>{
    const request = new Request(
        `${url}/repairs/${repairId}`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}