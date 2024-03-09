// library imports
import PersonIcon from "@mui/icons-material/Person";

function ProfilePicture() {
  return (
    <div className="ProfilePicture">
      <a href="#">
        <PersonIcon sx={{ fontSize: "40px", color: "#eee" }} />
      </a>
    </div>
  );
}

export default ProfilePicture;
