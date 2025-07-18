import React, { Suspense } from 'react'
import {BarLoader} from "react-spinners"

const Layout = ({children}) => {
  return (<>
    <div className=' my-6 mx-10 '>
       
  
    <h1 className='gradient-text text-5xl font-bold'>Industry Insight</h1>
    {/* display fallback until children load */}
    <Suspense fallback={<BarLoader className="mt-4 color:gray width:{'100%'}"/>}>{children}</Suspense>
      </div>
    </>
  )
}

export default Layout