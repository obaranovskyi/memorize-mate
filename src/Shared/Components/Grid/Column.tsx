type Props = {
  field: string;
  title: string;
  width?: string;
}

const Column = ({ field, title, width }: Props) => {
  return <div>
    {field} {title} {width}
  </div>
}

export default Column;
