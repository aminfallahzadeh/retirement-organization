// react imports
import React, { useEffect } from "react";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setArchiveStructureData } from "../slices/archiveDataSlice";
import { useGetArchiveStructureQuery } from "../slices/archiveApiSlice";

// mui imports
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { Box, Typography, Collapse } from "@mui/material";
import { FolderRounded } from "@mui/icons-material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

// library imports
import { toast } from "react-toastify";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { animated, useSpring } from "@react-spring/web";

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "70%",
        bgcolor: "#ff6700",
        display: "inline-block",
        verticalAlign: "middle",
        zIndex: 1,
        mr: 1,
      }}
    />
  );
}

const StyledTreeItemLabel = styled(Typography)({
  color: "inherit",
  fontFamily: "sahel",
  fontWeight: "inherit",
  flexGrow: 1,
});

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[800],
  position: "relative",
  [`& .${treeItemClasses.content}`]: {
    "flexDirection": "row-reverse",
    "borderRadius": theme.spacing(0.7),
    "marginBottom": theme.spacing(0.5),
    "marginTop": theme.spacing(0.5),
    "padding": theme.spacing(0.5),
    "paddingRight": theme.spacing(1),
    "fontWeight": 500,
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      marginRight: theme.spacing(2),
    },
    [`&.Mui-expanded `]: {
      "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon":
        {
          color: theme.palette.primary.main,
        },
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        left: "16px",
        top: "44px",
        height: "calc(100% - 48px)",
        width: "1.5px",
        backgroundColor: theme.palette.grey[600],
      },
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color:
        theme.palette.mode === "light" ? theme.palette.primary.main : "white",
    },
    [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
    [`& .${treeItemClasses.content}`]: {
      fontWeight: 500,
    },
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const { labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      slots={{
        groupTransition: TransitionComponent,
      }}
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component={LabelIcon}
            className="labelIcon"
            color="inherit"
            sx={{ mr: 1, fontSize: "1.2rem" }}
          />
          <StyledTreeItemLabel variant="body2">{labelText}</StyledTreeItemLabel>
        </Box>
      }
      {...other}
      ref={ref}
    />
  );
});

function ArchiveTree() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: archiveStructure,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetArchiveStructureQuery(token);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      dispatch(setArchiveStructureData(archiveStructure.itemList));
    }
  }, [refetch, dispatch, archiveStructure, isSuccess]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const theme = (outerTheme) =>
    createTheme({
      direction: "rtl",
      palette: {
        mode: outerTheme.palette.mode,
      },
    });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <>
      {isLoading ? (
        <div>در حال بارگذاری</div>
      ) : (
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <SimpleTreeView
              // aria-label="gmail"
              defaultExpandedItems={["1"]}
              // defaultSelectedItems="3"
              sx={{
                height: "fit-content",
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
                backgroundColor: "#cfcfcf",
                borderRadius: "6px",
                padding: "5px",
              }}
            >
              <StyledTreeItem
                itemId="1"
                labelText="پرونده الکترونیک"
                labelIcon={FolderRounded}
              >
                <StyledTreeItem
                  itemId="5"
                  labelText="احراز هویت"
                  labelIcon={FolderRounded}
                >
                  <StyledTreeItem
                    itemId="8"
                    labelText="صفحه اول شناسنامه"
                    labelIcon={DotIcon}
                  />
                  <StyledTreeItem
                    itemId="9"
                    labelText="صفحه دوم شناسنامه"
                    labelIcon={DotIcon}
                  />
                  <StyledTreeItem
                    itemId="10"
                    labelText="تصویر کارت ملی"
                    labelIcon={DotIcon}
                  />
                </StyledTreeItem>
                <StyledTreeItem
                  itemId="3"
                  labelText="حکم حقوقی"
                  labelIcon={FolderRounded}
                >
                  <StyledTreeItem
                    itemId="12"
                    labelText="تصویر حکم"
                    labelIcon={DotIcon}
                  />
                </StyledTreeItem>
                <StyledTreeItem
                  itemId="4"
                  labelText="فیش حقوقی"
                  labelIcon={FolderRounded}
                >
                  <StyledTreeItem
                    itemId="11"
                    labelText="تصویر فیش حقوقی"
                    labelIcon={DotIcon}
                  />
                </StyledTreeItem>
              </StyledTreeItem>
            </SimpleTreeView>
          </ThemeProvider>
        </CacheProvider>
      )}
    </>
  );
}

export default ArchiveTree;
