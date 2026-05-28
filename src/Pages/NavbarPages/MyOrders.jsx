import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { subscribeToUserOrders, cancelOrder } from '../../services/orderService';
import { trackOrder } from '../../services/trackingService';
import TrackingDisplay from '../../Components/TrackingDisplay';

const DEMO_ORDERS = [
    {
        id: 'ORD-101-GOLD',
        date: 'Oct 10, 2026',
        total: '₹24,500',
        status: 'In Transit',
        awbNumber: 'V012345678',
        paymentId: 'PAY-8899',
        address: { street: '123 Marine Drive', city: 'Mumbai', zip: '400001' },
        items: [{ name: 'Gold Bangles', quantity: 2, image: '/bangles.jpg' }],
        mockTracking: {
            status: 'In Transit',
            currentLocation: 'Mumbai Hub',
            lastUpdate: 'Oct 14, 09:42 AM'
        }
    },
    {
        id: 'ORD-202-SILVER',
        date: 'Oct 12, 2026',
        total: '₹8,200',
        status: 'Packed',
        awbNumber: 'V098765432',
        paymentId: 'PAY-1122',
        address: { street: '123 Marine Drive', city: 'Mumbai', zip: '400001' },
        items: [{ name: 'Silver Necklace', quantity: 1, image: '/necklace.jpg' }],
        mockTracking: {
            status: 'Processing',
            currentLocation: 'Delhi Sorting Center',
            lastUpdate: 'Oct 13, 04:15 PM'
        }
    }
];

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trackingData, setTrackingData] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [isDemoTracking, setIsDemoTracking] = useState(false);
    const [cancellingOrderId, setCancellingOrderId] = useState(null);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        setCancellingOrderId(orderId);
        try {
            await cancelOrder(orderId);
        } catch (error) {
            console.error("Failed to cancel order:", error);
            alert("Failed to cancel order. Please try again or contact support.");
        } finally {
            setCancellingOrderId(null);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        // Real-time listener — auto-updates when admin changes order status
        const unsubscribe = subscribeToUserOrders(
            user.id,
            (liveOrders) => {
                if (liveOrders.length === 0) {
                    setOrders(DEMO_ORDERS);
                } else {
                    setOrders(liveOrders);
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error listening to orders:", error);
                setLoading(false);
            }
        );

        // Cleanup: stop listening when component unmounts or user changes
        return () => unsubscribe();
    }, [user]);

    const handleTrackOrder = async (order) => {
        const awb = order.trackingId || order.awb || order.awbNumber;
        
        if (!awb) {
            // Fallback to WhatsApp if no AWB is available
            const message = `Hi, I would like to track my order.\nOrder ID: ${order.id}`;
            const whatsappNumber = "919847294800";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            return;
        }

        setTrackingLoading(true);
        setIsDemoTracking(false);
        try {
            const data = await trackOrder(awb);
            setTrackingData({
                ...data,
                id: order.id,
                items: order.items
            });
        } catch (error) {
            console.error("Tracking error:", error);
            // Fallback to demo or error state if needed
            setTrackingData({
                id: order.id,
                status: 'AWB Not Found',
                location: 'Processing',
                history: [],
                items: order.items
            });
        } finally {
            setTrackingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="pt-24 min-h-screen text-white container mx-auto px-4 md:px-10 flex justify-center items-center">
                <div className="text-xl">Loading your orders...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="pt-24 min-h-screen text-white container mx-auto px-4 md:px-10 flex flex-col justify-center items-center">
                <h2 className="text-2xl mb-4">Please sign in to view your orders.</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen  text-white font-sans selection:bg-white selection:text-black pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Clean Header */}
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-white/5 pb-8">
                    <h1 className="text-3xl font-light tracking-tight text-white mb-2 md:mb-0">Order History</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">Vault / Archive</p>
                </div>

                {trackingData && (
                    <TrackingDisplay 
                        trackingData={trackingData} 
                        onClose={() => setTrackingData(null)} 
                        isDemo={isDemoTracking} 
                    />
                )}

                {orders.length === 0 ? (
                    <div className="py-20 text-center border border-white/5 bg-white/5 rounded-sm">
                        <p className="text-xs uppercase tracking-widest text-white/20">Your order history is empty</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-[#0a0a0a] border border-white/5 hover:border-white/80 transition-colors duration-500 rounded-sm overflow-hidden">
                                <div className="p-6 md:p-8">
                                    {/* Order Header: ID and Date */}
                                    <div className="flex flex-wrap justify-between items-center gap-4 mb-10 pb-6 border-b border-white/5">
                                        <div className="flex items-center gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/20">Ref. ID</p>
                                                <p className="text-sm font-mono text-white/80">#{order.id.slice(0, 12).toUpperCase()}</p>
                                            </div>
                                            <div className="w-px h-8 bg-white/5 hidden sm:block"></div>
                                            <div className="space-y-1">
                                                <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/20">Date</p>
                                                <p className="text-sm font-light text-white/60">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-medium text-white/80 rounded-sm">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
                                        {/* Product Thumbnail & Basic Info */}
                                        <div className="lg:col-span-6 flex items-center gap-6">
                                            <div className="w-24 h-24 bg-zinc-900 shrink-0 rounded-sm overflow-hidden border border-white/5">
                                                <img 
                                                    src={order.items[0]?.image || '/facebook.avif'} 
                                                    alt="" 
                                                    className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-700"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-light font-Great_Vibes text-white tracking-wider">
                                                    {order.items[0]?.name}
                                                    {order.items.length > 1 && <span className="text-xs text-white/20 ml-2 font-normal">+ {order.items.length - 1} more</span>}
                                                </h3>
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Consignee: {order.address?.city}</p>
                                            </div>
                                        </div>

                                        {/* Valuation */}
                                        <div className="lg:col-span-2 py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/5 lg:px-6">
                                            <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/20 mb-1">Total</p>
                                            <p className="text-xl font-light text-white">{order.total}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                                            {(order.trackingId || order.awb || order.awbNumber) && (
                                                <button 
                                                    onClick={() => handleTrackOrder(order)}
                                                    disabled={trackingLoading}
                                                    className="flex-1 group/btn relative overflow-hidden bg-white text-black py-4 px-6 text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-500 rounded-sm disabled:opacity-50"
                                                >
                                                    <span className="relative z-10">
                                                        {trackingLoading ? 'Locating...' : 'Track Shipment'}
                                                    </span>
                                                    <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                                                </button>
                                            )}

                                            {['Pending', 'Processing', 'Confirmed', 'Packed'].includes(order.status) && (
                                                <button 
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    disabled={cancellingOrderId === order.id}
                                                    className="flex-1 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white py-4 px-6 text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-500 rounded-sm disabled:opacity-50"
                                                >
                                                    {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
