import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
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

const index = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const query = getQuery(event);
  const pagination = {
    skip: query.page ? (parseInt(query.page) - 1) * 4 : 0,
    take: query.limit ? parseInt(query.limit) : 4
  };
  let whereClause = {
    lang: query.lang
  };
  if (query.withoutArticleId) {
    whereClause = {
      ...whereClause,
      id: {
        not: parseInt(query.withoutArticleId)
      }
    };
  }
  if (query.categoryId) {
    whereClause = {
      ...whereClause,
      category_id: parseInt(query.categoryId)
    };
  }
  return prisma.post.findMany({
    ...pagination,
    orderBy: {
      datetime: "desc"
    },
    include: {
      category: true
    },
    where: whereClause
  });
});

export { index as default };
//# sourceMappingURL=index.mjs.map
