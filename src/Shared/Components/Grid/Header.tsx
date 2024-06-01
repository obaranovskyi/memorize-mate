import { Icon } from "../Icon/Icon";
import { Header as HeaderModel } from "./Models";

const Header = ({
  field,
  value,
  projectionFn,
  sort,
  width,
  onSortChanged
}: HeaderModel) => {
  const getArrow = () => {
    if (field !== sort?.sortBy) return '';

    const iconName = sort?.sortDirection === 'asc'
      ? 'ArrowDown'
      : 'ArrowUp';

    return <Icon
      iconName={iconName}
      size={12}
      className="mb-1"
    />
  };

  const getReverseSortDirection = () => {
    return sort?.sortDirection === 'asc' && field === sort?.sortBy
      ? 'desc'
      : 'asc';
  };

  return (
    <th
      scope="col"
      role="button"
      {...(width ? { width } : {})}
      onClick={() => onSortChanged(field, getReverseSortDirection())}
    >
      <span>{projectionFn ? projectionFn(value) : value}</span>
      {getArrow()}
    </th>
  );
};

export default Header;
