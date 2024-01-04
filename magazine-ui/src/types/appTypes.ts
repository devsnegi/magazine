import React, { Dispatch, SetStateAction } from "react";

export interface Magazine {
  category: string;
  id: number;
  imageurl: string;
  issue: number;
  name: string;
  price: number;
  publication: string;
}

export interface MagazineType {
  magazine: Magazine;
}

export interface SubscriptionsType {
  id: number;
  isActive: boolean;
  magazineId: number;
  price: number;
  type: string;
  userId: number;
  startDate: Date;
  endDate: Date;
}

export interface ListPropType {
  magazine: Magazine;
  subscriptionList: SubscriptionsType[];
  setIsSubscriptionUpdate: Dispatch<SetStateAction<boolean>>;
}
