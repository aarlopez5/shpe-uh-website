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
        className="relative z-10 flex flex-col min-h-screen items-center justify-center gap-7"
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
              textShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",
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

function ImageStyle() {
  return {
    backgroundColor: "#1A2858",
    opacity: 1,
    height: "100%",
    width: "63%",
    mixBlendMode: "multiply"
  };
}

export function JoinSecton() {
  return (
    <div className="relative">
      {/* da 3 images*/}
      <div className="relative w-full">
        <img src={shpeSpirit} alt="shpe spirit" className="block w-full h-auto" />
        <div className="absolute inset-0" style={ImageStyle()} />
      </div>
      <div className="relative w-full">
        <img src={lonestarShowdown} alt="lonestar" className="block w-full h-auto" />
        <div className="absolute inset-0" style={ImageStyle()} />
      </div>
      <div className="relative w-full">
        <img src={auditorium} alt="auditorium" className="block w-full h-auto" />
        <div className="absolute inset-0" style={ImageStyle()} />
      </div>
      {/* text box over da 3 images*/}
      <div className="absolute inset-0 z-10 flex items-center justify-center w-[63%]">
        <p className="text-white text-xl">
          Why Join SHPE?
        </p>
      </div>
    </div>
  );
}

export function Points() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-evenly items-center">
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
        className="text-8xl font-bold py-5 "
      >
        The Point System
      </h1>

      <div>
        <p
          className="text-center text-3xl"
          style={{
            fontFamily: "Work Sans sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            letterSpacing: "0.5px"
          }}
        >
          How to earn points...<br />+4 Assist Outreach events <br />+3 General Meeting Sign In<br />+2 General Meeting Sign Out<br />+3 Assist Professional events <br />+2 Assist Off-Campus events <br />+3 Assist SRT/Social events <br />+1 Assist SHPEresenting Thursday<br />+2 Bringing a new member<br />+2 Wearing SHPE shirt for General Meeting<br />+1 Submit Pictures!<br />+2 Assist committee meeting<br />+2 Committee Sign In (Events)<br />+4 Elections/vote<br /><br />The top 5 most active members are awarded at each General meeting!
        </p>
      </div>
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