import { signOut } from '../actions';
import { Layout } from '../components/Layout'
import { NavigationBar } from '../components/NavigationBar';
import { createClient } from '../utils/supabase/server';

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const created_at = new Date(user?.created_at)

  return (
    <Layout>
      <section className='p-4 bg-zinc-950 text-zinc-50 flex flex-col'>
        <h2>User Information</h2>
        <ul>
          <li className='text-xs'>User ID: { user?.id }</li>
          <li className='text-xs'>E-mail: { user?.email }</li>
          <li className='text-xs'>Created At: { created_at.toTimeString() }</li>
          <li className='text-xs'>Role: { user?.role }</li>
        </ul>

        <button onClick={signOut} className='p-2 text-xs mt-[100px] bg-red-500 rounded-md text-zinc-50 w-1/4 self-end'>Sign-out</button>
      </section>
    </Layout>
  );
}
