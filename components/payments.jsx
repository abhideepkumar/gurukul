'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { lastTransactions } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

export default function PaymentsHistory() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await lastTransactions();
                console.log('Client-side response:', response);

                if (response?.data?.length > 0) {
                    setTransactions(response.data);
                } else {
                    setError(response.error || 'No transactions found');
                }
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Unable to retrieve transactions at this time.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (isLoading)
        return (
            <div>
                <Skeleton />
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    return (
        <Card className="p-4 rounded-md">
            <CardHeader>
                <CardTitle>Recent Payment History</CardTitle>
            </CardHeader>
            <CardContent>
                {transactions.length === 0 ? (
                    <div>No recent transactions available.</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Transaction Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Method</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(
                                ({
                                    transaction_id,
                                    created_at,
                                    person_involved,
                                    transaction_type,
                                    amount,
                                    payment_method,
                                }) => (
                                    <TableRow
                                        key={transaction_id}
                                        className={`${transaction_type === 'withdrawal' ? 'bg-red-50' : 'bg-green-50'}`}
                                    >
                                        <TableCell>{created_at.slice(0, 10)}</TableCell>
                                        <TableCell>{person_involved}</TableCell>
                                        <TableCell>{transaction_type}</TableCell>
                                        <TableCell>{amount}</TableCell>
                                        <TableCell>{payment_method}</TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
