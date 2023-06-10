import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serviceGetById, serviceUpdate } from '../../store'
import { toast } from 'react-toastify'
import { ServiceForm } from '../../components'

function Update() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.services.isLoading)
    const error = useSelector((state) => state.services.error)
    const serviceFromStore = useSelector((state) => state.services.service)
    const dispatch = useDispatch()

    const [service, setService] = useState(serviceFromStore)
    const toastTrigger = useRef(false)
    
    const update = (event) => {
        event.preventDefault()
        dispatch(serviceUpdate({ token: authToken, service }))
        toastTrigger.current = true
    }

    const handleChange = (e) => {
        e.preventDefault()
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
        }
    }, [loading])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Acces the URL params
        const service_id = params.get("service_id")

        //Dispatch get by id
        dispatch(serviceGetById({ token: authToken, serviceId: service_id }))
    }, [])

    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Actualizar un Servicio</h2>
            <ServiceForm handleSubmit={update} service={service} handleChange={handleChange} />
        </div>
    )
}

export default Update