import React, { useContext, useEffect, useState } from "react";
import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";

// @ts-ignore
export const MagazineHistory = ({ magazine }) => {
  return (
    <>
      <li className="magazine-card">
        <div className="mag-image">
          <img src="./images1.jpeg" alt={magazine.name} />
        </div>
        <div className="magazine-details">
          <div className="title">{magazine.name}</div>
          <div className="author">Category: {magazine.category}</div>
          <div className="author">Publication: {magazine.publication}</div>
          <div className="author">Price: {magazine.price}$</div>
        </div>
      </li>
    </>
  );
};
