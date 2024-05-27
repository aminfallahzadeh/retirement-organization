// library imports
import PersonIcon from "@mui/icons-material/Person";

function ProfilePicture() {
  return (
    <div className="ProfilePicture">
      <div className="ProfilePicture__icon">
        <PersonIcon sx={{ color: "#eee", textAlign: "center" }} />
      </div>
    </div>
  );
}

export default ProfilePicture;
