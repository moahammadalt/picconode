import { update } from "utils/db";

export default async (req) => await update({
  table: "size",
  fields: Object.keys(req.body),
  values: Object.values(req.body),
  condition: `slug = '${req.params.slug}'`,
  data: req.body
});
