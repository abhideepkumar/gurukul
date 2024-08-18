'use server';
import { createClient } from './utils/supabase/server';

// sample code  to check supabase
export default async function addClasses({ class_name, class_desc }) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('classes')
        .insert([{ class_name: class_name, class_desc: class_desc }])
        .select();

    if (error) {
        console.error('Error inserting class:', error);
        return { success: false, error: error.message };
    }

    console.log('Class inserted:', data);
    return { success: true, data };
}
