import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Badge */}
                {product.isNew && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">New</span>
                    </div>
                )}

                {/* Quick Add Button (Visible on Hover) */}
                <button className="absolute bottom-4 right-4 bg-white text-neutral-900 w-10 h-10 flex items-center justify-center rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-900 hover:text-white">
                    <span className="text-lg">+</span>
                </button>
            </div>

            {/* Info */}
            <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-400 uppercase tracking-wide transition-colors">
                    {product.category}
                </p>
                <h3 className="text-base font-medium text-white group-hover:underline decoration-1 underline-offset-4 decoration-neutral-500">
                    {product.name}
                </h3>
                <p className="text-sm text-neutral-400">
                    {product.price}
                </p>
            </div>
        </div>
    );
}
