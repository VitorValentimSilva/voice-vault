import { ComponentProps, RefAttributes } from 'react';
import { View } from 'react-native';

import { Text, TextClassContext } from '@/component/ui/text';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: ComponentProps<typeof View> & RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'flex flex-col gap-6 rounded-xl border border-border bg-card py-6 shadow-sm shadow-black/5',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({ className, ...props }: ComponentProps<typeof View> & RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({
  className,
  ref,
  ...props
}: ComponentProps<typeof Text> & RefAttributes<typeof Text>) {
  return (
    <Text
      ref={ref}
      aria-level={3}
      className={cn('font-semibold leading-none', className)}
      role="heading"
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: ComponentProps<typeof Text> & RefAttributes<typeof Text>) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<typeof View> & RefAttributes<View>) {
  return <View className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<typeof View> & RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
