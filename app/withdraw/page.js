'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { makeWithdrawal } from '../actions';
import { toast } from 'react-hot-toast';

const WithdrawPage = () => {
	const [amount, setAmount] = useState('');
	const [withdrawalMethod, setWithdrawalMethod] = useState('cash');
	const [recipient, setRecipient] = useState('');
	const [purpose, setPurpose] = useState('');
	const [notes, setNotes] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await makeWithdrawal({
			amount: parseFloat(amount),
			withdrawal_method: withdrawalMethod,
			recipient,
			purpose,
			notes
		});
		if (result.success) {
			toast.success('Withdrawal successful');
			// Reset form
			setAmount('');
			setWithdrawalMethod('cash');
			setRecipient('');
			setPurpose('');
			setNotes('');
		} else {
			toast.error(`Withdrawal failed: ${result.error}`);
		}
	};

	return (
		<div className="container mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>Make a Withdrawal</CardTitle>
					<CardDescription>Withdraw funds from the school&apos;s account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="amount">Amount</Label>
								<Input 
									id="amount" 
									placeholder="Enter withdrawal amount" 
									type="number" 
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="method">Withdrawal Method</Label>
								<Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
									<SelectTrigger id="method">
										<SelectValue placeholder="Select withdrawal method" />
									</SelectTrigger>
									<SelectContent position="popper">
										<SelectItem value="cash">Cash</SelectItem>
										<SelectItem value="cheque">Cheque</SelectItem>
										<SelectItem value="bank_transfer">Bank Transfer</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="recipient">Recipient</Label>
								<Input 
									id="recipient" 
									placeholder="Enter recipient name" 
									value={recipient}
									onChange={(e) => setRecipient(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="purpose">Purpose</Label>
								<Input 
									id="purpose" 
									placeholder="Enter purpose of withdrawal" 
									value={purpose}
									onChange={(e) => setPurpose(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="notes">Additional Notes</Label>
								<Textarea 
									id="notes" 
									placeholder="Add any additional notes or details" 
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
								/>
							</div>
							<Button type="submit">Submit Withdrawal</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default WithdrawPage;
