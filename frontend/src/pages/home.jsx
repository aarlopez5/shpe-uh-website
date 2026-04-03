import { useState } from 'react';
import shpeSpirit from "../assets/images/SHPESpiritWeb.png"
import shpeLogo from "../assets/images/shpelogo.png"
import homeDecor from "../assets/images/homeDecor.png"
import waves from "../assets/images/waves.png"

export default function Home() {
	const [email, setEmail] = useState('');
	return (
		<section className="text-[#001F5B] overflow-x-hidden mt-20">
			<section className="relative min-h-[90vh] w-full overflow-hidden">
				{/* Left image */}

				{/* Main navy diagonal */}
				<div className="z-10 absolute left-0 top-0 h-full w-[60%] overflow-hidden [clip-path:polygon(0_0,15%_0,75%_100%,0_100%)]">
					<img
					src={shpeSpirit}
					alt="SHPE members"
					className="h-full w-full object-cover absolute right-50 shadow-2xl"
					/>
				</div>
				<div className="z-0 absolute left-[12%] top-[18%] h-[58rem] w-[32rem] rotate-[45deg] bg-[#0A3D78]" />

				{/* Orange top accent */}
				{/* <div className="absolute left-[22%] top-[-8%] z-20 h-[20rem] w-[12rem] rotate-[45deg] bg-[#E64900]" /> */}

				{/* Light blue center block */}
				{/* <div className="absolute left-[30%] top-[3%] z-20 h-[32rem] w-[18rem] rotate-[45deg] bg-[#7FA8BE]" /> */}

				{/* Blue lower block */}
				{/* <div className="absolute left-[34%] top-[42%] z-30 h-[22rem] w-[18rem] rotate-[45deg] bg-[#1E6FB7]" /> */}

				{/* Small gray accent top right */}
				{/* <div className="absolute right-[14%] top-[4%] z-10 h-[9rem] w-[9rem] rotate-[45deg] bg-[#C7D0E0]" /> */}

				{/* Orange accent bottom right */}
				{/* <div className="absolute right-[-5%] top-[52%] z-10 h-[16rem] w-[16rem] rotate-[45deg] bg-[#FF6B2D]" /> */}

				{/* Right: headline + CTA */}
				<div className="relative flex-1 flex flex-col items-end justify-center">
					<p className="font-semibold text-[clamp(2rem,3.8vw,4rem)] leading-tight tracking-tight text-right">
						<span className="text-[#D33A02]">Join</span> the{' '}
						<span className="text-[#FD652F]">leading</span>
						<br />
						<span className="text-[#0070C0]">Familia</span> in{' '}
						<span className="text-[#72A9BE]">STEM</span>
					</p>

					<p className="font-semibold text-[clamp(1rem,2.2vw,1.75rem)] leading-snug tracking-tight text-right [text-shadow:0_4px_4px_#fff] text-[#001F5B]">
						Your journey starts at SHPE
						<br />
						<span className="text-[#C8102E]">University of Houston</span>
					</p>

					<button
						type="button"
						className="text-[#ffffff] bg-[#F16635] border border-[#0070C0] rounded-[20px]"
						>
						Become a Member
					</button>
				</div>
			</section>
			<section
				id="info"
				className="bg-white px-[8%] py-20 flex items-center justify-evenly flex-wrap"
			>
				<div className="max-w-[340px] text-right">
					<h2 className="text-[#D33A02] font-semibold text-xl mb-3">
						What we do?
					</h2>
					<p className="text-sm leading-7 text-[#001F5B]">
						The Society of Hispanic Professional Engineers (SHPE){' '}
						<span className="text-[#C8102E]">University of Houston</span>{' '}
						chapter was founded in 2002. Since then this chapter has been
						dedicated to promote the professional, leadership, and academic
						development of our members and encourage awareness in Science and
						Engineering studies among the Hispanic community. Through a series
						of general meetings, events, workshops, and conferences, the SHPE-UH
						chapter aims to provide opportunities that will propel our members
						to succeed in the professional world and beyond!
					</p>
				</div>

				<div className="flex items-center justify-center">
					<img
						src={shpeLogo}
						alt="SHPE logo"
						className="w-[clamp(180px,22vw,320px)] mix-blend-multiply"
					/>
				</div>
			</section>

			<section
				id="insta"
				className="relative bg-white px-[8%] py-16 overflow-hidden"
			>
				{/* homeDecor.png — floating circles background */}
				<div className="absolute inset-0 z-0 pointer-events-none">
					<img
						src={homeDecor}
						alt=""
						aria-hidden="true"
						className="w-full h-full object-cover mix-blend-screen opacity-85"
					/>
				</div>

				<h2 className="relative z-[1] text-center italic font-semibold text-[clamp(1.2rem,2.5vw,1.8rem)] mb-6 text-[#001F5B]">
					Follow us on Instagram:{' '}
					<span className="text-[#0070C0]">@shpe_uh</span>
				</h2>

				{/* 3×2 grid — replace the placeholder divs with <img> tags for real posts */}
				<div className="relative z-[1] grid grid-cols-3 gap-1 max-w-[520px] mx-auto rounded-lg overflow-hidden shadow-[0_4px_30px_rgba(0,31,91,0.15)]">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="aspect-square bg-[#dde6f0] overflow-hidden">
							{/* Swap this div for an <img> once you have real Instagram images */}
							<div className="w-full h-full bg-gradient-to-br from-[#e0e9f3] via-[#c5d3e6] to-[#e0e9f3] animate-pulse" />
						</div>
					))}
				</div>
			</section>

			<section
				id="newsletter"
				className="relative min-h-[500px] bg-[#001F5B] overflow-hidden flex flex-col items-center justify-center pb-20 px-4 text-center"
			>
				{/* waves.png background */}
				<div className="absolute inset-0 z-0 pointer-events-none">
					<img
						src={waves}
						alt=""
						aria-hidden="true"
						className="w-full h-full object-cover object-top "
					/>
				</div>

				<h2 className="relative z-[1] text-[#fff] text-[clamp(1.5rem,4vw,2.5rem)] mb-2">
					NEWSLETTER INTEREST FORM
				</h2>

				<p className="relative z-[1] text-[#D33A02] font-semibold text-base mb-8">
					Sign up for news and opportunities
				</p>

				<form
					className="relative z-[1] flex flex-wrap justify-center"
					onSubmit={(e) => {
						e.preventDefault();
						alert(`Subscribed: ${email}`);
						setEmail('');
					}}
				>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-[clamp(200px,35vw,360px)] h-[54px] bg-white rounded-[20px] px-5 text-[#001F5B] text-base outline-none focus:ring-2 focus:ring-[#0070C0]"
					/>
					<button
						type="submit"
						className="h-[54px] bg-[#F16635] text-[#ffffff] rounded-[20px]"
					>
						SUBSCRIBE
					</button>
				</form>
			</section>
			{/* </div> */}
		</section>
	);
}
