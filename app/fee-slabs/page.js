'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addFeeSlabs } from '../actions';
import AllFeeSlabsPage from './allFees';
import toast from 'react-hot-toast';
import { EmptyValidator } from '@/utils/validate';

const FeeSlabs = () => {
    const handleFeeStructure = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // if(formData.)
        const data = {
            name: formData.get('name'),
            fees: formData.get('fees'),
            feetype: formData.get('feetype'),
            description: formData.get('description'),
            remark: formData.get('remark') || "No Remark",
        };
        const check = await EmptyValidator(data)
        console.log("Check",check)
        try {
            if(!check.status){
                toast.error(check.message);
                return;
            }
          const res=  await addFeeSlabs(data);
          console.log("Clg",res)
          if(res.status!=201)
          {
            console.error("Error in create fee slab:",res.error)
            toast.error(`Error found: ${res.error}`)

          }
            // e.target.reset();
        } catch (error) {
            console.error('Error adding fee slab:', error);
        }
    };

    return (
        <div>
            <AllFeeSlabsPage/>
            <div className="flex justify-center items-center min-h-screen py-6" id='create-fees'>
                <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create Fee Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleFeeStructure}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter name unique to fee slab"
                                        className="rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="feetype" required>Select Recurrence type:</Label>
                                    <Select name="feetype">
                                        <SelectTrigger className="rounded-lg">
                                            <SelectValue placeholder="Select Recurrence type"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                            <SelectItem value="halfyearly">Half-Yearly</SelectItem>
                                            <SelectItem value="annually">Annually</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div className="">
                                    <Label htmlFor="fees">Total Amount:</Label>
                                    <Input
                                        name="fees"
                                        id="fees"
                                        type="number"
                                        placeholder="Enter total fee amount"
                                        className="rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    name="description"
                                    id="description"
                                    placeholder="Explain fee details here"
                                    className="rounded-lg"
                                    required
                                />
                            </div>
                            <div className="col-span-full grid gap-2">
                                <Label htmlFor="remark">Remark (Optional)</Label>
                                <Textarea
                                    name="remark"
                                    id="remark"
                                    placeholder="Enter any remark, this will not be displayed to students"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="col-span-full flex justify-between mt-6">
                                <Button type="button" variant="outline" className="text-red-500">
                                    Cancel
                                </Button>
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FeeSlabs;
