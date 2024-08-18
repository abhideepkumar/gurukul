'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuRadioItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const paymentMethods = [
    { label: 'Cash', value: 'cash' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'UPI', value: 'upi' },
];

export default function PaymentDetailsPage() {
    const router = useRouter();
    const { studentId, selectedFees } = router.query;
    const [finalAmount, setFinalAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [remarks, setRemarks] = useState('');
    const [feesSummary, setFeesSummary] = useState([]);

    useEffect(() => {
        if (selectedFees) {
            setFeesSummary(JSON.parse(selectedFees));
            setFinalAmount(calculateTotal(JSON.parse(selectedFees)));
        }
    }, [selectedFees]);

    const calculateTotal = (fees) => {
        const calcFees = 0;
        return calcFees;
    };

    const handleDone = () => {
        const saveTransaction = async () => {
            const referenceNumber = 'REF-' + Math.random().toString(36).substring(7).toUpperCase();
            const currentTime = new Date().toISOString();
            const transaction = {
                studentId,
                selectedFees: feesSummary,
                finalAmount,
                paymentMethod: selectedMethod,
                remarks,
                referenceNumber,
                paymentTime: currentTime,
            };

            console.log('Saving transaction:', transaction);

            router.push('/payment-confirmation');
        };

        saveTransaction();
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-3xl rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                        <Label>Selected Fees</Label>
                        <ul className="list-disc pl-6">
                            {Object.keys(feesSummary).map((key) => (
                                <li key={key}>{key}</li>
                            ))}
                        </ul>
                    </div>
                    <InputField
                        id="final-amount"
                        label="Final Amount"
                        placeholder="Final amount"
                        value={finalAmount}
                        onChange={(e) => setFinalAmount(e.target.value)}
                    />
                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    {selectedMethod || 'Select Payment Method'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {paymentMethods.map((method) => (
                                    <DropdownMenuRadioItem
                                        key={method.value}
                                        value={method.value}
                                        onSelect={() => setSelectedMethod(method.label)}
                                    >
                                        {method.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <InputField
                        id="remarks"
                        label="Remarks (optional)"
                        placeholder="Enter any remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 p-6">
                    <Button variant="outline" className="text-red-500" onClick={() => router.push('/accept-payment')}>
                        Cancel
                    </Button>
                    <Button onClick={handleDone}>Done</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

const InputField = ({ id, label, placeholder, value, onChange }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
);
