import springImg1 from "../assets/images/Spring2026/img1.JPG"
import springImg2 from "../assets/images/Spring2026/img2.JPG"
import springImg3 from "../assets/images/Spring2026/img3.JPG"
import springImg4 from "../assets/images/Spring2026/img4.JPG"
import springImg5 from "../assets/images/Spring2026/img5.JPG"
import springImg6 from "../assets/images/Spring2026/img6.JPG"
import springImg7 from "../assets/images/Spring2026/img7.JPG"
import springImg8 from "../assets/images/Spring2026/img8.JPG"

import fallImg1 from "../assets/images/Fall2025/img1.JPG"
import fallImg2 from "../assets/images/Fall2025/img2.JPG"
import fallImg3 from "../assets/images/Fall2025/img3.JPG"
import fallImg4 from "../assets/images/Fall2025/img4.JPG"
import fallImg5 from "../assets/images/Fall2025/img5.JPG"
import fallImg6 from "../assets/images/Fall2025/img6.JPG"
import fallImg7 from "../assets/images/Fall2025/img7.JPG"
import fallImg8 from "../assets/images/Fall2025/img8.JPG"


const UPLOAD_LINK = "https://your-upload-link-here.com";

const galleryYears = ["Spring 2026", "Fall 2025"];

function PointsButton() {
  return (
    <div
      className="mx-auto mt-10 flex w-full max-w-[1100px] flex-col items-center gap-3 px-4"
      data-name="Points Button"
    >
      <a
        href={UPLOAD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-[min(90vw,520px)] flex-col items-center justify-center rounded-[25px] bg-[#1d2854] px-5 py-6 text-center transition-colors hover:bg-[#2a3666]"
      >
        <span className="text-[clamp(28px,4vw,35px)] font-semibold tracking-[-0.7px] text-[#1170b9] group-hover:underline">
          Want to earn points?
        </span>
        <span className="mt-2 text-[16px] font-normal tracking-[-0.32px] text-white group-hover:underline">
          Upload your SHPE event photos here!
        </span>
      </a>
    </div>
  );
}

function GalleryGrid2026() {
  return (
    <div className="mx-auto grid w-full max-w-[1338px] grid-cols-12 gap-4" data-name="Gallery">
      <div className="col-span-12 h-48 overflow-hidden bg-[#d9d9d9] sm:col-span-4 sm:h-[284px]">
        <img src={springImg1} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-2 sm:h-[284px]">
        <img src={springImg2} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-2 sm:h-[284px]">
        <img src={springImg3} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-12 h-48 overflow-hidden bg-[#d9d9d9] sm:col-span-4 sm:h-[284px]">
        <img src={springImg4} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-3 sm:h-[170px]">
        <img src={springImg5} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-3 sm:h-[170px]">
        <img src={springImg6} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-2 sm:h-[170px]">
        <img src={springImg7} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-4 sm:h-[170px]">
        <img src={springImg8} className="h-full w-full object-cover" alt="" />
      </div>
    </div>
  );
}

function GalleryGrid2025() {
  return (
    <div className="mx-auto grid w-full max-w-[1338px] grid-cols-12 gap-4" data-name="Gallery">
      <div className="col-span-12 h-48 overflow-hidden bg-[#d9d9d9] sm:col-span-4 sm:h-[284px]">
        <img src={fallImg1} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-2 sm:h-[284px]">
        <img src={fallImg2} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-2 sm:h-[284px]">
        <img src={fallImg3} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-12 h-48 overflow-hidden bg-[#d9d9d9] sm:col-span-4 sm:h-[284px]">
        <img src={fallImg4} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-3 sm:h-[170px]">
        <img src={fallImg5} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-3 sm:h-[170px]">
        <img src={fallImg6} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-2 sm:h-[170px]">
        <img src={fallImg7} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-6 h-36 overflow-hidden bg-[#d9d9d9] sm:col-span-4 sm:h-[170px]">
        <img src={fallImg8} className="h-full w-full object-cover" alt="" />
      </div>
    </div>
  );
}

function YearSection({ title }) {
  return (
    <section className="mx-auto mt-14 w-full max-w-[1440px] px-4">
      <h2 className="mb-8 text-center text-[clamp(42px,7vw,75px)] font-bold tracking-[-1.5px] text-[#d33a02]">
        {title}
      </h2>
      {
        title === "Spring 2026" ? (
          <GalleryGrid2026 />
        ) : (
          <GalleryGrid2025 />
        )
      }
    </section>
  )
}

export default function GalleryApproved() {
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white pb-16" data-name="Gallery - Approved">
      <PointsButton />
      <YearSection key="Spring 2026" title="Spring 2026" />
      <YearSection key="Fall 2025" title="Fall 2025" />
    </section>
  );
}
