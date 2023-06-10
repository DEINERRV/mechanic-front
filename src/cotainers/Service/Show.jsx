import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serviceGetById } from '../../store'
import { toast } from 'react-toastify'
import { VehicleCard } from '../../components'
import { Link } from 'react-router-dom'

function Show() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.services.isLoading)
    const error = useSelector((state) => state.services.error)
    const service = useSelector((state) => state.services.service)
    const dispatch = useDispatch()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Acces the URL params
        const service_id = params.get("service_id")

        //Dispatch get by id
        dispatch(serviceGetById({ token: authToken, serviceId: service_id }))
    }, [])


    return (
        <div className='p-6'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-bold'>{service.name}</h1>
                <h2 className='text-lg font-semibold'>Descripcion:</h2>
                <p>{service.description}</p>

                <div className='flex gap-2 mt-5'>
                    <Link to={`/services/update?service_id=${service._id}`}>
                        <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary">
                            Editar
                        </button>
                    </Link>

                    <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600">
                        Deshabilitar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Show