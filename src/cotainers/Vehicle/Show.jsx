import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vehicleGetById } from '../../store'
import { toast } from 'react-toastify'
import { UserCard } from '../../components'
import { Link } from 'react-router-dom'

function Show() {
  const authToken = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.vehicles.isLoading)
  const error = useSelector((state) => state.vehicles.error)
  const vehicle = useSelector((state) => state.vehicles.vehicle)
  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Acces the URL params
    const vehicle_id = params.get("vehicle_id")

    //Dispatch get by id
    dispatch(vehicleGetById({ token: authToken, vehicleId: vehicle_id }))
  }, [])

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-2'>
        <h1>{vehicle.name}</h1>
        <p>{vehicle.plate}</p>

        <div className='flex gap-2'>
          <Link to={`/vehicles/update?vehicle_id=${vehicle._id}`}>
            <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary">
              Editar
            </button>
          </Link>

          <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>

      <hr className='mt-9' />
      <h2 className='mt-2 text-xl font-bold text-white text-center'>Propietario</h2>
      <div className='mt-2 flex flex-col gap-5'>
        <UserCard {...vehicle.owner} />
      </div>

      <div className='flex flex-col items-center'>
        <hr className='mt-9 w-full' />
        <h2 className='mt-2 text-xl font-bold text-white text-center'>Reparaciones</h2>

        <Link to={`/vehicles/repairs/add?vehicle_id=${vehicle._id}`} className='mt-5 mb-5'>
          <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary">
            Agregar
          </button>
        </Link>

        <div className='mt-2 flex flex-col gap-5'>
          <UserCard {...vehicle.owner} />
        </div>
      </div>

    </div>
  )
}

export default Show