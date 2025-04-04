"use client";
import React, { use } from "react";
import { getProducts } from "../../Services/productServices";
import {
  Banner,
  Wrapper,
  FlexWrap,
  Flex,
  Card,
  Label,
  Button,
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

const Dashboard = () => {
  const data = useQuery({
    fn: () => getProducts(),
    key: "getProducts",
  });
  return (
    <div>
      <Banner
        bannerSize="oneTherd"
        bannerOverlay="lightOverlay"
        bannerImage={`https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alterText="Banner"
      >
        <h1>Products</h1>
      </Banner>
      <Wrapper wrapClass="fixWrap">
        <FlexWrap FlexWrap="wrap">
          {data.map((item: any, index: number) => {
            return (
              <Flex FlexWidth="col-3" key={index}>
                <Card
                  cardHeading={item.pName}
                  cardBodyChildren={
                    <>
                      <Label>{item.pStock > 0 ? 'In Stock' :'out of stock'}</Label>
                      {item.pPrice && <Label>Price : {item.pPrice} Rs.</Label>}
                    </>
                  }
                  CardImagePath={`http://localhost:9090/uploads/${item.pImage}`}
                  CardImageAlt={item.pName}
                  cardFooterChildren={
                    item.pStock > 0 && <Button link={`/dashboard/product/${item.id}`}>View</Button>
                  }
                />
              </Flex>
            );
          })}
        </FlexWrap>
      </Wrapper>
    </div>
  );
};

export default Dashboard;
