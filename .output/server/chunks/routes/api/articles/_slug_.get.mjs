import { d as defineEventHandler } from '../../../runtime.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const params = event.context.params;
  if (params == null ? void 0 : params.slug) {
    return await prisma.post.findFirst({
      where: {
        friendly_url: params.slug
      },
      include: {
        category: true
      }
    });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
