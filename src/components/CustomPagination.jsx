// helper import
import { convertToPersianNumber } from "../helper";

// library imports
import { PaginationItem, Pagination } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CustomPagination = ({ count, page, onChange }) => {
  const handleChange = (event, value) => {
    onChange(value);
  };

  const renderPersianNumber = (number) => {
    return convertToPersianNumber(number);
  };

  return (
    <Pagination
      sx={{ paddingTop: 1.5, justifyContent: "right" }}
      count={count}
      page={page}
      dir="rtl"
      variant="outlined"
      color="secondary"
      onChange={handleChange}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          slots={{ previous: ChevronRight, next: ChevronLeft }}
          page={renderPersianNumber(item.page)}
        />
      )}
    />
  );
};

export default CustomPagination;
