import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, FilePenIcon, TrashIcon } from '@/assets/icons';
import Link from 'next/link';

export default function Showfees() {
    return (
        <div className="flex flex-col min-h-screen m-5">
            <header className="bg-black text-primary-foreground px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">Fee Structure</h2>
                </div>
                <Link
                    href="/create-fees/new-fees"
                    className="flex items-center align-middle hover:bg-white hover:text-black rounded-full p-3 transition ease-in-out duration-300"
                >
                    <p>Create New </p>
                    <PlusIcon className="w-5 h-5" />
                </Link>
            </header>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Recurring</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Transportation Fee</TableCell>
                            <TableCell>$50.00</TableCell>
                            <TableCell>2023-04-15</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <FilePenIcon className="w-4 h-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <TrashIcon className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Lab Fee</TableCell>
                            <TableCell>$25.00</TableCell>
                            <TableCell>2023-05-01</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <FilePenIcon className="w-4 h-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <TrashIcon className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <header className="bg-secondary text-secondary-foreground px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">Classes</h2>
                </div>
                <Link
                    href="/create-fees/new-class"
                    className="flex items-center align-middle hover:bg-black hover:text-white rounded-full p-3 transition ease-in-out duration-300"
                >
                    <p>Create New </p>
                    <PlusIcon className="w-5 h-5" />
                </Link>
            </header>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Base Amount</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Fee Structures</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>$100.00</TableCell>
                            <TableCell>2023-06-01</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">Transportation Fee</Badge>
                                    <Badge variant="outline">Lab Fee</Badge>
                                </div>
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <FilePenIcon className="w-4 h-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <TrashIcon className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">U.K.G</TableCell>
                            <TableCell>$150.00</TableCell>
                            <TableCell>2023-07-01</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">Transportation Fee</Badge>
                                </div>
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <FilePenIcon className="w-4 h-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <TrashIcon className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
