import Accordion from "@/components/common/Accordions";
import { features } from "@/data/faqs";
import React from "react";

export default function Features({ carItem }) {
  return (
    <>
      <div className="features-inner tf-collapse-content">
        <div className="inner">
          {carItem.vehicleDetail.details.options && carItem.vehicleDetail.details.options.map((option, index) => (
            <div key={index} className="listing-feature-wrap flex">
              <i className="icon-autodeal-check" />
              <p>{option.option_name}</p>
            </div>
          ))}

        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-12 flat-accordion">
          <Accordion parentClass="flat-toggle style-1" faqData={features} />
        </div>
      </div> */}
    </>
  );
}
