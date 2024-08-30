import { HtmlTagDescriptor, Plugin, ResolvedConfig } from "vite";

interface Umami {
  id: string;
  src: string;
}

type UmamiOption = Umami | Umami[];

interface ViteUmamiOptions {
  enableDev?: boolean;
  umami?: UmamiOption;
}

function injectTag(options: UmamiOption): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = [];
  let properties: Umami[] = [];

  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  properties = properties.filter((property) => Boolean(property.id));

  if (!properties.length) return tags;

  for (const property of properties) {
    tags.push({
      tag: "script",
      attrs: {
        async: true,
        defer: true,
        "data-website-id": property.id,
        src: property.src,
      },
    });
  }

  return tags;
}

export function VitePluginUmami({
  enableDev = false,
  umami,
}: ViteUmamiOptions): Plugin {
  let viteConfig: ResolvedConfig;

  return {
    name: "vite-plugin-umami",

    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig;
    },

    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [];

      if (viteConfig.command === "serve" && !enableDev) return tags;

      if (umami) tags.push(...injectTag(umami));

      return tags;
    },
  };
}
