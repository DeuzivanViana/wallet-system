import { DollarSign, Home, Settings } from 'lucide-react'
import Link from 'next/link'

export const NavigationBar = () => {
  return <nav>
    <ul className='flex w-full justify-evenly bg-zinc-950 p-4 fixed bottom-0'>
      <li><Link className='bg-zinc-900 block p-4 shadow-md rounded-full' href='/'><Home color='white' size={21}/></Link></li>
      <li><Link className='bg-zinc-900 block p-4 shadow-md rounded-full' href='/payment'><DollarSign color='white' size={21}/></Link></li>
      <li><Link className='bg-zinc-900 block p-4 shadow-md rounded-full' href='/profile'><Settings color='white' size={21}/></Link></li>
    </ul>
  </nav>
}