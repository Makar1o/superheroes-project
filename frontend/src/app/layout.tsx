import "../styles/globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Superheroes DB",
  description: "Superhero database app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
