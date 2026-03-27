import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
