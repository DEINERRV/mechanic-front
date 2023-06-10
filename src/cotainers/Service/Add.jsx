import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serviceCreate } from '../../store'
import { toast } from 'react-toastify'
import { ServiceForm } from '../../components'

function Add() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.services.isLoading)
    const error = useSelector((state) => state.services.error)
    const dispatch = useDispatch()

    const [service, setService] = useState({
        name:"",
        description: "",
    })
    const toastTrigger = useRef(false)

    const create = (event) => {
        event.preventDefault()
        dispatch(serviceCreate({ token: authToken, service }))

        toastTrigger.current = true
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setService({ ...service, [name]: value })
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
            if(!error)
                setService({ 
                    name:"",
                    description: "",
                })
        }
    }, [loading])


    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Agregar un Servicio Nuevo</h2>
            <ServiceForm handleSubmit={create} service={service} handleChange={handleChange} />
        </div>
    )
}

export default Add