import { deletePackage, getPackages } from "../services/packageService";
import { useEffect, useState } from "react";

export default function PackageList() {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    const data = await getPackages();
    setPackages(data);
  };

  const handleDelete = async (id) => {
    await deletePackage(id);
    fetchPackages();
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div>
      {packages.map(p => (
        <div key={p.id}>
          {p.name} - {p.price}
          <button onClick={() => handleDelete(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
