// react imports
import React, { useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  setArchiveStructureData,
  setSelectedArchiveData,
  setSelectedImageData,
} from "../slices/archiveDataSlice";
import {
  useGetArchiveStructureQuery,
  useDeleteArchiveStructureMutation,
  useGetArchiveQuery,
  useDeleteArchiveMutation,
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
import InsertArchiveForm from "../forms/InsertArchiveForm.jsx";

// library imports
import { toast } from "react-toastify";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { animated, useSpring } from "@react-spring/web";

// helpers
import { findById, convertToPersianNumber } from "../helper.js";

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

function ArchiveTree({ setPreviewImage = undefined }) {
  const [imageData, setImageData] = useState([]);

  // modal states
  const [showCreateArchiveStructureModal, setShowCreateArchiveStructureModal] =
    useState(false);
  const [showDeleteArchiveStructureModal, setShowDeleteArchiveStructureModal] =
    useState(false);
  const [showEditArchiveStructureModal, setShowEditArchiveStructureModal] =
    useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);

  const { selectedArchiveData, selectedImageData } = useSelector(
    (state) => state.archiveData
  );

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const baseInfoPath =
    location.pathname === "/retirement-organization/electronic-statement";
  const fractionPath =
    location.pathname === "/retirement-organization/fraction";

  const { archiveStructureData } = useSelector((state) => state.archiveData);

  const [deleteArhiveStructure, { isLoading: isDeletingStructure }] =
    useDeleteArchiveStructureMutation();

  const [deleteArchive, { isLoading: isDeletingImage }] =
    useDeleteArchiveMutation();

  // ARCHIVE QUERIES
  const {
    data: archiveStructure,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetArchiveStructureQuery();

  const {
    data: images,
    isLoading: isImageLoading,
    isFetching: isImageFetching,
    isSuccess: isImageSuccess,
    error: imageError,
    refetch: imageRefetch,
  } = useGetArchiveQuery(personID);

  // HANDLE SELECTED TREE ITEM
  const handleChangeSelectedItemParentID = (_, id) => {
    const selected = findById(archiveStructureData, id);

    if (selected) {
      dispatch(setSelectedArchiveData(selected));
      dispatch(setSelectedImageData([]));
    } else {
      const selectedImage = findById(imageData, id);
      dispatch(setSelectedImageData(selectedImage));
      dispatch(setSelectedArchiveData([]));
    }
  };

  // OTHER HANDLERS
  const handleCreateArchiveStructureModalChange = () => {
    setShowCreateArchiveStructureModal(true);
  };

  const handleDeleteArchiveStructureModalChange = () => {
    setShowDeleteArchiveStructureModal(true);
  };

  const handleEditArchiveStructureModalChange = () => {
    setShowEditArchiveStructureModal(true);
  };

  const handleAddImageModalChange = () => {
    setShowAddImageModal(true);
  };

  const handleDeleteImageModalChange = () => {
    setShowDeleteImageModal(true);
  };

  const handleRefresh = () => {
    imageRefetch();
    refetch();
  };

  // DELETE ARCHIVE STRUCTURE HANDLER
  const handleDeleteStructure = async () => {
    try {
      const deleteRes = await deleteArhiveStructure({
        id: selectedArchiveData.id,
        insertUserID: "",
        name: "",
        parentID: "",
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

  // DELETE ARCHIVE IMAGE HANDLER
  const handleDeleteImage = async () => {
    try {
      const deleteImgRes = await deleteArchive({
        id: selectedImageData.id,
        attachment: "",
        contentType: "",
        archiveStructureID: "",
        insertUserID: "",
        documentID: "",
        personID: "",
      }).unwrap();
      setShowDeleteImageModal(false);
      if (!fractionPath) setPreviewImage(null);
      toast.success(deleteImgRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  // fetch archive structure data
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

  // handle error
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // fetch images data
  useEffect(() => {
    imageRefetch();
    if (isImageSuccess) {
      setImageData(images.itemList);
    }
  }, [
    imageRefetch,
    isImageSuccess,
    dispatch,
    images,
    showAddImageModal,
    showDeleteImageModal,
    imageData,
  ]);

  // handle error
  useEffect(() => {
    if (imageError) {
      console.log(imageError);
      toast.error(imageError?.data?.message || imageError.error, {
        autoClose: 2000,
      });
    }
  }, [imageError]);

  // mui styles for rtl support
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

  // function to render tree items recursively
  const renderTreeItems = (items, images, parentID) => {
    return items
      .filter((item) => item.parentID === parentID)
      .map((item) => (
        <StyledTreeItem
          key={item.id}
          itemId={item.id}
          labelText={item.name}
          labelIcon={FolderRounded}
        >
          {renderTreeItems(items, images, item.id)}
          {images
            .filter((image) => image.archiveStructureID === item.id)
            .map((image) => (
              <StyledTreeItem
                key={image.id}
                itemId={image.id}
                labelText={convertToPersianNumber(image.documentID)}
                labelIcon={DotIcon}
              />
            ))}
        </StyledTreeItem>
      ));
  };

  // clear data after component dismounts
  useEffect(() => {
    return () => {
      dispatch(setSelectedArchiveData([]));
      dispatch(setSelectedImageData([]));
    };
  }, [dispatch]);

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
              {isFetching || isImageFetching || isImageLoading ? (
                <IconButton aria-label="refresh" color="info" disabled>
                  <CircularProgress size={20} value={100} />
                </IconButton>
              ) : (
                <Tooltip title="بروزرسانی">
                  <span>
                    <IconButton
                      aria-label="refresh"
                      color="info"
                      onClick={handleRefresh}
                    >
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              )}

              {baseInfoPath ? (
                <>
                  <Tooltip title="اضافه کردن پوشه">
                    <span>
                      <IconButton
                        aria-label="addFolder"
                        color="success"
                        disabled={selectedArchiveData.length === 0}
                        onClick={handleCreateArchiveStructureModalChange}
                      >
                        <AddFolderIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="حذف پوشه">
                    <span>
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
                    </span>
                  </Tooltip>

                  <Tooltip title="ویرایش نام پوشه">
                    <span>
                      <IconButton
                        aria-label="edit"
                        color="warning"
                        onClick={handleEditArchiveStructureModalChange}
                        disabled={
                          selectedArchiveData.parentID === "0" ||
                          selectedArchiveData.length === 0 ||
                          selectedImageData.length > 0
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="اضافه کردن برگه">
                    <span>
                      <IconButton
                        aria-label="addFile"
                        color="success"
                        onClick={handleAddImageModalChange}
                        disabled={
                          selectedArchiveData.parentID === "0" ||
                          selectedArchiveData.length === 0
                        }
                      >
                        <AddFileIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="حذف برگه">
                    <span>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={handleDeleteImageModalChange}
                        disabled={selectedImageData.length === 0}
                      >
                        <DeleteFileIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )}

              {renderTreeItems(archiveStructureData, imageData, "0")}
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
              loading={isDeletingStructure}
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

      {showAddImageModal && (
        <Modal
          title={
            <span style={{ color: "#fe6700" }}>
              &quot;{selectedArchiveData.name}&quot;
            </span>
          }
          closeModal={() => setShowAddImageModal(false)}
        >
          <InsertArchiveForm setShowAddImageModal={setShowAddImageModal} />
        </Modal>
      )}

      {showDeleteImageModal && (
        <Modal
          title="حذف برگه"
          closeModal={() => setShowDeleteImageModal(false)}
        >
          <p className="paragraph-primary">آیا از حذف برگه اطمینان دارید؟</p>
          <div className="flex-row flex-center">
            <LoadingButton
              dir="ltr"
              endIcon={<DoneIcon />}
              loading={isDeletingImage}
              onClick={handleDeleteImage}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>بله</span>
            </LoadingButton>
            <Button
              dir="ltr"
              endIcon={<CloseIcon />}
              onClick={() => setShowDeleteImageModal(false)}
              variant="contained"
              color="error"
              sx={{ fontFamily: "sahel" }}
            >
              <span>خیر</span>
            </Button>
          </div>
        </Modal>
      )}
    </>
  );

  return content;
}

export default ArchiveTree;
