import { useEffect, useState, useContext } from "react";
import { MagazineDetails } from "./MagazineDetails";

import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";
import { MagazineHistory } from "./MagazineHistory";

const MagazineList = () => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  // console.log("showSubScription:-", state);
  const [magazines, setMagazines] = useState([]);
  useEffect(() => {
    if (state?.showSubScription) {
      fetch(`${BASE_API_URL}subscription`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setMagazines(data);
        });
    } else {
      fetch(`${BASE_API_URL}magazine`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
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
            <MagazineDetails key={magazine?.id} magazine={magazine} />
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div className="empty">No Magazine Found</div>
  );
};

export default MagazineList;
