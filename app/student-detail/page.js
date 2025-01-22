"use client";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Receipt,
  History,
  CreditCard,
  ChevronRight,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { fetchAstudent, fetchFutureReceipts, fetchFeeHistory, processPayment } from "../actions";

// Redesigned StudentProfile component
const StudentProfile = ({ student }) => {
  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-3 p-2">
      <Icon className="h-5 w-5 text-gray-500" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "N/A"}</p>
      </div>
    </div>
  );

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{student.full_name}</h2>
            <Badge variant="outline" className="mt-1">
              Class {student.classname}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4">
          <InfoItem icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />
          <InfoItem icon={Phone} label="Phone Number" value={student.phone_no} />
          <InfoItem icon={User} label="Father's Name" value={student.fatherName} />
          <InfoItem icon={Mail} label="Admission ID" value={student.admission_id} />
          <InfoItem icon={MapPin} label="Address" value={student.address} />
        </div>
      </CardContent>
    </Card>
  );
};

// Payment Dialog Component
const PaymentDialog = ({ selectedReceipts, studentId, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const totalAmount = selectedReceipts.reduce((sum, receipt) => sum + receipt.fee_amount, 0);
  const [isOpen, setIsOpen] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await processPayment(studentId, selectedReceipts, totalAmount);
      if (response.success) {
        onSuccess();
        setIsOpen(false);
      } else {
        throw new Error("Payment processing failed");
      }
    } catch (err) {
      setError(err.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={selectedReceipts.length === 0}>
          Process Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Selected Receipts</h4>
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {selectedReceipts.map((receipt, index) => (
                <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>{new Date(receipt.due_date).toLocaleDateString()}</span>
                  <span className="font-medium">₹{receipt.fee_amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                Processing... <Progress value={80} className="ml-2" />
              </>
            ) : (
              "Confirm Payment"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main StudentDetails component
const StudentDetails = () => {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");
  const [student, setStudent] = useState(null);
  const [futureReceipts, setFutureReceipts] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    if (!studentId) return;
    setIsLoading(true);
    try {
      const [studentResponse, receiptsResponse, historyResponse] = await Promise.all([
        fetchAstudent(studentId),
        fetchFutureReceipts(studentId),
        fetchFeeHistory(studentId),
      ]);
      setStudent(studentResponse.data[0]);
      setFutureReceipts(receiptsResponse.data);
      setTransactionHistory(historyResponse.data);
    } catch (err) {
      setError("Failed to fetch student data");
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const toggleReceiptSelection = (receipt) => {
    setSelectedReceipts((prev) => {
      const isSelected = prev.some((r) => r.due_date === receipt.due_date);
      return isSelected ? prev.filter((r) => r.due_date !== receipt.due_date) : [...prev, receipt];
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[600px] col-span-2 bg-green-50" />
          <Skeleton className="h-[600px] bg-green-50" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="payments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payments" className="flex items-center">
                <Receipt className="w-4 h-4 mr-2" />
                Pending Payments
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="w-4 h-4 mr-2" />
                Payment History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payments">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Selected Receipts Summary */}
                    {selectedReceipts.length > 0 && (
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Selected Payments</h3>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedReceipts([])}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {selectedReceipts.map((receipt, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{new Date(receipt.due_date).toLocaleDateString()}</span>
                              <span>₹{receipt.fee_amount.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t pt-2 mt-2 font-medium">
                            <div className="flex justify-between">
                              <span>Total</span>
                              <span>₹{selectedReceipts.reduce((sum, r) => sum + r.fee_amount, 0).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Future Receipts List */}
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {futureReceipts
                          .filter((r) => !r.is_paid)
                          .map((receipt, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer ${
                                selectedReceipts.some((r) => r.due_date === receipt.due_date)
                                  ? "border-primary bg-primary/5"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => toggleReceiptSelection(receipt)}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <CreditCard className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium">Due Date</p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(receipt.due_date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <p className="font-medium">₹{receipt.fee_amount.toFixed(2)}</p>
                                  <Badge variant={receipt.is_paid ? "success" : "secondary"} className="mt-1">
                                    {receipt.is_paid ? "Paid" : "Pending"}
                                  </Badge>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>

                    <PaymentDialog
                      selectedReceipts={selectedReceipts}
                      studentId={studentId}
                      onSuccess={() => {
                        setSelectedReceipts([]);
                        fetchAllData();
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="pt-6">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {transactionHistory.map((transaction, index) => (
                        <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">Payment #{transaction.reference_number}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(transaction.payment_time).toLocaleString()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                transaction.status === "Success"
                                  ? "success"
                                  : transaction.status === "Pending"
                                  ? "warning"
                                  : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium">₹{transaction.amount.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Payment Method</p>
                              <p className="font-medium">{transaction.payment_method}</p>
                            </div>
                            {transaction.remark && (
                              <div className="col-span-2">
                                <p className="text-gray-500">Remark</p>
                                <p className="font-medium">{transaction.remark}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {transactionHistory.length === 0 && (
                        <div className="text-center py-8">
                          <History className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">No transaction history available</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <StudentProfile student={student} />
        </div>
      </div>
    </div>
  );
};

// Page component with Suspense
const StudentDetailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[600px] col-span-2" />
            <Skeleton className="h-[600px]" />
          </div>
        </div>
      }
    >
      <StudentDetails />
    </Suspense>
  );
};

export default StudentDetailPage;
