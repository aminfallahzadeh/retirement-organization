// library imports
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  UserIcon,
  UserGroupIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
  AdjustmentsVerticalIcon,
  Bars3BottomRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

// redux imports
import { useDispatch } from "react-redux";
import {
  setGetCartableStatus,
  setGetGroupStatus,
  setGetUserStatus,
  setGetItemsStatus,
  setGetUserGroupsStatus,
  setGetPensionerSectionStatus,
} from "../slices/statusSlice";

function SidebarNav() {
  const dispatch = useDispatch();

  const getGroupHandler = () => {
    dispatch(setGetGroupStatus(true));
    dispatch(setGetUserStatus(false));
    dispatch(setGetItemsStatus(false));
    dispatch(setGetPensionerSectionStatus(false));
    dispatch(setGetUserGroupsStatus(false));
    dispatch(setGetCartableStatus(false));
  };

  const getUserHandler = () => {
    dispatch(setGetGroupStatus(false));
    dispatch(setGetUserStatus(true));
    dispatch(setGetItemsStatus(false));
    dispatch(setGetPensionerSectionStatus(false));
    dispatch(setGetCartableStatus(false));
  };

  const getPensionerSectionHandler = () => {
    dispatch(setGetPensionerSectionStatus(true));
    dispatch(setGetGroupStatus(false));
    dispatch(setGetUserStatus(false));
    dispatch(setGetItemsStatus(false));
    dispatch(setGetUserGroupsStatus(false));
    dispatch(setGetCartableStatus(false));
  };

  return (
    <Sidebar rtl={true}>
      <Menu>
        <SubMenu
          label={
            <>
              <UserIcon width={20} color="#00863e" />
              &nbsp; &nbsp;
              <span>امور بازنشستان</span>
            </>
          }
        >
          <MenuItem onClick={getPensionerSectionHandler}> بازنشسته</MenuItem>
          <MenuItem> احکام گروهی </MenuItem>
          <MenuItem> رویت تعرفه کارمندی </MenuItem>
          <MenuItem> رویت احکام کارمندی </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </SubMenu>
        <MenuItem>
          <UserGroupIcon width={20} color="#00863e" />
          &nbsp; &nbsp; امورمشتریان
        </MenuItem>
        <MenuItem>
          <CreditCardIcon width={20} color="#00863e" />
          &nbsp; &nbsp; حقوق و دستمزد{" "}
        </MenuItem>
        <MenuItem>
          <BuildingStorefrontIcon width={20} color="#00863e" />
          &nbsp; &nbsp; اجتماعی و رفاهی
        </MenuItem>
        <MenuItem>
          <AdjustmentsVerticalIcon width={20} color="#00863e" />
          &nbsp; &nbsp; مدیریت سیستم{" "}
        </MenuItem>

        <SubMenu
          label={
            <>
              <Bars3BottomRightIcon width={20} color="#00863e" />
              &nbsp; &nbsp;
              <span>اطلاعات پایه</span>
            </>
          }
        >
          <MenuItem onClick={getGroupHandler}>گروه ها</MenuItem>
          <MenuItem onClick={getUserHandler}>کاربران</MenuItem>
        </SubMenu>

        <MenuItem>
          <ClipboardDocumentListIcon width={20} color="#00863e" />
          &nbsp; &nbsp; گزارشات{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarNav;
