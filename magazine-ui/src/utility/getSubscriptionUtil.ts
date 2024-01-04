import { BASE_API_URL } from "../constant/appConstant";
import { Magazine, SubscriptionsType } from "../types/appTypes";

export const getSubscriptionDataByUserId = async (id: number) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    `${BASE_API_URL}user/${id}/subcriptions`,
    requestOptions
  );
  // @ts-ignore
  const data = await response?.json();
  return data;
};

// @ts-ignore
export const createMagazineSubscription = async (userId, magazine) => {
  const defaultEndDate = new Date();
  defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 5);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      magazineId: magazine.id,
      isActive: true,
      price: magazine.price,
      type: "weekly",
      startDate: new Date(),
      endDate: defaultEndDate,
    }),
  };

  const response = await fetch(
    `${BASE_API_URL}mag-subscription`,
    requestOptions
  );
  const data = await response?.json();
  return data;
};
// @ts-ignore
export const getMagazine = (id: number, list) => {
  const subscribedMagazine: SubscriptionsType = list.find(
    (sub: SubscriptionsType) => sub.magazineId === id
  );
  return subscribedMagazine;
};

export const checkAndUpdateSubscription = async (
  magazine: SubscriptionsType,
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

  const response = await fetch(
    `${BASE_API_URL}mag-subscription/${magazine.id}/unsubscribe`,
    requestOptions
  );
  const data = await response?.json();
  return data;
};
