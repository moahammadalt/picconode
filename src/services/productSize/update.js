import { update } from "utils/db";

export default async (req) => await update({
  table: "product_size",
  fields: Object.keys(req.body),
  values: Object.values(req.body),
  condition: `product_id = '${req.body.product_id}' AND size_id= '${req.body.size_id}'`,
  data: req.body
});
