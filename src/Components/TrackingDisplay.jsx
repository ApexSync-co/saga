import React, { useState, useEffect } from 'react';

const steps = [
    { label: 'Booked', status: 'BOOKED' },
    { label: 'Transit', status: 'IN TRANSIT' },
    { label: 'Arrival', status: 'OUT FOR DELIVERY' },
    { label: 'Delivery', status: 'DELIVERED' }
];

// Helper to normalize DTDC status to our steps
const normalizeStatus = (status) => {
    if (!status) return 'BOOKED';
    const s = status.toUpperCase();
    if (s.includes('DELIVERED')) return 'DELIVERED';
    if (s.includes('OUT FOR DELIVERY')) return 'OUT FOR DELIVERY';
    if (s.includes('TRANSIT')) return 'IN TRANSIT';
    if (s.includes('BOOKED')) return 'BOOKED';
    return s;
};

const TrackingDisplay = ({ trackingData, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showExtendedDetails, setShowExtendedDetails] = useState(false);

    useEffect(() => {
        const raf = window.requestAnimationFrame(() => {
            setIsVisible(true);
            const currentStatus = normalizeStatus(trackingData?.status);
            const statusIndex = steps.findIndex(s => s.status === currentStatus);
            const safeIndex = statusIndex === -1 ? 0 : statusIndex;
            setTimeout(() => {
                setProgress((safeIndex / (steps.length - 1)) * 100);
            }, 300);
        });
        return () => window.cancelAnimationFrame(raf);
    }, [trackingData]);
 
    if (!trackingData) return null;
 
    const currentStatusLabel = trackingData.status || 'BOOKED';
    const statusIdx = steps.findIndex(s => s.status === normalizeStatus(currentStatusLabel));
    const currentIndex = statusIdx === -1 ? 0 : statusIdx;

    return (
        <div className={'fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-700 ' + (isVisible ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent')}>
            <div 
                className='absolute inset-0 cursor-pointer'
                onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}
            />
            
            <div className={'relative w-full transition-all duration-500 transform overflow-hidden max-h-[90vh] flex flex-col ' + (showExtendedDetails ? 'max-w-4xl' : 'max-w-xl') + ' ' + (isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0')}>
                <div className='bg-[#0a0a0a] border border-white/5 shadow-2xl overflow-hidden flex flex-col h-full min-h-0'>
                    {/* Header - Fixed */}
                    <div className='flex justify-between items-center px-6 py-5 border-b border-white/5 bg-[#0a0a0a] shrink-0'>
                        <div className='space-y-0.5'>
                            <h2 className='text-2xl font-light font-Great_Vibes text-white tracking-widest'>Track Acquisition</h2>
                            <p className='text-[8px] uppercase tracking-[0.5em] text-white/20 font-mono'>Ref: {trackingData.id ? trackingData.id.slice(0, 14).toUpperCase() : ''}</p>
                        </div>
                        <button 
                            onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}
                            className='group p-2 hover:bg-white/5 rounded-full transition-colors'
                        >
                            <svg className='w-4 h-4 text-white/30 group-hover:text-white transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>

                    {/* Content - Scrollable only when extended */}
                    <div className={'flex flex-col lg:flex-row flex-1 min-h-0 ' + (showExtendedDetails ? 'overflow-y-auto custom-scrollbar' : 'overflow-hidden')}>
                        <div className={'p-6 sm:p-8 transition-all duration-500 ' + (showExtendedDetails ? 'lg:w-3/5 border-r border-white/5' : 'w-full')}>
                            <div className='space-y-8'>
                                {/* Horizontal Timeline - Precisely Aligned and Fluid Responsive */}
                                <div className='relative px-0 pb-10 pt-10'>
                                    <div className='relative h-20 w-full'>
                                        {/* Line Container - Fixed alignment to center of 4x4 (16px) container (16/2 = 8px; marker offset 40px + 8px = 48px) */}
                                        <div className='absolute top-2 left-4 right-4 h-px bg-white/5 overflow-hidden'>
                                            <div 
                                                className='h-full bg-primary transition-all duration-1500 ease-out shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                                                style={{ width: progress + '%' }}
                                            ></div>
                                        </div>

                                        <div className='relative flex justify-between items-center px-4'>
                                            {steps.map((step, index) => {
                                                const isActive = index <= currentIndex;
                                                const isCurrent = index === currentIndex;
                                                
                                                return (
                                                    <div key={index} className='flex flex-col items-center relative'>
                                                        {/* Marker Container - Aligned to the line */}
                                                        <div className='relative w-4 h-4 flex items-center justify-center'>
                                                            <div className={'w-2 h-2 rotate-45 border transition-all duration-700 ' + 
                                                                (isActive ? 'bg-primary border-primary' : 'bg-[#0a0a0a] border-white/10')}>
                                                            </div>
                                                            {isCurrent && (
                                                                <div className='absolute inset-0 rotate-45 border border-primary/30 animate-ping'></div>
                                                            )}
                                                            {isActive && (
                                                                <div className='absolute inset-0 bg-primary/20 blur-sm rounded-full scale-50'></div>
                                                            )}
                                                        </div>

                                                        {/* Metadata Label below - Absolute positioning to prevent flex stretching labels */}
                                                        <div className='absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center'>
                                                            <p className={'text-[9px] xs:text-[7px] uppercase tracking-widest xs:tracking-[0.3em] whitespace-nowrap transition-colors duration-700 ' + 
                                                                (isActive ? 'text-white' : 'text-white/20')}>
                                                                {step.label}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Registry Metadata Grid */}
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/5 pt-6 mt-0'>
                                    <div className='space-y-1'>
                                        <p className='text-[8px] uppercase tracking-[0.3em] text-white/20 font-bold'>Status</p>
                                        <p className='text-[10px] font-light text-white italic truncate'>{currentStatusLabel || 'In Transit'}</p>
                                    </div>
                                    <div className='space-y-1 text-center sm:text-center'>
                                        <p className='text-[8px] uppercase tracking-[0.3em] text-white/20 font-bold'>Arrival</p>
                                        <p className='text-[10px] font-light text-white truncate'>{trackingData.eta || trackingData.mockTracking?.eta || '4-5 Days'}</p>
                                    </div>
                                    <div className='space-y-1 text-left sm:text-right col-span-2 sm:col-span-1 border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0'>
                                        <p className='text-[8px] uppercase tracking-[0.3em] text-white/20 font-bold'>Terminal</p>
                                        <p className='text-[10px] font-light text-white truncate'>{trackingData.location || trackingData.mockTracking?.location || 'Origin Hub'}</p>
                                    </div>
                                </div>

                                {/* Acquisition Registry List */}
                                <div className='pt-2'>
                                    <div className='flex justify-between items-baseline mb-6'>
                                        <h3 className='text-[9px] uppercase tracking-[0.4em] text-white/20'>Registry</h3>
                                        <span className='w-8 h-px bg-white/5'></span>
                                        <p className='text-[8px] font-mono text-white/10'>{(trackingData.items?.length || 0)} UNIT(S)</p>
                                    </div>
                                    
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-40 overflow-y-auto pr-3 custom-scrollbar'>
                                        {(trackingData.items || []).map((item, idx) => (
                                            <div key={idx} className='flex items-center gap-3 group border border-white/5 p-2 rounded-sm bg-white/5'>
                                                <div className='w-10 h-10 bg-zinc-900 border border-white/5 rounded-sm overflow-hidden shrink-0'>
                                                    <img src={item.image || '/facebook.avif'} alt='' className='w-full h-full object-cover group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700' />
                                                </div>
                                                <p className='text-[8px] font-light text-white transition-colors uppercase tracking-widest truncate'>{item.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Extension: Transmission Intelligence */}
                        {showExtendedDetails && (
                            <div className='lg:w-2/5 p-8 bg-[#0c0c0c] animate-in fade-in slide-in-from-right-10 duration-700 border-l border-white/5'>
                                <h3 className='text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold mb-8'>Logistics Log</h3>
                                
                                <div className='space-y-10'>
                                    <div className='space-y-4 relative'>
                                        <div className='space-y-1'>
                                            <p className='text-[8px] uppercase tracking-[0.4em] text-white/10'>Last Transmission</p>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-[11px] font-light text-white tracking-wide uppercase'>{trackingData.status || 'Transit Confirmed'}</p>
                                                <span className='w-1 h-1 bg-primary rounded-full'></span>
                                                <p className='text-[9px] text-primary/60 font-mono italic'>{trackingData.location || 'ZRH Terminal'}</p>
                                            </div>
                                        </div>
                                        <div className='space-y-1 pt-4 border-t border-white/5'>
                                            <p className='text-[8px] uppercase tracking-[0.4em] text-white/10'>Chronograph</p>
                                            <p className='text-[10px] font-light text-white/60 tracking-widest'>Updated {trackingData.lastUpdated ? new Date(trackingData.lastUpdated).toLocaleTimeString() : '14:22 GMT'}</p>
                                        </div>
                                    </div>

                                    <div className='space-y-8 pt-2 h-50 overflow-y-auto pr-2 custom-scrollbar'>
                                        {(trackingData.history || [
                                            { status: 'Customs Clearance', location: 'Paris Sort Facility', time: '09:05 GMT' },
                                            { status: 'Origination Received', location: 'London Gateway', time: 'Yesterday' },
                                            { status: 'Manifest Created', location: 'SAGA Treasury', time: '2 Days Ago' }
                                        ]).map((log, i) => (
                                            <div key={i} className='flex flex-col gap-1 group'>
                                                <div className='flex justify-between items-baseline'>
                                                    <p className='text-[9px] text-white/40 group-hover:text-white transition-colors uppercase tracking-widest font-light'>{log.status}</p>
                                                    <p className='text-[7px] font-mono text-white/10 uppercase'>{log.time}</p>
                                                </div>
                                                <p className='text-[8px] text-white/10 group-hover:text-primary transition-colors italic tracking-widest'>{log.location}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Registry Controls Footer */}
                    <div className='p-6 bg-[#0a0a0a] border-t border-white/5 shrink-0'>
                        <button 
                            onClick={() => setShowExtendedDetails(!showExtendedDetails)}
                            className={'w-full py-3.5 border text-[8px] uppercase tracking-[0.4em] font-bold transition-all duration-500 rounded-sm ' + 
                                (showExtendedDetails ? 'border-white text-white hover:text-primary hover:border-primary ' : 'border-white/5 text-white/20 hover:text-white hover:border-white bg-white/5')}
                        >
                            {showExtendedDetails ? 'Acquisition Log' : 'Detailed Transmission'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackingDisplay;