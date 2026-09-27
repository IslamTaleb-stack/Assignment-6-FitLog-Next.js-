import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-[#00D9FF] py-3 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/assets/logo.png"
                        alt="FitLog"
                        width={16}
                        height={16}
                        className="block"
                    />
                    <span className="text-white font-bold text-sm tracking-wider">
                        FITLOG
                    </span>
                </div>
                <p className="text-gray-400 text-xs">
                    © 2025 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
}