"use client"
import { SignIn } from '@clerk/nextjs'
import React, { useState } from 'react'
import { api } from '~/trpc/react';


function page() {
  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <SignIn/>
    </div>
  )
}

export default page;