"use client";
import React, { useState, useEffect } from "react";
import {
  Banner,
  Wrapper,
  FlexWrap,
  Flex,
  Card,
  TextField,
  Alert,
} from "mfg-ui-components";
import { decodeToken } from "../../../Services/Tocken";
import { addProduct } from "../../../Services/productServices";
const AddProduct = () => {
  const [user, setUser] = useState<any>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productStock: "",
    productPrice: "",
    productCategory: "",
    productOwner: "",
    productImage: '' 
  });

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null; // Get the first file
    setProductImage(file); // Update state
  };
  
  const addprod = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Reset messag

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("productDescription", formData.productDescription);
    formDataToSend.append("productStock", formData.productStock);
    formDataToSend.append("productPrice", formData.productPrice);
    formDataToSend.append("productCategory", formData.productCategory);
    formDataToSend.append("productOwner", formData.productOwner);
    if (productImage) {
      formDataToSend.append("productImage", productImage); 
    }

    const result = await addProduct(formDataToSend);
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
        productName: "",
        productDescription: "",
        productStock: "",
        productPrice: "",
        productCategory: "",
        productOwner: "",
        productImage: '' 
      }); 
      setProductImage(null);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenUser = decodeToken();
      setUser(tokenUser);
      if (tokenUser?.name) {
        setFormData((prevData) => ({
          ...prevData,
          productOwner: tokenUser.name,
        }));
      }
    }
  }, []);

  return (
    <div>
      <Banner
        bannerSize="oneTherd"
        bannerOverlay="lightOverlay"
        bannerImage={`https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alterText="Banner"
      >
        <h1>Add Product</h1>
      </Banner>
      <Wrapper wrapClass="fixWrap">
        <FlexWrap>
          <Flex FlexWidth="full-col">
            <Card
              cardBodyChildren={
                <form onSubmit={addprod}>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="text"
                      name={"productName"}
                      PlaceHolder={"Enter Product Name"}
                      onChange={handleChange}
                      value={formData.productName}
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="textarea"
                      name={"productDescription"}
                      PlaceHolder={"Enter Product Description"}
                      onChange={handleChange}
                      value={formData.productDescription}
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="number"
                      name={"productStock"}
                      PlaceHolder={"Enter Product Stock"}
                      onChange={handleChange}
                      value={formData.productStock}
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="number"
                      name={"productPrice"}
                      PlaceHolder={"Enter Product Price"}
                      onChange={handleChange}
                      value={formData.productPrice}
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="text"
                      name={"productCategory"}
                      PlaceHolder={"Enter Product Category"}
                      onChange={handleChange}
                      value={formData.productCategory}
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="text"
                      name={"productOwner"}
                      onChange={handleChange}
                      value={formData.productOwner || ""}
                      Disabled
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="file"
                      name={"productImage"}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="formRow">
                    <TextField
                      Type="input"
                      SubType="submit"
                      value={"Add Product"}
                    />
                  </div>
                  {message && (
                    <Alert
                      alertType={
                        message.type === "error" ? "danger" : "success"
                      }
                      alertContent={message.text}
                      showAlrt
                    ></Alert>
                  )}
                </form>
              }
            />
          </Flex>
        </FlexWrap>
      </Wrapper>
    </div>
  );
};

export default AddProduct;
