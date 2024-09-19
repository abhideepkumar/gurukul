'use server';
import { createClient } from './utils/supabase/server';

// Helper function to handle Supabase errors
const handleSupabaseError = (error, operation) => {
    console.error(`Error ${operation}:`, error);
    return { success: false, error: error.message };
};

// Helper function for Supabase queries
const supabaseQuery = async (queryFn) => {
    const supabase = createClient();
    try {
        const result = await queryFn(supabase);
        console.log('Result for query:', result);
        return result;
    } catch (error) {
        return handleSupabaseError(error, 'executing query');
    }
};

export const showClasses = () => supabaseQuery((supabase) => supabase.from('classes').select('*'));

export const addClasses = ({ class_name, class_desc }) =>
    supabaseQuery((supabase) => supabase.from('classes').insert([{ class_name, class_desc }]).select());

export const showFeeSlabs = () => supabaseQuery((supabase) => supabase.from('fee_slabs').select('*'));

export const addFeeSlabs = ({ name, fees, feetype, description, remark }) =>
    supabaseQuery((supabase) =>
        supabase
            .from('fee_slabs')
            .insert([{ name, amount: fees, recurrence: feetype, description, remark }])
            .select(),
    );

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
    const result = await supabaseQuery((supabase) =>
        supabase
            .from('students')
            .insert([{ full_name, admission_id, dob, phone_no, fatherName, classname, roll_number, address }])
            .select(),
    );
    console.log('Result for adding students:', result);
    if (result?.error === null) {
        console.log('Student added successfully');
        await updateStudentFeeStatus({ admission_id, fees, academicYearStartMonth: 3 });
    } else {
        return { error: result?.error };
    }

    return result;
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

export const fetchAllStudents = () => supabaseQuery((supabase) => supabase.from('students').select('*'));

export const fetchAstudent = (admission_id) =>
    supabaseQuery((supabase) => supabase.from('students').select('*').eq('admission_id', admission_id));

export const fetchFutureReceipts = (admission_id) =>
    supabaseQuery((supabase) => supabase.from('student_fee_status').select('*').eq('student_id', admission_id));

export const fetchFeeHistory = (admission_id) =>
    supabaseQuery((supabase) => supabase.from('transactions').select('*').eq('student_id', admission_id));

export async function processPayment(studentId, selectedReceipts, totalAmount) {
    console.log('StudentID:', studentId);
    console.log('Selected:', selectedReceipts);
    const supabase = createClient();
    try {
        // Insert into transactions table
        const { data: transactionData, error: transactionError } = await supabase.from('transactions').insert({
            student_id: studentId,
            amount: totalAmount,
            payment_time: new Date().toISOString(),
            status: 'PAID',
            reference_number: Date.now().toString(),
            all_slabs: selectedReceipts,
            payment_method: 'NA',
            remark: 'Payment processed via web interface',
        });

        if (transactionError) throw transactionError;

        // Update student_fee_status table
        const updatePromises = selectedReceipts.map((receipt) =>
            supabase
                .from('student_fee_status')
                .update({ is_paid: true })
                .eq('student_id', studentId)
                .eq('slab_id', receipt.slab_id)
                .eq('due_date', receipt.due_date),
        );

        const updateResults = await Promise.all(updatePromises);

        const updateErrors = updateResults.filter((result) => result.error);
        if (updateErrors.length > 0) {
            throw new Error('Error updating student_fee_status');
        }

        return { success: true, data: transactionData };
    } catch (error) {
        console.error('Error processing payment:', error);
        return { success: false, error: error.message };
    }
}

//fetch transactions
//need to fix this, in some cases this can work definitely wrong
//solution: need a single table for both the tables
export const lastTransactions = (start, limit) =>
    supabaseQuery((supabase) =>
        supabase
            .from('financial_transactions')
            .select('*')
            .order('created_at', { ascending: false })
            .range(start, limit - 1),
    );

export const financial_transaction = ({
    transaction_type,
    amount,
    payment_method,
    person_involved,
    purpose,
    notes,
}) => {
    console.log('financial_transaction:', transaction_type, amount, payment_method, person_involved, purpose, notes);
    return supabaseQuery((supabase) =>
        supabase
            .from('financial_transactions')
            .insert({ amount, transaction_type, payment_method, person_involved, purpose, notes })
            .select(),
    );
};
