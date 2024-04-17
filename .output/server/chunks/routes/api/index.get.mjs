import { d as defineEventHandler } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'redirect-ssl';
import 'nodemailer';
import '@dword-design/functions/dist/find-index.js';
import '@dword-design/functions/dist/omit.js';

const index_get = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  return await prisma.topic.findMany();
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
