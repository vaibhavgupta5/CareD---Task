'use client'
import { useUser } from '@/store/zustStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {

  const router = useRouter()
const {email} = useUser()
  useEffect(() => {
    if (email){
      router.push("/dashboard")
    }
    else{
      router.push("/login")
    }
  }, [email, router])
  

  return (
    <div className='w-full h-[100vh] text-2xl text-white font-bold bg-[#007EFF] flex justify-center items-center '>Health Tracker</div>
  )
}

export default Page