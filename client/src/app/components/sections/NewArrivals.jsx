import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Basic Heavyweight T-Shirt',
        price: '$45.00',
        category: 'Men',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
        isNew: true
    },
    {
        id: 2,
        name: 'Pleated Wide Leg Trousers',
        price: '$120.00',
        category: 'Women',
        image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?q=80&w=1887&auto=format&fit=crop',
        isNew: true
    },
    {
        id: 3,
        name: 'Oversized Wool Blazer',
        price: '$280.00',
        category: 'Unisex',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
        isNew: true
    }
];

export default function NewArrivals() {
    return (
        <section className="py-20 bg-neutral-900">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                            Summer Collection
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                            New Arrivals
                        </h2>
                    </div>

                    <Link href="/shop" className="group flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors">
                        View All Products
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                />

                                {/* Badge */}
                                {product.isNew && (
                                    <div className="absolute top-3 left-3 bg-white px-2 py-1">
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
                                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                                    {product.category}
                                </p>
                                <h3 className="text-base font-medium text-white group-hover:text-neutral-300 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-neutral-300">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}