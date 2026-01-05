import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex justify-center px-6 py-16">
        <div className="w-full max-w-4xl space-y-24">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
