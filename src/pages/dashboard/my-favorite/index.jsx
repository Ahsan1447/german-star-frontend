import MyFavourite from "@/components/dashboard/MyFavourite";
import React from "react";
import Header2 from "@/components/headers/Header2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "My Favourites || AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
};
export default function MyFavoritePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <Sidebar /> */}
      <div className="header-fixed">
        <Header2 />
      </div>
      <div id="wrapper-dashboard">
        <div id="themesflat-content"></div>
        <MyFavourite />
      </div>
    </>
  );
}
