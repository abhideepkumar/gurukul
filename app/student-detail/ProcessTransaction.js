import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { processPayment } from '../actions';

const ProcessTransaction = ({ selectedReceipts, studentId, onTransactionComplete }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const totalAmount = selectedReceipts.reduce((sum, receipt) => sum + receipt.fee_amount, 0);

    const handleProcessPayment = async () => {
        setIsProcessing(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await processPayment(studentId, selectedReceipts, totalAmount);
            console.log('Payment response:', response);

            if (response.success) {
                setSuccess(true);
                onTransactionComplete();
            } else {
                setError('Payment processing failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while processing the payment. Please try again later.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Process Payment</h2>
            <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
            <p>Number of Receipts: {selectedReceipts.length}</p>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert variant="success" className="bg-green-100 border-green-400 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Payment processed successfully!</AlertDescription>
                </Alert>
            )}

            <Button onClick={handleProcessPayment} disabled={isProcessing || success} className="w-full">
                {isProcessing ? 'Processing...' : 'Process Payment'}
            </Button>
        </div>
    );
};

export default ProcessTransaction;
