'use client'

import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Header() {
 const [burgerOpen, setBurgerOpen] = useState(false)

 const toggleMenu = () => {
  setBurgerOpen(!burgerOpen)
}

  return (
    <header className="bg-[#013b94]">
      <nav className="mx-auto flex items-center justify-between max-w-7xl p-6">
        <div className="flex lg:flex-1">
          <Link href='/' className="m-1.5 p-1.5">
            <span className="text-white">Booker.com</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
         <button
           type='button'
           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
           onClick={toggleMenu}
         >
           {burgerOpen == true ? (
              <XMarkIcon className="h-6 w-6 z-50" aria-hidden='true' />
            ) : (
              <Bars3Icon className="h-6 w-6 z-50" aria-hidden='true' />
            )}
         </button>
        </div>
        <div
        className={`flex flex-col p-20-10 justify-around fixed top-[96px] right-0 h-24 w-64 bg-[#013b94] transform ${
          burgerOpen ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-300 ease-in-out lg:flex-row lg:static lg:items-baseline lg:w-auto lg:h-auto lg:bg-transparent lg:transform-none`}
         >
          <Link href='#' className='text-sm font-semibold leading-6 text-white lg:mt-0 lg:ml-10'>
            <span className="text-white">Hotels</span>
          </Link>
          <Link href='#' className='text-sm font-semibold leading-6 text-white lg:mt-0 lg:ml-10'>
            <span className="text-white">Tickets</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header