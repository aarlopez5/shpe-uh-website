import confetti from "../assets/membershpeImages/confettiBackground.png"
import bienvenidos from "../assets/membershpeImages/Bienvenidos.png"
import shpeSpirit from "../assets/images/SHPESpiritWeb.png"
import lonestarShowdown from "../assets/images/LonestarShowdown.png"
import auditorium from "../assets/images/Auditorium.png"

export function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${confetti})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",        
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1></h1>
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

export default function MemberSHPE() {
  return (
    <section className="page">
      <Hero />
      <JoinSecton />
    </section>
  );
}