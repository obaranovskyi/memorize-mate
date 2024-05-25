type Props = {
  value: string | number;
  projectionFn?: (value: string | number) => any;
};

const Cell = ({ value, projectionFn }: Props) => {
  return (<td scope="col">
    {projectionFn ? projectionFn(value) : value}
  </td>);
  ;
}

export default Cell;
