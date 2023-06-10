import React from 'react'
import { MenuItem } from '../../components'
import { serviceOptions } from '../../constants'

function Menu() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-4xl'>Mechanic Masters</h1>
      <p className='text-xl'>Menu de Servicios</p>

      <div className='flex flex-col gap-5 mt-10'>
        {serviceOptions.map(({ name, link, icon }, index) =>
          <MenuItem key={index} title={name} icon={icon} link={link}/>
        )}
      </div>
    </div>
  )
}

export default Menu