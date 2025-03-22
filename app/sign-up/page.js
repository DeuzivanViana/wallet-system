import Link from 'next/link';
import { signUp } from '../actions';
import { Layout } from '../components/Layout'

export default function Page() {
  return (
    <Layout>
      <form className='rounded-xl p-12 m-4 bg-zinc-950 text-zinc-50 flex flex-col gap-4'>
        <input placeholder='E-mail' className='text-sm p-4 rounded-xl bg-zinc-800 outline-0' name='email' type='email'/>
        <input placeholder='Password' className='text-sm p-4 rounded-xl bg-zinc-800 outline-0' name='password' type='password'/>
        <input placeholder='Confirm your password' className='text-sm p-4 rounded-xl bg-zinc-800 outline-0' name='passwordAgain' type='password'/>
        
        <button formAction={signUp} className='text-sm p-4 bg-purple-500 rounded-xl'>Sign-Up</button>
        <Link href='/sign-in' className='text-xs underline text-center text-blue-500'>Do you have an account?</Link>
      </form>
    </Layout>
  );
}
