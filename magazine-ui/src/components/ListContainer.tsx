import React, { useEffect, useContext, useState } from "react";

import { MagazineContext } from "../contexts/MagazineContext";
import { MagazineType } from "../types/appTypes";
import { getSubscriptionDataByUserId } from "../utility/getSubscriptionUtil";
import { ListItem } from "./ListItem";

export const ListContainer = ({ magazine }: MagazineType) => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [isSubscriptionUpdate, setIsSubscriptionUpdate] = useState(false);

  useEffect(() => {
    getSubscriptionDataByUserId(state.userId).then((data) => {
      setSubscriptionList(data);
    });
  }, []);

  useEffect(() => {
    getSubscriptionDataByUserId(state.userId).then((data) => {
      setSubscriptionList(data);
    });
  }, [isSubscriptionUpdate]);

  return (
    <ListItem
      magazine={magazine}
      subscriptionList={subscriptionList}
      setIsSubscriptionUpdate={setIsSubscriptionUpdate}
    />
  );
};
