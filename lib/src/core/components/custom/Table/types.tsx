import { RefObject } from 'react';
import {
  CellRendererParams,
  OnRowClickParams,
  TableColumn,
  TableSize,
} from '../../Table/VirtualTableProps'

export type ParentVirtualTableRowProps<T> = {
  style: any,
  size: TableSize,
  parentRowData: T; // to modify, cause it's a parent
  variantsData: T;
  rowIndex: number;
  onRowClick?: (props: OnRowClickParams<any>) => void;
  columns: TableColumn[];
  hoverRow?: boolean;
  cellRenderer: (params: CellRendererParams<T>) => React.ReactNode;

  outerRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
  itemCount: number;
  onScroll: (params: {
      scrollDirection: "forward" | "backward",
      scrollOffset: number,
      scrollUpdateWasRequested: boolean;
  }) => void;
  itemSize: number;
};