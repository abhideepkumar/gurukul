import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentProfile = ({ student }) => {
    const [showMore, setShowMore] = useState(false);

    if (!student) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{student.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Class:</strong> {student.classname}</p>
                <p><strong>Roll Number:</strong> {student.roll_number || 'N/A'}</p>
                <p><strong>Mobile:</strong> {student.phone_no}</p>
                <p><strong>Fathers Name:</strong> {student.fatherName}</p>

                {showMore && (
                    <div className="mt-4">
                        <p><strong>Admission ID:</strong> {student.admission_id}</p>
                        <p><strong>Date of Birth:</strong> {student.dob}</p>
                        <p><strong>Address:</strong> {student.address}</p>
                        <p><strong>Created At:</strong> {new Date(student.created_at).toLocaleString()}</p>
                    </div>
                )}

                <Button variant="outline" className="mt-4" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'View Less' : 'View More'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default StudentProfile;