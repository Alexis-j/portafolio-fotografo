import { addPackage } from "../services/packageService";
import { useState } from "react";

export default function PackageForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      await addPackage(name, price);
      setName("");
      setPrice("");
      alert("Paquete agregado!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleAddPackage}>
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
      <button type="submit">Agregar Paquete</button>
    </form>
  );
}
