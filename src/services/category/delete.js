import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: "category",
  condition: `slug = '${req.params.slug}'`,
  data: req.body
});
