import React, { useState, useEffect, useRef } from 'react'
import { Search } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { serviceGetAll, userGetAll } from '../store'
import { toast } from 'react-toastify'
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from 'react-icons/md'

function RepairForm({ handleSubmit, repair, handleChange }) {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.repairs.isLoading)
    const error = useSelector((state) => state.repairs.error)
    const servicesFromStore = useSelector((state) => state.services.services)
    const users = useSelector((state) => state.users.users)

    const dispatch = useDispatch()

    //Trigger for show the first toast when a request will make
    const toastTrigger = useRef(false)

    const [services, setservices] = useState(servicesFromStore)

    const handleAddService = (service)=>{
        setservices(services.filter(function(obj) {
            return obj._id !== service._id;
        }))
        repair.services = [...repair.services, service]
    }

    const handleSubService = (service)=>{
        setservices([...services, service])
        repair.services = repair.services.filter(function(obj) {
            return obj._id !== service._id;
        })
    }

    //Load all services (10 as limit)
    useEffect(() => {
        dispatch(serviceGetAll({ token: authToken, filter: { name: "", value: "" } }))
        dispatch(userGetAll({ token: authToken, filter: { name: "role", value: "mechanic" } }))
        repair.services.forEach(e=>{
            setservices(services.filter(function(obj) {
                console.log(obj)
                return obj._id !== e._id;
            }))
        })
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
                    <label htmlFor="mechanic" className="block mb-2 text-md font-medium text-white">Mecanico Responsable</label>
                    <select
                        name="mechanic"
                        className="text-sm text-white rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 text-white focus:ring-gray-500 focus:border-gray-500"
                        value={repair&&repair.mechanic&&repair.mechanic._id?repair.mechanic._id:repair.mechanic}
                        onChange={handleChange}
                    >
                        <option defaultValue value="">Seleccione un Mecanico...</option>
                        {users.map((user,index)=>
                            <option key={index} value={user._id}>{user.name}</option>
                        )}
                    </select>
                </div>

                <div>
                    <h2 className='text-md font-bold text-white'>Servicios Disponibles</h2>
                    <ul className="max-h-45 overflow-auto">
                        {services.map((service, index) => (
                            <li key={service._id} className={`flex items-center justify-between px-2 py-1 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-zinc-900'}`}>
                                <span>{service.name}</span>
                                <button>
                                    <MdOutlineAddCircle className='text-4xl' onClick={()=>handleAddService(service)}/>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h2 className='text-md font-bold text-white mt-5'>Servicios Seleccionados</h2>
                    <ul>
                        {repair&&repair.services&&repair.services.map((service, index) => (
                            <li key={service._id} className={`flex items-center justify-between p-1 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-zinc-900'}`}>
                                <span>{service.name}</span>
                                <button>
                                    <MdOutlineRemoveCircle className='text-4xl' onClick={()=>handleSubService(service)}/>
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