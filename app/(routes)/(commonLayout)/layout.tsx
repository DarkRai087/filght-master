import Footer from "@/components/Custom/Footer";
import DeskNav from "@/components/Custom/Navbar/DeskNav";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <DeskNav />
            {children}
            <Footer />
        </div>
    );
}
