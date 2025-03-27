// import { useEffect } from "react";
import "./styles.css";
export default function AboutinNumbers() {
  // useEffect(() => {
  //   try {
  //     const response = await axios.get(`${backendUrl}/conditions`);
  //     setConditionData(response.data.conditions);
  //     localStorage.setItem(
  //       "conditionData",
  //       JSON.stringify(response.data.conditions)
  //     );
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <>
      <section>
        <div className="numbers_bar">
          <div className="number_boxes">
            <h2>99</h2>
            <p>Total trials</p>
          </div>
          <div className="number_boxes">
            <h2>32</h2>
            <p> Active trials</p>
          </div>
          <div className="number_boxes">
            <h2>125</h2>
            <p>Sites</p>
          </div>
          <div className="number_boxes">
            <h2>240</h2>
            <p>Locations</p>
          </div>
        </div>
      </section>
    </>
  );
}
