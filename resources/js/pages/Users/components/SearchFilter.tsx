import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchFilterProps {
    search: string;
    role: string;
    onSearchChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onReset?: () => void;
}

export default function SearchFilter({
    search,
    role,
    onSearchChange,
    onRoleChange,
    onReset,
}: SearchFilterProps) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <Input
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="md:w-72"
            />

            {/* Filter */}
            <div className="flex gap-2">
                <select
                    value={role}
                    onChange={(e) => onRoleChange(e.target.value)}
                    className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    <option value="">Semua Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>

                {onReset && (
                    <Button
                        variant="outline"
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                )}
            </div>
        </div>
    );
}