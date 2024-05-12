// react imports
import { useEffect, useMemo, useState } from "react";

// mui imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RelatedHeirStatementGrid({ itemList }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (itemList) {
      const data = itemList.map((item, index) => ({
        rowNumber: index + 1,
        personNationalCode: item.personNationalCode,
        personFirstName: item.personFirstName,
        personLastName: item.personLastName,
        personFatherName: item.personFatherName || "-",
        relationshipWithParentID: item.relationshipWithParentID,
        personBirthDate: item.personBirthDate,
      }));

      setTableData(data);
    }
  }, [itemList]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNumber",
        header: "ردیف",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personNationalCode",
        header: "کد ملی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "personFatherName",
        header: "نام پدر",
        size: 20,
      },
      {
        accessorKey: "relationshipWithParentID",
        header: "نسبت",
        size: 20,
      },
      {
        accessorKey: "personBirthDate",
        header: "تاریخ تولد",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "test1",
        header: "حقوق وظیفه",
        size: 20,
      },
      {
        accessorKey: "test2",
        header: "بازنشستگی تکمیلی",
        size: 20,
      },
      {
        accessorKey: "test3",
        header: "حق تاهل",
        size: 20,
      },
      {
        accessorKey: "test4",
        header: "حق اولاد",
        size: 20,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: tableData,

    muiPaginationProps: {
      color: "success",
      variant: "outlined",
      showRowsPerPage: false,
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
    },
  });

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default RelatedHeirStatementGrid;
