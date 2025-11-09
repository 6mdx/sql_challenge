
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  return ( 
  
    <div className="min-h-screen bg-300 flex flex-col items-center pt-20 relative">
    <div className="absolute top-5 right-5 flex space-x-4">

  <a href="https://www.tiktok.com/@oraclenextgen?_r=1&_t=ZS-912roRB2Qp5" 
  target="blank" 
  rel="noopener noreferrer">
    <Image src="/icons/tiktok.png" 
    alt="TikTok" 
    width={30}
     height={30}
      className="mx-auto rounded-full shadow-lg hover:scale-105 transition duration-300"
     />
  </a>
  <a href="https://x.com/oraclenextgen?s=21&t=xu2a7R6hMiVraD0ANevKfA" 
  target="_blank" 
  rel="noopener noreferrer">
    <Image src="/icons/x.png" 
    alt="X"
     width={30} 
    height={40} 
     className="mx-auto rounded-full shadow-lg hover:scale-105 transition duration-300"
    />
  </a>
  <a href="https://www.linkedin.com/company/oracle-nextgen-club/" 
  target="_blank"
   rel="noopener noreferrer">
    <Image src="/icons/in.png" 
    alt="LinkedIn"
     width={30} 
     height={30}
      className="mx-auto rounded-full shadow-lg hover:scale-105 transition duration-300"
     />
  </a>
  <a href="https://t.me/OracleNextGenTu"
   target="_blank" 
   rel="noopener noreferrer">
    <Image src="/icons/telegram.png"
     alt="Telegram" 
     width={30}
      height={30}
      className="mx-auto rounded-full shadow-lg hover:scale-105 transition duration-300"
       />
  </a>
</div>

<div className="absolute top-5 left-5">
<Image
src="/icons/oracleNextGen-new (2).svg"
alt="logo"
width={80}
height={80}
className="w-18 h-18 mx-auto rounded-full shadow-lg hover:scale-105 transition duration-300"
/>
      </div>
<h4 className="text-sm uppercase mb-8">
 WELCOME PROGRAMMER!
</h4>
        <h1 className="text-4xl font-extrabold mb-3 text-center">
          LAUNCH AND RUN YOUR<br />CHALLENGES WITH ORACLE 
        </h1>

        <h4 className="text-sm text-center uppercase mb-7">
        Master the art of SQL through real-world challenges that test your logic speed and problem-solving<br></br> skills
        Turn every query into a victory
      </h4>

      <Button>
          Start The Challenges NOW!!
        </Button>

<div className="flex flex-col items-center my-8">
<Image src="/icons/sql ch.jpeg"
alt="sql"
width={700}
height={500}
className="rounded-lg shadow-lg object-cover hover:scale-105"/>
<br></br>

<div className="w-full text-center py-90">
<p className=" mt-4 inline-block px-2 py-1 rounded-sm border text-xs ">
          BUILD BY LENA AND ABDULLRAHMAN
        </p>
    </div>
  </div>
  </div>
    );
}

