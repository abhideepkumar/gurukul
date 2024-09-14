'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showFeeSlabs } from '../actions';
import Link from 'next/link';

export const handleFetchFeeSlabs = async () => {
    try {
        const { data, error } = await showFeeSlabs();
        if (error) throw error;
        sessionStorage.setItem('feeSlabs', JSON.stringify(data));
        return data;
    } catch (err) {
        console.error('Error fetching fee slabs:', err);
        throw new Error('Failed to fetch fee slabs');
    }
};

const AllFeeSlabsPage = () => {
    const [feeSlabs, setFeeSlabs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFeeSlabs();
    }, []);

    const loadFeeSlabs = async () => {
        setLoading(true);
        setError(null);
        try {
            const storedFeeSlabs = sessionStorage.getItem('feeSlabs');
            if (storedFeeSlabs) {
                setFeeSlabs(JSON.parse(storedFeeSlabs));
            } else {
                const data = await handleFetchFeeSlabs();
                setFeeSlabs(data);
            }
        } catch (err) {
            console.error('Error loading fee slabs:', err);
            setError('Failed to load fee slabs');
        } finally {
            setLoading(false);
        }
    };

    const refreshFeeSlabs = async () => {
        setLoading(true);
        try {
            const data = await handleFetchFeeSlabs();
            setFeeSlabs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card className="w-full mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-between items-center">
                    All Fee Slabs
                    <div>
                        <Button variant="outline" className="mr-2" onClick={refreshFeeSlabs}>
                            Refresh
                        </Button>
                        <Link href="#create-fees" className="p-2 border-2 text-sm rounded-full hover:bg-slate-100">
                            Create Fee Slab
                        </Link>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of all fee slabs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Recurrence</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Remark</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feeSlabs.map((slab) => (
                            <TableRow key={slab.slab_id}>
                                <TableCell>{slab.name}</TableCell>
                                <TableCell>{slab.amount}</TableCell>
                                <TableCell>{slab.recurrence}</TableCell>
                                <TableCell>{slab.description}</TableCell>
                                <TableCell>{slab.remark}</TableCell>
                                <TableCell>{new Date(slab.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AllFeeSlabsPage;