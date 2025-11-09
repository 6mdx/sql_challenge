import Image from "next/image";
export default function score(){

  const challenges = [
    { title: 'Easy', score: 5, points: 5 },
    { title: 'Medium', score: 5, points: 3 },
    { title: 'Hard', score: 5, points: 1  },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center jusify-center px-4">
      <div className="flex flex-col items-center"></div>
      <h1 className="text-3xl font-bold mb-30 text-center mt-20"> The result of the programmers's Scores!</h1>

      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md mb-10 text-center p-6">
        <h2 className="text-lg font-semibold mb-20" > Total Score</h2>
       <p className="text-gray-700 text-lg"></p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-7 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
           <p className="text-gray-700">
              Score: <span className="font-bold">{challenge.score}</span><br></br>
               Points: <span className="font-bold">{challenge.points}</span>
            </p>
          </div>
        ))}
    </div>
  <div className="flex justify-center gap-6 mt-12">
 <a 
  href="https://www.tiktok.com/@oraclenextgen?_r=1&_t=ZS-912roRB2Qp5" 
  target="_blank" 
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
<p className="text-center text-gray-600 mt-6 text-sm">

  Share your score with us on our social media platforms
</p>
</div>
  );
}