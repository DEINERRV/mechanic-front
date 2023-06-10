import React from 'react'
import { Link } from 'react-router-dom'

function MenuItem({title,icon,link}) {
    const IconComponent = icon

    return (
        <Link to={link} className="p-6 bg-primary border border-gray-200 rounded-lg shadow flex flex-col items-center hover:bg-tertiary">
            <IconComponent className="text-4xl"/>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </Link>
    )
}

export default MenuItem