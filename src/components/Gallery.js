import { useEffect, useState } from "react";

import { getPhotos } from "../services/photoService";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {photos.map((p) => (
        <img key={p.id} src={p.url} alt="foto" className="rounded-xl shadow-md" />
      ))}
    </div>
  );
}
