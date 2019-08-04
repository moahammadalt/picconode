import { update } from "utils/db";

export default async (req) => await update({
  table: "product_color_image",
  fields: Object.keys(req.body),
  values: Object.values(req.body),
  condition: `${req.key} = '${req.body[req.key]}'`,
  data: req.body
});
