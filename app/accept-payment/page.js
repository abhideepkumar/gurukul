'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const fetchPendingFees = async (studentId) => {
    return [
        { label: 'Tuition Fee', value: 'tuition_fee' },
        { label: 'Library Fee', value: 'library_fee' },
        { label: 'Maintenance Fee', value: 'maintenance_fee' },
    ];
};

export default function AcceptPaymentPage() {
    const [studentId, setStudentId] = useState('');
    const [pendingFees, setPendingFees] = useState([]);
    const [selectedFees, setSelectedFees] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const studentIdRef = useRef(null);

    useEffect(() => {
        studentIdRef.current?.focus();
    }, []);

    const handleFetch = async () => {
        if (!studentId) {
            setErrorMessage('Student ID cannot be empty');
            return;
        }

        try {
            const fees = await fetchPendingFees(studentId);
            setPendingFees(fees);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to fetch pending fees');
        }
    };

    const handleProceed = () => {
        if (Object.keys(selectedFees).length === 0) {
            setErrorMessage('Please select at least one fee to proceed.');
            return;
        }

        router.push({
            pathname: '/payment-details',
            query: {
                studentId,
                selectedFees: JSON.stringify(selectedFees),
            },
        });
    };

    const toggleFeeSelection = (feeValue) => {
        setSelectedFees((prev) => ({
            ...prev,
            [feeValue]: !prev[feeValue],
        }));
    };

    const selectedFeesText =
        pendingFees
            .filter((option) => selectedFees[option.value])
            .map((option) => option.label)
            .join(', ') || 'Select pending fees';

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-3xl rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle>Accept Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <InputField
                        id="student-id"
                        label="Student ID"
                        placeholder="Enter student's ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        ref={studentIdRef}
                    />
                    <Button variant="" onClick={handleFetch}>Fetch</Button>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    {pendingFees.length > 0 && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="fee-structures">Pending Fee Structures</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                            {selectedFeesText}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Select Pending Fees</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {pendingFees.map((option) => (
                                            <DropdownMenuCheckboxItem
                                                key={option.value}
                                                checked={selectedFees[option.value]}
                                                onCheckedChange={() => toggleFeeSelection(option.value)}
                                            >
                                                {option.label}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Button variant="" onClick={handleProceed}>Proceed</Button>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 p-6">
                    <Button variant="outline" className="text-red-500">
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

const InputField = React.forwardRef(({ id, label, placeholder, value, onChange }, ref) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} placeholder={placeholder} value={value} onChange={onChange} ref={ref} />
    </div>
));

InputField.displayName = 'InputField';
