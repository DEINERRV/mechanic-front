import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userCreate } from '../../store'
import { toast } from 'react-toastify'
import { UserForm } from '../../components'

function Add() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.users.isLoading)
    const error = useSelector((state) => state.users.error)
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email:"",
        name:"",
        number:"",
        password:"secret",
        rol:""
    })
    const toastTrigger = useRef(false)

    const create = (event) => {
        event.preventDefault()
        dispatch(userCreate({ token: authToken, user }))

        toastTrigger.current = true
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        if (!toastTrigger.current) {
            return
        }

        if (!loading) {
            const toastType = error ? 'error' : 'success'
            const toastMsg = error ? error : 'Exito'
            toast[toastType](toastMsg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            if(!error){
                setUser({
                    email:"",
                    name:"",
                    number:"",
                    password:"secret",
                    rol:""
                })
                console.log(user)
            }
        }
    }, [loading])


    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Agregar un Usuario Nuevo</h2>
            <UserForm handleSubmit={create} user={user} handleChange={handleChange} />
        </div>
    )
}

export default Add