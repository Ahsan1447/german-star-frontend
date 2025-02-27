import Accordion from "@/components/common/Accordions";
import { features } from "@/data/faqs";
import React, {useMemo } from "react";

export default function Features({ carItem }) {

  const transformData = (data) => {
    const groupedData = data.reduce((acc, option) => {
      if (!acc[option.option_class]) {
        acc[option.option_class] = [];
      }
      acc[option.option_class].push(option.option_name);
      return acc;
    }, {});
  
    return Object.keys(groupedData).map((key) => ({
      title: key.replace(/_/g, " "),
      content: groupedData[key], 
    }));
  };
  
  const formattedData = useMemo(() => transformData(carItem.vehicleDetail.details.options), []);
  return (
    <>
      <div className="row">
        <div className="col-lg-12 flat-accordion">
          <Accordion parentClass="flat-toggle style-1" faqData={formattedData} />
        </div>
      </div>
    </>
  );
}
