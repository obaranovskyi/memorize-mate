import Pagination from "react-bootstrap/Pagination";
import { range } from "../../Util/Array";


type Props = {
  pages: number[];
  currPage: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ pages, currPage, onPageChange }: Props) => {
  const styles = { fontSize: '0.8rem' };
  const prev = () => {
    onPageChange(
      currPage > 1
        ? currPage - 1
        : 1
    );
  };

  const next = () => {
    onPageChange(
      currPage < pages.length
        ? currPage + 1
        : pages.length
    );
  };

  const toPaginationElement = (page: number) => {
    return (
      <Pagination.Item
        onClick={() => onPageChange(page)}
        active={page === currPage}
        key={page}
        linkStyle={styles}
      >
        {page}
      </Pagination.Item >
    );
  }

  const toPagination = () => {
    const offset = 5;
    const ellipsisKey = 1000000000;

    // No items in the grid
    if (!pages.length) return toPaginationElement(1);

    // Less than five pages
    if (pages.length <= offset + 1) {
      return pages.map((page) => {
        return toPaginationElement(page);
      });

    }
    // Current page is close to the start
    if (currPage < offset)
      return [
        ...range(1, offset).map(toPaginationElement),
        <Pagination.Ellipsis key={ellipsisKey} linkStyle={styles} />,
        toPaginationElement(pages.length)
      ];

    // Current page is close to the end
    if (currPage >= pages.length - offset + 2)
      return [
        toPaginationElement(1),
        <Pagination.Ellipsis key={ellipsisKey} linkStyle={styles} />,
        ...range(pages.length - offset + 1, pages.length)
          .map(toPaginationElement),
      ];

    // Current page is in the middle
    return [
      toPaginationElement(1),
      <Pagination.Ellipsis key={ellipsisKey} linkStyle={styles} />,

      toPaginationElement(currPage - 1),
      toPaginationElement(currPage),
      toPaginationElement(currPage + 1),
      <Pagination.Ellipsis key={ellipsisKey + 1} linkStyle={styles} />,
      toPaginationElement(pages.length)
    ];

  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={prev}
        disabled={currPage === 1}
        linkStyle={styles}
      />
      {toPagination()}
      <Pagination.Next
        onClick={next}
        disabled={currPage === pages.length}
        linkStyle={styles}
      />
    </Pagination>
  );
}

export default Paginator;
