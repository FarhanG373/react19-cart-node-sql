"use client";
import Login from "./login/page";
import "./page.scss";
import {
  Banner,
  TabMenu,
  Wrapper,
  FlexWrap,
  Flex,
  Card,
} from "mfg-ui-components";
import SignUp from "./signup/page";
export default function Home() {
  const tabData = [
    {
      id:1,
      title: "LogIn",
      content: <Login/>,
    },
    {
      id:2,
      title: "SignUp",
      content: <SignUp/>,
    }
  ]
  return (
    <div className={"page"}>
      <main className={"main"}>
        <Banner
          bannerSize="oneTherd"
          bannerImage={
            "https://images.pexels.com/photos/31260162/pexels-photo-31260162/free-photo-of-urban-street-scene-in-japanese-city-daylight.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alterText="Login / Signup"
          bannerOverlay="darkOverlay"
          bannerClass="bannerCustom"
        >
          <h1>Login / Signup</h1>
        </Banner>
        <Wrapper wrapClass="fixWrap">
          <FlexWrap FlexAlign="align-center" FlexJustify="justify-center">
            <Flex FlexWidth="col-6">
              <Card cardBodyChildren={
                <TabMenu
                  TabLabel={tabData.map(item => item.title)}
                  TabValue={tabData.map(item => item.content)}
                />
              }
                CardBodyClass={"cardCustom"}
              />
            </Flex>
          </FlexWrap>
        </Wrapper>
      </main>
    </div>
  );
}
