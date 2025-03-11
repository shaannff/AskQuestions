import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearuser, setUser } from '../redux/slice'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {

    const {isAuthenticated}=useSelector((state)=>state.user)

    const [showmodal,setShowModel]= useState(false)
    const [showSingUp,setshowSingUp]= useState(false)
    const [name,setname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')
    const [user,setUsers]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const API_URL ='http://localhost:7000/api/user'
    useEffect(()=>{
        if(!user){
            navigate('/')
        }
        setUser(isAuthenticated)
    },[])
    
    const login=async(email,password)=>{
            try {
                const response =await fetch(`${API_URL}/login`,{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({email,password})
                })

                const data = await response.json()

                if(!response.ok){
                    setErr(data.message)
                }else{
                    dispatch(setUser({
                        token : data.token,
                        email : data.email,
                        name : data.name||'User'
                    }))
                    localStorage.setItem('token',data.token)
                    console.log(data.message)
                    setEmail('')
                    setPassword('')
                    setUsers(true)
                    setShowModel(false)
                    navigate('/')

                }

               
            } catch (error) {
                console.log(error , 'from the add user')
            }
    }



    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      };
    
    

    const handlelogin=async(e)=>{
        e.preventDefault()
        if(!validateEmail(email)){
            setErr(' enter a valid email')
            return
        }
        if(!password){
            setErr('enter a valid password')
            return
        }


        setErr('')
        login(email,password)
        

    }

    const singUp = async(name,email,password)=>{
            try {
                const response = await fetch(`${API_URL}/signUp`,{
                    method:'POST',
                    headers:{'Content-Type':'application/json',},
                    body:JSON.stringify({name,email,password})
                })
                const data = await response.json()
                if(response.ok){
                    dispatch(setUser({
                        token : data.token,
                        email : data.email,
                        name : data.name||'User'
                    }))
                    localStorage.setItem('token',data.token)
                    setErr('')
                    setshowSingUp(false)
                    setUsers(true)
                    navigate('/')

                }else{
                    setErr(data.message)

                }


            } catch (error) {
                console.log(error,'from the signUp')
            }
    }

    const handleSingUp=async(e)=>{
        e.preventDefault()
        if(!name.trim()){
            setErr(' enter a proper name')
            return
        }
        if(!validateEmail(email)){
            setErr(' enter a valid email')
            return
        }
        if(!password){
            setErr('enter a valid password')
            return
        }

        setErr('')
        singUp(name,email,password)

    }

    const logout=async()=>{
        try {

            const response = await fetch(`${API_URL}/logout`)
            localStorage.removeItem('token')
            dispatch(clearuser())
            navigate('/')
            
        } catch (error) {
            console.log(error,'from the logout ')
        }
    }

    const setdelete=async(req,res)=>{

        try {
            
            const response =await fetch(`${API_URL}/deleteall`,{
                method:'DELETE'
            })
            const data = await response.json();
    
            if(response.ok){
                console.log(data,'oo')
            }else{
                console.log(data.message,'ii')
            }
        } catch (error) {
            console.log(error,'error from thr')
        }

    }

  return (
    <>
    
    <nav className=' w-full h-[9%]  flex items-center justify-between p-4 bg-gray-600 '>
        
        <div className='flex items-center ml-8'>

            <span className='text-xl '>😊</span>
            <span className='text-white ml-4 font-bold text-lg'>todo App</span>

        </div>
        {!isAuthenticated ? (
            <div>

       <button className='bg-blue-500 hover:bg-blue-600 mr-10 text-white px-4 py-2 rounded-lg' onClick={()=>setShowModel(true)}>
        sign in
       </button>
        <button className='bg-blue-500 hover:bg-blue-600 mr-10 text-white px-4 py-2 rounded-lg' onClick={()=>setshowSingUp(true)}>
        sign up
       </button>
       
            </div>
        ):(
            <div>
                <Link to='/questions'>
            <span className='text-l font-bold underline mr-8'>Questions</span>
                </Link>

            <Link to='/'>
            <span className='text-l font-bold underline mr-8'>Home</span>
            </Link>
            <Link to='/profile'>
           <span className='text-xl mr-8' >👤</span>
            </Link>
            <span className='text-l font-bold underline mr-8' onClick={()=>logout()}>Logout</span>

            </div>
        )}

        
    </nav>
    {showmodal&& (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='relative bg-white p-6 rounded-md w-96'>
                <button className='absolute top-2 right-2 pr-4 text-gray-400 hover:text-gray-600 ' onClick={()=>setShowModel(false)}>x</button>
                <h2 className='font-bold text-xl mb-6 place-self-center'>login</h2>
                <form action="" onSubmit={handlelogin}>
                <input type="text" placeholder='email'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setEmail(e.target.value)} />
                <input type="text" placeholder='password'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setPassword(e.target.value)}/>
                {err && <p className='text-red-500 text-sm place-self-center mb-1'>{err}</p>}
            <div className='flex flex-row space-x-4'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-[40%] ml-3 ' type='submit'>login</button>
                <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 absolute end-8'> Google Auth</button>
            </div>
                </form>
            </div>
        </div>
    )}

    {showSingUp && (
         <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
         <div className='relative bg-white p-6 rounded-md w-96'>
             <button className='absolute top-2 right-2 pr-4 text-gray-400 hover:text-gray-600 ' onClick={()=>setshowSingUp(false)}>x</button>
             <h2 className='font-bold text-xl mb-6 place-self-center'>Sign Up</h2>
             <form action="" onSubmit={handleSingUp}>
             <input type="text" placeholder='name'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setname(e.target.value)} />
             <input type="text" placeholder='email'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setEmail(e.target.value)} />
             <input type="text" placeholder='password'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setPassword(e.target.value)}/>
             {err && <p className='text-red-500 text-sm place-self-center mb-1'>{err}</p>}
         <div className='flex flex-row space-x-4'>
             <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-[40%] ml-3 ' type='submit'>Sign Up</button>
             <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 absolute end-8'> Google Auth</button>
         </div>
             </form>
         </div>
     </div>
    )}
      </>

  )
}

export default Navbar