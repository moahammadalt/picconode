import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: 'product_size',
  fields: req.key,
  values: req.body[req.key],
  data: req.body
});
