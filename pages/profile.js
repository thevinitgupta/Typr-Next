import { getCurrentUser } from '@/utilities/appwrite/user';
import React, { useState, useEffect } from 'react'
import { Inter, Josefin_Sans, Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mont = Montserrat({ subsets: ['latin'] })
const jose = Josefin_Sans({ subsets: ['latin'] });

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const fetchUserData = async () => {
        const {status, message, data} = await getCurrentUser();
        if(status===201) {
            setUserEmail(data.email);
            setUserName(data.name);
            return;
        }
        else {
            setIsError(true);
            setError(message);
        }
    }

useEffect(()=>{
    fetchUserData();
    setTimeout(()=>{
        setLoading(false);
    },[1500])
},[]);
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
            <section className={`flex-1 w-full flex flex-col justify-center gap-4`}>
                {
                    loading ? 
                    <h1 className={`text-5xl sm:text-4xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-zinc-300   leading-relaxed ${jose.className}`}>Loading your profile</h1>
                    :
                 isError ? 
            <>
             <h1 className={`text-5xl sm:text-7xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-zinc-300   leading-relaxed ${jose.className}`}>Oops!</h1>
             <h2 className={`w-full max-w-[620px] text-3xl sm:text-4xl md:text-5xl mx-auto font-semibold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-tl from-red-400 to-amber-400 leading-relaxed  ${jose.className}`}> {error}</h2>
            </> : 
            <>
            <h1 className={`text-5xl sm:text-7xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 leading-relaxed ${jose.className}`}>Hi, {userName}</h1>
        <h2 className={`w-full max-w-[620px] text-3xl sm:text-4xl md:text-5xl mx-auto font-semibold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-tl from-slate-700 to-zinc-300 leading-relaxed  ${jose.className}`}>Your email : {userEmail}</h2>
        <div className={`w-full flex items-center justify-center object-contain`}>
        </div></>
        }
      </section>
        </main>
  )
}

export default Profile