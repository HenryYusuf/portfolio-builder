import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Homepage() {
  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-green-500 font-bold'>
        Check
      </h1>

      <Button className='w-max'>Shadcn Button</Button>

      <Input placeholder='Shadcn Input' className='w-max' />
    </div>
  )
}

export default Homepage