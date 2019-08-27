import { Params } from "@fortawesome/fontawesome-svg-core";

export interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}
