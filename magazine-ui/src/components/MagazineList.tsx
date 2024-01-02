import { useEffect, useState } from "react";
import { MagazineDetails } from "./MagazineDetails";
import { BASE_API_URL } from "../constant/appConstant";

const MagazineList = () => {
  const [magazines, setMagazines] = useState([]);
  useEffect(() => {
    fetch(`${BASE_API_URL}magazine`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMagazines(data);
      });
  }, []);

  return magazines?.length ? (
    <div className="book-list">
      <ul>
        {magazines?.map((magazine) => (
          // @ts-expect-error
          <MagazineDetails key={magazine?.id} magazine={magazine} />
        ))}
      </ul>
    </div>
  ) : (
    <div className="empty">No Magazine Found</div>
  );
};

export default MagazineList;
