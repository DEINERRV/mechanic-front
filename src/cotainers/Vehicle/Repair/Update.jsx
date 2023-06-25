import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { repairGetById, serviceGetAll, repairUpdate } from '../../../store'
import { toast } from 'react-toastify'
import { RepairForm } from '../../../components'

function Update() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.repairs.isLoading)
    const error = useSelector((state) => state.repairs.error)
    const repairFromStore = useSelector((state) => state.repairs.repair)
    const dispatch = useDispatch()

    const [repair, setRepair] = useState(repairFromStore)
    const toastTrigger = useRef(false)
    
    const update = (event) => {
        event.preventDefault()
        dispatch(repairUpdate({ token: authToken, repair }))
        toastTrigger.current = true
    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setRepair({ ...repair, [name]: value })
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
    
        // Acces the URL params
        const repair_id = params.get("repair_id")
    
        //Dispatch get by id
        dispatch(repairGetById({ token: authToken, repairId: repair_id }))
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
        }
    }, [loading])


    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Actualizar una Reparacion</h2>
            <RepairForm handleSubmit={update} repair={repair} handleChange={handleChange} />
        </div>
    )
}

export default Update