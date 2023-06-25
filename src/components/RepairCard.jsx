import React from 'react'
import { Link } from 'react-router-dom'

function RepairCard({_id,description,status,date}) {
    return (
      <Link to={`/vehicles/repairs?repair_id=${_id}`} className="max-w-[500px] min-w-[300px] p-6 bg-primary border border-gray-200 rounded-lg shadow flex flex-col items-start hover:bg-tertiary">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{date.slice(0,10)}</h5>
        <p className="font-normal text-white">{status}</p>
        <p className="font-normal text-white">{description}</p>
      </Link>
    )
  }

export default RepairCard