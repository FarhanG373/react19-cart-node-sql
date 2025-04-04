"use client";
import React, { useState, useEffect } from "react";
import {
  Banner,
  Wrapper,
  FlexWrap,
  Flex,
  Card,
  Label,
  Paragraph,
  Button,
  Heading,
} from "mfg-ui-components";

const Cart = () => {
  const [cart, setCart] = useState([]); // State to track user
  const [totalPrice, setTotalPrice] = useState(0);

  const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cartData")) || [];

    const updatedCart = cart.filter((item) => item.id !== productId);

    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    window.location.reload();
  };
  const calculateTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cartData") || "[]");
    const total = cart.reduce(
      (sum, item) => sum + item.pPrice * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartData"));
    setCart(cart);
    calculateTotal();
  }, []);
  return (
    <div>
      <Banner
        bannerSize="oneTherd"
        bannerOverlay="lightOverlay"
        bannerImage={`https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alterText="Banner"
      >
        <h1>Added Product</h1>
      </Banner>
      <Wrapper wrapClass="fixWrap">
        <FlexWrap FlexWrap="wrap">
          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <Flex FlexWidth="full-col" key={item}>
                  <Card
                    CardCustomClass="cartCard"
                    CardView="mfg-list"
                    CardImagePath={`http://localhost:9090/uploads/${item.pImage}`}
                    CardImageAlt={item.pName}
                    cardHeading={item.pName}
                    cardBodyChildren={
                      <>
                        <Paragraph>
                          <Label>Price :</Label> {item.pPrice}Rs.{" "}
                        </Paragraph>
                        <Paragraph>
                          <Label>Added Item :</Label> {item.quantity}
                        </Paragraph>
                        <Paragraph>
                          <Label>Total for Item :</Label>{" "}
                          {item.pPrice * item.quantity} Rs.
                        </Paragraph>
                      </>
                    }
                    cardFooterChildren={
                      <Button ButtonClass="mfg-danger" onClick={() => removeFromCart(item.id)}>
                        Remove item
                      </Button>
                    }
                  />
                </Flex>
              );
            })
          ) : (
            <div className={`textCenter`}>
              <Heading Type="h2">
                No item Found
              </Heading>
              <Button ButtonClass="mfg-primary" link={`/dashboard`}>Go to Product list</Button>
            </div>
          )}
        </FlexWrap>
        {cart.length > 0 && <FlexWrap FlexJustify="justify-end">
          <Flex FlexWidth="col-3">
            <Label>Total : </Label>
            {totalPrice} Rs.
          </Flex>{" "}
        </FlexWrap>}
      </Wrapper>
    </div>
  );
};

export default Cart;
