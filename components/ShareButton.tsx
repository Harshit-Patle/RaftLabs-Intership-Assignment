'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-all text-white"
        >
            {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
            {copied ? 'Copied!' : 'Share'}
        </button>
    );
}