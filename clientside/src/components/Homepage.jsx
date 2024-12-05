import React, { useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const HomePage=({setUser})=>{
    const navigate=useNavigate()
    const getUser=async () => {
        const token=localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
        else{
            try {
                const res=await axios.get('http://localhost:3005/api/getuser', {headers: {'Authorization': `Bearer ${token}`}})
                console.log(res);
                
                if (res.status==200) {
                    setUser(res.data.name)
                }
                else{
                    navigate('/login')
                }
            } catch (error) {
                console.log(error)
                location.reload()
                navigate('/login')
            }
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    return(
        <>
        <div><h1>HomePage</h1></div>
        </>
    )
}

export default HomePage