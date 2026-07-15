import * as SeparatorPrimitive from '@rn-primitives/separator';
import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}
