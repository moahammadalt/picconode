import { update } from "utils/db";

export default async (req) => await update({
  table: "category",
  fields: Object.keys(req.body),
  values: Object.values(req.body),
  condition: `slug = '${req.params.slug}'`,
  data: req.body
});
