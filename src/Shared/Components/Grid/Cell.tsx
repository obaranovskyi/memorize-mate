import { Cell as CellModel } from "./Models";

const Cell = ({ value, projectionFn }: CellModel) => {
  return (<td>
    {projectionFn ? projectionFn(value) : value}
  </td>);
  ;
}

export default Cell;
