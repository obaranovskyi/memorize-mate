import { Children, ReactNode, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { chunk } from "../../Util/Array";
import Cell from "./Cell";
import Header from "./Header";
import { ColumnType, SearchInput } from "./Models";
import Paginator from "./Paginator";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import NoItems from "./NoItems";

type Props = {
  children: ReactNode; // TODO: this should understand what components will be passed
  search?: SearchInput;
  dataSource: {
    data: any[];
    pageSize: number;
    page?: number;
  }
}

const Grid = ({ children, dataSource, search }: Props) => {
  const [page, setPage] = useState(dataSource.page || 1);
  const [pageSize] = useState(dataSource.pageSize);
  const [searchValue, setSearchValue] = useState('');

  const childrenArr = Children.toArray(children).map((c: any) => c.props) as ColumnType[];
  const headers = childrenArr.map((item: ColumnType, index: number) =>
    <Header
      key={index}
      value={item.title}
      projectionFn={item.headerProjectionFn}
    />);

  const filteredData = search?.onSearch
    ? search.onSearch(searchValue)
    : dataSource.data.filter(item =>
      Reflect.ownKeys(item)
        .some(key =>
          new RegExp(searchValue, 'gi').test((item as any)[key]))
    );
  const pages = chunk(filteredData, pageSize);
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
            onChange={event => setSearchValue(event.target.value)}
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
      {/* TODO: Pass optional label */}
      {!pageRows.length && <NoItems />}
      <Row className="mt-4">
        {/* TODO: Make pagination responsive */}
        <Paginator
          currPage={page}
          pages={pages.map((_, index) => index + 1)}
          onPageChange={setPage}
        ></Paginator>
      </Row>
    </Container >
  );
}

export default Grid;
