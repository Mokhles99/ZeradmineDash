import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import bg from "../assets/szq.png";
import { forgotPassword } from "../actions/users.actions"; // Import the forgotPassword action

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ForgotPassword = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setLoading(true);
      setMessage("");

      dispatch(forgotPassword(email))
        .then(() => {
          setMessage("Reset link sent to your email.");
          setLoading(false);
        })
        .catch((error) => {
          setMessage("Failed to send reset link. Please try again.");
          setLoading(false);
        });
    }
  };

  return (
    <div 
      className="col-md-12" 
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="card card-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px' }}>
        <Form onSubmit={handleForgotPassword} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button 
              className="btn btn-primary btn-block" 
              disabled={loading}
              style={{
                backgroundColor: '#a97a45',
                borderColor: '#fffffffff',
                color: 'white'
              }}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Send</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
