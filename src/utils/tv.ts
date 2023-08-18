import { TV, tv as tailwindVariantBase } from "tailwind-variants";

export const tv: TV = (opts, config) =>
  tailwindVariantBase(
    {
      ...opts,
    },
    {
      ...config,
      twMerge: config?.twMerge ?? true,
    }
  );
