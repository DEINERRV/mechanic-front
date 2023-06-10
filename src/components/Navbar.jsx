import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Retrocede una página en el historial de navegación
  }

  return (
    <nav className="bg-primary border-gray-200">
      <div className="max-w-screen-xl flex items-center gap-5 mx-auto p-4">
        <BsFillArrowLeftCircleFill className="text-3xl" onClick={goBack}/>

        <Link to='/' className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mechanic Masters</span>
        </Link>
      </div>
    </nav>

  )
}

export default Navbar