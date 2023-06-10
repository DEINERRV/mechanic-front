import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vehicleCreate } from '../../store'
import { toast } from 'react-toastify'
import { VehicleForm } from '../../components'

function Add() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.vehicles.isLoading)
    const error = useSelector((state) => state.vehicles.error)
    const dispatch = useDispatch()

    const [vehicle, setVehicle] = useState({
        name:"",
        plate:"",
        owner:"",
    })
    const toastTrigger = useRef(false)

    const create = (event) => {
        event.preventDefault()
        dispatch(vehicleCreate({ token: authToken, vehicle }))

        toastTrigger.current = true
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setVehicle({ ...vehicle, [name]: value })
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
                setVehicle({
                    name:"",
                    plate:"",
                    owner:"",
                })
                console.log(vehicle)
            }
        }
    }, [loading])


    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-2xl font-bold text-white ">Agregar un Vehiculo Nuevo</h2>
            <VehicleForm handleSubmit={create} vehicle={vehicle} handleChange={handleChange} />
        </div>
    )
}

export default Add