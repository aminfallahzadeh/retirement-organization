// react imports
import React, { useEffect, useState, useRef } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  setArchiveStructureData,
  setSelectedArchiveData,
} from "../slices/archiveDataSlice";
import {
  useGetArchiveStructureQuery,
  useDeleteArchiveStructureMutation,
  useInsertArchiveMutation,
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
  AdfScannerOutlined as ScanIcon,
  DriveFolderUploadOutlined as UploadIcon,
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
  const inputFileRef = useRef(null);
  const [imageData, setImageData] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState([]);

  // modal states
  const [showCreateArchiveStructureModal, setShowCreateArchiveStructureModal] =
    useState(false);
  const [showDeleteArchiveStructureModal, setShowDeleteArchiveStructureModal] =
    useState(false);
  const [showEditArchiveStructureModal, setShowEditArchiveStructureModal] =
    useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { personID } = useSelector((state) => state.retiredState);
  const { selectedRequestData } = useSelector((state) => state.requestsData);
  const { selectedArchiveData } = useSelector((state) => state.archiveData);

  const dispatch = useDispatch();

  const { archiveStructureData } = useSelector((state) => state.archiveData);

  const [deleteArhiveStructure, { isLoading: isDeletingStructure }] =
    useDeleteArchiveStructureMutation();

  const [insertArchive, { isLoading: isInsertingImage }] =
    useInsertArchiveMutation();

  const [deleteArchive, { isLoading: isDeletingImage }] =
    useDeleteArchiveMutation();

  // archive structure and archive images queries
  const {
    data: archiveStructure,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetArchiveStructureQuery(token);

  const {
    data: images,
    isLoading: isImageLoading,
    isFetching: isImageFetching,
    isSuccess: isImageSuccess,
    error: imageError,
    refetch: imageRefetch,
  } = useGetArchiveQuery({ token, personID: selectedRequestData.personId });

  // handle selected tree item
  const handleChangeSelectedItemParentID = (_, id) => {
    const selected = findById(archiveStructureData, id);

    if (selected) {
      dispatch(setSelectedArchiveData(selected));
      setSelectedImageData([]);
    } else {
      const selectedImage = findById(imageData, id);
      setSelectedImageData(selectedImage);
      dispatch(setSelectedArchiveData([]));
    }
  };

  // all handlers
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

  const handleUploadButtonClick = () => {
    inputFileRef.current.click(); // Trigger the file input click event
  };

  const handleDeleteImageModalChange = () => {
    setShowDeleteImageModal(true);
  };

  const handleRefresh = () => {
    imageRefetch();
    refetch();
  };

  // insert image post request handler
  const handleInsertImage = async () => {
    try {
      const insertImageres = await insertArchive({
        token,
        data: {
          id: "",
          personID,
          insertUserID: "",
          contentType: "",
          archiveStructureID: selectedArchiveData?.id,
          attachment: image,
        },
      }).unwrap();
      setShowAddImageModal(false);
      toast.success(insertImageres.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  // handle user image selection
  // convert to base64 format
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Get the base64 string
      const base64String = reader.result;

      // Remove the prefix(data:image/png;base64)
      const base64Data = base64String.split(",")[1];

      // Set the image state to the base64 data
      setImage(base64Data);
    };
    reader.readAsDataURL(file);
  };

  // check if the image is not null then send the post request
  useEffect(() => {
    if (image !== null) {
      handleInsertImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  // delete archive structure handler
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

  // delete image handler
  const handleDeleteImage = async () => {
    try {
      const deleteImgRes = await deleteArchive({
        token,
        data: {
          id: selectedImageData.id,
          attachment: "",
          contentType: "",
          archiveStructureID: "",
          insertUserID: "",
          personID: "",
        },
      }).unwrap();
      setShowDeleteImageModal(false);
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
                labelText={"برگه"}
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
          title="افزودن برگه جدید"
          closeModal={() => setShowAddImageModal(false)}
        >
          <p className="paragraph-primary">روش بارگزاری را انتخاب کنید</p>

          <div className="flex-row flex-center">
            <LoadingButton
              dir="ltr"
              endIcon={<ScanIcon />}
              loading={isInsertingImage}
              variant="contained"
              color="primary"
              sx={{ fontFamily: "sahel" }}
            >
              <span>اسکن</span>
            </LoadingButton>

            <input
              type="file"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <LoadingButton
              dir="ltr"
              endIcon={<UploadIcon />}
              loading={isInsertingImage}
              aria-label="upload"
              onClick={handleUploadButtonClick}
              variant="contained"
              color="primary"
              sx={{ fontFamily: "sahel" }}
            >
              <span>کامپیوتر</span>
            </LoadingButton>
          </div>
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
