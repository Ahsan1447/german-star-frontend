import React from "react";

export default function CarInfo({ carItem }) {

  const addToFavoroites = (e) => {
    e.preventDefault();
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existingFavorites.includes(carItem.vin)) {
      const updatedFavorites = [...existingFavorites, carItem.vin];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Added to favorites:", carItem.vin);
    }
  }
  return (
    <>
      {/* <div className="icon-box flex flex-wrap">
        <div className="icons flex-three">
          <i className="icon-autodeal-km1" />
          <span style={{ marginLeft: "5px" }}> {carItem.miles} miles</span>
        </div>
        <div className="icons flex-three">
          <i className="icon-autodeal-diesel" />
          <span style={{ marginLeft: "5px" }}>{carItem.vehicleDetail.details.fuel_type}</span>
        </div>
        <div className="icons flex-three">
          <i className="icon-autodeal-automatic" />
          <span style={{ marginLeft: "5px" }}>{carItem.vehicleDetail.details.transmission}</span>
        </div>
      </div> */}

      <ul className="action-icon">
        <div className="flex flex-wrap items-center gap-4">
          <li>
            <a href="#" onClick={addToFavoroites} className="icon" title="Add to favorites">
              <svg
                width={16}
                height={14}
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.75 4.1875C14.75 2.32375 13.1758 0.8125 11.234 0.8125C9.78275 0.8125 8.53625 1.657 8 2.86225C7.46375 1.657 6.21725 0.8125 4.76525 0.8125C2.825 0.8125 1.25 2.32375 1.25 4.1875C1.25 9.6025 8 13.1875 8 13.1875C8 13.1875 14.75 9.6025 14.75 4.1875Z"
                  stroke="CurrentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>

          <li title="View MMR">
            <a target="_blank"
              href={`https://mmr.manheim.com/?country=US&popup=true&color=${carItem.color}&mid=${carItem.model_id ? carItem.model_id : ""}&mileage=${carItem.miles}`}
            >
              <span className="fw-6">View MMR</span>
              <img src="/assets/images/mmr.jpg" style={{ width: "19%", marginLeft: "6px" }} alt="icon" />
            </a>
          </li>
        </div>

        <li title="Show Carfax Report" className="mt-2">
          <a href="#" data-bs-toggle="modal" data-bs-target="#summary_bid">
            <img src="/assets/images/carfax.png" alt="icon" />
          </a>
        </li>
      </ul>

    </>
  );
}
