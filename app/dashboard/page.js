
import { Layout } from '../components/Layout'
import { createClient } from '../utils/supabase/server';

export default async function Page() {
  const supabase = await createClient()


  return (
    <Layout>
      
    </Layout>
  );
}
