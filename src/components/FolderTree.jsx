import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FolderRounded from "@mui/icons-material/FolderRounded";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Collapse from "@mui/material/Collapse";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
        bgcolor: "warning.main",
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
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.grey[400],
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
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.secondary.dark,
        },
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        left: "16px",
        top: "44px",
        height: "calc(100% - 48px)",
        width: "1.5px",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[300]
            : theme.palette.grey[700],
      },
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color:
        theme.palette.mode === "light" ? theme.palette.primary.main : "white",
    },
    [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
      backgroundColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.dark,
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

export default function FolderTree() {
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
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <SimpleTreeView
          aria-label="gmail"
          defaultExpandedItems={["3"]}
          defaultSelectedItems="3"
          sx={{
            height: "fit-content",
            flexGrow: 1,
            maxWidth: 400,
            overflowY: "auto",
          }}
        >
          <StyledTreeItem
            itemId="1"
            labelText="پرونده الکترونیک"
            labelIcon={FolderRounded}
          >
            <StyledTreeItem
              itemId="5"
              labelText="پوشه اول"
              labelIcon={FolderRounded}
            >
              <StyledTreeItem
                itemId="8"
                labelText="تصویر اول"
                labelIcon={DotIcon}
              />
              <StyledTreeItem
                itemId="9"
                labelText="تصویر دوم"
                labelIcon={DotIcon}
              />
              <StyledTreeItem
                itemId="10"
                labelText="تصویر سوم"
                labelIcon={DotIcon}
              />
            </StyledTreeItem>
            <StyledTreeItem
              itemId="3"
              labelText="پوشه دوم"
              labelIcon={FolderRounded}
            >
              <StyledTreeItem
                itemId="12"
                labelText="تصویر اول"
                labelIcon={DotIcon}
              />
              <StyledTreeItem
                itemId="13"
                labelText="تصویر دوم"
                labelIcon={DotIcon}
              />
              <StyledTreeItem
                itemId="14"
                labelText="تصویر سوم"
                labelIcon={DotIcon}
              />
            </StyledTreeItem>
            <StyledTreeItem
              itemId="6"
              labelText="تصویر اول"
              labelIcon={DotIcon}
            />
            <StyledTreeItem
              itemId="7"
              labelText="تصویر دوم"
              labelIcon={DotIcon}
            />
          </StyledTreeItem>
        </SimpleTreeView>
      </ThemeProvider>
    </CacheProvider>
  );
}
