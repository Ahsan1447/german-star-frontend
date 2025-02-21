import React, { useEffect, useReducer, useState } from "react";
import Pricing from "../common/Pricing";

import { Link } from "react-router-dom";
import { allCars } from "@/data/cars";
import DropdownSelect from "../common/DropDownSelect";
import { featureOptions } from "@/data/filterOptions";
import { initialState, reducer } from "@/reducer/carFilterReducer";
import Pagination from "../common/Pagination";
import ListGridToggler from "./ListGridToggler";
import FilterSidebar from "./FilterSidebar";
import axios from "axios";
export default function Cars1() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    km,
    year,
    make,
    color,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setYear: (value) => dispatch({ type: "SET_YEAR", payload: value }),
    setKM: (value) => dispatch({ type: "SET_KM", payload: value }),
    setBody: (value) => dispatch({ type: "SET_BODY", payload: value }),
    setMake: (value) => dispatch({ type: "SET_MAKE", payload: value }),
    setColor: (value) => dispatch({ type: "SET_COLOR", payload: value }),
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
    setFilters({});
    fetchCars();
  };

  const [isGrid, setIsGrid] = useState(false);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({}); // Stores applied filters
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setitemPerPage] = useState(30);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemPerPage,
        ...filters, // Only sends filters when "Apply Filters" is clicked
      };

      const response = await axios.get("http://localhost:8000/api/vehicles", { params });

      setCars(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, [currentPage, itemPerPage,filters]); // Fetches data when pagination changes

  const applyFilters = () => {
    setFilters({
      make,
      color,
      yearMin: year[0],
      yearMax: year[1],
      kmMin: km[0],
      kmMax: km[1],
    });
  };

  return (
    <>
      <section className="listing-grid tf-section3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section">
                {/* <h2>10,000+ Get The Best Deals On Used Cars</h2> */}
                <p className="mt-20">
                  Explore our selection of high-quality, pre-owned vehicles. Our
                  inventory includes top brands like Toyota, Mercedes, Honda,
                  and more. Find the perfect used car for your needs.
                </p>
              </div>
            </div>
            <div className="col-lg-12 flex gap-30 text-start">
              <div className="sidebar-right-listing style-2">
                <div className="sidebar-title flex-two flex-wrap">
                  <h4>Filters and Sort</h4>
                  <a
                    className="fw-5 font claer text-color-2"
                    onClick={clearFilter}
                  >
                    <i className="icon-autodeal-plus" />
                    Clear
                  </a>
                </div>
                <div className="form-filter-siderbar">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wd-find-select">
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={make}
                            onChange={allProps.setMake}
                            options={["Dodge", "Ram", "Porsche", "Forge", "BMW","Volkswagen", "Mercedes-Benz", "Chevrolet", "Lexus", "GMC", "INFINITI", "Lincoln", "Toyota"]}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={color}
                            onChange={allProps.setColor}
                            options={[
                              "Any",
                              "Black",
                              "White",
                              "Blue",
                              "Gray",
                              "Red",
                              "Silver",
                              "Orange",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Year: {year[0]} - {year[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={2015}
                            MAX={2025}
                            priceRange={year}
                            setPriceRange={allProps.setYear}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                KM: {km[0]} km - {km[1]} km
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={2000}
                            MAX={115000}
                            priceRange={km}
                            setPriceRange={allProps.setKM}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                      <button type="button" className="view-car" onClick={applyFilters}>Apply Filters</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="sidebar-left-listing">
                <div className="row">
                  <div className="col-lg-12 listing-list-car-wrap">
                    <div
                      className={`list-car-list-1 ${
                        isGrid ? "list-car-grid-1" : ""
                      } `}
                    >
                      {cars
                        .map((car, i) => (
                          <div key={i} className="box-car-list style-2 hv-one">
                            <div className="image-group relative">
                              <div className="top flex-two">
                                <ul className="d-flex gap-8">
                                  <li className="flag-tag success">Featured</li>
                                  {/* <li className="flag-tag style-1">
                                    <div className="icon">
                                      <svg
                                        width={16}
                                        height={13}
                                        viewBox="0 0 16 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                          stroke="white"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    6
                                  </li> */}
                                </ul>
                                <div className="year flag-tag">{car.year}</div>
                              </div>
                              <ul className="change-heart flex">
                                <li className="box-icon w-32">
                                  <a
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasBottom"
                                    aria-controls="offcanvasBottom"
                                    className="icon"
                                  >
                                    <svg
                                      width={18}
                                      height={18}
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </li>
                                <li className="box-icon w-32">
                                  <Link to={`/my-favorite`} className="icon">
                                    <svg
                                      width={18}
                                      height={16}
                                      viewBox="0 0 18 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                </li>
                              </ul>
                              <div className="img-style">
                                <img
                                  className="lazyload"
                                  alt="image"
                                  src={car.imgSrc}
                                  width={450}
                                  height={338}
                                />
                              </div>
                            </div>
                            <div className="content">
                              <div className="inner1">
                                <div className="text-address">
                                  <p className="text-color-3 font">
                                    {car.model}
                                  </p>
                                </div>
                                <h5 className="link-style-1">
                                  <Link to={`/listing-detail-v1/${car.id}`}>
                                    {car.make}
                                  </Link>
                                </h5>
                                <div className="icon-box flex flex-wrap">
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-km1" />
                                    <span>{car.miles} miles</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="fa fa-address-book" />
                                    <span>{car.location}</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-color" />
                                    <span>{car.color}</span>
                                  </div>
                                </div>
                                {/* <div className="money fs-20 fw-5 lh-25 text-color-3">
                                  ${car.price}
                                </div> */}
                                <Link
                                  to={`/detail/${car.vin}`}
                                  className="view-car"
                                >
                                  View details
                                  <i className="icon-autodeal-btn-right" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="themesflat-pagination clearfix mt-40">
                      <ul>
                        <Pagination
                          currentPage={currentPage}
                          setPage={(value) => setCurrentPage(value)}
                          itemLength={totalPages}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <FilterSidebar allProps={allProps} clearFilter={clearFilter} /> */}
    </>
  );
}
