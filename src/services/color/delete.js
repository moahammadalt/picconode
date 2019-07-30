import { deleteRow } from "utils/db";

export default async (req) => await deleteRow({
  table: "color",
  condition: `slug = '${req.params.slug}'`,
  data: req.body
});
