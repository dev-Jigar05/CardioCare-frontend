import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 flex justify-center px-6 py-6">
        <div className="w-full max-w-4xl space-y-24">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
