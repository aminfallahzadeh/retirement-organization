// rrd imports
import { Link } from "react-router-dom";

// library imports
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// mui imports
import {
  PersonOutlined as PersonOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
  PaymentOutlined as PaymentOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  EqualizerOutlined as EqualizerOutlinedIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
} from "@mui/icons-material";

function SidebarNav() {
  return (
    <Sidebar rtl={true}>
      <Menu>
        <SubMenu
          label={
            <>
              <PersonOutlinedIcon sx={{ color: "#fff" }} />
              &nbsp; &nbsp;
              <span>امور بازنشستان</span>
            </>
          }
        >
          <MenuItem> احکام گروهی </MenuItem>
          <MenuItem> رویت تعرفه کارمندی </MenuItem>
          <MenuItem> رویت احکام کارمندی </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </SubMenu>
        <MenuItem>
          <GroupOutlinedIcon sx={{ color: "#fff" }} />
          &nbsp; &nbsp; امورمشتریان
        </MenuItem>
        <MenuItem>
          <PaymentOutlinedIcon sx={{ color: "#fff" }} />
          &nbsp; &nbsp; حقوق و دستمزد{" "}
        </MenuItem>
        <MenuItem>
          <HomeOutlinedIcon sx={{ color: "#fff" }} />
          &nbsp; &nbsp; اجتماعی و رفاهی
        </MenuItem>
        <MenuItem>
          <EqualizerOutlinedIcon sx={{ color: "#fff" }} />
          &nbsp; &nbsp; مدیریت سیستم{" "}
        </MenuItem>

        <SubMenu
          label={
            <>
              <LightbulbOutlinedIcon sx={{ color: "#fff" }} />
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
          <AssignmentTurnedInOutlinedIcon sx={{ color: "#fff" }} />
          &nbsp; &nbsp; گزارشات{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarNav;
