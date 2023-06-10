import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userGetById, userUpdate } from '../../store'
import { toast } from 'react-toastify'
import { UserForm } from '../../components'

function Update() {
    const authToken = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.users.isLoading)
    const error = useSelector((state) => state.users.error)
    const userFromStore = useSelector((state) => state.users.user)
    const dispatch = useDispatch()

    const [user, setUser] = useState(userFromStore)
    const toastTrigger = useRef(false)
    
    const update = (event) => {
        event.preventDefault()
        dispatch(userUpdate({ token: authToken, user }))
        toastTrigger.current = true
    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
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
        const user_id = params.get("user_id")

        //Dispatch get by id
        dispatch(userGetById({ token: authToken, userId: user_id }))
    }, [])

    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Actualizar un Usuaria</h2>
            <UserForm handleSubmit={update} user={user} handleChange={handleChange} />
        </div>
    )
}

export default Update