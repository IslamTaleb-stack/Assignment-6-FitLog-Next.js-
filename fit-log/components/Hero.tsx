import Image from "next/image";

export default function Hero() {
    return (
        <section className="pt-24 pb-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                    <p className="text-[#CCFF00] text-xs font-semibold tracking-widest uppercase mb-3">
                        WORKOUT LIBRARY
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-4">
                        TRAIN WITH INTENT.<br />
                        LOG EVERY SET.
                    </h1>
                    <p className="text-gray-400 text-sm mb-6 max-w-md">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                    </p>
                    <a
                        href="#library"
                        className="inline-flex items-center gap-2 bg-[#CCFF00] text-black px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#b3e600] transition"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>

                {/* Right Image */}
                <div className="flex justify-end">
                    <Image
                        src="/assets/banner.png"
                        alt="Fitness illustration"
                        width={360}
                        height={360}
                        unoptimized
                        className="rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
}