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

function StatementViewHeirGrid({ relatedList, amountList }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (relatedList) {
      const data = relatedList.map((item, index) => ({
        id: item.retirementStatementRelatedID,
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
  }, [relatedList]);

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
        accessorKey: "retirementStatementItemAmount1",
        header: "حقوق وظیفه",
        size: 20,
        Cell: ({ row }) => {
          const foundItem = amountList.find(
            (obj) =>
              obj.retirementStatementRelatedID === row.original.id &&
              obj.retirementStatementItemID === "2001"
          );

          if (foundItem) {
            return (
              <div>
                {convertToPersianNumber(
                  foundItem.retirementStatementItemAmount
                )}
              </div>
            );
          } else {
            return <div>-</div>;
          }
        },
      },
      {
        accessorKey: "retirementStatementItemAmount2",
        header: "بازنشستگی تکمیلی",
        size: 20,
        Cell: ({ row }) => {
          const foundItem = amountList.find(
            (obj) =>
              obj.retirementStatementRelatedID === row.original.id &&
              obj.retirementStatementItemID === "2002"
          );

          if (foundItem) {
            return (
              <div>
                {convertToPersianNumber(
                  foundItem.retirementStatementItemAmount
                )}
              </div>
            );
          } else {
            return <div>-</div>;
          }
        },
      },
      {
        accessorKey: "retirementStatementItemAmount3",
        header: "حق تاهل",
        size: 20,
        Cell: ({ row }) => {
          const foundItem = amountList.find(
            (obj) =>
              obj.retirementStatementRelatedID === row.original.id &&
              obj.retirementStatementItemID === "2004"
          );

          if (foundItem) {
            return (
              <div>
                {convertToPersianNumber(
                  foundItem.retirementStatementItemAmount
                )}
              </div>
            );
          } else {
            return <div>-</div>;
          }
        },
      },
      {
        accessorKey: "retirementStatementItemAmount4",
        header: "حق اولاد",
        size: 20,
        Cell: ({ row }) => {
          const foundItem = amountList.find(
            (obj) =>
              obj.retirementStatementRelatedID === row.original.id &&
              obj.retirementStatementItemID === "2003"
          );

          if (foundItem) {
            return (
              <div>
                {convertToPersianNumber(
                  foundItem.retirementStatementItemAmount
                )}
              </div>
            );
          } else {
            return <div>-</div>;
          }
        },
      },
    ],
    [amountList]
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

export default StatementViewHeirGrid;
