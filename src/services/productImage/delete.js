import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: 'product_color_image',
  fields: req.key,
  values: req.body[req.key],
  data: req.body
});
