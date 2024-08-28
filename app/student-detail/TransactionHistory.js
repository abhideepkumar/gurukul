import React from 'react';
import { useState, useEffect } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { fetchFeeHistory } from '../actions';

const TransactionHistory = ({ student_id }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchFutureReceiptsData = async () => {
            const response = await fetchFeeHistory(student_id);
            console.log(response);
            setData(response.data);
        };
        fetchFutureReceiptsData();
    }, [student_id]);
    return (
        // still need to fix this Component
        <AccordionItem value="fee-history">
            <AccordionTrigger>Transaction History</AccordionTrigger>
            <AccordionContent>
                {data.length > 0 ? (
                    data.map((transaction, index) => (
                        <div key={index} className="border-b py-2">
                            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                            <p><strong>Amount:</strong> {transaction.amount}</p>
                            <p><strong>Details:</strong> {transaction.details}</p>
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