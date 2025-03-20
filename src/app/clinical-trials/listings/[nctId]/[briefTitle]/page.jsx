"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../components/loader/loader";
import axios from "axios";
import Search from "../../../../../components/search/search";
import Form from "../../../../../components/Testimonials/testimonial";

export default function ListingPage() {
  const params = useParams();
  const [trailData, setTrailData] = useState({});
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  if (!params) return <p>Loading...</p>;

  const { nctId, briefTitle } = params;

  console.log(briefTitle);

  useEffect(() => {
    if (!nctId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendUrlGOVT}/studies/${nctId}?format=json`
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
    trailData?.protocolSection?.eligibilityModule?.eligibilityCriteria || ""
  );

  console.log(result);

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
            <h3 className="mb-8">Clinical Trials</h3>
            <p className="mb-8"> Popular Listigns</p>
          </div>
          <div className="main single_trails_main">
            <div className="single_info">
              <div className="trail_card">
                <h4 className="summary-card__title">
                  {trailData?.protocolSection?.identificationModule
                    ?.briefTitle || "N/A"}
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
                      {trailData?.protocolSection?.statusModule
                        ?.lastUpdateSubmitDate || "N/A"}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    <strong> Gender : </strong>{" "}
                    <span
                      style={{
                        marginLeft: "6px",
                      }}
                    >
                      {trailData?.protocolSection?.eligibilityModule?.sex ||
                        "N/A"}
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
                      {trailData?.protocolSection?.sponsorCollaboratorsModule
                        ?.leadSponsor?.name || "N/A"}
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
                    {trailData.protocolSection?.designModule?.phases?.[0] ||
                      "N/A"}
                  </span>
                </p>
                <p
                  style={{
                    fontSize: "14px",
                  }}
                >
                  <strong>Clinical Study Id: </strong> <span>{nctId}</span>{" "}
                  <span>
                    {trailData.protocolSection?.identificationModule
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
                  {trailData?.protocolSection?.identificationModule
                    ?.briefTitle || "N/A"}
                </p>
                <div className="mt-2">
                  <h5>Study Population</h5>
                  <p>
                    {trailData?.protocolSection?.eligibilityModule
                      ?.studyPopulation || "N/A"}
                  </p>
                </div>
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
                  {trailData?.protocolSection?.descriptionModule
                    ?.detailedDescription || "Nope"}
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
              </div>
            </div>
          </div>
          <div className="flex flex-col right_sidebar">
            <div className="contact_form_main">
              <Form />
            </div>
            <div className="contact_details">
              {trailData?.protocolSection?.contactsLocationsModule?.locations &&
              trailData?.protocolSection?.contactsLocationsModule.locations
                .length > 0 ? (
                trailData?.protocolSection?.contactsLocationsModule?.locations.map(
                  (location, ind) => (
                    <div key={ind} className="flex_column">
                      <p className="location_facility">{location.facility}</p>
                      <p> <span className="address"> City: </span>{location.city}</p>
                      <p> <span className="address">State: </span>{location.state}</p>
                      <p> <span className="address">Country: </span>{location.country}</p>
                      <p><span className="address">Zip: </span>{location.zip}</p>
                      <p><span className="address">Latitude: </span>{location.geoPoint.lat}</p>
                      <p><span className="address">Longitude: </span>{location.geoPoint.lon}</p>
                    </div>
                  )
                )
              ) : (
                <p>No study centers available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function extractEligibilityCriteria(eligibilityText) {
  console.log("eligibilityText Type", typeof eligibilityText);
  console.log("eligibilityText", eligibilityText);

  const criteria = { inclusion: [], exclusion: [] };

  if (!eligibilityText || eligibilityText.trim() === "") return criteria;

  // Split based on "Exclusion Criteria:", ensuring case insensitivity
  const sections = eligibilityText.split(/Exclusion Criteria:/i);
  const inclusionText = sections[0].replace(/Inclusion Criteria:/i, "").trim();
  const exclusionText = sections[1]?.trim() || "";

  // Regex to match either numbered or bulleted items
  const regex = /(?:\d+\.\s+|\*\s+)([^\n]+)/g;

  let match;

  // Extract inclusion criteria
  while ((match = regex.exec(inclusionText)) !== null) {
    criteria.inclusion.push(match[1].trim());
  }

  // Reset regex for exclusion extraction
  regex.lastIndex = 0;

  // Extract exclusion criteria if present
  while ((match = regex.exec(exclusionText)) !== null) {
    criteria.exclusion.push(match[1].trim());
  }

  return criteria;
}
