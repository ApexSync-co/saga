import React from 'react';

export default function TermsOfUse() {
    return (
        <div className="pt-28 min-h-screen bg-black text-white font-Poppins pb-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-wide text-primary font-Great_Vibes mb-4">Terms of Use</h1>
                    <div className="w-24 h-0.5 bg-primary mx-auto mb-6"></div>
                    <p className="text-zinc-400 text-sm">Last Updated: June 2, 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-12 text-zinc-300 leading-relaxed text-sm md:text-base">
                    
                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">01.</span> Agreement to Terms
                        </h2>
                        <p>
                            Welcome to Saga (also referred to as "Saga Luxury" or "Saga Kamya"). These Terms of Use govern your access to and use of our web platform, including any purchases, product viewings, or services offered. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please refrain from using our services.
                        </p>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">02.</span> Eligibility & Account Security
                        </h2>
                        <p className="mb-4">
                            You must be at least 18 years of age or access the website under parent/guardian supervision to transact. When registering an account:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li>You agree to provide true, accurate, and current profile information.</li>
                            <li>You are solely responsible for maintaining the confidentiality of your login credentials.</li>
                            <li>You accept responsibility for all activities and transactions that occur under your user account.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">03.</span> Product Information & Pricing
                        </h2>
                        <p className="mb-4">
                            Saga specializes in luxury jewelry, including gold, silver, and precious stones. We aim to show product details, sizes, weights, and pricing as accurately as possible. However:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li>All descriptions, materials, purities, and metal colors are subject to slight organic variance.</li>
                            <li>In the event of a pricing or data error, Saga reserves the right to cancel any orders placed for products listed at incorrect prices, offering a full refund.</li>
                            <li>Product stock is limited and updated in real-time. If stock is exhausted during checkout, the item will not be fulfilled.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">04.</span> Shipping & Kerala Delivery Only
                        </h2>
                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl mb-4 text-primary text-xs md:text-sm font-medium">
                            ⚠️ IMPORTANT: Delivery is strictly restricted to addresses within the state of Kerala, India. Orders placed with shipping locations outside Kerala will be automatically cancelled.
                        </div>
                        <p className="mb-4">
                            All shipping logistics are managed via our official delivery partner (DTDC). 
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li>Standard shipping timelines inside Kerala are generally 4 to 5 business days.</li>
                            <li>AWB Tracking details are updated dynamically and can be monitored via the "My Orders" tab.</li>
                            <li>Saga is not liable for logistics delays caused by extreme weather, lockdowns, or carrier exceptions.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">05.</span> Payments & Non-Refundability
                        </h2>
                        <p className="mb-4">
                            Saga requires 100% prepaid online transactions powered by Razorpay secure integration. Cash on Delivery (COD) is not supported.
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li>All orders are final. No return policy applies to finalized orders.</li>
                            <li>Order cancellation requests are only accommodated if processed before shipping, subject to administrative review.</li>
                            <li>Manually-confirmed offline payments require manual admin verification of receipt.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">06.</span> Intellectual Property
                        </h2>
                        <p>
                            All design assets, photographs, metadata, jewelry designs, logos, software, and written content displayed on this platform are the exclusive intellectual property of Saga. Any replication, usage, or distribution without prior written consent is strictly prohibited.
                        </p>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">07.</span> Changes to Terms
                        </h2>
                        <p>
                            Saga reserves the right to amend these Terms of Use at any time. Any changes will become effective immediately upon posting to this page. Continued usage of the platform constitutes your agreement to the modified terms.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
