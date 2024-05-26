import { Children, ReactNode, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { chunk } from "../../Util/Array";
import Cell from "./Cell";
import Header from "./Header";
import { ColumnType } from "./Models";
import Paginator from "./Paginator";
import Table from "react-bootstrap/Table";

type Props = {
  children: ReactNode; // TODO: this should understand what components will be passed
  dataSource: {
    data: any[];
    pageSize: number;
    page?: number;
  }
}

const Grid = ({ children, dataSource }: Props) => {
  const [page, setPage] = useState(dataSource.page || 1);
  const [pageSize] = useState(dataSource.pageSize);

  const childrenArr = Children.toArray(children).map((c: any) => c.props) as ColumnType[];
  const headers = childrenArr.map((item: ColumnType, index: number) =>
    <Header
      key={index}
      value={item.title}
      projectionFn={item.headerProjectionFn}
    />);
  const pages = chunk(dataSource.data, pageSize);
  const pageRows = pages[page - 1];
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
