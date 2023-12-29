import React from 'react'
import { useAuth } from '../utils/firebase'

export default function Profile() {
    const user = useAuth();

  return (
    <div>
        {user && <img src={user.photoURL} alt= "hello" style={{width:'500px'}}/>}
    </div>
  )
}