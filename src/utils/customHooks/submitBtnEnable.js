import { useEffect } from "react";

const useEnableSubmitBtn = (data, btnId) => {
  useEffect(() => {
    if (data) {
      const AllIsValid = Object.values(data).every((element) => {
        return element === true ? true : false;
      });

      const submitBtn = document.getElementById(btnId);

      if (AllIsValid && submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.add("enabled");
      }
      if (!AllIsValid && submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.remove("enabled");
      }
    }
  }, [data]);
};

export default useEnableSubmitBtn;
