'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addClasses } from '../actions/page';
import AllClassesPage from './allClasses';
const CreateClass = () => {
    const handleClasses = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            class_name: formData.get('class_name'),
            class_desc: formData.get('class_desc'),
        };
        addClasses(data);
        event.target.reset();
    };

    return (
        <div>
            <AllClassesPage />
            <div className="flex justify-center items-center h-screen" id='create-class'>
                <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create New Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleClasses}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="class_name">Class Name</Label>
                                    <Input
                                        id="class_name"
                                        name="class_name"
                                        placeholder="Enter the class name"
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full grid gap-2">
                                <Label htmlFor="class_desc">Class Description</Label>
                                <Textarea
                                    id="class_desc"
                                    name="class_desc"
                                    placeholder="Enter a brief description of the class"
                                    className="rounded-lg"
                                />
                            </div>
                            <CardFooter className="col-span-full flex justify-between">
                                <Button type="button" variant="outline" className="text-red-500">
                                    Cancel
                                </Button>
                                <Button type="submit">Create</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateClass;
