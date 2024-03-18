function Error() {
  return (
    <div className="errorContainer">
      <div className="errorContainer__message">
        <h1>! به نظر می آید مشکلی پیش آمده است</h1>
      </div>

      <div className="errorContainer__buttons u-margin-top-medium">
        <button className="button btn--dark">صفحه قبل</button>
      </div>
    </div>
  );
}

export default Error;
