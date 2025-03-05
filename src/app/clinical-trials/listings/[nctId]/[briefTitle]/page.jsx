"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ListingPage() {
  const params = useParams();
  const [trailData, setTrailData] = useState({});
  const [loading, setLoading] = useState(false);

  if (!params) return <p>Loading...</p>;

  const { nctId, briefTitle } = params;

  useEffect(() => {
    console.log("NCT ID:", nctId);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://clinicaltrials.gov/api/v2/studies/${nctId}?format=json`
        );
        console.log("Response:", response.data);
        setTrailData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [nctId]);

  // Extract eligibility criteria safely using our updated function.
  const eligibilityText =
    trailData.protocolSection?.eligibilityModule?.eligibilityCriteria || "";
  const result = extractEligibilityCriteria(eligibilityText);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h4>
          {trailData.protocolSection?.identificationModule?.officialTitle ||
            "N/A"}
        </h4>
        <p>
          Last updated:{" "}
          <span>
            {trailData.protocolSection?.statusModule?.lastUpdateSubmitDate ||
              "N/A"}
          </span>
        </p>
        <p>
          Sponsor:{" "}
          <span>
            {trailData.protocolSection?.sponsorCollaboratorsModule?.leadSponsor
              ?.name || "N/A"}
          </span>
        </p>
        <p>
          Phase:{" "}
          <span>
            {trailData.protocolSection?.designModule?.phases?.[0] || "N/A"}
          </span>
        </p>
        <p>
          Clinical Study Id:{" "}
          <span>
            {trailData.protocolSection?.identificationModule?.nctId || "N/A"}
          </span>{" "}
          <span>
            {trailData.protocolSection?.identificationModule?.orgStudyIdInfo
              ?.id || "N/A"}
          </span>
        </p>
      </div>

      <div>
        <h4>Study Summary</h4>
        <p>
          {trailData.protocolSection?.identificationModule?.briefTitle || "N/A"}
        </p>
      </div>

      <div>
        <h4>Eligibility Criteria</h4>
        <div className="flex gap-3">
          <div>
            <h5>Inclusion Criteria</h5>
            {result.inclusion && result.inclusion.length > 0 ? (
              result.inclusion.map((item, ind) => <p key={ind}>{item}</p>)
            ) : (
              <p>No Inclusion Criteria</p>
            )}
          </div>
          <div>
            <h5>Exclusion Criteria</h5>
            {result.exclusion && result.exclusion.length > 0 ? (
              result.exclusion.map((item, ind) => <p key={ind}>{item}</p>)
            ) : (
              <p>No Exclusion Criteria</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4>Study Description</h4>
        <p>
          {trailData.protocolSection?.descriptionModule?.detailedDescription ||
            "N/A"}
        </p>
      </div>

      <div>
        <h4>Connect with a study center</h4>
        <div>
          {trailData.protocolSection?.contactsLocationsModule?.locations &&
          trailData.protocolSection.contactsLocationsModule.locations.length >
            0 ? (
            trailData.protocolSection.contactsLocationsModule.locations.map(
              (location, ind) => (
                <div key={ind}>
                  <p>{location.facility || "N/A"}</p>
                  <p>{location.city || "N/A"}</p>
                  <p>{location.state || "N/A"}</p>
                  <p>{location.country || "N/A"}</p>
                  <p>{location.zip || "N/A"}</p>
                </div>
              )
            )
          ) : (
            <p>No study centers available</p>
          )}
        </div>
      </div>
    </div>
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
