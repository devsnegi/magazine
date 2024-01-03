import React, { useContext, useEffect, useState } from "react";
import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";

interface Magazine {
  id: number;
  magazineId: number;
  name: string;
  category: string;
  publication: string;
}

interface MagazineDetail {
  id: number;
  magazineId: number;
  name: string;
  category: string;
  publication: string;
  price: number;
  type: string;
  issue: number;
}
interface SubscribedMagazine {
  id: number;
  userId: number;
  magazineId: number;
  isActive: boolean;
  magazineDetail: MagazineDetail;
}
// @ts-ignore
export const MagazineDetails = ({ magazine, isHistory }) => {
  // @ts-expect-error
  const { dispatch } = useContext(MagazineContext);
  const [newSubscription, setNewSubscription] = useState(0);
  const [subscriptionList, setSubscriptionList] = useState([]);

  const getMagazine = (id: number) => {
    // @ts-ignore
    const subscribedMagazine: SubscribedMagazine = subscriptionList.find(
      (sub: SubscribedMagazine) => sub.magazineId === id
    );
    return subscribedMagazine;
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

  const checkAndUpdateSubscription = (
    magazine: MagazineDetail,
    active: boolean
  ) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...magazine,
        isActive: active,
      }),
    };
    // @ts-ignore
    fetch(
      `${BASE_API_URL}mag-subscription/${magazine.id}/unsubscribe`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setNewSubscription(data.id));
  };

  const handleSubscribe = async (magazine: MagazineDetail) => {
    // @ts-ignore
    const mag: MagazineDetail = getMagazine(magazine.id);

    console.log("mag:-", mag, "magazine:-", magazine);
    if (mag) {
      checkAndUpdateSubscription(mag, true);
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
  const handleUnSubscribe = (mag: MagazineDetail) => {
    console.log("mag:-", mag);
    const magazine = getMagazine(mag.id);
    console.log("magazine:-", magazine);
    // @ts-ignore
    checkAndUpdateSubscription(magazine, false);
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
    <>
      {isHistory ? <div>Your subscription history</div> : null}
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
    </>
  );
};
