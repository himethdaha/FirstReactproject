// Imports
import fetchData from "../../utils/helperFunctions/returnFetchUpdateResponse";
import ErrorAlert from "../Alerts/ErrorAlert";

// 3rd party libraries
import DatePicker from "react-datepicker";
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

const UserAccount = ({
  handleUserInfoUpdate,
  userUpdatedInfo,
  startDate,
  years,
  countries,
  states,
  cities,
  urluserName,
  error,
}) => {
  const [profilePic, setProfilePic] = useState();

  // Re-render component with new profile picture or updated username
  useEffect(() => {}, [profilePic]);

  const handleUserInfoUpdateSubmit = async (event) => {
    event.preventDefault();

    const dataSent = { ...userUpdatedInfo, user: urluserName };
    try {
      const responseData = await fetchData(
        "http://localhost:8000/My_Account/Update",
        dataSent,
        "PATCH"
      );
      console.log(
        "🚀 ~ file: UserAccount.js:51 ~ handleUserInfoUpdateSubmit ~ responseData:",
        responseData
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
        // Generate user image'
        console.log("responsedata", responseData);
        localStorage.setItem("encodedImage", responseData.image);
        setProfilePic(responseData.image);

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
                onChange={handleUserInfoUpdate}
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
                onChange={handleUserInfoUpdate}
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
                onChange={handleUserInfoUpdate}
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
              onChange={handleUserInfoUpdate}
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
              onChange={handleUserInfoUpdate}
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
              onChange={handleUserInfoUpdate}
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
              onChange={handleUserInfoUpdate}
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
                onChange={handleUserInfoUpdate}
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
              onChange={handleUserInfoUpdate}
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
      <div className="userPayment-container">
        <h2 className="userAcc-header">Payment</h2>
        <form className="userPayment-form">
          <div className="payment-grid">
            <label className="form-label form-label-userAcc" htmlFor="cardName">
              Name on Card
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="nameOnCard"
              name="cardName"
              required={true}
              placeholder="Amazing Cookie"
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="cardExp">
              Expiry
            </label>
            <div className="cardExp-inp">
              <input
                type="text"
                className="form-input form-input-userAcc expMonth"
                id="expiryMonth"
                name="cardExpMonth"
                required={true}
                placeholder="MM"
                maxLength={2}
                //   onChange={handleInputOnChange}
              ></input>
              {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
              <span className="cardExp-slash">/</span>
              <input
                type="text"
                className="form-input form-input-userAcc expYear"
                id="expiryYear"
                name="cardExpYear"
                required={true}
                placeholder="YY"
                maxLength={2}
                //   onChange={handleInputOnChange}
              ></input>
              {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            </div>
            <label className="form-label form-label-userAcc" htmlFor="cardNo">
              Card Number
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="expiry"
              name="cardNo"
              required={true}
              placeholder="4111 1111 1111 1111"
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="cvv">
              CVV
            </label>
            <input
              type="password"
              className="form-input form-input-userAcc"
              id="cardCvv"
              name="cvv"
              required={true}
              placeholder="***"
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
          </div>
          <div className="account-btns">
            <button
              className="form-submit-btn"
              id="payment-btn-submit"
              type="submit"
            >
              <span>Submit</span>
            </button>
            <button
              className="form-submit-clear-btn"
              id="payments-btn-clear"
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
