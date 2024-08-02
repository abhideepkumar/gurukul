import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

export default function AddStudentPage() {
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <Card className="w-full max-w-3xl rounded-lg shadow-md ">
                <CardHeader>
                    <CardTitle>Add a Student</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter student's name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admission-no">Admission No.</Label>
                            <Input id="admission-no" placeholder="Enter admission number" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of birth</Label>
                            <Calendar mode="single" selected={new Date()} className="rounded-md border" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admission-no">Phone No.</Label>
                            <Input id="phone-no" placeholder="Enter phone number" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="f-name">{"Father's Name"}</Label>
                            <Input id="f-name" placeholder="Enter father's name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="m-name">{"Mother's Name"}</Label>
                            <Input id="m-name" placeholder="Enter mother's name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="class">Class</Label>
                            <Select id="class">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Class 1</SelectItem>
                                    <SelectItem value="2">Class 2</SelectItem>
                                    <SelectItem value="3">Class 3</SelectItem>
                                    <SelectItem value="4">Class 4</SelectItem>
                                    <SelectItem value="5">Class 5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="roll-no">Roll No. (optional)</Label>
                            <Input id="roll-no" placeholder="Enter roll number" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="custom-fee">Add Custom Fee</Label>
                        <Select id="custom-fee">
                            <SelectTrigger>
                                <SelectValue placeholder="Select custom fee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="100">₹100</SelectItem>
                                <SelectItem value="200">₹200</SelectItem>
                                <SelectItem value="300">₹300</SelectItem>
                                <SelectItem value="400">₹400</SelectItem>
                                <SelectItem value="500">₹500</SelectItem>
                            </SelectContent>
                        </Select>
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
