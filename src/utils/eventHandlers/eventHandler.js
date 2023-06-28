// To handle signin form inputs
const handleInputOnChange = (
  event,
  validateData,
  validData,
  setError,
  setForm,
  data
) => {
  const eventName = event.target.name;
  const eventValue = event.target.value;

  let passwd;
  let currPasswd;
  let errors = {};

  // Validate the email address
  if (eventName === "email") {
    if (eventValue.length === 0) {
      validateData({ ...validData, email: false });
      errors.email = "Email address is required";
    } else if (
      !eventValue.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
      )
    ) {
      validateData({ ...validData, email: false });
      errors.email = "Email is invalid";
    } else {
      validateData({ ...validData, email: true });
    }
  }
  // Validate the username
  else if (eventName === "username") {
    if (eventValue.length === 0) {
      validateData({ ...validData, username: false });
      errors.username = "Username is required";
    } else if (eventValue.length > 10) {
      validateData({ ...validData, username: false });
      errors.username = "Username can't be longer than 10 characters";
    } else {
      validateData({ ...validData, username: true });
    }
  }
  // Validate the password
  else if (eventName === "password") {
    if (eventValue.length === 0) {
      validateData({ ...validData, password: false });
      errors.password = "Password is required";
    } else if (
      !eventValue.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-=+{};:,<.>|[\]/?]).{6,}$/gm
      )
    ) {
      validateData({ ...validData, password: false });
      errors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 6 characters";
    } else {
      validateData({ ...validData, password: true });
    }
  }
  // Validate the confirm password
  else if (eventName === "passwordConfirm") {
    if (!("password" in errors)) {
      passwd = document.getElementById("password");
      currPasswd = passwd.value;
    }

    if (eventValue.length === 0) {
      errors.passwordConfirm = "Confirm Password is required";
      validateData({ ...validData, passwordConfirm: false });
    } else if (eventValue !== currPasswd) {
      errors.passwordConfirm = "Confirm Password invalid";
      validateData({ ...validData, passwordConfirm: false });
    } else {
      validateData({ ...validData, passwordConfirm: true });
    }
  }
  if (Object.keys(errors).length > 0) {
    console.log("errors", errors);
    setError((prevError) => ({
      ...prevError,
      signUpError: errors,
    }));
  } else {
    // Save form data
    setForm({ ...data, [eventName]: eventValue });
    // Empty the errors
    setError((prevError) => ({
      ...prevError,
      signUpError: {},
    }));
  }
};

// To handle login form inputs
const handleInputOnLoginChange = (
  event,
  validateLoginData,
  validLoginData,
  setError,
  setLoginForm,
  loginData
) => {
  const eventName = event.target.name;
  const eventValue = event.target.value;
  let errors = {};

  // Validate the username
  if (eventName === "login-username") {
    if (eventValue.length === 0) {
      errors.username = "Username is required";
      validateLoginData({ ...validLoginData, username: false });
    } else if (eventValue.length > 10) {
      errors.username = "Username can't be longer than 10 characters";
      validateLoginData({
        ...validLoginData,
        username: false,
      });
    } else {
      validateLoginData({ ...validLoginData, username: true });
    }
  }
  // Validate the password
  else if (eventName === "login-password") {
    if (eventValue.length === 0) {
      errors.password = "Password is required";
    } else if (
      !eventValue.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-=+{};:,<.>|[\]/?]).{6,}$/gm
      )
    ) {
      errors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 6 characters";
      validateLoginData({ ...validLoginData, password: false });
    } else {
      validateLoginData({ ...validLoginData, password: true });
    }
  }

  if (Object.keys(errors).length > 0) {
    setError((prevError) => ({
      ...prevError,
      loginError: errors,
    }));
  } else {
    // Save form data
    setLoginForm({ ...loginData, [eventName]: eventValue });
    // Empty the errors
    setError((prevError) => ({
      ...prevError,
      loginError: {},
    }));
  }
};

// Forgot form validation
const handleInputOnPasswordChange = (
  event,
  validatedPasswordReset,
  validPasswordReset,
  setError,
  setPasswordResetForm,
  passwordResetData
) => {
  const eventName = event.target.name;
  const eventValue = event.target.value;

  let errors = {};

  if (eventName === "passwordResetEmail") {
    if (eventValue.length === 0) {
      validatedPasswordReset({ ...validPasswordReset, email: false });
      errors.passwordResetEmail = "Email address is required";
    } else if (
      !eventValue.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
      )
    ) {
      validatedPasswordReset({
        ...validPasswordReset,
        email: false,
      });

      errors.passwordResetEmail = "Email is invalid";
    } else {
      validatedPasswordReset({ ...validPasswordReset, email: true });
    }
  }
  if (Object.keys(errors).length > 0) {
    console.log("errors", errors);
    setError((prevError) => ({
      ...prevError,
      passwordResetError: errors,
    }));
  } else {
    // Save form data
    setPasswordResetForm({ ...passwordResetData, [eventName]: eventValue });
    // Empty the errors
    setError((prevError) => ({
      ...prevError,
      passwordResetError: {},
    }));
  }
};

// Handle password reset validation form
const handleInputOnPasswordReset = function (
  event,
  validateNewPassword,
  validatedNewPassword,
  setError,
  setNewPasswordData,
  newPasswordData
) {
  const eventName = event.target.name;
  const eventValue = event.target.value;
  console.log(eventName, eventValue);
  let passwd;
  let currPasswd;

  let errors = {};

  // Validate the password
  if (eventName === "newPassword") {
    if (eventValue.length === 0) {
      validateNewPassword({
        ...validatedNewPassword,
        password: false,
      });
      errors.password = "Password is required";
    }
    if (
      !eventValue.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-=+{};:,<.>|[\]/?]).{6,}$/gm
      )
    ) {
      validateNewPassword({
        ...validatedNewPassword,
        password: false,
      });
      errors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 6 characters";
    } else {
      validateNewPassword({ ...validatedNewPassword, password: true });
    }
    console.log("password err", errors);
  }
  // Validate the confirm password
  else if (eventName === "newPasswordConfirmation") {
    if (!("password" in errors)) {
      passwd = document.getElementById("newPassword");
      currPasswd = passwd.value;
    }

    if (eventValue.length === 0) {
      errors.passwordConfirm = "Confirm Password is required";
      validateNewPassword({
        ...validatedNewPassword,
        passwordConfirmation: false,
      });
    } else if (eventValue !== currPasswd) {
      errors.passwordConfirm = "Confirm Password invalid";
      validateNewPassword({
        ...validatedNewPassword,
        passwordConfirmation: false,
      });
    } else {
      validateNewPassword({
        ...validatedNewPassword,
        passwordConfirmation: true,
      });
    }
  }
  // Set error state
  if (Object.keys(errors).length > 0) {
    console.log("errors", errors);
    setError((prevError) => ({
      ...prevError,
      newPasswordSubmit: errors,
    }));
  } else {
    // Save form data
    setNewPasswordData({ ...newPasswordData, [eventName]: eventValue });
    console.log("after setting new password", newPasswordData);
    // Empty the errors
    setError((prevError) => ({
      ...prevError,
      newPasswordSubmit: {},
    }));
  }
};

