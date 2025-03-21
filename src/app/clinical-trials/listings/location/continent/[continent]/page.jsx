export function ContinentPage() {
  return (
    <div>
      {["Africa", "Asia", "Europe", "North America", "South America"].map(
        (location) => (
          <li>
            <a href="/clinical-trials/listings/location/">{location}</a>
          </li>
        )
      )}
    </div>
  );
}