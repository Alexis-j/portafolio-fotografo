import Gallery from "../components/Gallery";
import PackageList from "../components/PackageList";

export default function Portfolio() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-4">Portafolio</h1>
      <Gallery />
      <h2 className="text-2xl font-semibold text-center mt-8">Paquetes</h2>
      <PackageList />
    </div>
  );
}
