import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="pt-28 min-h-screen bg-black text-white font-Poppins pb-20 selection:bg-primary/20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20 animate-fade-in">
                    <h1 className="text-6xl md:text-7xl font-medium tracking-wider text-primary font-Great_Vibes mb-2">
                        Privacy Policy
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
                            Introduction
                        </h2>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            At Saga, we value your trust and are committed to protecting your personal data. This Privacy Policy details how we collect, use, store, and share your information when you visit or make a purchase from our platform.
                        </p>
                    </section>

                    {/* Section 02 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">02.</span> 
                            Information We Collect
                        </h2>
                        <p className="mb-6 font-light">
                            We collect personal information necessary to process orders and improve your shopping experience, including:
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>Identity Data:</strong> Name, email address, password hash, and contact information.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>Shipping & Delivery Data:</strong> Billing address, delivery address, city, state, pincode, and contact numbers.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>Transaction Data:</strong> Razorpay order ID, payment status, transaction total, and history of purchased items.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>Session Data:</strong> Shopping cart items, recently viewed items, and cookies to manage active sessions.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 03 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">03.</span> 
                            How We Use Your Data
                        </h2>
                        <p className="mb-6 font-light">
                            We utilize the gathered information for specific and legitimate business operations:
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>To process, pack, and ship your orders, and manage payment verification.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>To update product inventory levels atomically during transactions.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>To coordinate delivery consignments with our logistics partner (DTDC).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>To send customer notifications regarding delivery status updates and order updates (SMS, Email, or WhatsApp).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>To provide customer support and troubleshoot technical platform issues.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 04 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">04.</span> 
                            Sharing & Third-Party Disclosure
                        </h2>
                        <p className="mb-6 font-light">
                            We only disclose data to third-party services that are essential to operate our storefront:
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>Razorpay:</strong> Payment integration. We do not store credit card credentials or bank passwords; these are securely managed directly by Razorpay's PCI-compliant checkout SDK.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>DTDC Logistics:</strong> Consignment creation. We share names, shipping addresses, phone numbers, and order weights to enable package routing and AWB tracking.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span><strong>Firebase/Firestore:</strong> Cloud storage. Your user profiles, addresses, and order history are securely stored in cloud Firestore databases.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 05 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">05.</span> 
                            Data Security & Retention
                        </h2>
                        <p className="mb-6 font-light">
                            We implement standard technical safeguards:
                        </p>
                        <ul className="space-y-3 pl-2 text-zinc-400 font-light text-xs md:text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>All data communication is encrypted over HTTPS.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>We restrict database access solely to authorized server routines.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-[10px]">✦</span>
                                <span>We retain order data to comply with tax and audit regulations, and user account profiles until requested to delete.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 06 */}
                    <section className="group relative bg-[#0a0a0a] border-l-2 border-primary/40 hover:border-primary p-8 md:p-10 rounded-r-2xl transition-all duration-500 shadow-xl hover:shadow-primary/[0.02]">
                        <h2 className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide flex items-center gap-3">
                            <span className="text-primary font-mono text-sm tracking-normal">06.</span> 
                            Your Rights & Access
                        </h2>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            You have the right to access your stored data by viewing your user profile. You can update your saved delivery addresses under the "Delivery Addresses" panel, and your account credentials under the "Settings" tab. If you wish to delete your account or requests logs of your personal data, contact support at <a href="mailto:sagakamya@gmail.com" className="text-primary hover:underline transition-colors duration-300">sagakamya@gmail.com</a>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
