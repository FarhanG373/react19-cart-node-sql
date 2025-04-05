"use client";
import React, { useEffect, useState } from "react";
import { NavBar, List, ListItem, Button } from "mfg-ui-components";
import { GiArrowDunk } from "react-icons/gi";
import "./components.scss";
import { decodeToken, removeToken } from "../Services/Tocken";
import { useRouter } from "next/navigation";
const Navigation = () => {
  const [user, setUser] = useState<any>(null); // State to track user
  const [cart, setCart] = useState<any>(0); // State to track user
  const router = useRouter();
  useEffect(() => {
    const tokenUser = decodeToken(); // Get user from token
    setUser(tokenUser); // Update state based on token
    const cart = JSON.parse(localStorage.getItem("cartData"));
    setCart(cart);
  }, []);
  const remove = () => {
    removeToken();
    setTimeout(() => {
      router.push("/"); // Change this to your desired page
    }, 1000);
  };
  return (
    <NavBar
      brandName={<GiArrowDunk />}
      baseUrl="/"
      navBarColor="dark"
      navBarClass={"navBarCustom"}
    >
      <List Type="ul">
        <ListItem>
          {<Button link={!user ? `/` : `/dashboard`}>Home</Button>}
        </ListItem>
        <ListItem>
          <Button link={`/category`}>Category</Button>
        </ListItem>
        <ListItem>
          <Button link={user ? `/cart` : '/'}>
            Cart{cart  && user && <span className="cartItem">{cart?.length}</span>} 
          </Button>
        </ListItem>
        {user && (
          <ListItem>
            <Button link={`/dashboard/addProduct`}>Add Product</Button>
          </ListItem>
        )}
        <ListItem>
          {!user && <Button link={`/`}>Login/signup</Button>}
          {user && (
            <Button ButtonClass="mfg-danger" onClick={() => remove()}>
              LogOut
            </Button>
          )}
        </ListItem>
      </List>
    </NavBar>
  );
};

export default Navigation;
