'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { lastTransactions } from '@/app/actions';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from './ui/skeleton';
import toast from 'react-hot-toast';

const LIMIT = 10;

const TransactionRow = ({ transaction }) => (
    <HoverCard>
        <HoverCardTrigger asChild>
            <TableRow className="cursor-pointer">
                <TableCell className="text-center">
                    <div className="flex flex-col">
                        <div>{transaction.created_at.slice(0, 10)}</div>
                        <div>{transaction.created_at.slice(11, 16)}</div>
                    </div>
                </TableCell>
                <TableCell className="text-center">{transaction.person_involved}</TableCell>
                <TableCell
                    className={`text-center ${
                        transaction.transaction_type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                    {transaction.transaction_type}
                </TableCell>
                <TableCell className="text-center">{transaction.amount}</TableCell>
                <TableCell className="text-center">{transaction.payment_method}</TableCell>
            </TableRow>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
            <div className="space-y-2">
                <p>
                    <strong>Transaction Id:</strong> {transaction.transaction_id || 'N/A'}
                </p>
                <p>
                    <strong>Reference Number:</strong> {transaction.reference_number || 'N/A'}
                </p>
                <p>
                    <strong>Notes:</strong> {transaction.notes || 'N/A'}
                </p>
                <p>
                    <strong>Purpose:</strong> {transaction.purpose || 'N/A'}
                </p>
            </div>
        </HoverCardContent>
    </HoverCard>
);

const TransactionTable = ({ transactions }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Transaction Type</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Payment Method</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((transaction) => (
                <TransactionRow key={transaction.transaction_id} transaction={transaction} />
            ))}
        </TableBody>
    </Table>
);

const PaginationControls = ({ currentPage, onPageChange, isNextDisabled }) => (
    <Pagination>
        <PaginationContent>
            <PaginationItem>
                {currentPage > 1 && <PaginationPrevious onClick={() => onPageChange(Math.max(1, currentPage - 1))} />}
            </PaginationItem>
            <PaginationItem>
                <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                {!isNextDisabled && <PaginationNext onClick={() => onPageChange(currentPage + 1)} />}
            </PaginationItem>
        </PaginationContent>
    </Pagination>
);

export default function PaymentsHistory() {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);

    const fetchTransactions = useCallback(async (page) => {
        const start = (page - 1) * LIMIT;
        try {
            setLoading(true);
            const response = await lastTransactions(start, LIMIT + start);
            if (!response || response.error) {
                throw new Error(response?.error || 'Failed to fetch transactions');
            }
            if (response.data.length === 0) {
                setIsLastPage(true);
                if (page > 1) {
                    setCurrentPage(page - 1);
                    toast.error('No more transactions');
                } else {
                    setError('No transactions found');
                }
            } else {
                setTransactions(response.data);
                setIsLastPage(response.data.length < LIMIT);
                setError(null);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage, fetchTransactions]);

    const handlePageChange = (page) => {
        if (page > currentPage && !isLastPage) {
            setCurrentPage(page);
        } else if (page < currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">Recent Payment History</CardTitle>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <>
                        <div className="">
                            <PaginationControls
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                isNextDisabled={isLastPage}
                            />
                        </div>
                        <TransactionTable transactions={transactions} />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
