import {url} from "../constants"

export const create = async(vehicle,token)=>{
    const request = new Request(
        `${url}/vehicles`,
        {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(vehicle)
        }
    )

    return await fetch(request)
}

export const update = async(vehicle,token)=>{
    const request = new Request(
        `${url}/vehicles/${vehicle._id}`,
        {
            method: 'PATCH', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(vehicle)
        }
    )

    return await fetch(request)
}

export const eliminate = async(vehicleId,token)=>{
    const request = new Request(
        `${url}/vehicles/${vehicleId}`,
        {
            method: 'DELETE', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        }
    )

    return await fetch(request)
}

export const getById = async(vehicleId,token)=>{
    const request = new Request(
        `${url}/vehicles/${vehicleId}`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}


export const getAll = async(filter, token)=>{
    const request = new Request(
        `${url}/vehicles?${filter.name}=${filter.value}`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}