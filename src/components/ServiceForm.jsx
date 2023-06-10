import React from 'react'

function ServiceForm({ handleSubmit, service, handleChange }) {



    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-white">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={service.name}
                        onChange={handleChange}
                        className=" block rounded-lg text-sm text-white w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe el nombre"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 text-md font-medium text-white">Descripcion</label>
                    <textarea
                        type="text"
                        name="description"
                        value={service.description}
                        onChange={handleChange}
                        rows={7}
                        className="block rounded-lg text-sm text-white w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escribe una breve descripcion"
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

export default ServiceForm