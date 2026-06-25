import 'reflect-metadata';

import { bootstrap } from '@/bootstrap/app.bootstrap';

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
