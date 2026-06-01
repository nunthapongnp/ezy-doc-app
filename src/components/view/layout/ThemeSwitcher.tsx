'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch by waiting for client-side mounting
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="size-9 opacity-0">
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={toggleTheme}
        >
            {isDark ? (
                <Sun className="size-4 text-muted-foreground transition-all" />
            ) : (
                <Moon className="size-4 text-muted-foreground transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
