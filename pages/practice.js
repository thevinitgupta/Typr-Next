import { getCurrentUser } from '@/utilities/appwrite/user';
import React, { useState, useEffect, useRef } from 'react'
import { Inter, Josefin_Sans, Montserrat, Space_Mono } from 'next/font/google'
import { fetchTyprData } from '@/utilities/textData/text';
import { getRandomEndpoint } from '@/utilities/textData/random';
import { getScore } from '@/utilities/textData/score';
import { createSubmission, getUserSubmissions } from '@/utilities/appwrite/submissions';

const inter = Inter({ subsets: ['latin'] })
const mont = Montserrat({ subsets: ['latin'] })
const jose = Josefin_Sans({ subsets: ['latin'] });
const mono = Space_Mono({ subsets: ["latin"], weight: ['400'] })

const Profile = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);
    const [original, setOriginal] = useState("");
    const [typing, setTyping] = useState("");
    const [typed, setTyped] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [errorsCount, setErrorsCount] = useState(null);
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(0);
    let timerId = null;
    const inputRef = useRef();

    const checkUser = async () => {
        const { status, message, data } = await getCurrentUser();
            if (status === 200) {
                console.log(data)
                setAuthenticated(true);
                return;
            }
            else {
                setAuthenticated(false)
            }
      }

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
        const { status, message, data, error } = await fetchTyprData({...endpoint});
        // fetchLocal(); 
        // getRandomEndpoint();
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

    const disableSpacebarAsButton = (event) => {
        const spaceKeyCode = 32;

        if (event.keyCode === spaceKeyCode && document.activeElement.tagName === 'BUTTON') {
            event.preventDefault();
        }
    };

    const submitResult = async () => {
        const { subScore, errors } = getScore(original, typed, timer);
        setErrorsCount(errors);
        setScore(subScore);
        const submission = {
            score : subScore,
            errorsCount : errors,
            total : original.length
        }
        if(authenticated) 
        {
            const {status, message, data, error} = await createSubmission(submission);

        if(status===201){
            setTimer(0);
            setScore(null);
            setErrorsCount(null);
            getUserSubmissions();
        }
        else {
            alert(message);
        }
        }
        else {
            alert("Create account to submit!!")
        }
    }

    const startTimer = () => {
        timerId = setInterval(() => {
            setTimer((prevValue) => prevValue + 1)
        }, 1000)
    }

    const handleButton = (e) => {
        if (!typing) {
            setTyping(true);
            inputRef?.current.focus()
            startTimer();
        }
        else {
            setTyping(false);
            submitResult();
            clearInterval(timerId);
            // window.location = "/profile";
        }
    }


    useEffect(() => {
        checkUser();
        fetchData();
        setTimeout(() => {
            setLoading(false);
        }, [1500])
        document.addEventListener('keydown', disableSpacebarAsButton);

        return () => {
            document.removeEventListener('keydown', disableSpacebarAsButton);
        };
    }, []);
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between px-16 py-10 ${inter.className}`}
        >
            <header className={`w-full h-1/6 mb-4 flex justify-center items-center gap-16 text-white/70`}>
                <div className={`h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={() => {
                    window.location = "/profile"
                }} >Profile</div>
                <div className={`h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={() => {
                    window.location = "/"
                }} >Home</div>
                <div className={`h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={() => {
                    window.open("https://github.com/thevinitgupta/", "_blank");
                }}  >Code</div>
            </header>
            <section className={`flex-1 w-full flex flex-col justify-center gap-4`}>
            <input ref={inputRef} onFocus={()=> {
                                        console.log("input focused")
                                    }} value={typed} onChange={(e) => {
                                        console.log("Input Changed")
                                        setTyped(e.target.value);
                                    }} className='w-0 h-0 absolute' />
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
                            </>
                }
                {
                    (score!==null && errorsCount!=null) &&
                    <div className={`w-full text-xl my-10 flex justify-center items-center py-2 gap-3`}>
                        <div className={`flex-[0.4] text-center ${mono.className}`}>
                            <span className={`text-green-500 mx-2 ${jose.className}`}>
                                Score :
                            </span>
                            {score}
                        </div>
                        <div className={`flex-[0.4] text-center ${mono.className}`}>
                            <span className={`text-red-500 mx-2 ${jose.className}`}>
                                Errors :
                            </span>
                            {errorsCount}
                        </div>
                    </div>
                }
            </section>
        </main>
    )
}

export default Profile