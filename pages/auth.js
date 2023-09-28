import React, { useState } from 'react'
import Image from 'next/image'
import { Inter, Josefin_Sans, Montserrat } from 'next/font/google'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { createSession, createUser } from '@/utilities/appwrite/user'

const inter = Inter({ subsets: ['latin'] })
const mont = Montserrat({ subsets: ['latin'] })
const jose = Josefin_Sans({ subsets: ['latin'] })

const Auth = () => {
    const [tab, setTab] = useState("signup");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        if (e.target.name === "name") {
            setName(e.target.value)
        }
    }
    const toggleVisible = () => {
        setVisible((prevValue) => !visible);
    }
    const toggleTab = () => {
        if (tab === "login") setTab("signup");
        else setTab("login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (tab === "login") {
            // TODO: Call Login Function

            const {status, message, data, error} = await createSession({
                email : email,
                password : password
            })
            if(status===201){
                return window.location = "/profile";
            }
            else {
                alert(message);
            }
        }
        if (tab === "signup") {
            const {status, message, data, error} = await createUser({
                email : email,
                password : password,
                name : name
            });
            if(status===201){
                setTab("login");
            }
            else {
                alert(message);
            }
        }
    }
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between px-16 py-10 ${inter.className}`}
        >
            <header className={`w-full h-1/6 mb-4 flex justify-center items-center gap-16 text-white/70`}>
                <div className={`h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={() => {
                    window.location = "/practice"
                }} >Practice</div>
                <div className={`h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={() => {
                    window.location = "/"
                }} >Home</div>
                <div className={`h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={() => {
                    window.open("https://github.com/thevinitgupta/", "_blank");
                }}  >Code</div>
            </header>
            <section className={`flex-1 w-full flex flex-col justify-center items-center gap-4 mt-10`}>
                <h2 className={`w-2/5 text-5xl mx-auto font-semibold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-tl from-slate-700 to-zinc-300 leading-relaxed  ${jose.className}`}>{tab == "login" ? "Welcome, back" : "Join Us"}</h2>
                <form className={`w-4/5 max-w-[450px] flex flex-col items-center justify-center gap-6`}>
                    <input type='email' onChange={handleChange} name="email" placeholder='john@doe.com' value={email} className={`w-full bg-slate-800 text-white/80 rounded-md ${mont.className} p-4  outline-none`} />
                    <div className='w-full flex items-center justify-center bg-slate-800 text-white/80 rounded-md ${mont.className} p-4'>
                        <input type={visible ? "text" : "password"} onChange={handleChange} name="password" placeholder='enter your password' value={password} className={`h-full flex-1 bg-slate-800 text-white/80 outline-none`} />
                        {
                            visible ?
                                <AiOutlineEyeInvisible className='text-teal-500 text-xl cursor-pointer' onClick={toggleVisible} />
                                :
                                <AiOutlineEye className='text-teal-500 text-xl cursor-pointer' onClick={toggleVisible} />
                        }
                    </div>
                    {
                        tab !== "login" &&
                            <input type='text' onChange={handleChange} name="name" placeholder='John Doe' value={name} className={`w-full bg-slate-800 text-white/80 rounded-md ${mont.className} p-4 outline-none`} />
                    }
                    <button type='button' onClick={handleSubmit} className={`bg-gradient-to-tl from-slate-700 to-zinc-300 text-black rounded-lg px-10 py-3 text-xl ${jose.className}`}>
                        {
                            tab === "login" ? "Login" : "Signup"
                        }
                    </button>
                </form>
                {
                    tab === "login" ?
                        <div className={`w-full text-center p-4 mt-2 text-slate-400`}>
                            New Here? <span onClick={toggleTab} className='text-teal-500 cursor-pointer'>Signup</span>
                        </div> :
                        <div className={`w-full text-center p-4 mt-2 text-slate-400`}>
                            Already Registered? <span onClick={toggleTab} className='text-teal-500 cursor-pointer'>Login</span>
                        </div>
                }
            </section>
        </main>
    )
}

export default Auth