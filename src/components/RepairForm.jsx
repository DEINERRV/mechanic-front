import React, { useState, useEffect, useRef } from 'react'
import { Search } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { serviceGetAll } from '../store'
import { toast } from 'react-toastify'
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from 'react-icons/md'

function RepairForm({ handleSubmit, repair, handleChange }) {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.repairs.isLoading)
    const error = useSelector((state) => state.repairs.error)
    const services = useSelector((state) => state.services.services)

    const dispatch = useDispatch()

    //Trigger for show the first toast when a request will make
    const toastTrigger = useRef(false)

    //
    const search = async (filter) => {
        dispatch(serviceGetAll({ token: authToken, filter }))
        toastTrigger.current = true
    }

    //Load all services (10 as limit)
    useEffect(() => {
        dispatch(serviceGetAll({ token: authToken, filter: { name: "", value: "" } }))
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
                    <label htmlFor="description" className="block mb-2 text-md font-medium text-white">Descripcion</label>
                    <textarea
                        type="text"
                        name="description"
                        value={repair.description}
                        onChange={handleChange}
                        rows={7}
                        className="block rounded-lg text-sm text-white w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe una breve descripcion"
                    />
                </div>

                <div>
                    <h2 className='text-md font-bold text-white'>Servicios Disponibles</h2>
                    <ul className="max-h-45 overflow-auto">
                        {services.map((service, index) => (
                            <li key={service._id} className={`flex items-center justify-between px-2 py-1 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-zinc-900'}`}>
                                <span>{service.name}</span>
                                <button>
                                    <MdOutlineAddCircle className='text-4xl' onClick={()=>console.log("A")}/>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h2 className='text-md font-bold text-white mt-5'>Servicios Seleccionados</h2>
                    <ul>
                        {repair.services.map((service, index) => (
                            <li key={service._id} className={`flex items-center justify-between p-1 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-zinc-900'}`}>
                                <span>{service.name}</span>
                                <button>
                                    <MdOutlineRemoveCircle className='text-4xl' />
                                </button>
                            </li>
                        ))}
                    </ul>
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

export default RepairForm