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
