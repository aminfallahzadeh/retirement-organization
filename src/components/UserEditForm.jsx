function UserEditForm() {
  return (
    <form method="POST" className="UserEditForm">
      <div className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="userName"
        />
        <label className="label" htmlFor="userName">
          نام کاربری
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="name"
        />
        <label className="label" htmlFor="name">
          نام
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="familyName"
        />
        <label className="label" htmlFor="familyName">
          نام خانوادگی
        </label>
      </div>
    </form>
  );
}

export default UserEditForm;
