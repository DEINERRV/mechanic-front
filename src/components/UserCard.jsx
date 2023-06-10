import React from 'react'
import { Link } from 'react-router-dom'

function UserCard({_id,name,number,email}) {
  return (
    <Link to={`/users/view?user_id=${_id}`} className="max-w-[500px] p-6 bg-primary border border-gray-200 rounded-lg shadow flex flex-col items-start hover:bg-tertiary">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <p className="font-normal text-white">Celular: {number}</p>
      <p className="font-normal text-white">Correo: {email}</p>
    </Link>
  )
}

export default UserCard