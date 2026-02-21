import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmithandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            con
            res.json({
                success:false,
                message:error.message
            })
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Admin Panel
                </h1>

                <form className="space-y-6" onSubmit={onSubmithandler}>

                    {/* Email */}
                    <div className="space-y-1">

                        <p className="text-sm font-medium text-gray-700">
                            Email Address
                        </p>

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            placeholder="your@email.com"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                     text-gray-800 placeholder-gray-400
                     focus:border-gray-900 focus:outline-none transition"
                        />

                    </div>

                    {/* Password */}
                    <div className="space-y-1">

                        <p className="text-sm font-medium text-gray-700">
                            Password
                        </p>

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                     text-gray-800 placeholder-gray-400
                     focus:border-gray-900 focus:outline-none transition"
                        />

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition active:scale-95">
                        Login
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Login
