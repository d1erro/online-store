'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import { PaletteMode, useMediaQuery } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  primary: {
                      main: '#000000',
                      light: '#ffffff',
                      dark: '#282828',
                      contrastText: '#ffffff',
                  },
                  secondary: {
                      main: '#000000',
                      light: '#000000',
                      dark: '#cdcdcd',
                      contrastText: '#000000',
                  },
                  text: {
                      primary: '#202020',
                      secondary: '#2f2f2f',
                  },
                  background: {
                      default: '#e7e7e7',
                      paper: '#dbdbdb',
                  },
              }
            : {
                  primary: {
                      main: '#ffffff',
                      light: '#ffffff',
                      dark: '#282828',
                      contrastText: '#000000',
                  },
                  secondary: {
                      main: '#000000',
                      light: '#000000',
                      dark: '#1c1c1c',
                      contrastText: '#ffffff',
                  },
                  background: {
                      default: '#202020',
                      paper: '#191919',
                  },
                  text: {
                      primary: '#dfdfdf',
                      secondary: '#aeaeae',
                  },
              }),
    },
});

export default function MyThemeProvider({
    children,
}: {
    children: ReactNode;
}): ReactNode {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')),
        [prefersDarkMode],
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
