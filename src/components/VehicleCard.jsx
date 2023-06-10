import React from 'react'
import { Link } from 'react-router-dom'

function VehicleCard({_id,name,plate,owner}) {
  return (
    <Link to={`/vehicles/view?vehicle_id=${_id}`} className="max-w-[500px] p-6 bg-primary border border-gray-200 rounded-lg shadow flex flex-col items-start hover:bg-tertiary">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <p className="font-normal text-white">Placa: {plate}</p>
      <p className="font-normal text-white">Propietario: {owner.name}</p>
    </Link>
  )
}

export default VehicleCard