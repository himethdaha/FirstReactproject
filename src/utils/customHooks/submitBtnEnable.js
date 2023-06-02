import { useEffect } from "react";

const useEnableSubmitBtn = (data, btnId) => {
  useEffect(() => {
    if (btnId === "accounts-btn-submit") {
      const someValid = Object.values(data).some((element) => {
        return element === true ? true : false;
      });

      const submitBtn = document.getElementById(btnId);

      if (someValid && submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.add("enabled");
      }
      if (!someValid && submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.remove("enabled");
      }
      return;
    }
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
