'use server';

import { createClient } from './utils/supabase/server';

// sample code  to check supabase
export default async function addClasses() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('o_classes')
    .insert([
      { class_name: 'class 1' },
    ])
    .select();

  if (error) {
    console.error('Error inserting class:', error);
    return { success: false, error: error.message };
  }

  console.log('Class inserted:', data);
  return { success: true, data };
}
