import { update } from "utils/db";

export default async (req) => await update({
  table: "product_color",
  fields: Object.keys(req.body),
  values: Object.values(req.body),
  condition: req.condition || `product_id = '${req.body.product_id}' AND color_id= '${req.body.color_id}'`,
  data: req.body
});
