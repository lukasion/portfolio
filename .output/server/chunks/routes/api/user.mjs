import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'nodemailer';
import '@dword-design/functions/dist/find-index.js';
import '@dword-design/functions/dist/omit.js';

const user = defineEventHandler(async (event, data) => {
  const prisma = new PrismaClient();
  const body = await readBody(event);
  const user = await prisma.user.create({
    data: {
      name: body.email,
      email: body.email,
      password: body.password
    }
  });
  console.log(user);
  prisma.$disconnect();
});

export { user as default };
//# sourceMappingURL=user.mjs.map
