import React, { useState, useEffect, useCallback } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchFutureReceipts } from '../actions';
import ProcessTransaction from './ProcessTransaction';

const FutureReceipts = ({ student_id }) => {
    const [data, setData] = useState([]);
    const [selectedReceipts, setSelectedReceipts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showProcessTransaction, setShowProcessTransaction] = useState(false);

    const fetchReceipts = useCallback(async () => {
        try {
            const response = await fetchFutureReceipts(student_id);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching future receipts:', error);
        }
    }, [student_id]);

    useEffect(() => {
        fetchReceipts();
    }, [fetchReceipts]);

    const handleReceiptToggle = useCallback((index) => {
        setSelectedReceipts((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    }, []);

    const handleGenerateReceipt = () => {
        setShowProcessTransaction(true);
    };

    const handleTransactionComplete = useCallback(() => {
        setShowProcessTransaction(false);
        setSelectedReceipts([]);
        fetchReceipts();
    }, [fetchReceipts]);

    return (
        <Accordion className="w-full">
            <AccordionItem value="future-receipts">
                <AccordionTrigger className="text-lg font-semibold">Future Fee Receipts</AccordionTrigger>
                <AccordionContent>
                    {data?.length > 0 ? (
                        <div className="space-y-4">
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Select Receipts
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full sm:w-80">
                                    <ScrollArea className="h-[300px] overflow-y-auto">
                                        {data.filter(receipt => !receipt.is_paid).map(({ due_date, fee_amount }, index) => (
                                            <DropdownMenuCheckboxItem
                                                key={index}
                                                checked={selectedReceipts.includes(index)}
                                                onCheckedChange={() => handleReceiptToggle(index)}
                                                onSelect={(event) => event.preventDefault()}
                                                className="p-2 hover:bg-gray-100 flex items-start space-x-2"
                                                hidden="true"
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedReceipts.includes(index)}
                                                        onChange={() => {}}
                                                        className="h-4 w-4"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p>
                                                        <strong>Date Due:</strong>{' '}
                                                        {new Date(due_date).toLocaleDateString()}
                                                    </p>
                                                    <p>
                                                        <strong>Amount Due:</strong> ₹{fee_amount.toFixed(2)}
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong> Unpaid
                                                    </p>
                                                </div>
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </ScrollArea>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ScrollArea className="h-[300px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
                                    {selectedReceipts.map((index) => {
                                        const receipt = data[index];
                                        return (
                                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                                <p className="font-semibold">
                                                    Due: {new Date(receipt.due_date).toLocaleDateString()}
                                                </p>
                                                <p>Amount: ₹{receipt.fee_amount.toFixed(2)}</p>
                                                <p
                                                    className={`text-sm ${
                                                        receipt.is_paid ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                                >
                                                    {receipt.is_paid ? 'Paid' : 'Unpaid'}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                            {showProcessTransaction ? (
                                <ProcessTransaction
                                    selectedReceipts={selectedReceipts.map((index) => data[index])}
                                    studentId={student_id}
                                    onTransactionComplete={handleTransactionComplete}
                                />
                            ) : (
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={handleGenerateReceipt}
                                    disabled={selectedReceipts.length === 0}
                                >
                                    Generate Receipt
                                </Button>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No future receipts available.</p>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FutureReceipts;
