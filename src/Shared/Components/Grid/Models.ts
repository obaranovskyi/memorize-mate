export type SortDirection = "asc" | "desc";

export type Header = {
  sort?: {
    sortBy?: string;
    sortDirection?: SortDirection;
  };
  value: string;
  field: string;
  width?: string;
  projectionFn?: (value: string) => string;
  onSortChanged: (sortBy: string, sortDirection: SortDirection) => void;
};

type CellType = string | number;
export type Cell = {
  value: CellType;
  projectionFn?: (value: CellType) => any;
};

export type ColumnType = {
  title: string;
  field: string;
  width?: string;
  cellProjectionFn?: (value: CellType) => any;
  headerProjectionFn?: (value: string) => string;
};

export type SearchInput = {
  isDisabled?: boolean;
  placeholder: string;
  ariaLabel?: string;
  onSearch?: (searchValue: string) => any[];
};
