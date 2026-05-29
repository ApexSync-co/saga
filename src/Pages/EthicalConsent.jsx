import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EthicalConsent = () => {
  // Consent states initialized from localStorage or defaults
  const [consents, setConsents] = useState({
    essential: true, // Always true
    analytics: true,
    personalization: true,
    marketing: false,
  });

  const [activeTab, setActiveTab] = useState('philosophy');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedConsents = localStorage.getItem('saga_ethical_consents');
    if (savedConsents) {
      try {
        const parsed = JSON.parse(savedConsents);
        setConsents({
          essential: true,
          analytics: parsed.analytics !== undefined ? parsed.analytics : true,
          personalization: parsed.personalization !== undefined ? parsed.personalization : true,
          marketing: parsed.marketing !== undefined ? parsed.marketing : false,
        });
      } catch (e) {
        console.error('Error parsing saved consents', e);
      }
    }
  }, []);

  const handleToggle = (key) => {
    if (key === 'essential') return; // Cannot toggle essential cookies
    setConsents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('saga_ethical_consents', JSON.stringify(consents));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // Content for tabs
  const sections = {
    philosophy: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary font-Poppins">Our Ethical Philosophy — Content Checklist</h3>
        <p className="text-white/60 text-xs leading-relaxed italic">
          Please collect the following information from the client to populate this section:
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">1. Brand Vision & Manifesto</h4>
            <p className="text-white/60 text-xs">
              A general statement of the brand's core values, its commitment to alternative jewelry, and what Saga stands for.
            </p>
          </div>
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">2. Craftsmanship Value Proposition</h4>
            <p className="text-white/60 text-xs">
              Why customers should choose Saga's premium alternative collections, rolled gold pieces, and designer replicas.
            </p>
          </div>
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">3. Collaboration with Workshops/Artisans</h4>
            <p className="text-white/60 text-xs">
              Details on how Saga partners with manufacturers, local craftsmen, or direct design workshops to create pieces.
            </p>
          </div>
        </div>
      </div>
    ),
    sourcing: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary font-Poppins">Responsible Sourcing — Content Checklist</h3>
        <p className="text-white/60 text-xs leading-relaxed italic">
          Please collect the following details from the client to populate this section:
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">1. Metal Specifications (Rolled Gold / Plating)</h4>
            <p className="text-white/60 text-xs">
              Purity levels of gold plating (e.g., 18K or 24K plating, micron thickness specifications) and core metal compositions (e.g., sterling silver, brass, or copper base).
            </p>
          </div>
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">2. Simulated Stone & Crystal Composition</h4>
            <p className="text-white/60 text-xs">
              Details about alternative stones utilized (e.g., high-grade Cubic Zirconia, synthetic crystals, laboratory gems, faux pearls).
            </p>
          </div>
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">3. Supply Chain Safety & Skin-friendliness</h4>
            <p className="text-white/60 text-xs">
              Hypoallergenic details, lead-free, nickel-free composition guarantees, and worker safety statements from the sourcing mills.
            </p>
          </div>
        </div>
      </div>
    ),
    sustainability: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary font-Poppins">Environmental Stewardship — Content Checklist</h3>
        <p className="text-white/60 text-xs leading-relaxed italic">
          Please collect the following information from the client to populate this section:
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">1. Eco-friendly Packaging Details</h4>
            <p className="text-white/60 text-xs">
              Details on packaging materials used, such as FSC-certified cardboard boxes, organic linen or cotton pouches, and reusable delivery sleeves.
            </p>
          </div>
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">2. Carbon-offset or Low-impact shipping</h4>
            <p className="text-white/60 text-xs">
              Details regarding low-emission delivery choices, regional local shipping optimization, or carbon offset investments.
            </p>
          </div>
          <div className="p-4 rounded bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
            <h4 className="text-white font-medium mb-1">3. Circularity and Lifetime Guarantee</h4>
            <p className="text-white/60 text-xs">
              Details on repair services, replating options, or material recycling programs the client offers for old jewelry.
            </p>
          </div>
        </div>
      </div>
    ),
    privacy: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary font-Poppins">Data Ethics & Privacy</h3>
        <p className="text-white/80 leading-relaxed text-sm md:text-base">
          Ethical practices extend directly to how we treat your digital presence. We respect your data privacy, collect only what is essential for operation, and never sell your personal information to third parties.
        </p>
        <div className="border border-primary/20 bg-black/60 rounded-xl p-6 md:p-8 space-y-6">
          <h4 className="text-lg font-medium text-white border-b border-white/10 pb-2">Privacy & Consent Preferences</h4>
          <p className="text-xs text-white/50">
            Customize how Saga interacts with your browser. Enable or disable data collection modules according to your comfort level.
          </p>

          <div className="space-y-4">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="pr-4">
                <p className="text-sm font-semibold text-white">Essential & Functional Consent</p>
                <p className="text-xs text-white/40 mt-1">Required to secure logins, preserve your shopping cart, and ensure stable page loading. Cannot be disabled.</p>
              </div>
              <div className="relative">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded border border-primary/30">Always Active</span>
              </div>
            </div>

            {/* Performance & Analytics */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="pr-4">
                <p className="text-sm font-semibold text-white">Performance & Analytics Consent</p>
                <p className="text-xs text-white/40 mt-1">Allows us to analyze site visitor trends, page load speeds, and popular items to continuously optimize your shopping experience.</p>
              </div>
              <button 
                onClick={() => handleToggle('analytics')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${consents.analytics ? 'bg-primary' : 'bg-white/10'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${consents.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Personalization */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="pr-4">
                <p className="text-sm font-semibold text-white">Personalization Consent</p>
                <p className="text-xs text-white/40 mt-1">Remembers your search inputs, wishlist items, and shows personalized product recommendations matching your style history.</p>
              </div>
              <button 
                onClick={() => handleToggle('personalization')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${consents.personalization ? 'bg-primary' : 'bg-white/10'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${consents.personalization ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Marketing & Social */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div className="pr-4">
                <p className="text-sm font-semibold text-white">Marketing & Advertising Consent</p>
                <p className="text-xs text-white/40 mt-1">Allows us to customize newsletter promotions and show Saga features on social networks. Disabling shows general ads only.</p>
              </div>
              <button 
                onClick={() => handleToggle('marketing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${consents.marketing ? 'bg-primary' : 'bg-white/10'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${consents.marketing ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-white/5">
            <button 
              onClick={savePreferences}
              className="bg-primary hover:bg-primary/90 text-black font-bold py-2.5 px-6 rounded transition-all duration-300 text-sm tracking-wider uppercase shadow-[0_0_10px_rgba(251,112,16,0.2)] hover:shadow-[0_0_20px_rgba(251,112,16,0.4)] cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="pt-28 min-h-screen w-full text-white container mx-auto px-4 md:px-10 mb-16 relative">
      {/* Background radial glow */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[200px] h-[200px] rounded-full bg-amber-600/5 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-Poppins tracking-wide">
          Ethical Standards & Consents
        </h1>
        <p className="text-white/60 text-xs md:text-sm mt-3 uppercase tracking-widest">
          Responsible curation. Transparent values. Your trust, respected.
        </p>
        <div className="h-[1px] w-24 bg-primary/40 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/10 gap-2 lg:pr-6 whitespace-nowrap scrollbar-none">
          <button 
            onClick={() => setActiveTab('philosophy')}
            className={`w-full text-left py-3 px-4 rounded transition-all duration-200 cursor-pointer text-xs md:text-sm font-medium ${activeTab === 'philosophy' ? 'bg-primary text-black font-bold' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            Our Philosophy
          </button>
          <button 
            onClick={() => setActiveTab('sourcing')}
            className={`w-full text-left py-3 px-4 rounded transition-all duration-200 cursor-pointer text-xs md:text-sm font-medium ${activeTab === 'sourcing' ? 'bg-primary text-black font-bold' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            Responsible Sourcing
          </button>
          <button 
            onClick={() => setActiveTab('sustainability')}
            className={`w-full text-left py-3 px-4 rounded transition-all duration-200 cursor-pointer text-xs md:text-sm font-medium ${activeTab === 'sustainability' ? 'bg-primary text-black font-bold' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            Sustainability
          </button>
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`w-full text-left py-3 px-4 rounded transition-all duration-200 cursor-pointer text-xs md:text-sm font-medium ${activeTab === 'privacy' ? 'bg-primary text-black font-bold' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            Privacy & Consents
          </button>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 min-h-[350px] bg-black/30 backdrop-blur-md border border-white/5 rounded-xl p-6 md:p-10 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {sections[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Action / Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[200] flex items-center bg-zinc-900 border border-emerald-500/30 text-white py-3.5 px-6 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">✓</div>
            <div className="text-sm font-medium">Consent preferences updated and saved.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EthicalConsent;
