import React, { useContext, useEffect, useState } from "react";
import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";
// @ts-expect-error
export const MagazineDetails = ({ magazine }) => {
  // @ts-expect-error
  const { dispatch } = useContext(MagazineContext);
  const [newSubscription, setNewSubscription] = useState(0);
  const [subscriptionList, setSubscriptionList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${BASE_API_URL}user/7/subcriptions`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSubscriptionList(data));
  }, []);

  const handleSubscribe = (id: number) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscriptionId: 1,
        userId: 7,
        magazineId: id,
        isActive: true,
      }),
    };

    fetch(`${BASE_API_URL}mag-subscription`, requestOptions)
      .then((response) => response.json())
      .then((data) => setNewSubscription(data.id));
  };

  const handleUnSubscribe = (id: number) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${BASE_API_URL}mag-subscription/${id}/unsubscribe`, requestOptions)
      .then((response) => response.json())
      .then((data) => setNewSubscription(data.id));
  };

  const getSubScriptionBtn = (id: number) => {
    // @ts-ignore
    const isSubscribed = subscriptionList.find((sub) => sub.magazineId === id);
    return isSubscribed ? (
      <button
        className="subscribe-btn"
        onClick={() => handleUnSubscribe(magazine.id)}
      >
        UnSubscribe
      </button>
    ) : (
      <button
        className="subscribe-btn"
        onClick={() => handleSubscribe(magazine.id)}
      >
        Subscribe
      </button>
    );
  };

  return (
    <li
      className="magazine-card"
      onClick={() => dispatch({ type: "REMOVE_BOOK", id: magazine.id })}
    >
      <div className="mag-image">
        <img src="./images1.jpeg" alt={magazine.name} />
      </div>
      <div className="magazine-details">
        <div className="title">{magazine.name}</div>
        <div className="author">Category: {magazine.category}</div>
        <div className="author">Publication: {magazine.publication}</div>
        {getSubScriptionBtn(magazine.id)}
      </div>
    </li>
  );
};
