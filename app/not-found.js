import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const notfound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center text-center">
    <div className="space-y-4">
      <h1 className="gradient-text text-7xl">404</h1>
      <h5 className="text-5xl font-semibold">NOT FOUND</h5>
      <p className="text-gray-500">Sorry, this page does not exist.</p>
      <Link href={'/'}><Button variant="outline" className={'bg-white text-black hover:bg-gray-300'}>Go Home</Button></Link>
    </div>
  </div>
  
  )
}

export default notfound