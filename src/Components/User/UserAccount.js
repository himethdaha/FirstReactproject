// styles
import "../../css/UserAcc.css";
import "../../css/Form.css";

const UserAccount = ({ urluserName }) => {
  return (
    <div className="userAcc-container">
      <div className="userInfo-container">
        <h2 className="userAcc-header">Information</h2>
        <form className="userAcc-form">
          <div className="userAcc-grid">
            <label className="form-label form-label-userAcc" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-input form-input-userAcc"
              id="email"
              name="email"
              placeholder="pain@gmail.com"
              required={true}
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="username"
              name="username"
              placeholder="Kaiokenx10"
              required={true}
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.username && (
          <ErrorAlert message={error.signUpError.username} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="age">
              Age
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="userAge"
              name="age"
              placeholder="100"
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.username && (
          <ErrorAlert message={error.signUpError.username} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="age">
              Proficiency
            </label>
            <select
              className="form-userAcc-dropdown"
              id="level"
              name="proficiency"
            >
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
            {/* {error?.signUpError?.username && (
          <ErrorAlert message={error.signUpError.username} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="userAddress"
              name="address"
              placeholder="3000 Saiyan Street"
              required={true}
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="city">
              City
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="userCity"
              name="city"
              placeholder="Toronto"
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="province">
              Province
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="userProv"
              name="province"
              placeholder="Ontario"
              //   onChange={handleInputOnChange}
            ></input>
            <label className="form-label form-label-userAcc" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              className="form-input form-input-userAcc"
              id="userCountry"
              name="country"
              placeholder="Canada"
              //   onChange={handleInputOnChange}
            ></input>
            {/* {error?.signUpError?.email && (
          <ErrorAlert message={error.signUpError.email} />
        )} */}
            <label className="form-label form-label-userAcc" htmlFor="image">
              Profile Pic
            </label>
            <input
              type="file"
              className="form-input form-input-img"
              id="image"
              name="profilepic"
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
              className="form-submit-btn"
              id="accounts-btn-clear"
              type="submit"
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
              placeholder="Amazing Cookie"
              required={true}
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
                placeholder="MM"
                maxLength={2}
                required={true}
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
                placeholder="YY"
                maxLength={2}
                required={true}
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
              placeholder="4111 1111 1111 1111"
              required={true}
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
              id="accounts-btn-submit"
              type="submit"
            >
              <span>Submit</span>
            </button>
            <button
              className="form-submit-btn"
              id="accounts-btn-clear"
              type="submit"
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
