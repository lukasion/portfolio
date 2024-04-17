import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event);
  return await prisma.topic.create({
    data: {
      name: body.name,
      datetime: new Date(body.datetime)
    }
  });
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
