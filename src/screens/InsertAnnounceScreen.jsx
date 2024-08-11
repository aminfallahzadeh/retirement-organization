// react imports
import { useState } from "react";

// components
import InsertAnnounceForm from "../forms/InsertAnnounceForm";
import AnnounceGrid from "../grids/AnnounceGrid";

function InsertAnnounceScreen() {
  // GRID STATE
  const [isRefresh, setIsRefresh] = useState(false);

  return (
    <section className="flex-col u-margin-bottom-xl">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>ثبت اطلاعیه
        </h4>
      </div>

      <InsertAnnounceForm setIsRefresh={setIsRefresh} />

      <div className="flex-col flex-center">
        <h5 className="title-secondary">مدیریت اطلاعیه ها</h5>
      </div>
      <AnnounceGrid isRefresh={isRefresh} />
    </section>
  );
}

export default InsertAnnounceScreen;
