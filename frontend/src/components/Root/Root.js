import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {Outlet} from 'react-router-dom'

function Root() {
  return (
    <div>
        <Header/>
        <div style={{
          minHeight:"100vh",
          backgroundImage:"url('')",
          backgroundSize:"cover",
          backgroundPosition:"center",
          backgroundRepeat:"No-repeat"

        }} className=" bg-light">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Root