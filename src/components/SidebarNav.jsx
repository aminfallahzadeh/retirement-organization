// rrd imports
import { Link } from "react-router-dom";

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

function SidebarNav() {
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
          <MenuItem component={<Link to="/retirement-organization/affairs" />}>
            {" "}
            بازنشسته
          </MenuItem>

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
          <MenuItem component={<Link to="/retirement-organization/groups" />}>
            گروه ها
          </MenuItem>
          <MenuItem component={<Link to="/retirement-organization/users" />}>
            کاربران
          </MenuItem>
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
