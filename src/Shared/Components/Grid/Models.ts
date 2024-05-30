type HeaderType = string | number;
export type Header = {
  value: HeaderType;
  projectionFn?: (value: HeaderType) => any;
};

type CellType = string | number;
export type Cell = {
  value: CellType;
  projectionFn?: (value: CellType) => any;
};

export type ColumnType = {
  title: string;
  field: string;
  cellProjectionFn?: (value: CellType) => any;
  headerProjectionFn?: (value: HeaderType) => any;
};

export type SearchInput = {
  isDisabled?: boolean;
  placeholder: string;
  ariaLabel?: string;
  onSearch?: (searchValue: string) => any[];
};
