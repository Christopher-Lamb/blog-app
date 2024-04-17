import React from "react";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiDotsHorizontal } from "react-icons/bi";

interface PageClickData {
  selected: number;
}

interface PaginationProps {
  pageCount: number;
  onChange?: (pageNum: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onChange }) => {
  const handlePageClick = (data: PageClickData) => {
    if (onChange) onChange(data.selected);
  };

  const boxClass = "w-small h-small flex justify-center";

  return (
    <div className="mx-auto jost">
      <ReactPaginate
        previousLabel={<FaAngleLeft size={"1.4rem"} />}
        nextLabel={<FaAngleRight size={"1.4rem"} />}
        breakLabel={
          <div className="h-5 overflow-hidden">
            <BiDotsHorizontal size={"1.6rem"} />
          </div>
        }
        pageCount={pageCount} // Total number of pages
        // marginPagesDisplayed={1}
        // pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex flex-wrap "}
        pageClassName={"primary hover:brightness-150 hover:scale-110 " + boxClass}
        pageLinkClassName={"items-center " + boxClass}
        nextLinkClassName={"flex items-center " + boxClass}
        previousLinkClassName={"flex items-center " + boxClass}
        breakLinkClassName={"flex items-end " + boxClass}
        // subContainerClassName={"pages pagination"}
        activeLinkClassName={"active accent scale-110"}
      />
    </div>
  );
};

export default Pagination;
