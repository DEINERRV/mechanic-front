import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serviceGetAll } from '../../store'
import { toast } from 'react-toastify'
import { Search, ServiceCard } from '../../components'

function SearchFilter() {
  const authToken = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.services.isLoading)
  const error = useSelector((state) => state.services.error)
  const services = useSelector((state) => state.services.services)
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
    dispatch(serviceGetAll({ token: authToken, filter:{name:"",value:""}}))
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
        filters={[{ name: 'Nombre', value: 'name' }]} 
        submitAction={search}  
      />

      <div className='mt-5 flex flex-col gap-5 p-6'>
        {services.map((service, index) => 
          <ServiceCard key={index} {...service}/>
        )}
      </div>
    </div>


  )
}

export default SearchFilter