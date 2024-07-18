// components
import Hero from "./Hero";
import Nav from "./Nav";

function Header({ userName }) {
  return (
    <header className="header">
      <Hero />
      <Nav userName={userName} />
    </header>
  );
}

export default Header;
