import React, { useContext, useEffect, useState } from "react";

import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";
// import { ListItem } from "./ListItem";
import { ListContainer } from "./ListContainer";
import { MagazineHistory } from "./MagazineHistory";
import { Magazine } from "../types/appTypes";

export const List = () => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  const [magazines, setMagazines] = useState([]);
  const showSubScription = state.showSubScription;

  const getMagazineData = () => {
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
  };

  useEffect(() => {
    getMagazineData();
  }, []);

  useEffect(() => {
    getMagazineData();
  }, [showSubScription]);

  const renderMagazine = () => {
    return magazines.map((magazine: Magazine) => {
      return (
        <div className="book-list">
          {state?.showSubScription ? (
            <div>
              <ul>
                <MagazineHistory key={magazine?.id} magazine={magazine} />
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
  return magazines.length ? renderMagazine() : <h2>No data to display</h2>;
};
