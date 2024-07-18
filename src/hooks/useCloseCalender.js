// react imports
import { useEffect } from "react";

const useCloseCalender = (calenderRefs, setHandlers) => {
  useEffect(() => {
    const handleCloseCalender = (event) => {
      calenderRefs.forEach((inputRef, index) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setHandlers[index](false);
        }
      });
    };

    document.addEventListener("mousedown", handleCloseCalender);

    return () => {
      document.removeEventListener("mousedown", handleCloseCalender);
    };
  }, [calenderRefs, setHandlers]);
};

export { useCloseCalender };
