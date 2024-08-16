import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import bg from "../assets/szq.png";
import { resetPassword } from "../actions/users.actions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const PasswordReset = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useRef();
  const checkBtn = useRef();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const updatePassword = () => {
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setLoading(false);
    } else {
      dispatch(resetPassword(token, password))
        .then(() => {
          setMessage("Password has been reset successfully!");
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setMessage("Failed to reset password. Please try again.");
          setLoading(false);
        });
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      updatePassword();
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
        <Form onSubmit={handlePasswordReset} ref={form}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
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
              <span>Reset Password</span>
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

export default PasswordReset;
