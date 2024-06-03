// components
import DateTime from "./DateTime";
import { Logo } from "./SVGs";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__title">
        {/* <img src="logo.png" alt="لوگو" /> */}
        <Logo />
        <h1 className="heading-primary">سامانه بازنشستگان و وظیفه بگیران</h1>
      </div>

      <div className="hero__time">
        <DateTime />
      </div>
    </div>
  );
}

export default Hero;
