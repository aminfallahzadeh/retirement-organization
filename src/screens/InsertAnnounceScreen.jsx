// components
import InsertAnnounceForm from "../forms/InsertAnnounceForm";

function InsertAnnounceScreen() {
  return (
    <section className="flex-col u-margin-bottom-xl">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>ثبت اطلاعیه
        </h4>
      </div>

      <InsertAnnounceForm />
    </section>
  );
}

export default InsertAnnounceScreen;
