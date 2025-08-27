import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">Bienvenido al Portafolio</h1>
      <p className="text-lg mb-6">Fotografía profesional para tus mejores momentos.</p>
      <div className="space-x-4">
        <Link to="/portfolio" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Ver Portafolio
        </Link>
        
      </div>
    </div>
  );
}
