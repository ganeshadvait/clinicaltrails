import Clinical from "../../../../components/searchpage";

export default async function Searchpage({ searchParams }) {
  // const searchValue = searchParams?.search || "";
  // const location = searchParams?.location || "";

  // Perform server-side fetching here
  // Example: Fetch data based on search and location
  // const response = await fetch(`https://api.example.com/data?search=${searchValue}&location=${location}`);
  // const data = await response.json();

  return (
    <div>
      <Clinical />
    </div>
  );
}
