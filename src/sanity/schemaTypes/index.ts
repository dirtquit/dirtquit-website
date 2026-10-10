import author from "./author";
import { callout, comparisonTable, serviceLink } from "./blockTypes";
import category from "./category";
import post from "./post";
import seoFields from "./seo";

export const schemaTypes = [
  author,
  category,
  post,
  seoFields,
  callout,
  comparisonTable,
  serviceLink,
];
export default schemaTypes;
