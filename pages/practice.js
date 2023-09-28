import { getCurrentUser } from '@/utilities/appwrite/user';
import React, { useState, useEffect, useRef } from 'react'
import { Inter, Josefin_Sans, Montserrat, Space_Mono } from 'next/font/google'
import { fetchTyprData } from '@/utilities/textData/text';
import { getRandomEndpoint } from '@/utilities/textData/random';

const inter = Inter({ subsets: ['latin'] })
const mont = Montserrat({ subsets: ['latin'] })
const jose = Josefin_Sans({ subsets: ['latin'] });
const mono = Space_Mono({ subsets: ["latin"], weight: ['400'] })

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [original, setOriginal] = useState("");
    const [typing, setTyping] = useState("");
    const [typed, setTyped] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const inputRef = useRef();

    const fetchLocal = () => {
        let str = "";
        setTimeout(() => {

        }, [1000]);
        return {
            status: 200,
            message: "",
            data: "The art of storytelling is reaching its end because the epic side of truth, wisdom, is dying out. The art of storytelling is reaching its end because the epic side of truth, wisdom, is dying out. ",
            error: null
        };
    }

    const fetchData = async () => {
        const endpoint = await getRandomEndpoint();
        console.log(endpoint)
        const { status, message, data, error } = await fetchLocal(); // getRandomEndpoint();
        // fetchTyprData({...endpoint});
        if (status === 200) {
            setOriginal(data);
            return;
        }
        else {
            setIsError(true);
            setError(message);
        }
    }

    const handleButton = (e) => {
        if(!typing) {
            setTyping(true);
        }
        else {
            setTyping(false);
            window.location = "/profile";
        }
    } 


    useEffect(() => {
        fetchData();
        setTimeout(() => {
            setLoading(false);
        }, [1500])
    }, []);
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
                        <h1 className={`text-5xl sm:text-4xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-zinc-300   leading-relaxed ${jose.className}`}>Start Typing when data loads</h1>
                        :
                        isError ?
                            <>
                                <h1 className={`text-5xl sm:text-7xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-zinc-300   leading-relaxed ${jose.className}`}>Oops!</h1>
                                <h2 className={`w-full max-w-[620px] text-3xl sm:text-4xl md:text-5xl mx-auto font-semibold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-tl from-red-400 to-amber-400 leading-relaxed  ${jose.className}`}> {error}</h2>
                            </> :
                            <>
                                <h1 className={`text-3xl sm:text-4xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 leading-relaxed ${jose.className}`}>Let's start typing</h1>
                                <div className={`w-full max-w-[840px] text-2xl mx-auto font-normal tracking-wide text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-zinc-200  leading-relaxed  ${mono.className}`}>
                                    {original}
                                </div>
                                <button type='button' onClick={handleButton} className={`w-full max-w-[320px] mx-auto mt-10 bg-gradient-to-tl from-slate-700 to-zinc-300 text-black rounded-lg px-10 py-3 text-xl ${jose.className}`}>
                                    {
                                        typing ? "Submit" : "Start"
                                    }
                                </button>
                                {
                                    typing && 
                                    <input ref={inputRef} value={typed} onChange={(e)=> {
                                        setTyped(e.target.value);
                                    }}  className='hidden' />
                                }
                            </>
                }
            </section>
        </main>
    )
}

export default Profile