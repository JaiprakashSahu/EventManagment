'use client';

import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <main className={isLoginPage ? '' : 'pt-16 min-h-screen'}>
            {children}
        </main>
    );
}
