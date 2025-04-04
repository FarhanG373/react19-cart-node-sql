"use client";

import { useState } from "react";
import { registerUser } from "../../Services/authServices";
import { TextField, Alert } from "mfg-ui-components";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    uName: "",
    email: "",
    pNumber: "",
    password: "",
  });

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Reset messag
    const result = await registerUser(formData);
    if (result.error) {
      if (result.status === 409) {
        setMessage({
          type: "error",
          text: "This email is already registered. Please log in instead.",
        });
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } else {
      setMessage({ type: "success", text: result.message });
      setFormData({
        fname: "",
        uName: "",
        email: "",
        pNumber: "",
        password: "",
      }); // Clear form
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="formRow">
          <TextField
            Type="input"
            LabelName={"Full Name"}
            SubType="text"
            name={"fname"}
            TextFieldId={"fullName"}
            onChange={handleChange}
            value={formData.fname}
          />
        </div>
        <div className="formRow">
          <TextField
            Type="input"
            LabelName={"User Name"}
            SubType="text"
            name={"uName"}
            TextFieldId={"uName"}
            onChange={handleChange}
            value={formData.uName}
          />
        </div>
        <div className="formRow">
          <TextField
            Type="input"
            LabelName={"Phone number"}
            SubType="text"
            name={"pNumber"}
            TextFieldId={"pNumber"}
            onChange={handleChange}
            value={formData.pNumber}
          />
        </div>
        <div className="formRow">
          <TextField
            Type="input"
            LabelName={"Email Address"}
            SubType="email"
            name={"email"}
            TextFieldId={"emailAddress"}
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="formRow">
          <TextField
            Type="input"
            LabelName={"Password"}
            SubType="password"
            name={"password"}
            TextFieldId={"password"}
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="formRow">
          <TextField Type="input" SubType="submit" value={"Sign up"} />
        </div>
      </form>
      {message && (
        
        <Alert alertType={message.type === "error" ? "danger" : "success"} alertContent={message.text} showAlrt>
          
        </Alert>
      )}
    </>
  );
};

export default SignUp;
