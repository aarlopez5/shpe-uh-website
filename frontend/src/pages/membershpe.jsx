import confetti from "../assets/membershpeImages/confettiBackground.png"
import shpeSpirit from "../assets/images/SHPESpiritWeb.png"
import lonestarShowdown from "../assets/images/LonestarShowdown.png"
import auditorium from "../assets/images/Auditorium.png"

export function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-clip">
      <img 
        src={confetti} 
        alt="Confetti background" 
        className="absolute block top-25 w-full h-full object-cover"
      />
      <div
        className= "relative z-10 flex flex-col min-h-screen items-center justify-center gap-7"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",            
          fontFamily: "Work Sans, sans-serif"

        }}
      >
        <h1 className="mt-12 z-10 flex flex-col items-center bg-white">
          <span 
            className="px-5 -mb-5 -mt-6 md:-mt-13 text-[150px] md:text-[150px] font-bold" 
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
          className="max-w-[60%] bg-white"
          style={{ 
            fontFamily: "Work Sans, sans-serif",
            color: "#1A2858",
            textAlign: 'center',
            fontSize: "30px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            letterSpacing: "-0.72px",
          }}
        >
          SHPE is the source for quality Hispanic engineers and technical talent. While you may not be Hispanic or an engineer, you can still join and take advantage of the benefits and opportunities offered by SHPE at the national and local levels.
        </p>
      </div>
    </div>
  );
}

function JoinImages(image){
  return {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",        
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export function JoinSecton(){

  return (
    <>
    <div style={JoinImages(shpeSpirit)}>
    </div>
    <div style={JoinImages(lonestarShowdown)}>
    </div>
    <div style={JoinImages(auditorium)}>
    </div>
    </>
  );
}

export function Points() {
  return (
    <div>
      <h1
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
        className=""
      >
        The Point System
      </h1>
    </div>
  )
}

export default function MemberSHPE() {
  return (
    <>
      <Hero />
      <JoinSecton />
      <Points />
    </>
  );
}