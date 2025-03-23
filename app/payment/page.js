import { Send } from 'lucide-react'
import { Layout } from '../components/Layout'
import { NavigationBar } from '../components/NavigationBar'
import { createClient } from '../utils/supabase/server'
import { sendTo } from '../actions'
import { CurrentBalance } from '../components/CurrentBalance'

export default async function Page() {
  const supbase = await createClient()

  return <Layout>
    <form className='p-4 flex flex-col gap-4'>
      <input required name='walletId' className='bg-zinc-700 text-zinc-50 outline-0 p-4 text-sm rounded-lg' placeholder='Wallet ID' />
      <input required name='amount' className='bg-zinc-700 text-zinc-50 outline-0 p-4 text-sm rounded-lg' placeholder='Amount' />
      <CurrentBalance className={'text-zinc-600 text-xs'}/>

      <button formAction={sendTo} className='p-6 bg-purple-600 fixed bottom-[100px] right-4 rounded-full'>
        <Send size={28} className='text-zinc-50'/>
      </button>
    </form>

    <NavigationBar />
  </Layout>
}