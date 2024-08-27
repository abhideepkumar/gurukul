'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showClasses } from '../actions';
import Link from 'next/link';

export const handleFetchClasses = async () => {
    try {
        const { data, error } = await showClasses();
        if (error) throw error;
        localStorage.setItem('classes', JSON.stringify(data));
        return data;
    } catch (err) {
        console.error('Error fetching classes:', err);
        throw new Error('Failed to fetch classes');
    }
};

const AllClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const storedClasses = localStorage.getItem('classes');
            if (storedClasses) {
                setClasses(JSON.parse(storedClasses));
            } else {
                const data = await handleFetchClasses();
                setClasses(data);
            }
        } catch (err) {
            console.error('Error loading classes:', err);
            setError('Failed to load classes');
        } finally {
            setLoading(false);
        }
    };

    const refreshClasses = async () => {
        setLoading(true);
        try {
            const data = await handleFetchClasses();
            setClasses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-between items-center">
                    All Classes
                    <div>
                        <Button variant="outline" className="mr-2" onClick={refreshClasses}>
                            Refresh
                        </Button>
                        <Link href="#create-class" className="p-2 border-2 text-sm rounded-full hover:bg-slate-100">
                            Create Class
                        </Link>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of all classes</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Class Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.map((classItem) => (
                            <TableRow key={classItem.class_id}>
                                <TableCell>{classItem.class_id}</TableCell>
                                <TableCell>{classItem.class_name}</TableCell>
                                <TableCell>{classItem.class_desc}</TableCell>
                                <TableCell>{new Date(classItem.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AllClassesPage;