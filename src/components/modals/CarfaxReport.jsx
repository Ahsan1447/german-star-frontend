import React from "react";

export default function CarfaxReport({ carItem }) {
  const { carfax_summary } = carItem || {};
  const reportDate = carfax_summary?.report_date || "N/A";
  const reportSummary = carfax_summary?.report_summary || {};

  return (
    <div
      className="modal fade popup login-form"
      id="summary_bid"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-body">
            <h1 className="title-login text-center">Carfax Report</h1>
            <p className="text-center fw-6">Report Date:  {reportDate}</p>

            {/* Carfax Report Table */}
            <div className="report-table">
              <table>
                <thead>
                  <tr>
                    <th className="py-3 px-4 fw-8">Category</th>
                    <th className="py-3 px-4 fw-8">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(reportSummary).map(([key, value], index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 ">{key}: </td>
                      <td className="py-3 px-4 ">
                        {typeof value === "boolean" ? (
                          value ? "Yes" : "No"
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <button className="sc-button" data-bs-dismiss="modal">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
