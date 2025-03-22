import { redirect } from 'next/navigation';
import { Layout } from './components/Layout'
import { createClient } from './utils/supabase/server';
import { signOut } from './actions';

export default async function Page() {
  const supabase = await createClient()

  const { data: wallet} = await supabase.from('wallet').select('*').maybeSingle()

  return (
    <Layout>
      <section className='p-8 bg-zinc-950 text-zinc-50 min-h-[320px] flex flex-col justify-between'>
        <h1 className='text-3xl'>DTP { wallet?.balance }</h1>
        <footer className='text-zinc-500 text-xs'>wallet-id: { wallet?.id }</footer>
      </section>
    </Layout>
  );
}
