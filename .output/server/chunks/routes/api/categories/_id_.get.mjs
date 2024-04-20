import { d as defineEventHandler } from '../../../runtime.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const params = event.context.params;
  if (params == null ? void 0 : params.id) {
    return await prisma.category.findFirst({
      where: {
        id: parseInt(params.id)
      }
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
