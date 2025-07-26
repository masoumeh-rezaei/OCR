import React, { useMemo, forwardRef } from 'react';

export type InputWithIconProps = {
    label: string;
    icon: React.ReactNode;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    error?: string | false;
    children?: React.ReactNode;
};

const InputWithIconComponent = (
    { label, icon, inputProps = {}, error, children }: InputWithIconProps,
    ref: React.Ref<HTMLInputElement>
) => {
    const hasError = Boolean(error);

    // Add default email pattern if type is 'email' and pattern is not already set
    const enhancedInputProps = useMemo(() => {
        if (inputProps.type === 'email' && !inputProps.pattern) {
            return {
                ...inputProps,
                pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                title: 'Please enter a valid email address.',
            };
        }
        return inputProps;
    }, [inputProps]);

    const inputClassName = useMemo(
        () => 'w-full px-4 py-4 focus:outline-none bg-transparent dark:text-gray-200',
        []
    );

    const wrapperClassName = useMemo(
        () =>
            `flex items-center rounded-lg px-3 mt-1
      ${hasError ? 'bg-red-100 dark:border-red-400' : 'bg-gray-200 dark:border-white'}
      dark:bg-transparent border ${hasError ? 'border-red-400' : 'border-transparent'}`,
        [hasError]
    );

    return (
        <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
            <div className={wrapperClassName}>
                <div className="text-gray-800 dark:text-gray-200">{icon}</div>
                <input ref={ref} {...enhancedInputProps} className={inputClassName} />
                {children && <div className="ml-2">{children}</div>}
            </div>
            {hasError && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};


const InputWithIcon = React.memo(forwardRef(InputWithIconComponent));
export default InputWithIcon;