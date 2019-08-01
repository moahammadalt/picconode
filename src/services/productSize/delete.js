import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: "product_size",
  condition: `id = '${req.body.id}'`,
  data: req.body
});
