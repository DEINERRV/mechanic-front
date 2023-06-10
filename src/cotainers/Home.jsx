import React from 'react'
import { MenuItem } from '../components'
import { options } from '../constants'


function Home() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='flex flex-col gap-5'>
        {options.map(({ name, link, icon }, index) =>
          <MenuItem key={index} title={name} icon={icon} link={link}/>
        )}
      </div>
    </div>

  )
}

export default Home