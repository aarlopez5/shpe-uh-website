import confetti from "../assets/membershpeImages/confettiBackground.png"
import bienvenidos from "../assets/membershpeImages/Bienvenidos.png"

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
      <img
        src={bienvenidos}
        alt="Bienvenidos"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
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