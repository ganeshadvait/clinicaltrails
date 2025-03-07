"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../components/loader/loader";
import axios from "axios";
import Search from "../../../../../components/search/search";
import Form from "../../../../../components/form/form";

export default function ListingPage() {
  const params = useParams();
  const [trailData, setTrailData] = useState({});
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  if (!params) return <p>Loading...</p>;

  const { nctId, briefTitle } = params;

  console.log(briefTitle);

  useEffect(() => {
    if (!nctId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/extract?nct_id=${nctId}`
        );
        console.log("Response:", response.data);
        setTrailData({ ...response.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nctId, backendUrl]);

  if (loading) {
    return <Loader />;
  }

  const result = extractEligibilityCriteria(
    trailData?.nct_id?.protocolSection?.eligibilityModule
      ?.eligibilityCriteria || ""
  );

  return (
    <>
      <section
        style={{
          width: "100%",
          background: "#fff",
          padding: "40px 0",
        }}
      >
        <div className="inner_trailspage single_brief_page">
          <div className="sidebar single_trails_sidebar">
            <h3>Clinical Trials</h3>
            <p> Popular Listigns</p>
          </div>
          <div className="main single_trails_main">
            <div className="single_info">
              <div className="trail_card">
                <h4 className="summary-card__title">
                  {trailData?.["Trial Name"]?.["Official Title"] || "N/A"}
                </h4>
                <div className="before_info">
                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    <strong> Last updated : </strong>{" "}
                    <span
                      style={{
                        marginLeft: "6px",
                      }}
                    >
                      {trailData?.nct_id?.protocolSection?.statusModule
                        ?.lastUpdateSubmitDate || "N/A"}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    <strong style={{}}> Sponsor: </strong>{" "}
                    <span
                      style={{
                        marginLeft: "6px",
                      }}
                    >
                      {trailData?.nct_id?.protocolSection
                        ?.sponsorCollaboratorsModule?.leadSponsor?.name ||
                        "N/A"}
                    </span>
                  </p>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    margin: "12px 0",
                  }}
                >
                  <strong>Phase:</strong>{" "}
                  <span
                    style={{
                      marginLeft: "6px",
                    }}
                  >
                    {trailData?.nct_id?.protocolSection?.designModule
                      .phases?.[0] || "N/A"}
                  </span>
                </p>
                <p
                  style={{
                    fontSize: "14px",
                  }}
                >
                  <strong>Clinical Study Id: </strong> <span>{nctId}</span>{" "}
                  <span>
                    {trailData?.nct_id?.protocolSection?.identificationModule
                      ?.orgStudyIdInfo?.id || "N/A"}
                  </span>
                </p>
              </div>

              <div
                style={{
                  margin: "40px 0",
                }}
              >
                <h4
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2rem",
                    marginBottom: "12px",
                    color: "#1a73e8",
                    width: "fit-content",
                  }}
                  className="studysummery"
                >
                  Study Summary
                  <div className="underline"></div>
                </h4>

                <p>
                  {trailData?.nct_id?.protocolSection?.identificationModule
                    ?.briefTitle || "N/A"}
                </p>
              </div>

              <div
                style={{
                  margin: "40px 0",
                }}
              >
                <h4
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2rem",
                    marginBottom: "22px",
                    color: "#1a73e8",
                    width: "fit-content",
                  }}
                  className="Eligibilitycriteria"
                >
                  Eligibility Criteria
                  <div className="underline"></div>
                </h4>
                <div className="flex flex-wrap gap-3">
                  <div>
                    <strong>
                      <h5
                        style={{
                          marginBottom: "19px",
                          fontSize: "1.1rem",
                        }}
                      >
                        Inclusion Criteria
                      </h5>
                    </strong>
                    {result.inclusion && result.inclusion.length > 0 ? (
                      result.inclusion.map((item, ind) => (
                        <li
                          style={{
                            margin: "14px 0",
                          }}
                          className="inclupara"
                          key={ind}
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <p>No Inclusion Criteria</p>
                    )}
                  </div>
                  <div>
                    <strong>
                      {" "}
                      <h5
                        style={{
                          marginBottom: "19px",
                          fontSize: "1.1rem",
                        }}
                      >
                        Exclusion Criteria
                      </h5>
                    </strong>
                    {result.exclusion && result.exclusion.length > 0 ? (
                      result.exclusion.map((item, ind) => (
                        <li
                          style={{
                            margin: "14px 0",
                          }}
                          className="exclupara"
                          key={ind}
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <p>No Exclusion Criteria</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2rem",
                    marginBottom: "22px",
                    color: "#1a73e8",
                    width: "fit-content",
                  }}
                  className="studydescription"
                >
                  Study Description
                  <div className="underline"></div>
                </h4>
                <p
                  style={{
                    margin: "14px 0",
                  }}
                  className="studypara"
                >
                  {trailData?.nct_id?.protocolSection?.descriptionModule
                    ?.detailedDescription || "N/A"}
                </p>
              </div>

              <div>
                <h4
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2rem",
                    marginBottom: "22px",
                    color: "#1a73e8",
                    width: "fit-content",
                  }}
                  className="studydescription"
                >
                  Connect with a study center
                  <div className="longunderline underline"></div>
                </h4>
                <div>
                  {trailData?.nct_id?.protocolSection?.contactsLocationsModule
                    ?.locations &&
                  trailData?.nct_id?.protocolSection?.contactsLocationsModule
                    .locations.length > 0 ? (
                    trailData?.nct_id?.protocolSection?.contactsLocationsModule?.locations.map(
                      (location, ind) => (
                        <div key={ind}>
                          <li
                            style={{
                              margin: "14px 0",
                              fontSize: "14px",
                            }}
                          >
                            {location.facility || "N/A"}
                          </li>
                          <li
                            style={{
                              margin: "14px 0",
                              fontSize: "14px",
                            }}
                          >
                            {location.city || "N/A"}
                          </li>
                          <li
                            style={{
                              margin: "14px 0",
                              fontSize: "14px",
                            }}
                          >
                            {location.state || "N/A"}
                          </li>
                          <li
                            style={{
                              margin: "14px 0",
                              fontSize: "14px",
                            }}
                          >
                            {location.country || "N/A"}
                          </li>
                          <li
                            style={{
                              margin: "14px 0",
                              fontSize: "14px",
                            }}
                          >
                            {location.zip || "N/A"}
                          </li>
                        </div>
                      )
                    )
                  ) : (
                    <p>No study centers available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="contact_form_main">
            <Form />
          </div>
        </div>
      </section>
    </>
  );
}

// Updated function to handle both bullet points (*) and numbered points (e.g., 1.)
function extractEligibilityCriteria(eligibilityText) {
  const criteria = { inclusion: [], exclusion: [] };

  if (!eligibilityText) return criteria;

  // Split the text into Inclusion and Exclusion sections
  const sections = eligibilityText.split("Exclusion Criteria:");
  if (sections.length < 2) return criteria;

  const inclusionText = sections[0].replace("Inclusion Criteria:", "").trim();
  const exclusionText = sections[1].trim();

  // Combined regex: matches either a number followed by a dot or a bullet (*) followed by whitespace,
  // then captures the text until a newline.
  const regex = /(?:\d+\.\s+|\*\s+)([^\n]+)/g;

  // Extract inclusion criteria
  let match;
  while ((match = regex.exec(inclusionText)) !== null) {
    criteria.inclusion.push(match[1].trim());
  }

  // Reset regex for reuse
  regex.lastIndex = 0;
  // Extract exclusion criteria
  while ((match = regex.exec(exclusionText)) !== null) {
    criteria.exclusion.push(match[1].trim());
  }

  return criteria;
}
