import { useEffect, useState, useContext } from "react";
import { MagazineDetails } from "./MagazineDetails";

import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";
import { MagazineHistory } from "./MagazineHistory";

const MagazineList = () => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  const [magazines, setMagazines] = useState([]);
  const [subscriptionList, setSubscriptionList] = useState([]);

  const getExistingSubList = () => {
    // useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    async function fetchSubscriptionList() {
      let response = await fetch(
        `${BASE_API_URL}user/${state.userId}/subcriptions`,
        requestOptions
      );
      const data = await response.json();
      console.log("subScription list:-", data);
      setSubscriptionList(data);
    }

    fetchSubscriptionList();
    // }, []);
  };
  useEffect(() => {
    if (state?.showSubScription) {
      fetch(`${BASE_API_URL}subscription/user/${state.userId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setMagazines(data);
        });
    } else {
      getExistingSubList();
      fetch(`${BASE_API_URL}magazine`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMagazines(data);
        });
    }
  }, [state.showSubScription]);

  return magazines?.length ? (
    <div className="book-list">
      {state?.showSubScription ? (
        <div>
          <h2>Your history</h2>
          <ul>
            {magazines?.map((magazine) => (
              // @ts-expect-error
              <MagazineHistory key={magazine?.id} magazine={magazine} />
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {magazines?.map((magazine) => (
            // @ts-expect-error
            <MagazineDetails
              // @ts-ignore
              key={magazine?.id}
              magazine={magazine}
              subscriptionList={subscriptionList}
            />
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div className="empty">No Magazine Found</div>
  );
};

export default MagazineList;
