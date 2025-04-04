"use client";
import { useState } from "react";
import { loginUser } from "../../Services/authServices";
import { TextField, Alert } from "mfg-ui-components";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
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
    const result = await loginUser(formData);
    if (result.error) {
      if (result.status === 401) {
        setMessage({
          type: "error",
          text: result.message,
        });
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } else {
      setMessage({ type: "success", text: result.message });
      setFormData({
        email: "",
        password: "",
      }); // Clear form
      localStorage.setItem("next19lerning", JSON.stringify(result.token));
      setTimeout(() => {
        router.push("/dashboard"); // Change this to your desired page
      }, 1000);
      
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <TextField Type="input" SubType="submit" value={"Login"} />
        </div>
      </form>
      {message && (
        <Alert
          alertType={message.type === "error" ? "danger" : "success"}
          alertContent={message.text}
          showAlrt
        ></Alert>
      )}
    </>
  );
};

export default Login;
