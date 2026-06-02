import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="pt-28 min-h-screen bg-black text-white font-Poppins pb-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-wide text-primary font-Great_Vibes mb-4">Privacy Policy</h1>
                    <div className="w-24 h-0.5 bg-primary mx-auto mb-6"></div>
                    <p className="text-zinc-400 text-sm">Last Updated: June 2, 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-12 text-zinc-300 leading-relaxed text-sm md:text-base">
                    
                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">01.</span> Introduction
                        </h2>
                        <p>
                            At Saga, we value your trust and are committed to protecting your personal data. This Privacy Policy details how we collect, use, store, and share your information when you visit or make a purchase from our platform.
                        </p>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">02.</span> Information We Collect
                        </h2>
                        <p className="mb-4">
                            We collect personal information necessary to process orders and improve your shopping experience, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li><strong>Identity Data:</strong> Name, email address, password hash, and contact information.</li>
                            <li><strong>Shipping & Delivery Data:</strong> Billing address, delivery address, city, state, pincode, and contact numbers.</li>
                            <li><strong>Transaction Data:</strong> Razorpay order ID, payment status, transaction total, and history of purchased items.</li>
                            <li><strong>Session Data:</strong> Shopping cart items, recently viewed items, and cookies to manage active sessions.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">03.</span> How We Use Your Data
                        </h2>
                        <p className="mb-4">
                            We utilize the gathered information for specific and legitimate business operations:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li>To process, pack, and ship your orders, and manage payment verification.</li>
                            <li>To update product inventory levels atomically during transactions.</li>
                            <li>To coordinate delivery consignments with our logistics partner (DTDC).</li>
                            <li>To send customer notifications regarding delivery status updates and order updates (SMS, Email, or WhatsApp).</li>
                            <li>To provide customer support and troubleshoot technical platform issues.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">04.</span> Sharing & Third-Party Disclosure
                        </h2>
                        <p className="mb-4">
                            We only disclose data to third-party services that are essential to operate our storefront:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li><strong>Razorpay:</strong> Payment integration. We do not store credit card credentials or bank passwords; these are securely managed directly by Razorpay's PCI-compliant checkout SDK.</li>
                            <li><strong>DTDC Logistics:</strong> Consignment creation. We share names, shipping addresses, phone numbers, and order weights to enable package routing and AWB tracking.</li>
                            <li><strong>Firebase/Firestore:</strong> Cloud storage. Your user profiles, addresses, and order history are securely stored in cloud Firestore databases.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">05.</span> Data Security & Retention
                        </h2>
                        <p className="mb-4">
                            We implement standard technical safeguards:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-zinc-400">
                            <li>All data communication is encrypted over HTTPS.</li>
                            <li>We restrict database access solely to authorized server routines.</li>
                            <li>We retain order data to comply with tax and audit regulations, and user account profiles until requested to delete.</li>
                        </ul>
                    </section>

                    <section className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-primary font-mono">06.</span> Your Rights & Access
                        </h2>
                        <p>
                            You have the right to access your stored data by viewing your user profile. You can update your saved delivery addresses under the "Delivery Addresses" panel, and your account credentials under the "Settings" tab. If you wish to delete your account or requests logs of your personal data, contact support at <a href="mailto:sagakamya@gmail.com" className="text-primary hover:underline">sagakamya@gmail.com</a>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
