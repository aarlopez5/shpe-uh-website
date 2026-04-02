import confetti from "../assets/membershpeImages/confettiBackground.png"
import shpeSpirit from "../assets/images/SHPESpiritWeb.png"

export function Hero() {
  return (
    <div>
      <img src={confetti} alt="Confetti background" className="z-0 absolute inset-0 w-full h-full"/>
      <div
        className= "relative z-10 flex flex-col min-h-screen items-center justify-center gap-7"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",            
          fontFamily: "Work Sans, sans-serif"

        }}
      >
        <h1 className="z-10 flex flex-col items-center">
          <span 
            className="px-5 -mb-5 -mt-6 md:-mt-13 text-[100px] md:text-[100px] font-bold" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(211,58,2,0.95), rgba(211,58,2,0.95)), url(${shpeSpirit})`,
              backgroundBlendMode: 'multiply',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bienvenidos
          </span>
          <span 
            style={{
              fontFamily: "Work Sans, sans-serif",
              color: "#1A2858",
              textAlign: 'center',
              textShadow:"0 1px 1px rgba(0, 0, 0, 0.25)",
              fontSize: "80px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "2px",
            }}
          >
            to the familia!
          </span>
        </h1>

        <p
          style={{ 
            fontFamily: "Work Sans, sans-serif",
            color: "#1A2858",
            textAlign: 'center',
            fontSize: "25px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            letterSpacing: "-0.72px",
          }}
          className="maxw"
        >
          SHPE is the source for quality Hispanic engineers and technical talent. While you may not be Hispanic or an engineer, you can still join and take advantage of the benefits and opportunities offered by SHPE at the national and local levels.
        </p>
      </div>
    </div>
  );
}

export default function MemberSHPE() {
  return (
    <section className="page">
      <Hero />
    </section>
  );
}