const UPLOAD_LINK = "https://your-upload-link-here.com";

const galleryYears = ["Fall 2025", "Spring 2025"];

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

function GalleryGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[1338px] grid-cols-12 gap-4" data-name="Gallery">
      <div className="col-span-12 h-48 bg-[#d9d9d9] sm:col-span-4 sm:h-[284px]" />
      <div className="col-span-6 h-36 bg-[#d9d9d9] sm:col-span-2 sm:h-[284px]" />
      <div className="col-span-6 h-36 bg-[#d9d9d9] sm:col-span-2 sm:h-[284px]" />
      <div className="col-span-12 h-48 bg-[#d9d9d9] sm:col-span-4 sm:h-[284px]" />

      <div className="col-span-6 h-36 bg-[#d9d9d9] sm:col-span-3 sm:h-[170px]" />
      <div className="col-span-6 h-36 bg-[#d9d9d9] sm:col-span-3 sm:h-[170px]" />
      <div className="col-span-6 h-36 bg-[#d9d9d9] sm:col-span-2 sm:h-[170px]" />
      <div className="col-span-6 h-36 bg-[#d9d9d9] sm:col-span-4 sm:h-[170px]" />
    </div>
  );
}

function YearSection({ title }) {
  return (
    <section className="mx-auto mt-14 w-full max-w-[1440px] px-4">
      <h2 className="mb-8 text-center text-[clamp(42px,7vw,75px)] font-bold tracking-[-1.5px] text-[#d33a02]">
        {title}
      </h2>
      <GalleryGrid />
    </section>
  );
}

export default function GalleryApproved() {
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white pb-16" data-name="Gallery - Approved">
      <PointsButton />
      {galleryYears.map((year) => (
        <YearSection key={year} title={year} />
      ))}
    </section>
  );
}
