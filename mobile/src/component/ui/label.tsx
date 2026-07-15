import * as LabelPrimitive from '@rn-primitives/label';
import { ComponentProps } from 'react';
import { Platform } from 'react-native';

import { cn } from '@/lib/utils';

export function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: ComponentProps<typeof LabelPrimitive.Text>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'flex select-none flex-row items-center gap-2',
        Platform.select({
          web: 'cursor-default leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        }),
        disabled && 'opacity-50'
      )}
      disabled={disabled}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <LabelPrimitive.Text
        className={cn(
          'text-sm font-medium text-foreground',
          Platform.select({ web: 'leading-none' }),
          className
        )}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}
