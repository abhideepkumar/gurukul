'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const feeOptions = [
    { label: '₹100', value: '100' },
    { label: '₹200', value: '200' },
    { label: '₹300', value: '300' },
    { label: '₹400', value: '400' },
    { label: '₹500', value: '500' },
];

const classOptions = [
    { label: 'Class 1', value: '1' },
    { label: 'Class 2', value: '2' },
    { label: 'Class 3', value: '3' },
];

export default function AddStudentPage() {
    const [selectedFees, setSelectedFees] = useState({});
    const [selectedClass, setSelectedClass] = useState('');
    const [dob, setDob] = useState(new Date());

    const toggleFeeSelection = (feeValue) => {
        setSelectedFees((prev) => ({
            ...prev,
            [feeValue]: !prev[feeValue],
        }));
    };

    const selectedFeesText =
        feeOptions
            .filter((option) => selectedFees[option.value])
            .map((option) => option.label)
            .join(', ') || 'Select all fees that apply';

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-3xl rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle>Add a Student</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField id="name" label="Name" placeholder="Enter student's name" />
                        <InputField id="admission-no" label="Admission Id." placeholder="Enter admission id" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        {dob.toDateString()}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dob} onSelect={setDob} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <InputField id="phone-no" label="Phone No." placeholder="Enter phone number" />
                    </div>
                    <InputField id="fname" label="Father's Name" placeholder="Enter father's name" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="class">Class:</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        {selectedClass || 'Select Class'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Select a Class/Grade</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {classOptions.map((option) => (
                                        <DropdownMenuRadioItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={() => setSelectedClass(option.label)}
                                        >
                                            {option.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <InputField id="roll-no" label="Roll No. (optional)" placeholder="Enter roll number" />
                    </div>
                    <InputField id="address" label="Address:" placeholder="Enter permanent address" />
                    <div className="space-y-2">
                        <Label htmlFor="fee-structures">Add Fee Structures</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    {selectedFeesText}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Select Fee Structures</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {feeOptions.map((option) => (
                                    <DropdownMenuCheckboxItem
                                        key={option.value}
                                        checked={selectedFees[option.value]}
                                        onCheckedChange={() => toggleFeeSelection(option.value)}
                                    >
                                        {option.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 p-6">
                    <Button variant="outline" className="text-red-500">
                        Cancel
                    </Button>
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

const InputField = ({ id, label, placeholder }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} placeholder={placeholder} />
    </div>
);
