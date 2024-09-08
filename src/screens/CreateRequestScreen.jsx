// components
import CreateRequestForm from "../forms/CreateRequestForm";

function CreateRequestScreen() {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>ایجاد درخواست
        </h4>
      </div>

      <CreateRequestForm />
    </section>
  );

  return content;
}

export default CreateRequestScreen;
