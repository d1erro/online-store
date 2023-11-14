'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#000000',
        },
    },
});

export default function MyThemeProvider({
    children,
}: {
    children: ReactNode;
}): React.ReactNode {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
