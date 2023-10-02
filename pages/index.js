import Image from 'next/image'
import { Inter, Josefin_Sans, Montserrat } from 'next/font/google'
import { getCurrentUser } from '@/utilities/appwrite/user';
import { useEffect, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })
const mont = Montserrat({subsets : ['latin']})
const jose = Josefin_Sans({subsets : ['latin']})

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const checkUser = async () => {
    const { status, message, data } = await getCurrentUser();
        if (status === 200) {
            setAuthenticated(true);
            return;
        }
        else {
            setAuthenticated(false)
        }
  }

  useEffect(()=> {
    checkUser();
  })
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between px-16 py-10 ${inter.className}`}
    >
      <nav className={`w-full h-1/6 mb-4 flex justify-center items-center gap-4 text-white/70`}>
        <div className={`w-1/12 h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={()=> {
          window.location = "/practice"
        }} >Practice</div>
        <div className={`w-1/12 h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={()=> {
          window.location = authenticated ? "/profile" : "/auth"
        }} >{authenticated ? "Profile" : "Login"}</div>
        <div className={`w-1/12 h-full text-lg font-light cursor-pointer hover:text-white/90 hover:scale-110 transition-all ${mont.className}`} onClick={()=> {
          window.open("https://github.com/thevinitgupta/", "_blank");
        }} >Code</div>
      </nav>

      <section className={`flex-1 w-full flex flex-col justify-center gap-4`}>
        <h1 className={`text-5xl sm:text-7xl font-bold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 leading-relaxed ${jose.className}`}>Typr</h1>
        <h2 className={`w-full max-w-[620px] text-3xl sm:text-4xl md:text-5xl mx-auto font-semibold text-center mt-4 text-transparent bg-clip-text bg-gradient-to-tl from-slate-700 to-zinc-300 leading-relaxed  ${jose.className}`}>Typing Practice for the Next Generation</h2>
        <div className={`w-full flex items-center justify-center object-contain`}>
        <Image src="/hands.png" height={400} width={760} className={`floating`}/>
        </div>
      </section>
    </main>
  )
}
