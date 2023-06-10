import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vehicleGetById, vehicleUpdate } from '../../store'
import { toast } from 'react-toastify'
import { VehicleForm } from '../../components'

function Update() {
  const authToken = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.vehicles.isLoading)
  const error = useSelector((state) => state.vehicles.error)
  const vehicleFromStore = useSelector((state) => state.vehicles.vehicle)
  const dispatch = useDispatch()

  const [vehicle, setVehicle] = useState(vehicleFromStore)
  const toastTrigger = useRef(false)

  const update = (event) => {
    event.preventDefault()
    dispatch(vehicleUpdate({ token: authToken, vehicle }))
    toastTrigger.current = true
  }

  const handleChange = (e) => {
    e.preventDefault()
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
    }
  }, [loading])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Acces the URL params
    const vehicle_id = params.get("vehicle_id")

    //Dispatch get by id
    dispatch(vehicleGetById({ token: authToken, vehicleId: vehicle_id }))
  }, [])

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-2xl font-bold text-white">Actualizar un Vehiculo</h2>
      <VehicleForm handleSubmit={update} vehicle={vehicle} handleChange={handleChange} />
    </div>
  )
}

export default Update