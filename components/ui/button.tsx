import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';

import { TextClassContext } from '@/components/ui/text';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'bg-primary active:opacity-90 web:hover:opacity-90',
				destructive: 'bg-destructive active:opacity-90 web:hover:opacity-90',
				outline:
					'border border-input bg-background active:bg-accent web:hover:bg-accent web:hover:text-accent-foreground',
				secondary: 'bg-secondary active:opacity-80 web:hover:opacity-80',
				ghost: 'active:bg-accent web:hover:bg-accent web:hover:text-accent-foreground',
				link: 'web:underline-offset-4 web:hover:underline web:focus:underline '
			},
			size: {
				default: 'native:h-12 native:px-5 native:py-3 h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'native:h-14 h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

const buttonTextVariants = cva(
	'native:text-base text-sm font-medium text-foreground web:whitespace-nowrap web:transition-colors',
	{
		variants: {
			variant: {
				default: 'text-primary-foreground',
				destructive: 'text-destructive-foreground',
				outline: 'group-active:text-accent-foreground',
				secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
				ghost: 'group-active:text-accent-foreground',
				link: 'text-primary group-active:underline'
			},
			size: {
				default: '',
				sm: '',
				lg: 'native:text-lg',
				icon: ''
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<TextClassContext.Provider
				value={cn(
					props.disabled && 'web:pointer-events-none',
					buttonTextVariants({ variant, size })
				)}>
				<Pressable
					className={cn(
						props.disabled && 'opacity-50 web:pointer-events-none',
						buttonVariants({ variant, size, className })
					)}
					ref={ref}
					role="button"
					{...props}
				/>
			</TextClassContext.Provider>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
