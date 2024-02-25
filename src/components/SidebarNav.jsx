// library imports
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setGetGroupData, setGetGroupStatus } from "../slices/userReqSlice";
import { useGetGroupQuery } from "../slices/usersApiSlice";

function SidebarNav() {
  const dispatch = useDispatch();
  // const [getGroup] = useGetGroupQuery();
  // const { token } = useSelector((state) => state.auth);

  const getGroupHandler = async () => {
    try {
      dispatch(setGetGroupStatus(true));
      // const res = await getGroup(token);
      // dispatch(setGetGroupData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Sidebar rtl={true}>
      <Menu>
        <SubMenu label="امور بازنشستان">
          <MenuItem> بازنشسته</MenuItem>
          <MenuItem> احکام گروهی </MenuItem>
          <MenuItem> رویت تعرفه کارمندی </MenuItem>
          <MenuItem> رویت احکام کارمندی </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </SubMenu>
        <MenuItem>امورمشتریان </MenuItem>
        <MenuItem> حقوق و دستمزد </MenuItem>
        <MenuItem>اجتماعی و رفاهی </MenuItem>
        <MenuItem> مدیریت سیستم </MenuItem>
        <MenuItem onClick={getGroupHandler}> اطلاعات پایه </MenuItem>
        <MenuItem> گزارشات </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarNav;
