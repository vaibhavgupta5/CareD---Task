'use client'
import { useUser } from '@/store/zustStore'
import React from 'react'

function Dashboard() {
    const {email} = useUser()
  return (
    <div>{email}</div>
  )
}

export default Dashboard