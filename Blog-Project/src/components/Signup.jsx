import React, { useState } from 'react'
import authService from '../appWrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Logo, Input } from "./index"

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createaccount(data)
            if (userData) {
                const userData = await authService.getCurrentuser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to create Account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link className='font-medium text-primary transition-all duration-200 hover:underline' to="/login">
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <input type="" label='Name:' placeholder='Enter your FullName'{...register("name", {
                            required: true,
                        })} />
                        <input label="Email:" placeholder='Enter your email' type='email' {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })} />
                        <input type="password" label="Password" placeholder='Enter Your Password'{...register("passworf",{
                            required: true
                        })} />
                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup