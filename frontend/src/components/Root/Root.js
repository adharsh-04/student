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
          backgroundImage:"url('https://i.pinimg.com/originals/69/e3/3d/69e33dbe9efa230e17472c04b924a104.jpg')",
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