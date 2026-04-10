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
        <h1 className="mt-12 z-10 flex flex-col items-center bg-white px-4">
          <span
            className="px-5 -mb-2 -mt-4 md:-mt-10 text-[clamp(3rem,10vw,9rem)] font-bold leading-none"
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
            className="px-4 pb-2"
            style={{
              fontFamily: "Work Sans, sans-serif",
              color: "#1A2858",
              textAlign: 'center',
              textShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",
              fontSize: "clamp(2rem, 6vw, 5rem)",
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
          className="max-w-[90%] md:max-w-[70%] bg-white px-4 py-3"
          style={{
            fontFamily: "Work Sans, sans-serif",
            color: "#1A2858",
            textAlign: 'center',
            fontSize: "clamp(1rem, 2.2vw, 1.875rem)",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: 1.35,
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
    width: "62%",
    mixBlendMode: "multiply"
  };
}

export function JoinSecton() {
  return (
    <div className="relative">
      {/* da 3 images*/}
      <div className="relative w-full"> {/*first image */}
        <img src={shpeSpirit} alt="shpe spirit" className="block w-full h-auto" />
        <div className="absolute inset-0" style={ImageStyle()} />
      </div>
      <div className="relative w-full"> {/*second image */}
        <img src={lonestarShowdown} alt="lonestar" className="block w-full h-auto" />
        <div className="absolute inset-0" style={ImageStyle()} />
      </div>

      {/* text box for first two images */}
      <div className="absolute top-0 bottom-0 left-0 w-[62%] z-10 flex flex-col items-start justify-start px-4 sm:px-8 lg:px-12 py-6 lg:py-10 overflow-y-auto">
        <h1 style={{
          color: "white",
          fontFamily: "Work Sans, sans-serif",
          fontSize: "150px",
          fontWeight: 600,
          letterSpacing: "1.5px",
          lineHeight: 1.08,
          textAlign: "left"
        }}>
          Why Join SHPE?
        </h1>

        <p style={{
          color: "#FD652F",
          fontFamily: "Work Sans, sans-serif",
          fontSize: "36px",
          fontWeight: "700",
          letterSpacing: "0.8px",
          lineHeight: 1.25,
          marginTop: "12px"
        }}>
          MemberSHPE/T-Shirt Dues ($20/ <br />academic year)
          <br />
        </p>

        <p style={{
          color: "white",
          fontFamily: "Work Sans, sans-serif",
          fontSize: "36px",
          fontWeight: "200",
          letterSpacing: "0.6px",
          marginTop: "10px"
        }}>
          Benefits Include:
        </p>

        <div style={{
          color: "white",
          fontFamily: "Work Sans, sans-serif",
          fontSize: "36px",
          fontWeight: "200",
          letterSpacing: "0.5px",
          paddingLeft: 20,
          marginTop: "6px",
          lineHeight: 1.35
        }}>
          <ul className="list-disc pl-7 space-y-1">
            <li> An opportunity to join our Slack
              <ul className="list-disc pl-7">
                <li>Our messaging platform where announcements are first made and opportunities are shared with our members!</li>
              </ul>
            </li>
            <li>Eligibility for MemberSHPE Awards
              <ul className="list-disc pl-7">
                <li>Around $10,000 is awarded every year</li>
              </ul>
            </li>
            <li>Internship/Co-Op Database</li>
            <li> Professional Development
              <ul className="list-disc pl-7">
                <li>Including but not limited to resume critiques, mock interviews, and networking events</li>
              </ul>
            </li>
            <li>MentorSHPE Program</li>
            <li> Resume Book
              <ul className="list-disc pl-7">
                <li>You'll have the opportunity to give us your resume to be shared with our corporate sponsors</li>
              </ul>
            </li>
            <li>SHPE Graduation Stole</li>
            <li>Chapter Shirt</li>
          </ul>
        </div>

        <button style={{
          backgroundColor: "white",
          color: "#1A2858",
          fontWeight: 600,
          fontSize: "36px",
          letterSpacing: "0px",
          padding: "14px 26px",
          marginTop: "14px",
          alignSelf: "center"
        }}>
          Join Now
        </button>
      </div>

      <div className="relative w-full"> {/*third image */}
        <img src={auditorium} alt="auditorium" className="block w-full h-auto" />
        <div className="absolute inset-0" style={ImageStyle()} />
        <div className="absolute top-0 bottom-0 left-0 w-[62%] z-10 flex flex-col items-start justify-start px-4 sm:px-8 lg:px-12 py-6 lg:py-10 overflow-y-auto"> {/* text box for last image */}
          <p style={{
            color: "#FD652F",
            fontFamily: "Work Sans, sans-serif",
            fontSize: "36px",
            fontWeight: "700",
            letterSpacing: "0.8px",
            lineHeight: 1.25,
            marginTop: "8px"
          }}>
            National Membershpe ($10/year)
          </p>

          <p style={{
            color: "white",
            fontFamily: "Work Sans, sans-serif",
            fontSize: "36px",
            fontWeight: "200",
            letterSpacing: "0.6px",
            marginTop: "10px"
          }}>
            Benefits Include:
          </p>

          <div style={{
            color: "white",
            fontFamily: "Work Sans, sans-serif",
            fontSize: "36px",
            fontWeight: "200",
            letterSpacing: "0.5px",
            paddingLeft: 20,
            marginTop: "6px",
            lineHeight: 1.35
          }}>
            <ul className="list-disc pl-7 space-y-1">
              <li> An opportunity to join our Slack
                <ul className="list-disc pl-7">
                  <li>Our messaging platform where announcements are first made and opportunities are shared with our members!</li>
                </ul>
              </li>
              <li>Eligibility for MemberSHPE Awards
                <ul className="list-disc pl-7">
                  <li>Around $10,000 is awarded every year</li>
                </ul>
              </li>
              <li>Internship/Co-Op Database</li>
              <li> Professional Development
                <ul className="list-disc pl-7">
                  <li>Including but not limited to resume critiques, mock interviews, and networking events</li>
                </ul>
              </li>
              <li>MentorSHPE Program</li>
              <li> Resume Book
                <ul className="list-disc pl-7">
                  <li>You'll have the opportunity to give us your resume to be shared with our corporate sponsors</li>
                </ul>
              </li>
              <li>SHPE Graduation Stole</li>
              <li>Chapter Shirt</li>
            </ul>
          </div>

          <button style={{
            backgroundColor: "white",
            color: "#1A2858",
            fontWeight: 600,
            fontSize: "36px",
            letterSpacing: "0px",
            padding: "14px 24px",
            marginTop: "14px",
            alignSelf: "center"
          }}>
            National MemberSHPE
          </button>

        </div>
      </div>
    </div >
  );
}

export function Points() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-evenly items-center px-6 py-12">
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
        className="text-[clamp(2.25rem,7vw,5rem)] font-bold py-5 text-center"
      >
        The Point System
      </h1>

      <div className="max-w-5xl">
        <p
          className="text-center text-[clamp(1rem,2.2vw,1.8rem)] leading-relaxed"
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