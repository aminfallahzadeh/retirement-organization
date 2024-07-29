// components
import ReportGeneratorTableForm from "../forms/ReportGeneratorTableForm";

function ReportGeneratorScreen() {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">گزارش ساز</span>
        </h4>
      </div>

      <ReportGeneratorTableForm />
    </section>
  );
  return content;
}

export default ReportGeneratorScreen;