// Handle input on user info update
const handleUserInfoUpdate = async function (
  event,
  setDate,
  validateUserUpdateInfo,
  validatedUserUpdateInfo,
  updateUserInfo,
  userUpdatedInfo,
  countries,
  setCurrCountry,
  currCountry,
  setStates,
  states,
  setCities,
  formData,
  setError
) {
  // For dob input
  if (event instanceof Date) {
    // Update date status
    setDate(new Date(event));
    const date = event.getDate();
    const month = event.getMonth();
    const year = event.getFullYear();

    const dobString = `${year}-${month + 1}-${date}`;

    validateUserUpdateInfo({
      ...validatedUserUpdateInfo,
      dateOfBirth: true,
    });

    updateUserInfo({ ...userUpdatedInfo, dateOfBirth: dobString });
  } else {
    let errors = {};

    let eventName = event.target.name;
    let eventValue = event.target.value;

    if (eventName === "emailAddress") {
      if (eventValue.length === 0) {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          emailAddress: false,
        });
        errors.email = "Email address is required";
      } else if (
        !eventValue.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/g
        )
      ) {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          emailAddress: false,
        });
        errors.email = "Email is invalid";
      } else {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          emailAddress: true,
        });
      }
    }
    // Validate the username
    else if (eventName === "userName") {
      if (eventValue.length === 0) {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          userName: false,
        });
        errors.username = "Username is required";
      } else if (eventValue.length > 10) {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          userName: false,
        });
        errors.username = "Username can't be longer than 10 characters";
      } else {
        validateUserUpdateInfo({
          ...validatedUserUpdateInfo,
          userName: true,
        });
      }
    }
    // Check for proficieny selected
    else if (eventName === "proficiency") {
      validateUserUpdateInfo({
        ...validatedUserUpdateInfo,
        Proficiency: true,
      });
    }
    // Check if country is selected
    else if (eventName === "country") {
      // Get the countryId for country name
      const countryObj = countries.filter((country) => {
        return country.countryName === eventValue;
      });

      // Set the choosen country Obj
      setCurrCountry([...countryObj]);

      // Update country state
      validateUserUpdateInfo({ ...validatedUserUpdateInfo, Country: true });

      // Call the api
      const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${countryObj[0].countryId}&username=himeth`
      );

      const responseData = await response.json();
      // Get the states
      const allStates = responseData.geonames.map((state) => {
        return {
          provinceName: state.toponymName,
          adminCode: state.adminCode1,
        };
      });
      // Update the states
      setStates([...allStates]);
    }
    // Check if province is selected
    else if (eventName === "province") {
      const adminCode = states.filter((prov) => {
        return prov.provinceName === eventValue;
      });

      const response = await fetch(
        `http://api.geonames.org/searchJSON?country=${currCountry[0].countryCode}&adminCode1=${adminCode[0].adminCode}&username=himeth`
      );

      const responseData = await response.json();

      // Update country state
      validateUserUpdateInfo({ ...validatedUserUpdateInfo, Province: true });

      // Get all cities
      const allCities = responseData.geonames.map((city) => {
        return city.toponymName;
      });

      // Set all cities for the specific province
      setCities([...allCities]);
    }
    // Check if city is selected
    else if (eventName === "city") {
      validateUserUpdateInfo({
        ...validatedUserUpdateInfo,
        City: true,
      });
    }
    // Check if city is selected
    else if (eventName === "address") {
      validateUserUpdateInfo({
        ...validatedUserUpdateInfo,
        Address: true,
      });
    } else if (eventName === "profilepic") {
      //Get the file
      const file = event.target.files[0];

      // Get the image name
      const filePath = eventValue;
      const imageName = filePath.substring(filePath.lastIndexOf("\\") + 1);

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = function (e) {
        // Get file data
        const fileData = e.target.result;
        // Append filedata
        const fileBlob = new Blob([fileData], {
          type: file.type,
        });
        formData.append("profilepic", fileBlob, imageName);
        return updateUserInfo({
          ...userUpdatedInfo,
          profilepic: file,
        });
      };

      validateUserUpdateInfo({
        ...validatedUserUpdateInfo,
        ProfilePic: true,
      });
    }

    // Set error state
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      setError((prevError) => ({
        ...prevError,
        userUpdate: errors,
      }));
    } else {
      // Save form data
      updateUserInfo({ ...userUpdatedInfo, [eventName]: eventValue });
      // Empty the errors
      setError((prevError) => ({
        ...prevError,
        userUpdate: {},
      }));
    }
  }
};

export {
  handleInputOnChange,
  handleInputOnLoginChange,
  handleInputOnPasswordChange,
  handleInputOnPasswordReset,
  handleUserInfoUpdate,
};
