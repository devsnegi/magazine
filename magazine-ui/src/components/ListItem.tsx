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
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  const getSubScriptionBtn = (magazine: Magazine) => {
    const isSubscribed = subscriptionList?.find(
      (sub: SubscriptionsType) => sub.magazineId === magazine.id && sub.isActive
    );

    return isSubscribed ? (
      <button
        className="subscribe-btn"
        onClick={() => handleUnSubscribe(magazine)}
      >
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
      const response = await checkAndUpdateSubscription(mag, true);
      if (response.affected) {
        toast.success("Your subscription updated successful!");
      } else {
        toast.success("Something went wrong");
      }

      setIsSubscriptionUpdate((prev) => !prev);
      return;
    }

    createMagazineSubscription(state.userId, magazine)
      // @ts-ignore
      .then((data) => {
        toast.success("Your subscription is successful!");
      });
    setIsSubscriptionUpdate((prev) => !prev);
  };

  const handleUnSubscribe = async (magazine: Magazine) => {
    const mag = getMagazine(magazine.id, subscriptionList);
    const response = await checkAndUpdateSubscription(mag, false);
    if (response.affected) {
      toast.success("Your subscription updated successful!");
    } else {
      toast.success("Something went wrong");
    }
    setIsSubscriptionUpdate((prev) => !prev);
  };

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
