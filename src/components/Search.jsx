import React,{useState} from 'react'

function Search({filters,submitAction}) {
    const [filter, setFilter] = useState({
        name: "",
        value: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilter({ ...filter, [name]: value })
    }

    return (

        <form className='p-5'>
            <div className="flex items-center w-full">
                <input
                    type="search"
                    className="p-2.5 w-full text-md rounded-l-lg border bg-gray-700 border-l-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
                    placeholder="Escriba aqui"
                    name="value"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="p-2.5 text-sm font-medium text-white rounded-r-lg border border-tertiary bg-primary focus:ring-4 focus:outline-none focus:ring-tertiary  hover:bg-tertiary focus:ring-tertiary"
                    onClick={(event)=>{
                        event.preventDefault()
                        submitAction(filter)
                    }}
                >
                    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>

            <select
                name="name"
                className="text-sm mt-2 text-white rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 text-white focus:ring-gray-500 focus:border-gray-500"
                onChange={handleChange}
            >
                <option defaultValue value="">Seleccione un Filtro</option>
                {filters.map((filter,index)=>
                    <option key={index} value={filter.value}>{filter.name}</option>
                )}
            </select>
        </form>

    )
}

export default Search