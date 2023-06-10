import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userGetById, vehicleGetAll } from '../../store'
import { toast } from 'react-toastify'
import { VehicleCard } from '../../components'
import { Link } from 'react-router-dom'

function Show() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.users.isLoading)
    const error = useSelector((state) => state.users.error)
    const user = useSelector((state) => state.users.user)
    const vehicles = useSelector((state) => state.vehicles.vehicles)
    const dispatch = useDispatch()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Acces the URL params
        const user_id = params.get("user_id")

        //Dispatch get by id
        dispatch(userGetById({ token: authToken, userId: user_id }))
        dispatch(vehicleGetAll({ token: authToken, filter: { name: "owner", value: user_id } }))
    }, [])


    return (
        <div className='p-6'>
            <div className='flex flex-col gap-2'>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <p>{user.number}</p>

                <div className='flex gap-2'>
                    <Link to={`/users/update?user_id=${user._id}`}>
                        <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary">
                            Editar
                        </button>
                    </Link>

                    <button className="inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600">
                        Eliminar
                    </button>
                </div>
            </div>

            <hr className='mt-5' />
            <h2 className='mt-2 text-xl font-bold text-white text-center'>Vehiculos</h2>
            <div className='mt-2 flex flex-col gap-5'>
                {vehicles.map((vehicle, index) =>
                    <VehicleCard key={index} {...vehicle} />
                )}
            </div>

        </div>
    )
}

export default Show