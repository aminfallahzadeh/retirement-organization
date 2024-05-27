// components
import Hero from "./Hero";
import Nav from "./Nav";

function Header({ userName, userID }) {
  return (
    <header className="header">
      <Hero />
      <Nav userName={userName} userID={userID} />
    </header>
  );
}

export default Header;
