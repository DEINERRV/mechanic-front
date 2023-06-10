import React, { useState, useEffect, useRef } from 'react'
import { Search } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { userGetAll } from '../store'
import { toast } from 'react-toastify'


function VehicleForm({ handleSubmit, vehicle, handleChange }) {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.users.isLoading)
    const error = useSelector((state) => state.users.error)
    const users = useSelector((state) => state.users.users)
    const dispatch = useDispatch()

    //Trigger for show the first toast when a request will make
    const toastTrigger = useRef(false)

    //
    const search = async (filter) => {
        dispatch(userGetAll({ token: authToken, filter }))
        toastTrigger.current = true
    }

    //Load all users (10 as limit)
    useEffect(() => {
        dispatch(userGetAll({ token: authToken, filter: { name: "", value: "" } }))
    }, [])

    //Observe when the request is finish(loading=null) to show or not a toast
    useEffect(() => {
        if (!toastTrigger.current) {
            return
        }

        if (!loading && error) {
            toast.error(error, {
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-white">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={vehicle.name}
                        onChange={handleChange}
                        className=" block rounded-lg text-sm text-white w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe el nombre"
                    />
                </div>

                <div>
                    <label htmlFor="plate" className="block mb-2 text-md font-medium text-white">Numero de Placa</label>
                    <input
                        type="number"
                        name="plate"
                        min="100000" max="999999"
                        value={vehicle.plate}
                        onChange={handleChange}
                        className="rounded-lg text-sm text-white w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe el numero de placa"
                    />
                </div>

                <div>
                    <label htmlFor="owner" className="block mb-2 text-md font-medium text-white">Propietario</label>
                    <Search 
                        filters={[{ name: 'Nombre', value: 'name' }, { name: 'Numero', value: 'number' }]} 
                        submitAction={search}
                    />
                    <select
                        name="owner"
                        className="text-sm text-white rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 text-white focus:ring-gray-500 focus:border-gray-500"
                        value={vehicle.owner._id?vehicle.owner._id:vehicle.owner}
                        onChange={handleChange}
                    >
                        <option defaultValue value="">Seleccione un Propietario</option>
                        {users.map((user,index)=>
                            <option key={index} value={user._id}>{user.name}</option>
                        )}
                    </select>
                </div>

            </div>

            <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-6 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary"
            >
                Confirmar
            </button>
        </form>
    )
}

export default VehicleForm