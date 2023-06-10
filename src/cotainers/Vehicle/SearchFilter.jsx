import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vehicleGetAll } from '../../store'
import { toast } from 'react-toastify'
import { Search, VehicleCard } from '../../components'

function SearchFilter() {
  const authToken = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.vehicles.isLoading)
  const error = useSelector((state) => state.vehicles.error)
  const vehicles = useSelector((state) => state.vehicles.vehicles)
  const dispatch = useDispatch()

  //Trigger for show the first toast when a request will make
  const toastTrigger = useRef(false)

  //
  const search = async (filter) => {
    dispatch(vehicleGetAll({ token: authToken, filter }))
    toastTrigger.current = true
  }

  //Load all users (10 as limit)
  useEffect(() => {
    dispatch(vehicleGetAll({ token: authToken, filter:{name:"",value:""}}))
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
        filters={[{ name: 'Nombre', value: 'name' }, { name: 'Placa', value: 'plate' }]} 
        submitAction={search}  
      />

      <div className='mt-5 flex flex-col gap-5 p-6'>
        {vehicles.map((vehicle, index) => 
          <VehicleCard key={index} {...vehicle}/>
        )}
      </div>
    </div>


  )
}

export default SearchFilter