
"use client"

import { useTheme } from 'next-themes';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

function ThemedImage(props: Omit<DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref" | "src" | "alt" >) {
    const { resolvedTheme } = useTheme();
    let src;

    switch (resolvedTheme) {
        case 'light':
            src = '/hero-light.png';
            break;
        case 'dark':
            src = '/hero-dark.png';
            break;
        default:
            src = '/hero-dark.png';
            break;
    }

    return (
        <img {...props} src={src} alt="challenges page" />
    );
}

export default ThemedImage;