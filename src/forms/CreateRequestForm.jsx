function CreateRequestForm() {
  const content = (
    <section className="formContainer">
      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form">
          <input
            type="text"
            id="rqType"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="rqType" className="inputBox__form--label">
            نوع درخواست
          </label>
        </div>

        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="reqBody"
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="reqBody" className="inputBox__form--label">
            متن درخواست
          </label>
        </div>
      </form>
    </section>
  );
  return content;
}

export default CreateRequestForm;
