import { Children, ReactNode, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { chunk, sort as sortList } from "../../Util/Array";
import Cell from "./Cell";
import Header from "./Header";
import { ColumnType, SearchInput, SortDirection } from "./Models";
import Paginator from "./Paginator";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import NoItems from "./NoItems";
import AmountPerPage from "./AmountPerPage";

type Props = {
  children: ReactNode; // TODO: this should understand what components will be passed
  sort?: {
    sortBy?: string;
    sortDirection?: SortDirection;
  };
  search?: SearchInput;
  dataSource: {
    data: any[];
    pageSize: number;
    page?: number;
  },
  noItemsLabel?: string;
}

const Grid = ({
  children,
  dataSource,
  search,
  sort,
  noItemsLabel
}: Props) => {
  const [page, setPage] = useState(dataSource.page || 1);
  const [searchValue, setSearchValue] = useState('');
  const [pageSize, setPageSize] = useState(dataSource.pageSize ?? 15);

  const childrenArr = Children.toArray(children).map((c: any) => c.props) as ColumnType[];

  const [sortBy, setSortBy] = useState(sort?.sortBy ?? childrenArr[0].field);
  const [sortDirection, setSortDirection] = useState(sort?.sortDirection ?? 'asc');

  const handleSortChange = (sortBy: string, sortDirection: SortDirection) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  const headers = childrenArr.map((item: ColumnType, index: number) =>
    <Header
      key={index}
      value={item.title}
      projectionFn={item.headerProjectionFn}
      sort={{ sortBy, sortDirection }}
      field={item.field}
      onSortChanged={handleSortChange}
      width={item.width}
    />);

  const filteredData = search?.onSearch
    ? search.onSearch(searchValue)
    : dataSource.data.filter(item =>
      Reflect.ownKeys(item)
        .some(key =>
          new RegExp(searchValue, 'gi').test((item as any)[key]))
    );
  const filteredSortedData = sortList(filteredData, sortDirection, sortBy);
  const pages = chunk(filteredSortedData, pageSize);
  const pageRows = pages[page - 1] ?? [];
  const trs = pageRows
    .map((row: any, rowIndex: number) => {
      return (
        <tr key={rowIndex}>
          {childrenArr.map((cell: ColumnType, cellIndex: number) => {
            return (
              <Cell
                key={cellIndex}
                value={row[cell.field]}
                projectionFn={cell.cellProjectionFn}
              />
            );
          })}
        </tr>
      );
    });

  return (
    <Container>
      {search && <Row className="py-3">
        <Col md={6} xs={12} className="p-0">
          <Form.Control
            type="text"
            placeholder={search.placeholder}
            aria-label={search.ariaLabel ?? search.placeholder}
            disabled={search.isDisabled}
            onChange={event => {
              setSearchValue(event.target.value);
              setPage(1);
            }}
          />
        </Col>
      </Row>}
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {trs}
          </tbody>
        </Table>
      </Row>
      {!pageRows.length && <NoItems label={noItemsLabel} />}
      <Row className="my-4">
        <Col xs={12} md={10} className="p-0">
          <Paginator
            currPage={page}
            pages={pages.map((_, index) => index + 1)}
            onPageChange={setPage}
          />
        </Col>
        <Col xs={12} md={2} className="p-0">
          <AmountPerPage
            pageSize={pageSize}
            onPageSizeChanged={pageSize => setPageSize(pageSize)}
          />
        </Col>
      </Row>
    </Container >
  );
}

export default Grid;
