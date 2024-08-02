/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NXaemzc43fZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export default function Component() {
    return (
        <div className="flex min-h-screen w-full">
            <aside className="bg-background border-r border-border flex flex-col justify-between py-6 px-4 w-64 shrink-0">
                <nav className="space-y-4">
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-muted/50 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <LayoutGridIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-muted/50 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <UsersIcon className="w-5 h-5" />
                        <span>Students</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-muted/50 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <DollarSignIcon className="w-5 h-5" />
                        <span>Create fees</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-muted/50 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <SettingsIcon className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>
                </nav>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                    <LogOutIcon className="w-5 h-5" />
                    <span className="font-medium text-foreground">Sign out</span>
                </div>
            </aside>
            <div className="flex-1 bg-muted/40 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="relative w-full max-w-md">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search a student to take actions"
                            className="pl-10 pr-4 py-2 rounded-md w-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            CTRL + K
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="bg-green-100 p-4 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="text-muted-foreground">Total Cash in</div>
                            <div className="text-2xl font-bold">Rs 84,800</div>
                        </div>
                    </Card>
                    <Card className="bg-red-100 p-4 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="text-muted-foreground">Total Cash out</div>
                            <div className="text-2xl font-bold">Rs 54,800</div>
                        </div>
                    </Card>
                    <Card className="bg-blue-100 p-4 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="text-muted-foreground">Received percent</div>
                            <div className="text-2xl font-bold">47%</div>
                        </div>
                    </Card>
                </div>
                <Card className="p-4 rounded-md">
                    <CardHeader>
                        <CardTitle>Recently Fees Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Mode</TableHead>
                                    <TableHead>Trans ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>2023-04-15</TableCell>
                                    <TableCell>Tuition Fee</TableCell>
                                    <TableCell>Rs 15,000</TableCell>
                                    <TableCell>UPI</TableCell>
                                    <TableCell>123456789</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2023-04-12</TableCell>
                                    <TableCell>Exam Fee</TableCell>
                                    <TableCell>Rs 2,500</TableCell>
                                    <TableCell>Cash</TableCell>
                                    <TableCell>987654321</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2023-04-10</TableCell>
                                    <TableCell>Hostel Fee</TableCell>
                                    <TableCell>Rs 10,000</TableCell>
                                    <TableCell>Bank Transfer</TableCell>
                                    <TableCell>456789123</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2023-04-05</TableCell>
                                    <TableCell>Library Fee</TableCell>
                                    <TableCell>Rs 500</TableCell>
                                    <TableCell>Cash</TableCell>
                                    <TableCell>789456123</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function DollarSignIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}

function LayoutGridIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    );
}

function LogOutIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    );
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function SettingsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
