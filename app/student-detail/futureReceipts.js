import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { fetchFutureReceipts } from '../actions';

const FutureReceipts = ({ student_id }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await fetchFutureReceipts(student_id);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching future receipts:', error);
            }
        };
        fetchReceipts();
    }, [student_id]);

    return (
        <Accordion>
            <AccordionItem value="future-receipts">
                <AccordionTrigger>Future Fee Receipts</AccordionTrigger>
                <AccordionContent>
                    {data.length > 0 ? (
                        data.map(({ due_date, fee_amount, is_paid }, index) => (
                            <div key={index} className="border-b py-2">
                                <p><strong>Date Due:</strong> {new Date(due_date).toLocaleDateString()}</p>
                                <p><strong>Amount Due:</strong> {fee_amount}</p>
                                <p><strong>Is Paid:</strong> {is_paid ? 'Yes' : 'No'}</p>
                            </div>
                        ))
                    ) : (
                        <p>No future receipts available.</p>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FutureReceipts;
