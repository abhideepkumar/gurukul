'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion } from '@/components/ui/accordion';
import StudentProfile from './StudentProfile';
import TransactionHistory from './TransactionHistory';
import FutureReceipts from './futureReceipts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { fetchAstudent } from '../actions';

const StudentData = ({ id }) => {
    const [student, setStudent] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchStudentData = async () => {
            if (!id) return;
            try {
                const response = await fetchAstudent(id);
                setStudent(response.data[0]);
            } catch (error) {
                setErrors(prev => ({ ...prev, student: 'Failed to fetch student data' }));
            }
        };
        fetchStudentData();
    }, [id]);

    if (!student && !errors.student) {
        return <Skeleton className="w-full h-40" />;
    }

    return (
        <>
            <div className="w-2/3 space-y-4">
                {errors.futureReceipts ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errors.futureReceipts}</AlertDescription>
                    </Alert>
                ) : (
                    <FutureReceipts student_id={id} />
                )}
                {errors.student ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errors.student}</AlertDescription>
                    </Alert>
                ) : (
                    <Accordion type="single" collapsible>
                        {errors.feeHistory ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{errors.feeHistory}</AlertDescription>
                            </Alert>
                        ) : (
                            <TransactionHistory student_id={id} />
                        )}
                    </Accordion>
                )}
            </div>
            <div className="w-1/3">
                {student && <StudentProfile student={student} />}
            </div>
        </>
    );
};

const StudentDetailPage = () => {
    return (
        <Suspense fallback={<div className="container mx-auto p-4"><Skeleton className="w-full h-40" /></div>}>
            <StudentDetailContent />
        </Suspense>
    );
};

const StudentDetailContent = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div className="flex container mx-auto p-4 space-x-6">
            <StudentData id={id} />
        </div>
    );
};

export default StudentDetailPage;