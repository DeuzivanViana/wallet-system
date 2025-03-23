import { ArrowLeft, ArrowRight, SendHorizonal } from 'lucide-react';
import { Layout } from './components/Layout'
import { NavigationBar } from './components/NavigationBar';
import { createClient } from './utils/supabase/server';
import { TransactionsList } from './components/TransactionsList';

export default async function Page() {
  const supabase = await createClient()

  const { data: { user }} = await supabase.auth.getUser()
  const { data: wallet} = await supabase.from('wallet').select('*').eq('user_id', user.id).maybeSingle()

  return (
    <Layout>
      <section className='p-8 bg-zinc-950 text-zinc-50 min-h-[320px] flex flex-col justify-between'>
        <h1 className='text-3xl'>DTP { wallet?.balance }</h1>
        <footer className='text-zinc-500 text-xs'>wallet-id: { wallet?.id }</footer>
      </section>

      <h2 className='p-4 text-zinc-700 underi'>Last transactions</h2>
      <TransactionsList/>
      
      <NavigationBar/>
    </Layout>
  );
}
