import {url} from "../constants"

export const create = async(service,token)=>{
    const request = new Request(
        `${url}/services`,
        {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(service)
        }
    )

    return await fetch(request)
}

export const update = async(service,token)=>{
    const request = new Request(
        `${url}/services/${service._id}`,
        {
            method: 'PATCH', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(service)
        }
    )

    return await fetch(request)
}

export const eliminate = async(serviceId,token)=>{
    const request = new Request(
        `${url}/services/${serviceId}`,
        {
            method: 'DELETE', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        }
    )

    return await fetch(request)
}

export const getAll = async(token)=>{
    const request = new Request(
        `${url}/services`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}

export const getById = async(serviceId,token)=>{
    const request = new Request(
        `${url}/services/${serviceId}`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}