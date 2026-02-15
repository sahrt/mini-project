import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t px-6 py-3">
            <span className="text-sm text-gray-500">
                Halaman {currentPage} dari {totalPages}
            </span>

            <div className="flex gap-1">
                <Button
                    size="sm"
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Prev
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                        <Button
                            key={page}
                            size="sm"
                            variant={page === currentPage ? 'default' : 'outline'}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    size="sm"
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}