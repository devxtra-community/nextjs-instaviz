
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileCard() {
    return (
        <div className="w-full h-full">
            <div className="absolute top-4 left-4">
                <Skeleton className="h-9 bg-gray-200 w-[110px]" />
            </div>
            <div className="hidden md:flex absolute top-4 right-4 gap-3">
                <Skeleton className="h-9 bg-gray-200 w-20" />
                <Skeleton className="h-9 bg-gray-200 w-20" />
                <Skeleton className="h-9 bg-gray-200 w-20" />
                <Skeleton className="h-9 bg-gray-200 w-20" />
            </div>

            <div className="absolute top-3 right-4 md:hidden">
                <Skeleton className="h-9 bg-gray-200 w-10" />
            </div>
            <div className="flex flex-col justify-between items-center gap-3">
                <Skeleton className="h-[140px] w-[290px] rounded-xl bg-gray-200" />
                <div className="space-y-2 flex flex-col justify-center items-center">
                    <Skeleton className="h-4 bg-gray-200 w-[250px]" />
                    <Skeleton className="h-4 bg-gray-200 w-[200px]" />
                </div>
                <div>
                    <Skeleton className="h-10 bg-gray-200 w-[120px] rounded-3xl" />
                </div>
            </div>
        </div>
    );
}

