'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addClasses } from '../actions';
import AllClassesPage from './allClasses';
import { toast } from 'react-hot-toast';

const CreateClass = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClasses = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);
        const data = {
            class_name: formData.get('class_name'),
            class_desc: formData.get('class_desc'),
        };

        try {
            await addClasses(data);
            toast.success('Class created successfully!');
            event.target.reset();
        } catch (error) {
            toast.error('Failed to create class. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <AllClassesPage />
            <div className="flex justify-center items-center  py-8" id='create-class'>
                <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create New Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-6" onSubmit={handleClasses}>
                            <div className="grid gap-2">
                                <Label htmlFor="class_name">Class Name</Label>
                                <Input
                                    id="class_name"
                                    name="class_name"
                                    placeholder="Enter the class name"
                                    className="rounded-lg"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="class_desc">Class Description</Label>
                                <Textarea
                                    id="class_desc"
                                    name="class_desc"
                                    placeholder="Enter a brief description of the class"
                                    className="rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-between mt-6">
                                <Button type="button" variant="outline" className="text-red-500">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating...' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateClass;
