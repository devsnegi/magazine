import React, { Dispatch, SetStateAction, useContext } from "react";
import { toast } from "react-toastify";

import { ListPropType, Magazine, SubscriptionsType } from "../types/appTypes";
import { MagazineContext } from "../contexts/MagazineContext";
import {
  getMagazine,
  checkAndUpdateSubscription,
  createMagazineSubscription,
} from "../utility/getSubscriptionUtil";

export const ListItem = ({
  magazine,
  subscriptionList,
  setIsSubscriptionUpdate,
}: ListPropType) => {
  console.log("magazine, subscriptionList:-", magazine, subscriptionList);
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  const getSubScriptionBtn = (magazine: Magazine) => {
    const isSubscribed = subscriptionList?.find(
      (sub: SubscriptionsType) => sub.magazineId === magazine.id && sub.isActive
    );

    return isSubscribed ? (
      <button className="subscribe-btn" onClick={() => handleUnSubscribe()}>
        UnSubscribe
      </button>
    ) : (
      <button
        className="subscribe-btn"
        onClick={() => handleSubscribe(magazine)}
      >
        Subscribe
      </button>
    );
  };

  const handleSubscribe = async (magazine: Magazine) => {
    // @ts-ignore
    const mag: MagazineDetail = getMagazine(magazine.id, subscriptionList);
    if (mag) {
      await checkAndUpdateSubscription(mag, true);
      setIsSubscriptionUpdate((prev) => !prev);
      return;
    }

    createMagazineSubscription(state.userId, magazine)
      // @ts-ignore
      .then((data) => {
        console.log("createMagazineSubscription:-", data);
        toast.success("Your subscription is successful!");
      });
    // @ts-ignore
    setIsSubscriptionUpdate((prev) => !prev);
  };

  const handleUnSubscribe = () => true;

  return (
    <li className="magazine-card">
      <div className="mag-image">
        <img src="./images1.jpeg" alt={magazine.name} />
      </div>
      <div className="magazine-details">
        <div className="title">{magazine.name}</div>
        <div className="author">Category: {magazine.category}</div>
        <div className="author">Publication: {magazine.publication}</div>
        <div className="author">Price: {magazine.price}$</div>
        {state.userId ? getSubScriptionBtn(magazine) : null}
      </div>
    </li>
  );
};
