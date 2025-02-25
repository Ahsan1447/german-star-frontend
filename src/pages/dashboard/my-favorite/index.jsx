import MyFavourite from "@/components/dashboard/MyFavourite";
import React from "react";
import Header2 from "@/components/headers/Header2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "AutoDecar",
  description: "AutoDecar",
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
