import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: "product",
  condition: `slug = '${req.params.slug}'`,
  data: req.body
});
