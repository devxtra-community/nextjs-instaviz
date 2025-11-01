import React from 'react'

export default function page() {
  return (
    <div className='bg-dot-fade h-screen'>


      <div className='flex justify-center '>
        <nav className='flex justify-center gap-8 items-center list-none font-light text-lg mt-9 rounded-full w-1/3 border bg-white'>
          <img src="/logo.png" className='w-auto h-25' alt="" />
          <li>Home</li>
          <li>Pricing</li>
          <li className='bg-[#AD49E1] p-2 rounded-2xl text-white'>Siginup</li>
        </nav>
      </div>


      <div className='flex justify-center flex-col items-center w-full py-8'>
        <div className='w-1/3 flex flex-col items-center'>
          <h1 className='text-5xl   text-center leading-14'>
            Your <span className='text-[#AD49E1]'>Data</span>, Instantly Made <span className='text-[#AD49E1]'>Clear</span>
          </h1>
          <h3 className='py-2 text-center'>
            Data made simple. Upload, explore, visualize—fast and AI-powered insights
          </h3>
          <button className='bg-[#AD49E1] text-white px-9 text-lg py-5  rounded-xl mt-6'>Get Started</button>
        </div>
      </div>


      <div>
        <div className='transform rotate-x-[50deg]  rotate-y-[2deg] absolute top-80 left-14' >
          <img
            src="/pie-chart.png"
            className="w-60 rounded-3xl bg-white rotate-38 shadow-2xl  p-9 "
            alt=""
          />

        </div>

        <div className='transform rotate-x-[50deg]  rotate-y-[2deg] absolute top-115 left-87' >
          <img
            src="/statistics.png"
            className="w-60 rounded-3xl bg-white rotate-38 shadow-2xl  p-9 "
            alt=""
          />

        </div>

        <div className='transform rotate-x-[50deg]  rotate-y-[2deg] absolute top-118 right-90' >
          <img
            src="/ai.png"
            className="w-60 rounded-3xl bg-white rotate-38 shadow-2xl  p-9 "
            alt=""
          />

        </div>

        <div className='transform rotate-x-[50deg]  rotate-y-[2deg] absolute top-80 right-14' >
          <img
            src="/statistical-chart.png"
            className="w-60 rounded-3xl bg-white rotate-38 shadow-2xl  p-9 "
            alt=""
          />

        </div>

      </div>

      {/* <div className="flex gap-8">
          <div className="w-28 h-28 bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] 
                flex justify-center items-center 
                transform rotate-x-[20deg] rotate-y-[-20deg] 
                transition-transform duration-300 hover:rotate-x-0 hover:rotate-y-0 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]">
            <img src="pie-chart.png" className="w-10 h-10" alt="" />
          </div>
        </div> */}


    </div>

  )
}
