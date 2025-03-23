'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'

export const CurrentBalance = ({ className }) => {
  const [balance, setBalance] = useState(0)
  const supabase = createClient()
  
  useEffect(() => {

    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: wallet } = await supabase.from('wallet').select('*').eq('user_id', user.id).maybeSingle()
      
      setBalance(wallet.balance)
    })()

  }, [])

  return <footer className={className}>
    Balance: { balance || 'Loding...' }
  </footer>
}