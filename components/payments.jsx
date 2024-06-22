import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PaymentsHistory() {
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Last few payments</CardTitle>
                <CardDescription>Recent payments below.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Type</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentPayments.map((payment) => (
                            <TableRow key={payment.paymentId}>
                                <TableCell>
                                    <div className="font-medium">{payment.studentName}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {payment.studentEmail}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{payment.paymentType}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge className={`text-xs ${payment.paymentStatus === 'Completed' ? 'bg-green-100' : 'bg-red-100'}`} variant="outline">
                                        {payment.paymentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{payment.paymentDate}</TableCell>
                                <TableCell className="text-right">{payment.amountPaid}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export const recentPayments = [
    {
        paymentId: 1,
        studentName: 'Rajesh Sharma',
        studentEmail: 'rajesh.sharma@example.com',
        paymentType: 'Tuition Fee',
        paymentStatus: 'Completed',
        paymentDate: '2024-05-20',
        amountPaid: '₹20000.00',
    },
    {
        paymentId: 2,
        studentName: 'Neha Gupta',
        studentEmail: 'neha.gupta@example.com',
        paymentType: 'Library Fee',
        paymentStatus: 'Completed',
        paymentDate: '2024-05-18',
        amountPaid: '₹1500.00',
    },
    {
        paymentId: 3,
        studentName: 'Amit Verma',
        studentEmail: 'amit.verma@example.com',
        paymentType: 'Lab Fee',
        paymentStatus: 'Pending',
        paymentDate: '2024-05-15',
        amountPaid: '₹3000.00',
    },
    {
        paymentId: 4,
        studentName: 'Priya Singh',
        studentEmail: 'priya.singh@example.com',
        paymentType: 'Sports Fee',
        paymentStatus: 'Completed',
        paymentDate: '2024-05-10',
        amountPaid: '₹2500.00',
    },
    {
        paymentId: 5,
        studentName: 'Suresh Kumar',
        studentEmail: 'suresh.kumar@example.com',
        paymentType: 'Hostel Fee',
        paymentStatus: 'Completed',
        paymentDate: '2024-05-05',
        amountPaid: '₹18000.00',
    },
];
