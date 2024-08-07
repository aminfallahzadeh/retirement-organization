// components
import { Logo, Banner } from "./SVGs";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <Banner />
      </div>
      <div className="hero__content">
        <div className="hero__title">
          <div className="hero__logo">
            <img
              src="./images/logo-hollow.png"
              alt="logo"
              className="hero__logo--img"
            />

            <img
              src="./images/logo-text.png"
              alt="logo text"
              className="hero__logo--txt"
            />
          </div>
          {/* <Logo /> */}

          <h1 className="heading-primary">سامانه بازنشستگان و وظیفه بگیران</h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
