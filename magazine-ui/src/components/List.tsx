import React, { useContext, useEffect, useState } from "react";

import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";
// import { ListItem } from "./ListItem";
import { ListContainer } from "./ListContainer";
import { MagazineHistory } from "./MagazineHistory";

export const List = () => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    // console.log(state.showSubScription, updateList);
    if (state?.showSubScription) {
      fetch(`${BASE_API_URL}subscription/user/${state.userId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMagazines(data);
        });
    } else {
      fetch(`${BASE_API_URL}magazine`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMagazines(data);
        });
    }
  }, []);
  return magazines.map((magazine) => {
    return (
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
            <ListContainer magazine={magazine} />
          </ul>
        )}
      </div>
    );
  });
};
