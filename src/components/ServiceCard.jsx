import React from 'react'
import { Link } from 'react-router-dom'

function ServiceCard({_id,name,description}) {
    return (
      <Link to={`/services/view?service_id=${_id}`} className="max-w-[500px] p-6 bg-primary border border-gray-200 rounded-lg shadow flex flex-col items-start hover:bg-tertiary">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="font-normal text-white">Descripcion: {description}</p>
      </Link>
    )
}

export default ServiceCard