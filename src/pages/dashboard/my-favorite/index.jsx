import MyFavourite from "@/components/dashboard/MyFavourite";
import React from "react";
import Header1 from "@/components/headers/Header1";

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
        <Header1 />
      </div>
      <div id="wrapper-dashboard">
        <div id="themesflat-content"></div>
        <MyFavourite />
      </div>
    </>
  );
}
