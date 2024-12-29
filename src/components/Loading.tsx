import { LucideLoaderCircle } from "lucide-react";

export function Loading() {
    return (
        <div className="flex items-center justify-center space-x-2">
            <LucideLoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2">Loading...</span>
        </div>
    );
}
