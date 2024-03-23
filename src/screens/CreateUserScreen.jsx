// react imprts
import { useState } from "react";

// components
import GroupsGridCreateUser from "../components/GroupsGridCreateUser";

function CreateUserScreen() {
  const content = (
    <section className="main">
      <form className="formContainer grid grid--col-3">
        <div className="inputBox__form">
          <input
            type="text"
            name="username"
            className="inputBox__form--input"
            required
            id="psw"
            value={""}
          />
          <label className="inputBox__form--label" htmlFor="usernam">
            نام کاربری
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            name="password"
            className="inputBox__form--input"
            required
            id="psw"
            value={""}
          />
          <label className="inputBox__form--label" htmlFor="psw">
            رمز عبور
          </label>
        </div>
      </form>

      <GroupsGridCreateUser />
    </section>
  );

  return content;
}

export default CreateUserScreen;
