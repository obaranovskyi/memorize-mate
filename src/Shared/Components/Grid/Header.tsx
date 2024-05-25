type Props = {
  value: string | number;
  projectionFn?: (value: string | number) => any;
};

const Header = ({ value, projectionFn }: Props) => {
  return (<th scope="col">
    {projectionFn ? projectionFn(value) : value}
  </th>);
  ;
}

export default Header;
