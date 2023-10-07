"use client"
import { Card } from '@/components/ui/card'
import React from 'react'
import { Input } from "@material-tailwind/react";

const Profile = ({ params }: { params: { id: string } }) => {
const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <main className="min-h-full">
        <Card className='bg-black-100 border-none text-white min-h-full row-span-4'>
            <div className='px-8 md:flex-between text-2xl font-bold'>Personal Info</div>
            <div className='px-8 md:flex-between text-sm'>Here you can update your personal information.</div>
            <br></br>
            <div className='px-8 md:flex-between'>
                <div className='min-w-[20%] md:min-w-[45%]'>
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6">
                        First Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm w-full">
                        <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="First Name"
                        />
                    </div>
                </div>
                <div className='min-w-[45%]'>
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6">
                        Last Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Last Name"
                        />
                    </div>
                </div>
            </div>
            <hr className='m-7 border-primary'></hr>
            <div className='p-5 md:px-8 text-2xl font-bold'>Credentials</div>
            <div className='px-8 md:flex-between'>
                <div className='md:w-screen'>
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6">
                        E-mail address
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm w-full">
                        <input
                        type="text"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Last Name"
                        />
                    </div>
                </div>
            </div>
            <br></br>
            <div className="px-8 md:flex-between">
                <div className='min-w-[45%]'>
                    <label htmlFor="Password" className="block text-sm font-medium leading-6">
                        Password
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                        type="text"
                        name="Password"
                        id="Password"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Last Name"
                        />
                    </div>
                </div>
                <div className='min-w-[45%]'>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6">
                        Confirm Password
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                        type="text"
                        name="email"
                        id="confirmPassword"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="confirmPassword"
                        />
                        </div>
                </div>
            </div>
        </Card>
    </main>
  )
}

export default Profile