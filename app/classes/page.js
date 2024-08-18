import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CreateClass = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create New Class</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="class_name">Class Name</Label>
                                <Input id="class_name" placeholder="Enter the class name" className="rounded-lg" />
                            </div>
                        </div>
                        <div className="col-span-full grid gap-2">
                            <Label htmlFor="class_desc">Class Description</Label>
                            <Textarea
                                id="class_desc"
                                placeholder="Enter a brief description of the class"
                                className="rounded-lg"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" className="text-red-500">
                        Cancel
                    </Button>
                    <Button> Create</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateClass;
