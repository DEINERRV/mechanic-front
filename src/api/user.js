import {url} from "../constants"


export const getAll = async(filter, token)=>{
    const request = new Request(
        `${url}/users?${filter.name}=${filter.value}`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}

export const getById = async(UserId,token)=>{
    const request = new Request(
        `${url}/users/${UserId}`,
        {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
    )

    return await fetch(request)
}

export const update = async(user,token)=>{
    const request = new Request(
        `${url}/users/${user._id}`,
        {
            method: 'PATCH', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(user)
        }
    )

    return await fetch(request)
}