'use client'

import Link from "next/link";
import {Instagram, Earth, Linkedin} from "lucide-react";
function Footer() {
  return (
    <footer className="text-center px-16 py-4 mt-16 mb-4 mx-16 w-full flex-between absolute bottom-0">
    <div className="flex gap-2">
    <h1 className="font-semibold text-xl text-black text-center black_gradient">
        © {new Date().getFullYear()} Studious 
    </h1>
    </div>
    <div className="flex gap-4">
      <Link
        href={'https://www.youtube.com/'}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Instagram className="w-[28px] h-[28px] text-black"/>
      </Link>
      <Link
      href={'https://www.youtube.com/'}
      rel="noopener noreferrer"
      target="_blank"
      >
        <Linkedin className="w-[28px] h-[28px] text-black"/>
      </Link>
      <Link
      href={'https://www.youtube.com/'}
      rel="noopener noreferrer"
      target="_blank"
      >
        <Earth className="w-[28px] h-[28px] text-black"/>
      </Link>
    </div>
    </footer>
  )
}

export default Footer;