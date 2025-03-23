'use server'
import { redirect } from 'next/navigation'
import { createClient } from './utils/supabase/server'

export const signIn = async (formData) => {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if(error) {
    console.error(error)

  } else {
    redirect('/')

  }
}

export const signOut = async () => {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/sign-in')
}

export const sendTo = async (formData) => {
  const supabase = await createClient()
  const amount_to_pay = Number.parseInt(formData.get('amount'))

  const { data: { user }} = await supabase.auth.getUser()
  const { data: from_wallet } = await supabase.from('wallet').select('*').eq('user_id', user.id).maybeSingle()
  const { data: to_wallet } = await supabase.from('wallet').select('*').eq('id', formData.get('walletId')).maybeSingle()
  const debit = from_wallet.balance - amount_to_pay

  if(!to_wallet) {
    redirect('/error?message=This wallet is not valid.')
  }

  if(from_wallet.id === to_wallet.id) {
    redirect('/error?message=You can\'t send to yourself.')
  }

  if(debit >= 0) {
    await supabase.from('wallet').update({balance: debit}).eq('id', from_wallet.id)
    await supabase.from('wallet').update({balance: to_wallet.balance + amount_to_pay}).eq('id', to_wallet.id)

    await supabase.from('transaction').insert({
      from_id: from_wallet.id,
      to_id: to_wallet.id,
      amount: amount_to_pay
    })
  } else {
    redirect('/error?message=You don\'t have enough balance to this transaction.')
  }
}

export const signUp = async (formData) => {
  const supabase = await createClient()
 
  if(formData.get('password') === formData.get('passwordAgain'))
  {
    const { data, error } = await supabase.auth.signUp({
      password: formData.get('password'),
      email: formData.get('email')
    })
    
    if(error) {
      console.error(error)

    } else {
      redirect('/sign-in')
    }

  } else {
    console.error('Password don\'t match')

  }
}

