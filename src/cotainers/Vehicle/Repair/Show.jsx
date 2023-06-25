import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { repairGetById } from '../../../store'
import { toast } from 'react-toastify'
import { UserCard, VehicleCard } from '../../../components'
import { Link } from 'react-router-dom'

function Show() {
  const authToken = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.repairs.isLoading)
  const error = useSelector((state) => state.repairs.error)
  const repair = useSelector((state) => state.repairs.repair)
  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Acces the URL params
    const repair_id = params.get("repair_id")

    //Dispatch get by id
    dispatch(repairGetById({ token: authToken, repairId: repair_id }))
  }, [])

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-2'>
        <h1>Reparacion</h1>
        <p>{repair.date}</p>
        <p>{repair.status}</p>
        <p>{repair.description}</p>
        
        <div className='flex gap-2'>
          <Link to={`/vehicles/repairs/update?repair_id=${repair._id}`}>
            <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary">
              Editar
            </button>
          </Link>

          <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>

      {repair&&repair.vehicle?
        <>
        <hr className='mt-9' />
        <h2 className='mt-2 text-xl font-bold text-white text-center'>Vehiculo</h2>
        <div className='mt-2 flex flex-col gap-5'>
            <VehicleCard {...repair.vehicle} />
        </div>
        
        <hr className='mt-9' />
        <h2 className='mt-2 text-xl font-bold text-white text-center'>Propietario</h2>
        <div className='mt-2 flex flex-col gap-5'>
            <UserCard {...repair.vehicle.owner} />
        </div>
        </>
      :<></>}
      

      


    </div>
  )
}

export default Show