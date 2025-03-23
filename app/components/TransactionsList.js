'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const TransactionsList = ({ className }) => {
  const [transactions, setTransactions] = useState([])
  const [wallet, setWallet] = useState([])
  const supabase = createClient()

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: wall } = await supabase.from('wallet').select('*').eq('user_id', user.id).maybeSingle()

      const { data: tra } = await supabase
      .from('transaction')
      .select('*')
      .or(`from_id.eq.${wallet.id},to_id.eq.${wallet.id}`)
      .order('created_at', { ascending: false })
      .limit(21)
      
      setTransactions(tra)
      setWallet(wall)
    })()
    
  })

  return <ul> {
    transactions?.map((val, index) => {
      return <div key={index} className={'flex items-center gap-2 p-4 border-zinc-700 border-b ' + (index === 0 ? 'border-t' : '')}>
        { val.to_id === wallet.id ?
          <ArrowRight size={18} className='text-zinc-500'/> :
          <ArrowLeft size={18} className='text-zinc-500'/>
        }
        { val.to_id === wallet.id ? 
          <span className='text-red-500 text-xs'>{ val.amount } DTP to </span> :
          <span className='text-green-500 text-xs'>{ val.amount } DTP from </span> 
        }
        <span className='text-zinc-500 text-xs'>{ val.to_id }</span>
      </div>
    }) || <span className='text-zinc-50 p-4'>Loding...</span>
  } </ul>
  
}