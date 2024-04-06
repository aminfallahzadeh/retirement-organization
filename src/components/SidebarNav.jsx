// rrd imports
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const groupsPath = location.pathname === "/retirement-organization/groups";
  const userPath = location.pathname === "/retirement-organization/users";
  const batchStatementsPath =
    location.pathname === "/retirement-organization/batch-statements";

  const content = (
    <Sidebar rtl={true}>
      <Menu>
        <SubMenu
          label={
            <>
              <PersonOutlinedIcon sx={{ color: "#ff6700" }} />
              &nbsp; &nbsp;
              <span>امور بازنشستان</span>
            </>
          }
        >
          <MenuItem
            component={
              <Link to={"/retirement-organization/batch-statements"} />
            }
            active={batchStatementsPath}
          >
            {" "}
            احکام گروهی{" "}
          </MenuItem>
          <MenuItem> رویت تعرفه کارمندی </MenuItem>
          <MenuItem> رویت احکام کارمندی </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </SubMenu>
        <MenuItem>
          <GroupOutlinedIcon sx={{ color: "#ff6700" }} />
          &nbsp; &nbsp; امورمشتریان
        </MenuItem>
        <MenuItem>
          <PaymentOutlinedIcon sx={{ color: "#ff6700" }} />
          &nbsp; &nbsp; حقوق و دستمزد{" "}
        </MenuItem>
        <MenuItem>
          <HomeOutlinedIcon sx={{ color: "#ff6700" }} />
          &nbsp; &nbsp; اجتماعی و رفاهی
        </MenuItem>
        <MenuItem>
          <EqualizerOutlinedIcon sx={{ color: "#ff6700" }} />
          &nbsp; &nbsp; مدیریت سیستم{" "}
        </MenuItem>

        <SubMenu
          label={
            <>
              <LightbulbOutlinedIcon sx={{ color: "#ff6700" }} />
              &nbsp; &nbsp;
              <span>اطلاعات پایه</span>
            </>
          }
        >
          <MenuItem
            component={<Link to="/retirement-organization/groups" />}
            active={groupsPath}
          >
            گروه ها
          </MenuItem>
          <MenuItem
            component={<Link to="/retirement-organization/users" />}
            active={userPath}
          >
            کاربران
          </MenuItem>
        </SubMenu>

        <MenuItem>
          <AssignmentTurnedInOutlinedIcon sx={{ color: "#ff6700" }} />
          &nbsp; &nbsp; گزارشات{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
  return content;
}

export default SidebarNav;
