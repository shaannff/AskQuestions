import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const {email , name , isAuthenticated }=useSelector((state)=>state.user)

  if(!isAuthenticated){
    return <p className='place-self-center'>Please log in to see your profile.</p>
  }
  return (
<>

<div className='max-w-sm mx-auto mt-20 bg-gray-400 rounded-lg '>
        <h2 className='place-self-center text-lg font-semibold'>Profile</h2>

        <div className='w-20 h-20 rounded-full bg-gray-700 place-self-center mt-6'>
            <h5 className='text-xl place-self-center py-8'>👤</h5>
        </div>
        <h2 className='place-self-center text-lg font-semibold'>{name}</h2>
        <h2 className='place-self-center text-lg font-semibold'>{email}</h2>



</div>
</>  
)
}

export default Profile