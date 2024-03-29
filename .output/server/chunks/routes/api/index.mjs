import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
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

const index = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const query = getQuery(event);
  const pagination = {
    skip: query.page ? (parseInt(query.page) - 1) * 4 : 0,
    take: query.limit ? parseInt(query.limit) : 4
  };
  return prisma.post.findMany({
    ...pagination,
    orderBy: {
      datetime: "desc"
    },
    include: {
      category: true
    }
  });
});

export { index as default };
//# sourceMappingURL=index.mjs.map
