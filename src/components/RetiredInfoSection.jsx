// library imports
import { Button } from "react-bootstrap";

// component imports
import RetiredInfoGrid from "./RetiredInfoGrid";
import RetiredHokmInfoModal from "./RetiredHokmInfoModal";

function RetiredInfoSection() {
  return (
    <section className="RetiredInfoSection">
      <div className="RetiredInfoSection__labels">
        <ul className="RetiredInfoSection__labels--list">
          <li>
            <Button variant="light">وابسته</Button>
          </li>
          <li>
            <Button variant="light">احکام</Button>
          </li>
          <li>
            <Button variant="light">فیش حقوقی</Button>
          </li>
          <li>
            <Button variant="light">رفاهی</Button>
          </li>
          <li>
            <Button variant="light">مالی</Button>
          </li>
        </ul>
      </div>

      <div className="RetiredInfoSection__createbtn">
        <Button>ایجاد</Button>
      </div>

      <div className="RetiredInfoSection__grid">
        <RetiredInfoGrid />
      </div>

      <div>
        <RetiredHokmInfoModal />
      </div>
    </section>
  );
}

export default RetiredInfoSection;
