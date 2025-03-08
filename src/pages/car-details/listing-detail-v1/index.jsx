import React, { useEffect, useState } from "react";
import CarDetails1 from "@/components/carDetails/CarDetails1";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import CarfaxReport from "@/components/modals/CarfaxReport";
const metadata = {
  title:
    "Hubba",
  description: "Hubba",
};
export default function BlogListingDetailsPage1() {
  let params = useParams();
  const vin = params.id;

  const [carItem, setCarItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/vehicles/${vin}`);
        setCarItem(response.data);
      } catch (err) {
        setError("Error fetching vehicle details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [vin]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header1 />
      </div>
      <section className="flat-title mb-40">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : carItem ? (
        <CarDetails1 carItem={carItem} />
      ) : (
        <p>Vehicle not found</p>
      )}
      {/* <CarDetails1 carItem={carItem} /> */}
      <Footer1 />
      <CarfaxReport carItem={carItem?.vehicleDetail.details} />
    </>
  );
}
