import { ITheme } from './ITheme';

export const GRAY_THEME: ITheme = {
    name: 'Gray',
    color: {
        background: 'white',
        border: '#888888',
        error: '#FE0200',
        text: '#3A3A3A',
        subText: '#3C3C3C'
    },
    fontFamily: 'Roboto',
    fontSize: {
        title: '40px',
        label: '20px',
        text: '14px'
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
    },
    padding: {
        inner: '8px'
    },

    button: {
        borderRadius: '6px',
        background: '#DADADA'
    }
};