"use client";
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-900">
            <div className="relative">
                {/* Animated Rings */}
                <motion.div
                    className="absolute -inset-8 rounded-full border border-white/10"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -inset-16 rounded-full border border-white/5"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />

                {/* Central Logo */}
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-white p-3 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <ShoppingBag className="w-8 h-8 text-neutral-900" strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-col items-center">
                        <motion.span
                            className="text-3xl font-bold tracking-tighter text-white uppercase"
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            SWAP.
                        </motion.span>

                        <div className="mt-4 w-32 h-[1px] bg-neutral-800 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
                                animate={{
                                    left: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Bottom Text */}
            <motion.p
                className="absolute bottom-12 text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Loading Excellence
            </motion.p>
        </div>
    );
};

export default Loading;
