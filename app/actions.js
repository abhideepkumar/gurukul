'use server';
import { createClient } from './utils/supabase/server';
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
        updateStudentFeeStatus({ admission_id, fees, academicYearStartMonth: 3 });
        return data;
    } catch (err) {
        console.error('Error adding student:', err.message);
        throw err;
    }
}

//add fee slab
export async function updateStudentFeeStatus({ admission_id, fees, academicYearStartMonth = 3 }) {
    console.log('Updating fee status:', { student_id: admission_id, slab_ids: fees, academicYearStartMonth });
    const supabase = createClient();

    try {
        for (const feeSlab of fees) {
            const { slab_id, name, amount, recurrence } = feeSlab;

            const dueDates = calculateDueDates(recurrence, academicYearStartMonth);

            for (const dueDate of dueDates) {
                const { data, error } = await supabase.from('student_fee_status').insert({
                    student_id: admission_id,
                    slab_id,
                    due_date: dueDate,
                    fee_amount: amount,
                    is_paid: false,
                });

                if (error) throw error;
            }

            console.log(`Fee receipts created for slab: ${name}`);
        }

        return { success: true, message: 'Fee status updated successfully' };
    } catch (error) {
        console.error('Error updating fee status:', error);
        return { success: false, error: error.message };
    }
}

function calculateDueDates(recurrence, academicYearStartMonth) {
    const currentDate = new Date();
    let academicYearStart = new Date(currentDate.getFullYear(), academicYearStartMonth, 1);

    if (currentDate < academicYearStart) {
        academicYearStart.setFullYear(academicYearStart.getFullYear() - 1);
    }

    const dueDates = [];

    switch (recurrence) {
        case 'monthly':
            for (let i = 0; i < 12; i++) {
                dueDates.push(new Date(academicYearStart.getFullYear(), academicYearStart.getMonth() + i, 15));
            }
            break;
        case 'quarterly':
            for (let i = 0; i < 12; i += 3) {
                dueDates.push(new Date(academicYearStart.getFullYear(), academicYearStart.getMonth() + i, 15));
            }
            break;
        case 'halfyearly':
            dueDates.push(new Date(academicYearStart.getFullYear(), academicYearStart.getMonth(), 15));
            dueDates.push(new Date(academicYearStart.getFullYear(), academicYearStart.getMonth() + 6, 1));
            break;
        case 'annually':
            dueDates.push(new Date(academicYearStart.getFullYear() + 1, academicYearStart.getMonth() - 1, 15));
            break;
        default:
            throw new Error(`Unknown recurrence type: ${recurrence}`);
    }

    return dueDates;
}

//fetch all students
export async function fetchAllStudents() {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.from('students').select('*');
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching students:', error);
        return { success: false, error: error.message };
    }
}
