import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const FeeSlabs = () => {
    return (
        <div>
            {' '}
            <div className="flex justify-center items-center h-screen">
                <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create FeeSlab</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter class name unique to fee slab" className="rounded-lg" />
                                </div>
                                {/* <div className="grid gap-2">
                                    <Label htmlFor="fees">Select Class</Label>
                                    <Select id="fees" className="rounded-lg">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="option1">Class 1</SelectItem>
                                            <SelectItem value="option2">Class 2</SelectItem>
                                            <SelectItem value="option3">Class 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}
                            </div>
                            <div className="grid gap-4">
                                <div className="">
                                    <Label htmlFor="tuition-fee">Total Amount:</Label>
                                    <Input
                                        id="tuition-fee"
                                        type="number"
                                        placeholder="Enter tuition fee"
                                        className="rounded-lg"
                                    />
                                </div>
                                {/* <div className="grid gap-2">
                                    <Label htmlFor="tuition-fee-2">Tuition Fee</Label>
                                    <Input
                                        id="tuition-fee-2"
                                        type="number"
                                        placeholder="Enter tuition fee"
                                        className="rounded-lg"
                                    />
                                </div> */}
                            </div>
                            <div className="col-span-full grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Explain fee details here"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="col-span-full grid gap-2">
                                <Label htmlFor="remark">Remark (Optional)</Label>
                                <Textarea
                                    id="remark"
                                    placeholder="Enter any remark, this will not be displayed to students"
                                    className="rounded-lg"
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" className="text-red-500">
                            Cancel
                        </Button>
                        <Button> Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default FeeSlabs;
