import { ReactNode } from "react";

export type GridProps = {
  columns: [];
  data: [];
  topBarActions: ReactNode;
  bottomBarActions: ReactNode;
  scroll: boolean;
  props: any;
};
