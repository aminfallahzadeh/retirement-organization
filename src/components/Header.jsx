// components
import Hero from "./Hero";
import Nav from "./Nav";

function Header({ firstName, lastName }) {
  return (
    <header className="header">
      <Hero />
      <Nav firstName={firstName} lastName={lastName} />
    </header>
  );
}

export default Header;
