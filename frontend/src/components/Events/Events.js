import React from 'react'
import Addevents from '../addEvents/Addevents'
import Viewevents from '../Viewevents/Viewevents'
import {Link} from 'react-dom'

function Events() {
  return (
    <div>Events
        <ul>
            <li><Link><Addevents/></Link></li>
            <li><Link><Viewevents/></Link></li>
        </ul>
    </div>
  )
}

export default Events