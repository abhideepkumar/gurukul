import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const DataCard = ({ subject, value, color }) => {
    return (
        <Card className={`m-2 ${color}`}>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle>{subject}</CardTitle>
                    </div>
                    <div>
                        <InformationCircleIcon className="h-5 w-5 ml-5" />
                    </div>
                </div>
                <CardDescription className="text-3xl font-semibold">{value}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default DataCard;
