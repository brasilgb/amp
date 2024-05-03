import { ButtonHTMLAttributes } from 'react';

export default function AuthButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex w-full items-center justify-center py-2 bg-emerald-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase hover:bg-emerald-600 focus:bg-emerald-700 active:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition ease-in-out duration-300 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
