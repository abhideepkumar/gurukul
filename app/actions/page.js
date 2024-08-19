'use server';
import { createClient } from '../utils/supabase/server';
export async function showClasses() {
    const supabase = createClient();
    const { data, error } = await supabase.from('classes').select('*');
    if (error) {
        console.error('Error fetching classes:', error);
        return { success: false, error: error.message };
    }
    console.log('Classes fetched:', data);
    return { success: true, data };
}
export async function addClasses({ class_name, class_desc }) {
    console.log('Adding class:', class_name, ' and', class_desc);
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

export async function showFeeSlabs() {
    const supabase = createClient();
    const { data, error } = await supabase.from('fee_slabs').select('*');
    if (error) {
        console.error('Error fetching fee structures:', error);
        return { success: false, error: error.message };
    }
    console.log('Fee structures fetched:', data);
    return { success: true, data };
}
export async function addFeeSlabs({ name, fees, feetype, description, remark }) {
    console.log('Adding class:', name, fees, feetype, description, remark);
    const supabase = createClient();
    const { data, error } = await supabase
        .from('fee_slabs')
        .insert([{ name: name, amount: fees, recurrence: feetype, description: description, remark: remark }])
        .select();

    if (error) {
        console.error('Error inserting fee structure:', error);
        return { success: false, error: error.message };
    }

    console.log('Class inserted:', data);
    return { success: true, data };
}

export async function addNewStudent({
    full_name,
    admission_id,
    dob,
    phone_no,
    fatherName,
    classname,
    roll_number,
    address,
    fees,
}) {
    const supabase = createClient();
    console.log({ full_name, admission_id, dob, phone_no, fatherName, classname, roll_number, address, fees });
    try {
        const { data, error } = await supabase
            .from('students')
            .insert([
                {
                    full_name,
                    admission_id,
                    dob,
                    phone_no,
                    fatherName,
                    classname,
                    roll_number,
                    address,
                    // fees: JSON.stringify(fees),
                },
            ])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        console.log('Student added successfully:', data);
        return data;
    } catch (err) {
        console.error('Error adding student:', err.message);
        throw err;
    }
}
