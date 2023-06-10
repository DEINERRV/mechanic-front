import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userGetAll } from '../../store'
import { toast } from 'react-toastify'
import { Search, UserCard } from '../../components'

function SearchFilter() {
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
    dispatch(userGetAll({ token: authToken, filter:{name:"",value:""}}))
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
    <div>
      <Search 
        filters={[{ name: 'Nombre', value: 'name' }, { name: 'Numero', value: 'number' }]} 
        submitAction={search}  
      />

      <div className='mt-5 flex flex-col gap-5 p-6'>
        {users.map((user, index) => 
          <UserCard key={index} {...user}/>
        )}
      </div>
    </div>


  )
}

export default SearchFilter