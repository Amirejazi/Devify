import Topbar from "@/components/Topbar/Topbar";
import Navbar from "@/components/Navbar/Navbar";

function Header() {
    return (
        <header className="header">
            <Topbar/>
            <Navbar/>
        </header>
    )
}

export default Header