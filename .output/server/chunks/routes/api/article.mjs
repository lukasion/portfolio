import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import OpenAI from 'openai';
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

const article = defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event);
  const openai = new OpenAI({
    apiKey: null
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": "Write an article about the best way to learn JavaScript. The article should be about 500 words long. The article should be written in a friendly tone. The article should include the following keywords: JavaScript, React, Node.js, Express.js, MongoDB, SQL, PostgreSQL, MySQL, and SQLite. Wrap each header in either a <h1>, <h2>, <h3>, <h4>, <h5>, or <h6> tag. Wrap each paragraph in <p> tag. Wrap each list item in <li> tag. A whole list should be wrapped in <ul> or <ol> tag."
      }
    ],
    temperature: 1,
    max_tokens: 1e3,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  const post = await prisma.post.create({
    data: {
      content: JSON.stringify(response.choices[0]),
      prompt: body.prompt
    }
  });
  console.log(post);
});

export { article as default };
//# sourceMappingURL=article.mjs.map
