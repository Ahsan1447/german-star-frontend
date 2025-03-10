import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import Blogs from "@/components/common/Blogs";
import Brands from "@/components/common/Brands";
import CarBrands from "@/components/homes/home-1/CarBrands";
import CarReview from "@/components/common/CarReview";
import Cars from "@/components/common/Cars";
import Cars2 from "@/components/homes/home-1/Cars2";
import Categories from "@/components/homes/home-1/Categories";
import Filter from "@/components/homes/home-1/Filter";
import Hero from "@/components/homes/home-1/Hero";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";
import Process from "@/components/homes/home-1/Process";

import MetaComponent from "@/components/common/MetaComponent";
import Cars1 from "@/components/carsListings/Cars1";
const metadata = {
  title: "Hubba",
  description: "Hubba",
};
export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header1 />
      </div>
      {/* <Hero /> */}
      {/* <Filter /> */}
      <Cars1 />
      {/* <Categories /> */}
      {/* <LoanCalculator /> */}
      {/* <Process /> */}
      {/* <Cars2 /> */}
      {/* <Banner /> */}
      {/* <CarBrands /> */}
      {/* <CarReview /> */}
      {/* <Blogs /> */}
      {/* <Brands /> */}
      <Footer1 />
    </>
  );
}
