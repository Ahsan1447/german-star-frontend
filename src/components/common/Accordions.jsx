import { useEffect, useRef, useState } from "react";

export default function Accordion({
  faqData = [],
  parentClass = "flat-toggle style-2",
}) {
  const parentRefs = useRef([]);
  const questionRefs = useRef([]);
  const answerRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    questionRefs.current.forEach((el) => el?.classList.remove("active"));
    parentRefs.current.forEach((el) => el?.classList.remove("active"));
    answerRefs.current.forEach((el) => {
      if (el) {
        el.style.height = "0px";
        el.style.overflow = "hidden";
        el.style.transition = "all 0.5s ease-in-out";
      }
    });

    if (currentIndex !== -1) {
      questionRefs.current[currentIndex]?.classList.add("active");
      parentRefs.current[currentIndex]?.classList.add("active");
      const element = answerRefs.current[currentIndex];
      if (element) {
        element.style.height = element.scrollHeight + "px";
        element.style.overflow = "hidden";
        element.style.transition = "all 0.5s ease-in-out";
      }
    }
  }, [currentIndex]);

  return (
    <div className="accordion-container">
      {faqData.map((item, index) => (
        <div
          ref={(el) => (parentRefs.current[index] = el)}
          className={`${currentIndex === index ? "active" : ""} ${parentClass}`}
          onClick={() => setCurrentIndex((prev) => (prev === index ? -1 : index))}
          key={index}
        >
          <div
            className="toggle-title flex align-center"
            role="button"
            ref={(el) => (questionRefs.current[index] = el)}
          >
            <h5 className="fw-6">{item.title}</h5>
            <div className="btn-toggle" />
          </div>
          <div
            className="toggle-content section-desc"
            ref={(el) => (answerRefs.current[index] = el)}
          >
            <div className="features-inner tf-collapse-content">
              <div className="inner">
                {item.content.map((option, index) => (
                  <div key={index} className="listing-feature-wrap flex">
                    <i className="icon-autodeal-check" />
                    <p>{option}</p>
                  </div>
                ))}
              </div>

            </div>
            {/* <p className="texts">{}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
}
