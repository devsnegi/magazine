import React, { useContext, useEffect, useState } from "react";
import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";

interface Magazine {
  id: number;
  name: string;
  category: string;
  publication: string;
}

interface MagazineDetail {
  id: number;
  name: string;
  category: string;
  publication: string;
  price: number;
  type: ["weekly", "monthly", "yearly"];
  issue: number;
  imagurl: string;
}
interface SubscribedMagazine {
  id: number;
  userId: number;
  magazineId: number;
  isActive: boolean;
  magazineDetail: MagazineDetail;
}
// @ts-ignore
export const MagazineDetails = ({ magazine }) => {
  // @ts-expect-error
  const { dispatch } = useContext(MagazineContext);
  const [newSubscription, setNewSubscription] = useState(0);
  const [subscriptionList, setSubscriptionList] = useState([]);

  const getMagazineID = (id: number) => {
    // @ts-ignore
    const subscribedMagazine: SubscribedMagazine = subscriptionList.find(
      (sub: SubscribedMagazine) => sub.magazineId === id
    );
    return subscribedMagazine?.id;
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${BASE_API_URL}user/4/subcriptions`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSubscriptionList(data));
  }, []);

  const checkAndUpdateSubscription = (magazineId: number, active: boolean) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isActive: active,
      }),
    };
    // @ts-ignore
    fetch(
      `${BASE_API_URL}mag-subscription/${magazineId}/unsubscribe`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setNewSubscription(data.id));
  };

  const handleSubscribe = async (magazine: MagazineDetail) => {
    const magazineId = getMagazineID(magazine.id);
    if (magazineId) {
      checkAndUpdateSubscription(magazineId, true);
      return;
    }
    const defaultEndDate = new Date();
    defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 5);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 4,
        magazineId: magazine.id,
        isActive: true,
        price: magazine.price,
        type: "weekly",
        startDate: new Date(),
        endDate: defaultEndDate,
      }),
    };

    fetch(`${BASE_API_URL}mag-subscription`, requestOptions)
      .then((response) => response.json())
      .then((data) => setNewSubscription(data.id));
  };
  const handleUnSubscribe = (magazine: MagazineDetail) => {
    const magazineId = getMagazineID(magazine.id);
    checkAndUpdateSubscription(magazineId, false);
  };

  const getSubScriptionBtn = (magazine: MagazineDetail) => {
    // @ts-ignore
    const isSubscribed = subscriptionList.find(
      // @ts-ignore
      (sub) => sub.magazineId === magazine.id && sub.isActive
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
        {getSubScriptionBtn(magazine)}
      </div>
    </li>
  );
};
