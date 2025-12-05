'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`/?${params.toString()}`);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
                type="text"
                className="block w-full p-3 pl-10 text-sm border rounded-lg bg-slate-900 border-slate-700 placeholder-slate-400 text-white focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Search for movies..."
                onChange={(e) => {
                    setTimeout(() => handleSearch(e.target.value), 300);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}