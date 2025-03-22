'use client'

import { Send } from 'lucide-react'
import { Layout } from '../components/Layout'
import { NavigationBar } from '../components/NavigationBar'
import { createClient } from '../utils/supabase/client'
import { sendTo } from '../actions'
import { useState, useEffect } from 'react'

export default function Page() {
  const [wallet, setWallet] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [amountToSend, setAmountToSend] = useState(0)

  useEffect(() => {
    async function fetchWallet() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data: walletData } = await supabase.from('wallet').select('*').maybeSingle().eq('user_id', user.id)
      setWallet(walletData)
    }
    fetchWallet()
  }, []);

  async function handleSubmit(formData) {
    if (wallet && amountToSend > wallet.balance) {
      setErrorMessage("Insufficient balance.")
      return;
    }

    const result = await sendTo(formData)
    if (result.success) {
      setErrorMessage(null)
      setWallet({ ...wallet, balance: wallet.balance - amountToSend })
    } else {
      setErrorMessage(result.error)
    }
  }

  function handleAmountChange(e) {
    setAmountToSend(Number(e.target.value))
  }

  return (
    <Layout>
      <form className='flex flex-col p-4 gap-4' action={handleSubmit}>
        <label htmlFor='sendTo' className='text-zinc-50 text-xl text-center font-bold'>
          Send to
        </label>
        <input
          name='wallet_id'
          placeholder='wallet-id'
          type='text'
          className='text-sm p-4 rounded-xl bg-zinc-800 outline-0 placeholder-zinc-500 text-zinc-50'
        />
        <input
          name='amount'
          placeholder='quantity'
          type='number'
          className='text-sm p-4 rounded-xl bg-zinc-800 outline-0 placeholder-zinc-500 text-zinc-50'
          onChange={handleAmountChange}
        />

        <button className='bg-zinc-700 p-6 fixed bottom-[100px] right-4 rounded-full'>
          <Send className='text-zinc-50' />
        </button>
      </form>

      {errorMessage && <p className='text-red-500 p-4'>{errorMessage}</p>}

      <footer className='text-zinc-700 pl-4'>Current balance: {wallet?.balance}</footer>

      <NavigationBar />
    </Layout>
  );
}