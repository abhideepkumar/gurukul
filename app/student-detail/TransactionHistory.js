import React, { useState, useEffect } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { fetchFeeHistory } from '../actions';

const TransactionHistory = ({ student_id }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const response = await fetchFeeHistory(student_id);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };
        fetchTransactionHistory();
    }, [student_id]);

    return (
        // still need to fix this Component
        <AccordionItem value="fee-history">
            <AccordionTrigger>Transaction History</AccordionTrigger>
            <AccordionContent>
                {data?.length > 0 ? (
                    data.map((transaction, index) => (
                        <div key={index} className="border-b py-2">
                            <p><strong>Date:</strong> {new Date(transaction.payment_time).toLocaleDateString()}</p>
                            <p><strong>Amount:</strong> {transaction.amount}</p>
                            <p><strong>Payment method:</strong> {transaction.payment_method}</p>
                            <p><strong>Reference ID:</strong> {transaction.reference_number}</p>
                            <p><strong>Status:</strong> {transaction.status}</p>
                            <p><strong>Remark:</strong> {transaction.remark}</p>
                        </div>
                    ))
                ) : (
                    <p>No transaction history available.</p>
                )}
            </AccordionContent>
        </AccordionItem>
    );
};

export default TransactionHistory;