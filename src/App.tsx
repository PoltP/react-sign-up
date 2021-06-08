import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './theming/default-theme';
import { SignUpFormComponent } from './components/form/SignUpFormComponent';

export const App = () => {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <SignUpFormComponent />
    </ThemeProvider>
  );
};
