"use client";
import React, { use } from "react";
import { getSingle } from "../../../../Services/productServices";
import {
  Banner,
  Wrapper,
  FlexWrap,
  Flex,
  Card,
  Label,
  Button,
  Paragraph,
  TextField,
} from "mfg-ui-components";

const promiseCache = new Map<string, Promise<unknown>>();
function useQuery<T>({ fn, key }: { fn: () => Promise<T>; key: string }) {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }
  const promisres = promiseCache.get(key) as Promise<T>;
  const result = use(promisres);
  return result;
}

const SingleProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const singleData = useQuery({
    key: `single-data-${id}`,
    fn: () => getSingle(id),
  });

  const addToCart = (product) => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem("cartData")) || [];

    // Check if product already exists in cart
    const isExist = existingCart.find((item) => item.id === product.id);

    if (isExist) {
      // If exists, update quantity
      const updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.pStock + 1 } : item
      );
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
    } else {
      // If not in cart, add with quantity 1
      localStorage.setItem(
        "cartData",
        JSON.stringify([...existingCart, { ...product, quantity: 1 }])
      );
    }

    alert("Added to cart!");
  };

  const decreaseQty = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cartData")) || [];

    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // remove if quantity is 0

    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cartData")) || [];

    const updatedCart = cart.filter((item) => item.id !== productId);

    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <Banner
        bannerSize="oneTherd"
        bannerOverlay="lightOverlay"
        bannerImage={`https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alterText="Banner"
      >
        <h1>Product</h1>
      </Banner>
      <Wrapper wrapClass="fixWrap">
        <FlexWrap>
          <Flex FlexWidth="full-col">
            {singleData.map((item: any, index: number) => {
              return (
                <Card
                  key={index}
                  CardView="mfg-list"
                  CardImagePath={`http://localhost:9090/uploads/${item.pImage}`}
                  CardImageAlt={item.pName}
                  cardHeading={item.pName}
                  cardBodyChildren={
                    <>
                      <Paragraph>{item.pDescription}</Paragraph>
                      <Paragraph>
                        <Label>Rs.{item.pPrice}</Label>
                      </Paragraph>
                      <Paragraph>
                        <Label>Stock : </Label>
                        {item.pStock}
                      </Paragraph>
                      <div className="d-flex">
                        {item.quantity && <Button
                          ButtonClass="mfg-danger"
                          onClick={() => decreaseQty(item.id)}
                        >
                          -
                        </Button>}
                        <TextField
                          Type="input"
                          SubType="number"
                          PlaceHolder="1"
                        />
                        <Button
                          ButtonClass="mfg-success"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                      <div>
                        <Button
                          ButtonClass="mfg-success"
                          onClick={() => addToCart(item)}
                        >
                          Add To cart
                        </Button>
                        <Button
                          ButtonClass="mfg-danger"
                          onClick={() => removeFromCart(item)}
                        >
                          Remove From cart
                        </Button>
                      </div>
                    </>
                  }
                />
              );
            })}
          </Flex>
        </FlexWrap>
      </Wrapper>
    </div>
  );
};

export default SingleProduct;
