import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpFormComponent } from '../SignUpFormComponent';
import { Button as SignUpButton } from '../button.styled';
import { Input } from '../../input/input.styled';
import { getStyledComponent, mockFetch } from './utils';

const setInputValue = (name: string, value: string) => {
    const input = getStyledComponent(Input, name);
    fireEvent.change(input, { target: { value } });
};

const fillForm = async () => {
    await waitFor(() => {
        setInputValue('email', 'pavel.a.poltavets@gmail.com');
        setInputValue('username', 'pavel poltavets');
        setInputValue('password', '12345678');
        setInputValue('passwordConfirm', '12345678');
    });
};

afterEach(cleanup);
beforeAll(() => jest.spyOn(window, 'fetch'));

describe('SignUpForm rendering', () => {
    beforeEach(() => (window.fetch as any).mockImplementation(mockFetch()));

    it('should render empty form', () => {
        const { asFragment } = render(<SignUpFormComponent />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render filled form', async () => {
        const { asFragment } = render(<SignUpFormComponent />);
        await fillForm();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should set username on change', async () => {
        render(<SignUpFormComponent />);
        act(() => setInputValue('username', 'Albert Einstein'));
        expect(await screen.findByRole((_, e: any) =>
           e.name === 'username' && e.value === 'Albert Einstein'
        )).toBeInTheDocument();
      })
});

describe('SignUpForm client errors validation', () => {
    beforeEach(() => (window.fetch as any).mockImplementation(mockFetch()));

    it('should show all client validation errors after Sign Up is clicked when fields are empty', () => {
        const { asFragment } = render(<SignUpFormComponent />);
        fireEvent.click(getStyledComponent(SignUpButton));
        expect(asFragment()).toMatchSnapshot();
    });

    it('should show error if incorrect email was set', async () => {
        const { asFragment } = render(<SignUpFormComponent />);
        await fillForm();
        act(() => setInputValue('email', 'pavel.a.poltavets'));
        fireEvent.click(getStyledComponent(SignUpButton));
        expect(asFragment()).toMatchSnapshot();
    });

    it('should show error if incorrect password confirmation was set', async () => {
        const { asFragment } = render(<SignUpFormComponent />);
        await fillForm();
        act(() => setInputValue('passwordConfirm', '11111111'));
        fireEvent.click(getStyledComponent(SignUpButton));
        expect(asFragment()).toMatchSnapshot();
    });

    it('should show error if incorrect password length was set', async () => {
        const { asFragment } = render(<SignUpFormComponent />);
        await fillForm();
        act(() => {
            setInputValue('password', '1234567');
            setInputValue('passwordConfirm', '1234567');
        });
        fireEvent.click(getStyledComponent(SignUpButton));
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('SignUpForm server errors validation', () => {
    it('should show error after check user name', async () => {
        (window.fetch as any).mockImplementationOnce(mockFetch({
            status: 400,
            errors: {
                username: {
                    code: 'already_taken',
                    message: 'This name is already taken'
                }
            }
        }));
        render(<SignUpFormComponent />);
        act(() => setInputValue('username', 'Bill Gates'));

        expect(await screen.findByText(/This name is already taken/)).toBeInTheDocument();
    });

    it('should show error if server returs throttled', async () => {
        (window.fetch as any).mockImplementation(mockFetch(undefined, {
            status: 429,
            errors: {
                non_field_errors: {
                    code: 'throttle',
                    message: 'You request was throttled. Plesae try again in 56 sec.'
                }
            }
        }));
        render(<SignUpFormComponent />);
        await fillForm();
        await waitFor(() => {
            fireEvent.click(getStyledComponent(SignUpButton));
        });

        expect(await screen.findByText(/You request was throttled. Plesae try again in 56 sec./)).toBeInTheDocument();
    });

    it('should show error if server returns random internal error 500-526', async () => {
        (window.fetch as any).mockImplementation(mockFetch(undefined, {
            status: 500 + Math.floor(26.0 * Math.random()),
            statusText: 'Internal Server Error Status Text'
        }));
        render(<SignUpFormComponent />);
        await fillForm();
        await waitFor(() => {
            fireEvent.click(getStyledComponent(SignUpButton));
        });

        expect(await screen.findByText(/Server Error: Internal Server Error Status Text/)).toBeInTheDocument();
    });
});