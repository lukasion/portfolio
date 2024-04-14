import { u as useRuntimeConfig, a as useStorage, d as defineEventHandler, g as getQuery, c as createError } from '../../runtime.mjs';
import { templateRender } from '@vue-email/compiler';
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

const storageKey = "assets:emails";
async function useCompiler(filename, data, verbose = false) {
  const vueEmailOptions = useRuntimeConfig().public.vueEmail;
  let source = await useStorage(storageKey).getItem(filename);
  if (source instanceof Uint8Array)
    source = new TextDecoder().decode(source);
  const keys = await useStorage(storageKey).getKeys();
  const components = [];
  for (const key of keys) {
    let value = await useStorage(storageKey).getItem(key);
    if (value instanceof Uint8Array)
      value = new TextDecoder().decode(value);
    if (value && key.endsWith(".vue")) {
      components.push({
        name: key,
        source: value
      });
    }
  }
  if (!source)
    throw new Error(`Template ${filename} not found`);
  const template = await templateRender(
    filename,
    { source, components },
    data,
    {
      verbose,
      options: {
        baseUrl: vueEmailOptions?.baseUrl,
        i18n: vueEmailOptions?.i18n,
        tailwind: vueEmailOptions?.tailwind
      }
    }
  );
  return template;
}

const contact_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const template = await useCompiler("Contact.vue", {
      props: {
        name: query.name,
        email: query.email,
        message: query.message,
        phone: query.phone
      }
    });
    if (!template) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found"
      });
    }
    return template;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { contact_get as default };
//# sourceMappingURL=contact.get.mjs.map
