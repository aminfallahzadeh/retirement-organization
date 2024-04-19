// react imports
import React, { useEffect, useState } from "react";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  setArchiveStructureData,
  setSelectedArchiveData,
} from "../slices/archiveDataSlice";
import {
  useGetArchiveStructureQuery,
  useDeleteArchiveStructureMutation,
} from "../slices/archiveApiSlice";

// mui imports
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  FolderRounded,
  CreateNewFolderOutlined as AddFolderIcon,
  AddPhotoAlternateOutlined as AddFileIcon,
  HideImageOutlined as DeleteFileIcon,
  FolderDeleteOutlined as DeleteFolderIcon,
  EditOutlined as EditIcon,
  Refresh as RefreshIcon,
  Done as DoneIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { LoadingButton } from "@mui/lab";

// components
import Modal from "./Modal";
import CreateArchiveStructureForm from "../forms/CreateArchiveStructureForm";
import EditArchiveStructureForm from "../forms/EditArchiveStructureForm";

// library imports
import { toast } from "react-toastify";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { animated, useSpring } from "@react-spring/web";

// helpers
import { findById } from "../helper.js";

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
  const [showCreateArchiveStructureModal, setShowCreateArchiveStructureModal] =
    useState(false);
  const [showDeleteArchiveStructureModal, setShowDeleteArchiveStructureModal] =
    useState(false);
  const [showEditArchiveStructureModal, setShowEditArchiveStructureModal] =
    useState(false);

  const { token } = useSelector((state) => state.auth);
  const { selectedArchiveData } = useSelector((state) => state.archiveData);

  const dispatch = useDispatch();

  const { archiveStructureData } = useSelector((state) => state.archiveData);

  const [deleteArhiveStructure, { isLoading: isDeleting }] =
    useDeleteArchiveStructureMutation();

  const {
    data: archiveStructure,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetArchiveStructureQuery(token);

  const handleChangeSelectedItemParentID = (_, id) => {
    const selectedArchive = findById(archiveStructureData, id);
    dispatch(setSelectedArchiveData(selectedArchive));
  };

  const handleCreateArchiveStructureModalChange = () => {
    setShowCreateArchiveStructureModal(true);
  };

  const handleDeleteArchiveStructureModalChange = () => {
    setShowDeleteArchiveStructureModal(true);
  };

  const handleEditArchiveStructureModalChange = () => {
    setShowEditArchiveStructureModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleDeleteStructure = async () => {
    try {
      const deleteRes = await deleteArhiveStructure({
        token,
        data: {
          id: selectedArchiveData.id,
          insertUserID: "",
          name: "",
          parentID: "",
        },
      }).unwrap();
      setShowDeleteArchiveStructureModal(false);
      toast.success(deleteRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      dispatch(setArchiveStructureData(archiveStructure.itemList));
    }
  }, [
    refetch,
    dispatch,
    archiveStructure,
    isSuccess,
    showCreateArchiveStructureModal,
    showDeleteArchiveStructureModal,
    showEditArchiveStructureModal,
  ]);

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

  const renderTreeItems = (items, parentID) => {
    return items
      .filter((item) => item.parentID === parentID)
      .map((item) => (
        <StyledTreeItem
          key={item.id}
          itemId={item.id}
          labelText={item.name}
          labelIcon={FolderRounded}
        >
          {renderTreeItems(items, item.id)}
        </StyledTreeItem>
      ));
  };

  const content = (
    <>
      {isLoading ? (
        <CircularProgress color="info" />
      ) : (
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <SimpleTreeView
              // selectedItems={selectedArchiveParentID}
              onSelectedItemsChange={handleChangeSelectedItemParentID}
              // aria-label="gmail"
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
              {isFetching ? (
                <IconButton aria-label="refresh" color="info" disabled>
                  <CircularProgress size={20} value={100} />
                </IconButton>
              ) : (
                <Tooltip title="بروزرسانی">
                  <IconButton
                    aria-label="refresh"
                    color="info"
                    onClick={handleRefresh}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="اضافه کردن پوشه">
                <IconButton
                  aria-label="addFolder"
                  color="success"
                  disabled={selectedArchiveData.length === 0}
                  onClick={handleCreateArchiveStructureModalChange}
                >
                  <AddFolderIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="حذف پوشه">
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={handleDeleteArchiveStructureModalChange}
                  disabled={
                    selectedArchiveData.parentID === "0" ||
                    selectedArchiveData.length === 0
                  }
                >
                  <DeleteFolderIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="اضافه کردن برگه">
                <IconButton aria-label="addFile" color="success">
                  <AddFileIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="حذف برگه">
                <IconButton aria-label="delete" color="error">
                  <DeleteFileIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="ویرایش نام پوشه">
                <IconButton
                  aria-label="edit"
                  color="warning"
                  onClick={handleEditArchiveStructureModalChange}
                  disabled={
                    selectedArchiveData.parentID === "0" ||
                    selectedArchiveData.length === 0
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {renderTreeItems(archiveStructureData, "0")}
            </SimpleTreeView>
          </ThemeProvider>
        </CacheProvider>
      )}

      {showCreateArchiveStructureModal && (
        <Modal
          title="افزودن پوشه جدید"
          closeModal={() => setShowCreateArchiveStructureModal(false)}
        >
          <CreateArchiveStructureForm
            setShowNewArchiveModal={setShowCreateArchiveStructureModal}
          />
        </Modal>
      )}

      {showDeleteArchiveStructureModal && (
        <Modal
          title={"حذف پوشه "}
          closeModal={() => setShowDeleteArchiveStructureModal(false)}
        >
          <p className="paragraph-primary">
            آیا از حذف پوشه <strong>{selectedArchiveData.name}</strong> اطمینان
            دارید؟
          </p>
          <div className="flex-row flex-center">
            <LoadingButton
              dir="ltr"
              endIcon={<DoneIcon />}
              loading={isDeleting}
              onClick={handleDeleteStructure}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>بله</span>
            </LoadingButton>
            <Button
              dir="ltr"
              endIcon={<CloseIcon />}
              onClick={() => setShowDeleteArchiveStructureModal(false)}
              variant="contained"
              color="error"
              sx={{ fontFamily: "sahel" }}
            >
              <span>خیر</span>
            </Button>
          </div>
        </Modal>
      )}

      {showEditArchiveStructureModal && (
        <Modal
          title="ویرایش نام پوشه"
          closeModal={() => setShowEditArchiveStructureModal(false)}
        >
          <EditArchiveStructureForm
            setShowEditArchiveStructureModal={setShowEditArchiveStructureModal}
          />
        </Modal>
      )}
    </>
  );

  return content;
}

export default ArchiveTree;
