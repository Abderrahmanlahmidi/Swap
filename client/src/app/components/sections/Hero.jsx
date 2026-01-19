import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-[100vh] w-full bg-neutral-100 overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/Hero.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>

            <div className="relative h-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center">
                <div className="max-w-3xl space-y-10">

                    <div className="space-y-4">
                        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-white uppercase opacity-90">
                            Spring / Summer 2026
                        </h2>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tighter">
                            Timeless <br /> Elegance.
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-50 max-w-xl font-light leading-relaxed">
                            Discover the new monochrome collection. Curated for the modern minimal list who values quality over quantity.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="px-10 py-5 bg-white text-neutral-900 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-neutral-100 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3">
                            Shop Collection
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="px-10 py-5 bg-black/30 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center">
                            View Lookbook
                        </button>
                    </div>

                </div>
            </div>


            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    )
}
