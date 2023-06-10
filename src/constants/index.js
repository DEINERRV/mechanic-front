export const url = "https://mechanic-api-drv.up.railway.app/api/v1"

//Menu Options
import { AiFillCar, AiFillTool } from 'react-icons/ai'
import { BsFillPersonLinesFill, BsFillPersonPlusFill } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa' 
import { MdHomeRepairService, MdOutlineAddCircle } from 'react-icons/md'
export const options = [
    {
        name:"Clientes",
        link:"/users",
        icon: BsFillPersonLinesFill
    },
    {
        name:"Vehiculos",
        link:"/vehicles",
        icon: AiFillCar
    },
    {
        name:"Servicios",
        link:"/services",
        icon: AiFillTool
    },
]

export const userOptions = [
    {
        name:"Agregar",
        link:"/users/add",
        icon: BsFillPersonPlusFill
    },
    {
        name:"Buscar",
        link:"/users/search",
        icon: FaSearch
    },
]

export const vehicleOptions = [
    {
        name:"Agregar",
        link:"/vehicles/add",
        icon: AiFillCar
    },
    {
        name:"Buscar",
        link:"/vehicles/search",
        icon: FaSearch
    },
]

export const repairOptions = [
    {
        name:"Agregar",
        link:"/repairs/add",
        icon: MdHomeRepairService
    },
    {
        name:"Buscar",
        link:"/repairs/search",
        icon: FaSearch
    },
]

export const serviceOptions = [
    {
        name:"Agregar",
        link:"/services/add",
        icon: MdOutlineAddCircle
    },
    {
        name:"Buscar",
        link:"/services/search",
        icon: FaSearch
    },
]

