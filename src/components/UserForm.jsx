import React from 'react'

function UserForm({ handleSubmit, user, handleChange }) {



    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-white">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className=" block rounded-lg text-sm text-white w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe el nombre"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block mb-2 text-md font-medium text-white">Rol</label>
                    <select
                        name="role"
                        className="text-sm text-white rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 text-white focus:ring-gray-500 focus:border-gray-500"
                        value={user.role}
                        onChange={handleChange}
                    >
                        <option defaultValue value="">Seleccione un Rol</option>
                        <option value="mechanic">Mecanico</option>
                        <option value="client">Cliente</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-white">Correo</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className=" block rounded-lg text-sm text-white w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe el correo del usuario"
                    />
                </div>

                <div>
                    <label htmlFor="number" className="block mb-2 text-md font-medium text-white">Numero de Telefono</label>
                    <input
                        type="number"
                        name="number"
                        min="10000000" max="99999999"
                        value={user.number}
                        onChange={handleChange}
                        className="rounded-lg text-sm text-white w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe el telefono del usuario"
                    />
                </div>

            </div>

            <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-6 text-md font-medium text-center text-white bg-primary rounded-lg hover:bg-tertiary"
            >
                Confirmar
            </button>
        </form>
    )
}

export default UserForm