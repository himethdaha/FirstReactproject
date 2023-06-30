// Imports
import fetchData from "../../utils/helperFunctions/returnFetchUpdateResponse";
import ErrorAlert from "../Alerts/ErrorAlert";
import { handleUserInfoUpdate } from "../../utils/eventHandlers/eventHandler";
import useEnableSubmitBtn from "../../utils/customHooks/submitBtnEnable";

// 3rd party libraries
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import "../../css/UserAcc.css";
import "../../css/Form.css";
import { useEffect, useState } from "react";

// To get the months to show in the calendar
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UserAccount = ({ years, pastDate, loggedIn, getUserName }) => {
  console.log(
    "🚀 ~ file: UserAccount.js:35 ~ UserAccount ~ loggedIn:",
    loggedIn
  );

  console.log(
    "🚀 ~ file: UserAccount.js:35 ~ UserAccount ~ pastDate:",
    pastDate
  );
  // Variables
  const formData = new FormData();

  // States
  const [profilePic, setProfilePic] = useState();
  const [userName, setuserName] = useState();
  const navigate = useNavigate();

  // State to validate user update info
  const [validatedUserUpdateInfo, validateUserUpdateInfo] = useState({
    emailAddress: false,
    userName: false,
    dateOfBirth: false,
    Proficiency: false,
    Country: false,
    Province: false,
    City: false,
    Address: false,
    ProfilePic: false,
  });

  // To store date of calander
  const [startDate, setDate] = useState(new Date(pastDate));

  // To store all countries
  const [countries, setCountries] = useState([]);

  // To store all provinces
  const [states, setStates] = useState([]);

  // To store current country
  const [currCountry, setCurrCountry] = useState([]);

  // To store all cities in a province
  const [cities, setCities] = useState([]);

  // State to save user update info
  const [userUpdatedInfo, updateUserInfo] = useState({});

  //State to be triggered by errors in forms
  const [error, setError] = useState({
    signUpError: {},
    loginError: {},
    passwordResetError: {},
    newPasswordSubmit: {},
    userUpdate: {},
    status: 400,
  });

  // Hook for userUpate form to enable/disable submit button
  useEnableSubmitBtn(validatedUserUpdateInfo, "accounts-btn-submit");
  // Re-render component with new profile picture or updated username
  useEffect(() => {}, [profilePic]);

  // Re-render component if username is changed
  useEffect(() => {
    console.log("setting", userName);
  }, [userName]);

  // To get all countries
  useEffect(() => {
    fetch("http://api.geonames.org/countryInfoJSON?username=himeth")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const mappedCountries = responseData.geonames.map((country) => {
          return {
            countryName: country.countryName,
            countryId: country.geonameId,
            countryCode: country.countryCode,
          };
        });
        setCountries([...mappedCountries]);
      });
  }, []);

  const handleUserInfoUpdateSubmit = async (event) => {
    event.preventDefault();

    const dataSent = { ...userUpdatedInfo, user: getUserName };
    try {
      const responseData = await fetchData(
        "http://localhost:8000/My_Account/Update",
        dataSent,
        "PATCH"
      );

      if (responseData.status >= 400 && responseData.status <= 500) {
        throw responseData;
      } else if (responseData.status >= 500) {
        const err = {
          status: responseData.status,
          message: "Something went wrong on our side 🥹",
        };
        throw err;
      } else {
        // Store username if it's changed
        if (responseData.userName) {
          // Set username in ls
          localStorage.setItem("userName", responseData.userName);
          setuserName(responseData.userName);

          // Change url
          navigate(`/My_Account/${responseData.userName}`);
        }
        // Store user image if it's changed
        if (responseData.image) {
          localStorage.setItem("encodedImage", responseData.image);
          setProfilePic(responseData.image);
        }

        toast.success(`${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="userAcc-container">
      <div className="userInfo-container">
        <h2 className="userAcc-header">Information</h2>
        <form
          className="userAcc-form"
          onSubmit={(e) => handleUserInfoUpdateSubmit(e)}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="userAcc-grid">
            <img
              src={localStorage.getItem("encodedImage")}
              className="userAcc-profilepic"
              alt="ProfilePic"
            />
            <div className="userAcc-Profile"></div>
            <label
              className="form-label form-label-userAcc"
              htmlFor="emailAddress"
            >
              Email
            </label>
            <div className="emailErrorGrid">
              <input
                type="email"
                className="form-input form-input-userAcc"
                id="updateEmail"
                name="emailAddress"
                placeholder="pain@gmail.com"
                onChange={(event) =>
                  handleUserInfoUpdate(
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
                  )
                }
              ></input>

              {error?.userUpdate?.email && (
                <ErrorAlert message={error.userUpdate.email} />
              )}
            </div>

            <label className="form-label form-label-userAcc" htmlFor="userName">
              Username
            </label>
            <div className="emailErrorGrid">
              <input
                type="text"
                className="form-input form-input-userAcc"
                id="updateUserName"
                name="userName"
                placeholder="Kaiokenx10"
                onChange={(event) =>
                  handleUserInfoUpdate(
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
                  )
                }
              ></input>
              {error?.userUpdate?.username && (
                <ErrorAlert message={error.userUpdate.username} />
              )}
            </div>
            <label className="form-label form-label-userAcc">
              Date Of Birth
            </label>
            <div className="emailErrorGrid datepicker">
              <DatePicker
                showIcon
                dateFormat={"yyyy/MM/dd"}
                selected={startDate}
                onChange={(event) =>
                  handleUserInfoUpdate(
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
                  )
                }
                isClearable
                placeholderText="I'm a ghost 👻"
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>
                    <select
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) =>
                        changeYear(years[years.indexOf(value)])
                      }
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[date.getMonth()]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                )}
              />
            </div>
            <label
              className="form-label form-label-userAcc"
              htmlFor="proficiency"
            >
              Proficiency
            </label>
            <select
              className="form-userAcc-dropdown"
              id="level"
              name="proficiency"
              onChange={(event) =>
                handleUserInfoUpdate(
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
                )
              }
              defaultValue={"Default"}
            >
              <option
                value={"Default"}
                className="form-userAcc-dropdown-option"
                disabled
              >
                Not Selected
              </option>
              <option
                value={"Beginner"}
                className="form-userAcc-dropdown-option"
              >
                Beginner
              </option>
              <option
                value={"Intermediate"}
                className="form-userAcc-dropdown-option"
              >
                Intermediate
              </option>
              <option
                value={"Advanced"}
                className="form-userAcc-dropdown-option"
              >
                Advanced
              </option>
            </select>
            {error?.signUpError?.username && (
              <ErrorAlert message={error.signUpError.username} />
            )}
            <label className="form-label form-label-userAcc" htmlFor="country">
              Country
            </label>
            <select
              className="form-userAcc-dropdown"
              onChange={(event) =>
                handleUserInfoUpdate(
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
                )
              }
              name="country"
              defaultValue={"Default"}
            >
              <option
                value={"Default"}
                className="form-userAcc-dropdown-option"
                disabled
              >
                Not Selected
              </option>
              {/*Adding key for 'reconciliation'. In case an item gets removed/updated/added React needs to keep track of it*/}
              {countries.map((country, index) => (
                <option
                  key={index}
                  value={country.countryName}
                  className="form-userAcc-dropdown-option"
                >
                  {country.countryName}
                </option>
              ))}
            </select>
            <label className="form-label form-label-userAcc" htmlFor="province">
              Province
            </label>
            <select
              className="form-userAcc-dropdown"
              onChange={(event) =>
                handleUserInfoUpdate(
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
                )
              }
              name="province"
              defaultValue={"Default"}
            >
              <option
                value={"Default"}
                className="form-userAcc-dropdown-option"
                disabled
              >
                Not Selected
              </option>
              {/*Adding key for 'reconciliation'. In case an item gets removed/updated/added React needs to keep track of it*/}
              {states.map((state, index) => (
                <option
                  key={index}
                  value={state.provinceName}
                  className="form-userAcc-dropdown-option"
                >
                  {state.provinceName}
                </option>
              ))}
            </select>
            <label className="form-label form-label-userAcc" htmlFor="city">
              City
            </label>
            <select
              className="form-userAcc-dropdown"
              name="city"
              defaultValue={"Default"}
              onChange={(event) =>
                handleUserInfoUpdate(
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
                )
              }
            >
              <option
                value={"Default"}
                className="form-userAcc-dropdown-option"
                disabled
              >
                Not Selected
              </option>
              {/*Adding key for 'reconciliation'. In case an item gets removed/updated/added React needs to keep track of it*/}
              {cities.map((city, index) => (
                <option
                  key={index}
                  value={city}
                  className="form-userAcc-dropdown-option"
                >
                  {city}
                </option>
              ))}
            </select>
            <label className="form-label form-label-userAcc" htmlFor="address">
              Address
            </label>
            <div className="emailErrorGrid">
              <input
                type="text"
                className="form-input form-input-userAcc"
                id="userAddress"
                name="address"
                placeholder="3000 Saiyan Street"
                onChange={(event) =>
                  handleUserInfoUpdate(
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
                  )
                }
              ></input>
            </div>

            <label
              className="form-label form-label-userAcc"
              htmlFor="profilepic"
            >
              Profile Pic
            </label>
            <input
              type="file"
              className="form-input form-input-img"
              id="image"
              name="profilepic"
              accept="image/jpeg,image/png,image/jpg"
              onChange={(event) =>
                handleUserInfoUpdate(
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
                )
              }
            ></input>
          </div>
          <div className="account-btns">
            <button
              className="form-submit-btn"
              id="accounts-btn-submit"
              type="submit"
            >
              <span>Submit</span>
            </button>
            <button
              className="form-submit-clear-btn"
              id="accounts-clear"
              type="reset"
            >
              <span>Clear</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
