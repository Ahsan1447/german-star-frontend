import React, { useEffect, useReducer, useState } from "react";
import Pricing from "../common/Pricing";

import { Link } from "react-router-dom";
import DropdownSelect from "../common/DropDownSelect";
import DropDownSelectMultiple from "../common/DropDownSelectMultiple";
import { featureOptions } from "@/data/filterOptions";
import { initialState, reducer } from "@/reducer/carFilterReducer";
import Pagination from "../common/Pagination";
import ListGridToggler from "./ListGridToggler";
import FilterSidebar from "./FilterSidebar";
import axios from "axios";
export default function Cars1() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    miles,
    year,
    make,
    body,
    model,
    color,
    cylinder,
    fuel,
    transmission,
    drivetrain,
  } = state;

  const makeModelOptions = {
    "Any Make": ["Any Model"],
    Dodge: ["Any Model", "Charger"],
    Ford: ["Any Model", "Edge", "Expedition", "Bronco", "F-150", "Transit Wagon", "Super Duty F-250 SRW", "Explorer", "Super Duty F-450 DRW"],
    Audi: ["Any Model", "Q5", "R8 Spyder", "RS 5 Coupe"],
    Lexus: ["Any Model", "RX", "RX 350"],
    Jeep: ["Any Model", "Grand Cherokee L", "Wagoneer"],
    Acura: ["Any Model", "MDX"],
    Cadillac: ["Any Model", "Escalade"],
    GMC: ["Any Model", "Yukon XL", "Sierra 1500", "Yukon", "Sierra 2500HD"],
    Lincoln: ["Any Model", "Navigator", "Navigator L"],
    Ram: ["Any Model", "1500 Classic", "1500"],
    Chevrolet: ["Any Model", "Suburban", "Silverado 1500", "Silverado 2500HD"],
    INFINITI: ["Any Model", "Q50"],
    Porsche: ["Any Model", "Cayenne", "Panamera", "Macan"],
    Jaguar: ["Any Model", "F-PACE"],
    "Mercedes-Benz": ["Any Model", "G-Class", "GLC"],
    "Land Rover": ["Any Model", "Defender"],
    Nissan: ["Any Model", "GT-R"],
    BMW: ["Any Model", "3 Series", "4 Series", "5 Series", "6 Series", "X5", "X6", "X7", "M2", "M3", "M4", "M5"],
    Volkswagen: ["Any Model", "Golf R"],
    Toyota: ["Any Model", "GR Corolla", "Tundra"]
  };

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setYear: (value) => dispatch({ type: "SET_YEAR", payload: value }),
    setMiles: (value) => dispatch({ type: "SET_MILES", payload: value }),
    setBody: (value) => dispatch({ type: "SET_BODY", payload: value }),
    setMake: (value) => dispatch({ type: "SET_MAKE", payload: value }),
    setBody: (value) => dispatch({ type: "SET_BODY", payload: value }),
    setModel: (value) => dispatch({ type: "SET_MODEL", payload: value }),
    setColor: (value) => dispatch({ type: "SET_COLOR", payload: value }),
    setCylinder: (value) => dispatch({ type: "SET_CYLINDER", payload: value }),
    setFuel: (value) => dispatch({ type: "SET_FUEL", payload: value }),
    setTransmission: (value) => dispatch({ type: "SET_TRANSMISSION", payload: value }),
    setDrivetrain: (value) => dispatch({ type: "SET_DRIVETRAIN", payload: value }),
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
    setFilters({});
    fetchCars();
  };

  const [isGrid, setIsGrid] = useState(true);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
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

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/vehicles`, { params });

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
  }, [currentPage, itemPerPage, filters]); // Fetches data when pagination changes

  const applyFilters = () => {
    setFilters({
      make,
      model,
      body,
      color,
      yearMin: year[0],
      yearMax: year[1],
      milesMin: miles[0],
      milesMax: miles[1],
      fuel,
      transmission,
      cylinder,
      drivetrain
    });
  };

  return (
    <>
      <section className="listing-grid tf-section3">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
              <div className="heading-section">
                <p style={{marginTop:"92px"}}>
                  Explore our selection of high-quality, pre-owned vehicles. Our
                  inventory includes top brands like Toyota, Mercedes, Honda,
                  and more. Find the perfect used car for your needs.
                </p>
              </div>
            </div> */}
            <div className="col-lg-12 flex gap-30 text-start" style={{ marginTop: "92px" }}>
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
                            onChange={(selectedMake) => {
                              allProps.setMake(selectedMake);
                              allProps.setModel(["Any Model"]);
                            }}
                            options={Object.keys(makeModelOptions)}
                            defaultOption="Any Make"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="group-select">
                          <DropDownSelectMultiple
                            defaultSelected={allProps.model} // Sync with global state
                            onChange={(selectedModels) => allProps.setModel(selectedModels)}
                            options={makeModelOptions[allProps.make] || []}
                          />


                        </div>
                      </div>

                      {/* <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={model}
                            onChange={allProps.setModel}
                            options={makeModelOptions[make] || []}
                            defaultOption="Any Model"
                          />
                        </div>
                      </div> */}

                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={color}
                            onChange={allProps.setColor}
                            options={[
                              "Any Color",
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


                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={body}
                            onChange={allProps.setBody}
                            options={[
                              "Any Body",
                              "SUV",
                              "Sport Utility",
                              "Extended Cab Pickup - Standard Bed",
                              "Crew Cab Standard Bed",
                              "Crew Cab Pickup - Long Bed",
                              "Convertible",
                              "Sedan",
                              "4dr Car",
                              "Crew Cab Pickup - Standard Bed",
                              "Crew Cab Short Box",
                              "Full-size Passenger Van",
                              "Coupe",
                              "2dr Car",
                              "Crew Cab Pickup - Short Bed",
                            ]}
                            defaultOption={"Any Body"}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={cylinder}
                            onChange={allProps.setCylinder}
                            options={["Any Cylinder", "3", "4", "6", "8", "10"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={drivetrain}
                            onChange={allProps.setDrivetrain}
                            options={["Any Drivetrain", "FWD", "RWD", "AWD"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={fuel}
                            onChange={allProps.setFuel}
                            options={["Any Fuel", "Gasoline", "Diesel", "Electric", "Hybrid"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={transmission}
                            onChange={allProps.setTransmission}
                            options={["Any Transmission", "Automatic", "Manual"]}
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
                            MIN={2009}
                            MAX={2025}
                            priceRange={year}
                            setPriceRange={allProps.setYear}
                          />
                        </div>
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Miles: {miles[0]} - {miles[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={2000}
                            MAX={100000}
                            priceRange={miles}
                            setPriceRange={allProps.setMiles}
                          />
                        </div>
                      </div>
                      <button type="button" className="view-car" onClick={applyFilters}>Apply Filters</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="sidebar-left-listing">
                <div className="row">
                  <div className="col-lg-12 listing-list-car-wrap">
                    {/* <div className="filter-mobie">
                      <a
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        className="filter"
                      >
                        Filter
                        <i className="icon-autodeal-filter" />
                      </a>
                    </div> */}
                    <div
                      className={`list-car-list-1 ${isGrid ? "list-car-grid-1" : ""
                        } `}
                    >
                      {cars
                        .map((car, i) => (
                          <Link key={i} to={`/detail/${car.vin}`}>
                            <div className="box-car-list style-2 hv-one">
                              <div className="image-group relative">

                                <div className="img-style" style={{
                                  backgroundColor: "#f3f3f3", // Light grey filler background
                                  height: "338px",
                                  overflow: "hidden" // Ensures no stretching
                                }}>
                                  <img
                                    className="lazyload"
                                    alt="image"
                                    style={{
                                      objectFit: "contain"
                                    }}
                                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}/${car.thumbnail}`}
                                    width={450}
                                    height={338}
                                  />
                                </div>
                              </div>
                              <div className="content">
                                <div className="inner1">
                                  <div className="text-address">
                                    <p className="text-color-3 font">
                                      {car.year}
                                    </p>
                                  </div>
                                  <div className="text-address">
                                    <p style={{ fontSize: "20px" }} className="text-color-3 font">
                                      {car.make}
                                    </p>
                                  </div>
                                  <h5 className="link-style-1">
                                    <Link to={`/detail/${car.vin}`}>
                                      {car.model}
                                    </Link>
                                  </h5>
                                  <div className="icon-box flex flex-wrap">
                                    <div className="icons flex-three">
                                      <i className="icon-autodeal-km1" />
                                      <span>{car.miles} miles</span>
                                    </div>
                                    <div className="icons flex-three">
                                      <i className="icon-autodeal-color" />
                                      <span>{car.color}</span>
                                    </div>
                                  </div>
                                  <div className="icons">
                                    <i className="fa fa-address-book" />
                                    <span>{car.location}</span>
                                  </div>
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

                          </Link>
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
      <FilterSidebar allProps={allProps} clearFilter={clearFilter} />
    </>
  );
}
