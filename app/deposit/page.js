'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { makeDeposit } from '../actions';
import { toast } from 'react-hot-toast';

const DepositPage = () => {
	const [amount, setAmount] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('cash');
	const [referenceNumber, setReferenceNumber] = useState('');
	const [notes, setNotes] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await makeDeposit({
			amount: parseFloat(amount),
			payment_method: paymentMethod,
			reference_number: referenceNumber,
			notes
		});
		if (result.success) {
			toast.success('Deposit successful');
			// Reset form
			setAmount('');
			setPaymentMethod('cash');
			setReferenceNumber('');
			setNotes('');
		} else {
			toast.error(`Deposit failed: ${result.error}`);
		}
	};

	return (
		<div className="container mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>Make a Deposit</CardTitle>
					<CardDescription>Add funds to the school&apos;s account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="amount">Amount</Label>
								<Input 
									id="amount" 
									placeholder="Enter deposit amount" 
									type="number" 
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="method">Payment Method</Label>
								<Select value={paymentMethod} onValueChange={setPaymentMethod}>
									<SelectTrigger id="method">
										<SelectValue placeholder="Select payment method" />
									</SelectTrigger>
									<SelectContent position="popper">
										<SelectItem value="cash">Cash</SelectItem>
										<SelectItem value="cheque">Cheque</SelectItem>
										<SelectItem value="bank_transfer">Bank Transfer</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="reference">Reference Number</Label>
								<Input 
									id="reference" 
									placeholder="Enter reference number (if applicable)" 
									value={referenceNumber}
									onChange={(e) => setReferenceNumber(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="notes">Notes</Label>
								<Input 
									id="notes" 
									placeholder="Add any additional notes" 
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
								/>
							</div>
							<Button type="submit">Submit Deposit</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default DepositPage;
