import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { repairCreate, vehicleGetById } from '../../../store'
import { toast } from 'react-toastify'
import { RepairForm } from '../../../components'

function Add() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.services.isLoading)
    const error = useSelector((state) => state.services.error)
    const vehicle = useSelector((state) => state.vehicles.vehicle)
    const dispatch = useDispatch()

    const [repair, setRepair] = useState({
        description: "",
        vehicle: vehicle,
        services: [],
        mechanic: "",
        createdBy: "",
    })

    const toastTrigger = useRef(false)

    const create = (event) => {
        event.preventDefault()
        dispatch(repairCreate({ token: authToken, repair }))

        toastTrigger.current = true
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setRepair({ ...repair, [name]: value })
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
    
        // Acces the URL params
        const vehicle_id = params.get("vehicle_id")
    
        //Dispatch get by id
        dispatch(vehicleGetById({ token: authToken, vehicleId: vehicle_id }))
    }, [])

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
                setRepair({
                    description: "",
                })
        }
    }, [loading])


    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h1 className="mb-4 text-2xl font-bold text-white">Agregar una Reparacion</h1>
            <p className='mt-2'>Vehiculo: {vehicle.name}</p>
            <p className='mt-1'>Propietario: {vehicle.owner?vehicle.owner.name:""}</p>
            <hr className='my-4'/>
            <RepairForm handleSubmit={create} repair={repair} handleChange={handleChange} />
        </div>
    )
}

export default Add