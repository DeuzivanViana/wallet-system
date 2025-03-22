import { ArrowLeft, ArrowRight, SendHorizonal } from 'lucide-react';
import { Layout } from './components/Layout'
import { NavigationBar } from './components/NavigationBar';
import { createClient } from './utils/supabase/server';

export default async function Page() {
  const supabase = await createClient()

  const { data: { user }} = await supabase.auth.getUser()
  const { data: wallet} = await supabase.from('wallet').select('*').eq('user_id', user.id).maybeSingle()
  const { data: sended_transaction } = await supabase.from('transaction').select('*').eq('from_id', wallet.id).order('created_at', {ascending: false}).limit(21)
  const { data: recived_transaction } = await supabase.from('transaction').select('*').eq('to_id', wallet.id).order('created_at', {ascending: false}).limit(21)

  return (
    <Layout>
      <section className='p-8 bg-zinc-950 text-zinc-50 min-h-[320px] flex flex-col justify-between'>
        <h1 className='text-3xl'>DTP { wallet?.balance }</h1>
        <footer className='text-zinc-500 text-xs'>wallet-id: { wallet?.id }</footer>
      </section>

      <h2 className='p-4 text-zinc-700 underi'>Last transactions</h2>
      { sended_transaction.map((val, index) => {
        return <div key={index} className={'flex items-center gap-2 p-4 border-zinc-700 border-b ' + (index === 0 ? 'border-t' : '')}>
          <ArrowRight size={18} className='text-zinc-500'/>
          <span className='text-red-500 text-xs'>{ val.amount } DTP to </span>
          <span className='text-zinc-500 text-xs'>{ val.to_id }</span>
        </div>
      })}
      { recived_transaction.map((val, index) => {
        return <div key={index} className={'flex items-center gap-2 p-4 border-zinc-700 border-b ' + (index === 0 ? 'border-t' : '')}>
          <ArrowLeft size={18} className='text-zinc-500'/>
          <span className='text-lime-500 text-xs'>{ val.amount } DTP to </span>
          <span className='text-zinc-500 text-xs'>{ val.to_id }</span>
        </div>
      })}

      <NavigationBar/>
    </Layout>
  );
}
