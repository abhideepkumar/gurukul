import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function PaymentsHistory() {
  return (
    <Card className="p-4 rounded-md">
      <CardHeader>
        <CardTitle>Recently Fees Paid</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Trans ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell>
                  <div className="font-medium">{payment.studentName}</div>
                  <div className="text-sm text-muted-foreground">{payment.fatherName}</div>
                </TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
                <TableCell>{payment.amountPaid}</TableCell>
                <TableCell>{payment.paymentMode}</TableCell>
                <TableCell>{payment.paymentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export const recentPayments = [
  {
    paymentId: '123456789',
    paymentDate: '2023-04-15',
    paymentType: 'Tuition Fee',
    amountPaid: 'Rs 15,000',
    paymentMode: 'UPI',
    studentName: 'Rajesh Sharma',
    fatherName: 'Ramesh Sharma'
  },
  {
    paymentId: '987654321',
    paymentDate: '2023-04-12',
    paymentType: 'Exam Fee',
    amountPaid: 'Rs 2,500',
    paymentMode: 'Cash',
    studentName: 'Neha Gupta',
    fatherName: 'Suresh Gupta'
  },
  {
    paymentId: '456789123',
    paymentDate: '2023-04-10',
    paymentType: 'Hostel Fee',
    amountPaid: 'Rs 10,000',
    paymentMode: 'Bank Transfer',
    studentName: 'Amit Verma',
    fatherName: 'Mukesh Verma'
  },
  {
    paymentId: '789456123',
    paymentDate: '2023-04-05',
    paymentType: 'Library Fee',
    amountPaid: 'Rs 500',
    paymentMode: 'Cash',
    studentName: 'Priya Singh',
    fatherName: 'Ajay Singh'
  }
]
