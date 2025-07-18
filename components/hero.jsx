import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
      <div className="w-full bg-gradient-to-b from-black-900 via-slate-800 to-indigo-950 pt-24 pb-16 text-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-4">
        
        <h1 className="text-4xl gradient-text md:text-5xl font-bold mb-6 leading-tight drop-shadow-md">
          Let AI uncover your strengths <br className="hidden md:block" />
          and match you with the right path
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
          Personalized career guidance using intelligent skill mapping, real-time analytics, and curated learning paths.
        </p>
        <div className='md:mb-10 '>
          <Link href="/dashboard">
        <Button className="font-medium text-xl button-hover">
            Get Started
        </Button>
        </Link>
        </div>
        <div className="relative w-full h-[400px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/image.png"
            alt="AI Guidance"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
  )
}

export default Hero;