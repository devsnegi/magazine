import React from "react";

interface Subscription {
  magazineId: number;
  date: string;
}

interface SubscriptionHistoryProps {
  subscriptions: Subscription[];
}

const SubscriptionHistory: React.FC<SubscriptionHistoryProps> = ({
  subscriptions,
}) => {
  return (
    <ul>
      {subscriptions.map((subscription, index) => (
        <li key={index}>
          Magazine {subscription.magazineId} - Subscribed on {subscription.date}
        </li>
      ))}
    </ul>
  );
};

export default SubscriptionHistory;
