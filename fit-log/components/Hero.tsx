import Image from "next/image";

export default function Hero() {
    return (
        <section className="min-h-[80vh] flex items-center px-4 md:px-8 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full">

                {/* Left Side — Text Content */}
                <div>
                    <p className="text-lime-400 font-semibold tracking-widest text-sm mb-3">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-6">
                        TRAIN WITH INTENT.<br />
                        LOG EVERY SET.
                    </h1>

                    <p className="text-gray-400 text-lg mb-8 max-w-lg">
                        FitLog is your no-nonsense gym companion: pick a lift, lock it into
                        your plan, and watch your progress add up.
                    </p>

                    <a
                        href="#library"
                        className="inline-flex bg-lime-400 text-black px-6 py-3 rounded font-semibold hover:bg-lime-300 transition"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>

                {/* Right Side — Instructor's Image */}
                <div className="hidden md:flex justify-center">
                    <Image
                        src="/assets/banner.png"
                        alt="Gym training"
                        width={400}
                        height={400}
                        className="rounded-xl bg-gray-900 p-4"
                    />
                </div>

            </div>
        </section>
    );
}