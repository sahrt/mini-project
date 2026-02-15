import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    AlertTriangle,
    Info
} from 'lucide-react';

interface Causer {
    id: number;
    name: string;
    email: string;
}

interface Activity {
    id: number;
    log_name: string;
    description: string;
    subject_type: string | null;
    subject_id: number | null;
    causer: Causer | null;
    properties: any;
    created_at: string;
    created_at_human: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedActivities {
    data: Activity[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Filters {
    log_name?: string;
    user_id?: number;
    date_from?: string;
    date_to?: string;
    search?: string;
}

interface User {
    id: number;
    name: string;
}

interface Props {
    activities: PaginatedActivities;
    filters: Filters;
    logNames: string[];
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Activity Log',
        href: '/activity-log',
    },
];

// Fungsi untuk menentukan badge status berdasarkan log_name atau description
function getActivityBadge(activity: Activity) {
    const logName = activity.log_name.toLowerCase();
    const description = activity.description.toLowerCase();

    // Success patterns
    if (
        description.includes('created') ||
        description.includes('dibuat') ||
        description.includes('success') ||
        description.includes('berhasil') ||
        description.includes('login')
    ) {
        return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Success
            </Badge>
        );
    }

    // Warning patterns
    if (
        description.includes('updated') ||
        description.includes('diperbarui') ||
        description.includes('modified') ||
        description.includes('warning')
    ) {
        return (
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Warning
            </Badge>
        );
    }

    // Error patterns
    if (
        description.includes('deleted') ||
        description.includes('dihapus') ||
        description.includes('error') ||
        description.includes('failed') ||
        description.includes('gagal')
    ) {
        return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                <AlertCircle className="mr-1 h-3 w-3" />
                Error
            </Badge>
        );
    }

    // Default info
    return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Info className="mr-1 h-3 w-3" />
            Info
        </Badge>
    );
}

export default function ActivityLog({ activities, filters, logNames, users }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedLogName, setSelectedLogName] = useState(filters.log_name || '');
    const [selectedUser, setSelectedUser] = useState(filters.user_id?.toString() || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleFilter = () => {
        router.get('/activity-log', {
            search: search || undefined,
            log_name: selectedLogName || undefined,
            user_id: selectedUser || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setSelectedLogName('');
        setSelectedUser('');
        setDateFrom('');
        setDateTo('');
        router.get('/activity-log', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Log" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Activity Log</h1>
                        <p className="text-sm text-muted-foreground">
                            Monitor all system activities and changes
                        </p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="rounded-lg border bg-card p-4">
                    <div className="mb-4 flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <h2 className="font-semibold">Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search description..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                            />
                        </div>

                        {/* Log Name */}
                        <Select value={selectedLogName} onValueChange={setSelectedLogName}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {logNames.map((logName) => (
                                    <SelectItem key={logName} value={logName}>
                                        {logName.charAt(0).toUpperCase() + logName.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* User */}
                        <Select value={selectedUser} onValueChange={setSelectedUser}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Users" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                {users.map((user) => (
                                    <SelectItem key={user.id} value={user.id.toString()}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Date From */}
                        <Input
                            type="date"
                            placeholder="Date From"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />

                        {/* Date To */}
                        <Input
                            type="date"
                            placeholder="Date To"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex gap-2">
                        <Button onClick={handleFilter} size="sm">
                            Apply Filters
                        </Button>
                        <Button onClick={handleReset} variant="outline" size="sm">
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activities.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No activities found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                activities.data.map((activity) => (
                                    <TableRow
                                        key={activity.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => router.get(`/activity-log/${activity.id}`)}
                                    >
                                        <TableCell>
                                            {getActivityBadge(activity)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {activity.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {activity.log_name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {activity.causer ? (
                                                <div>
                                                    <div className="font-medium">{activity.causer.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {activity.causer.email}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">System</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {activity.subject_type ? (
                                                <div className="text-sm">
                                                    <span className="font-medium">{activity.subject_type}</span>
                                                    {activity.subject_id && (
                                                        <span className="text-muted-foreground"> #{activity.subject_id}</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{activity.created_at}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {activity.created_at_human}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {activities.last_page > 1 && (
                        <div className="flex items-center justify-between border-t px-4 py-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {activities.data.length} of {activities.total} results
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(activities.links[0]?.url)}
                                    disabled={activities.current_page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                <div className="flex items-center gap-1">
                                    {activities.links
                                        .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                        .map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => handlePageChange(link.url)}
                                                disabled={!link.url}
                                            >
                                                {link.label}
                                            </Button>
                                        ))
                                    }
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(activities.links[activities.links.length - 1]?.url)}
                                    disabled={activities.current_page === activities.last_page}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}