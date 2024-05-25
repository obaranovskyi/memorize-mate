import { Children, ReactNode } from "react";
import Cell from "./Cell";
import Header from "./Header";

type Props = {
  children: ReactNode; // TODO: this should understand what components will be passed
  dataSource: {
    data: any[];
  }
}

const Grid = ({ children, dataSource }: Props) => {
  const childrenArr = Children.toArray(children);

  function chunk(arr: any, chunkSize: number) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }

  childrenArr.forEach(item => {
    console.log(item)
  })

  const headers = childrenArr.map((item: any, index: number) =>
    <Header
      key={index}
      value={item.props.title}
      projectionFn={item.props.projectionFn}
    />);

  const chunks = chunk(dataSource.data, headers.length);
  const trs = chunks.map((row, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {row.map((cell: any, cellIndex: number) => {
          return (
            <Cell
              key={cellIndex}
              value={cell[(childrenArr[cellIndex] as any).props.field]}
              projectionFn={cell[(childrenArr[cellIndex] as any).props.projectionFn]}
            />
          );
        })}
      </tr>
    );
  })



  return (
    <table className="table">
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {trs}
      </tbody>
    </table>
  );
}

export default Grid;
