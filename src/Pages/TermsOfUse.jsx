import React from 'react';

export default function TermsOfUse() {
    return (
        <div className="pt-28 min-h-screen bg-black text-white font-Poppins pb-20 selection:bg-primary/20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20 animate-fade-in">
                    <h1 className="text-6xl md:text-7xl font-medium tracking-wider text-primary font-Great_Vibes mb-2">
                        Terms of Use
                    </h1>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
                    <p className="text-zinc-500 font-Poppins text-[10px] md:text-xs tracking-[0.2em] uppercase">
                        Last Updated: June 2, 2026
                    </p>
                </div>

                {/* Content Section */}
                <div className="space-y-8 text-zinc-400 leading-relaxed text-sm md:text-base">
                    
                    {/* Section 01 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">01.</span> 
                            Agreement to Terms
                        </h2>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            Welcome to Saga (also referred to as "Saga Luxury" or "Saga Kamya"). These Terms of Use govern your access to and use of our web platform, including any purchases, product viewings, or services offered. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please refrain from using our services.
                        </p>
                    </section>

                    {/* Section 02 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">02.</span> 
                            Eligibility & Account Security
                        </h2>
                        <p className="mb-6 font-light">
                            You must be at least 18 years of age or access the website under parent/guardian supervision to transact. When registering an account:
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>You agree to provide true, accurate, and current profile information.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>You are solely responsible for maintaining the confidentiality of your login credentials.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>You accept responsibility for all activities and transactions that occur under your user account.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 03 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">03.</span> 
                            Product Information & Pricing
                        </h2>
                        <p className="mb-6 font-light">
                            Saga specializes in luxury jewelry, including gold, silver, and precious stones. We aim to show product details, sizes, weights, and pricing as accurately as possible. However:
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>All descriptions, materials, purities, and metal colors are subject to slight organic variance.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>In the event of a pricing or data error, Saga reserves the right to cancel any orders placed for products listed at incorrect prices, offering a full refund.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>Product stock is limited and updated in real-time. If stock is exhausted during checkout, the item will not be fulfilled.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 04 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">04.</span> 
                            Shipping & Kerala Delivery Only
                        </h2>
                        
                        {/* Premium Reworked Info Notice */}
                        <div className="bg-primary/[0.03] border-l border-primary/30 p-4 rounded-r-xl mb-6 text-primary text-xs md:text-sm font-medium tracking-wide">
                            <span className="font-bold mr-1">⚠️ IMPORTANT:</span> Delivery is strictly restricted to addresses within the state of Kerala, India. Orders placed with shipping locations outside Kerala will be automatically cancelled.
                        </div>

                        <p className="mb-6 font-light">
                            All shipping logistics are managed via our official delivery partner (DTDC). 
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>Standard shipping timelines inside Kerala are generally 4 to 5 business days.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>AWB Tracking details are updated dynamically and can be monitored via the "My Orders" tab.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>Saga is not liable for logistics delays caused by extreme weather, lockdowns, or carrier exceptions.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 05 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">05.</span> 
                            Payments & Non-Refundability
                        </h2>
                        <p className="mb-6 font-light">
                            Saga requires 100% prepaid online transactions powered by Razorpay secure integration. Cash on Delivery (COD) is not supported.
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>All orders are final. No return policy applies to finalized orders.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>Order cancellation requests are only accommodated if processed before shipping, subject to administrative review.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>Manually-confirmed offline payments require manual admin verification of receipt.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 06 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">06.</span> 
                            Intellectual Property
                        </h2>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            All design assets, photographs, metadata, jewelry designs, logos, software, and written content displayed on this platform are the exclusive intellectual property of Saga. Any replication, usage, or distribution without prior written consent is strictly prohibited.
                        </p>
                    </section>

                    {/* Section 07 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">07.</span> 
                            Changes to Terms
                        </h2>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            Saga reserves the right to amend these Terms of Use at any time. Any changes will become effective immediately upon posting to this page. Continued usage of the platform constitutes your agreement to the modified terms.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
