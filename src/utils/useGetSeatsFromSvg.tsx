import { useEffect, useState } from "react";
import { Seat } from "react-svg-seatmap";

export const useGetSeatsFromSvg = (svgUrl: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seatData, setSeatData] = useState<Seat[]>([]);

  useEffect(() => {
    if (!svgUrl) return;

    console.log("Generating seat data from SVG...");

    const parser = new DOMParser();
    fetch(svgUrl)
      .then((response) => response.text())
      .then((svgContent) => {
        const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
        const seatsOnMap = Array.from(
          svgDoc.querySelectorAll("circle, path, ellipse")
        );

        const seatsOnMapWithId = seatsOnMap.filter((seat) => seat.id);

        const seats = seatsOnMapWithId.map(
          (seat, index) =>
            ({
              id: index + 1,
              cssSelector: `#${seat.id}`,
            } as Seat)
        );

        console.log(seats);
        setSeatData(seats);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to fetch data");
        console.error("Error fetching SVG:", error);
      });
  }, [svgUrl]);

  return { loading, data: seatData, error };
};
