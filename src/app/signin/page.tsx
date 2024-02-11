"use client"
import { SignIn } from '@clerk/nextjs'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';


function page() {
  const {user}  = useUser();
  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <SignIn/>
    </div>
  )
}

export default page;