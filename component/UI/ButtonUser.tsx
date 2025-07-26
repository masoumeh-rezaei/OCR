// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-primary text-white hover:bg-primary/90',
                secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                destructive: 'bg-red-500 text-white hover:bg-red-600',
                outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
                ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 px-3 text-sm',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10 p-0',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, variant, size, isLoading = false, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                disabled={isLoading || disabled}
                type={props.type ?? 'button'}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
