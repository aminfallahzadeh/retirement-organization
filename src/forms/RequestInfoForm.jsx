function RequestInfoForm({ body }) {
  return (
    <section className="formContainer">
      <h4 className="title">اطلاعات درخواست</h4>
      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form">
          <input
            type="text"
            id="reqNum"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="reqNum" className="inputBox__form--label">
            شماره درخواست
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="reqdate"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="reqdate" className="inputBox__form--label">
            تاریخ
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="rqName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="rqName" className="inputBox__form--label">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="rqfName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="rqfName" className="inputBox__form--label">
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form col-span-2">
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
      </form>

      <h4 className="title u-margin-top-md">متن درخواست</h4>

      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="reqBody"
            className="inputBox__form--input"
            required
          >
            {body}
          </textarea>
        </div>
      </form>

      <h4 className="title u-margin-top-md">توضیحات کارشناس</h4>

      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="expertDesc"
            className="inputBox__form--input"
            required
          ></textarea>
        </div>
      </form>
    </section>
  );
}

export default RequestInfoForm;
