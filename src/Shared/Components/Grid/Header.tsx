import { Header as HeaderModel } from "./Models";

const Header = ({ value, projectionFn }: HeaderModel) => {
  return (<th scope="col">
    {projectionFn ? projectionFn(value) : value}
  </th>);
  ;
}

export default Header;
