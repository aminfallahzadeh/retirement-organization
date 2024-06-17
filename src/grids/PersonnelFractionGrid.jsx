// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetFractionItemViewQuery } from "../slices/fractionApiSlice";

// mui imports
import { PaginationItem, Tooltip } from "@mui/material";
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
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// helper imports
import { convertToPersianNumber, separateByThousands } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

export const PersonnelFractionGrid = () => {
  const [rowSelection, setRowSelection] = useState({});

  const [tableData, setTableData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const {
    data: fractions,
    isSuccess,
    isLoading,
    error,
  } = useGetFractionItemViewQuery({ personID });

  useEffect(() => {
    if (isSuccess) {
      const data = fractions.itemList.map((item) => ({
        fractionYear: item.years,
        fractionOrganization: item.organizationName,
        farv: item.fractionTotalAmount1,
        farvPersonnel: item.fractionPersonnelTotalAmount1,
        farvOrganization: item.fractionOrganizationTotalAmount1,
        ordib: item.fractionTotalAmount2,
        ordibPersonnel: item.fractionPersonnelTotalAmount2,
        ordibOrganization: item.fractionOrganizationTotalAmount2,
        khord: item.fractionTotalAmount3,
        khordPersonnel: item.fractionPersonnelTotalAmount3,
        khordOrganization: item.fractionOrganizationTotalAmount3,
        tir: item.fractionTotalAmount4,
        tirPersonnel: item.fractionPersonnelTotalAmount4,
        tirOrganization: item.fractionOrganizationTotalAmount4,
        mordad: item.fractionTotalAmount5,
        mordadPersonnel: item.fractionPersonnelTotalAmount5,
        mordadOrganization: item.fractionOrganizationTotalAmount5,
        shah: item.fractionTotalAmount6,
        shahPersonnel: item.fractionPersonnelTotalAmount6,
        shahOrganization: item.fractionOrganizationTotalAmount6,
        mehr: item.fractionTotalAmount7,
        mehrPersonnel: item.fractionPersonnelTotalAmount7,
        mehrOrganization: item.fractionOrganizationTotalAmount7,
        aban: item.fractionTotalAmount8,
        abanPersonnel: item.fractionPersonnelTotalAmount8,
        abanOrganization: item.fractionOrganizationTotalAmount8,
        azar: item.fractionTotalAmount9,
        azarPersonnel: item.fractionPersonnelTotalAmount9,
        azarOrganization: item.fractionOrganizationTotalAmount9,
        dey: item.fractionTotalAmount10,
        deyPersonnel: item.fractionPersonnelTotalAmount10,
        deyOrganization: item.fractionOrganizationTotalAmount10,
        bahman: item.fractionTotalAmount11,
        bahmanPersonnel: item.fractionPersonnelTotalAmount11,
        bahmanOrganization: item.fractionOrganizationTotalAmount11,
        esfand: item.fractionTotalAmount12,
        esfandPersonnel: item.fractionPersonnelTotalAmount12,
        esfandOrganization: item.fractionOrganizationTotalAmount12,
      }));

      setTableData(data);
    }
  }, [isSuccess, fractions]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "fractionYear",
        header: "سال",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "tariffType",
        header: "نوع سابقه",
        size: 20,
      },
      {
        accessorKey: "chestName",
        header: "نام صندوق",
        size: 20,
      },
      {
        accessorKey: "fractionOrganization",
        header: "سازمان",
        size: 20,
      },
      {
        accessorKey: "farv",
        header: "فروردین",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.farvOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.farvPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "ordib",
        header: "اردیبهشت",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.ordibOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.ordibPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "khord",
        header: "خرداد",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.khordOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.khordPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "tir",
        header: "تیر",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.tirOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.tirPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "mordad",
        header: "مرداد",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.mordadOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.mordadPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "shah",
        header: "شهریور",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.shahOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.shahPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "mehr",
        header: "مهر",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.mehrOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.mehrPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "aban",
        header: "آبان",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.abanOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.abanPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "azar",
        header: "آذر",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.azarOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.azarPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "dey",
        header: "دی",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.deyOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.deyPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "bahman",
        header: "بهمن",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.bahmanOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.bahmanPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "esfand",
        header: "اسفند",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <div style={{ fontFamily: "sahel", fontSize: "1rem" }}>
                {`سهم کارفرما : ${separateByThousands(
                  convertToPersianNumber(row.original.esfandOrganization)
                )}`}
                <br />
                {`سهم کارمند : ${separateByThousands(
                  convertToPersianNumber(row.original.esfandPersonnel)
                )}`}
              </div>
            }
          >
            <div>
              {separateByThousands(convertToPersianNumber(renderedCellValue))}
            </div>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: tableData,
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    muiPaginationProps: {
      size: "small",
      shape: "rounded",
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );

  return content;
};

export default PersonnelFractionGrid;
