// components
import DateTime from "./DateTime";
import { Logo, Banner } from "./SVGs";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <Banner />
      </div>
      <div className="hero__content">
        <div className="hero__title">
          <Logo />
          <h1 className="heading-primary">سامانه بازنشستگان و وظیفه بگیران</h1>
        </div>
        {/* 
        <div className="hero__time">
          <DateTime />
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
