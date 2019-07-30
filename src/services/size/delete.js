import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: "size",
  condition: `slug = '${req.params.slug}'`,
  data: req.body
});
