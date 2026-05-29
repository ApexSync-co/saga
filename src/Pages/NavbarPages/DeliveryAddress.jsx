import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { 
    fetchUserAddresses, 
    saveAddress, 
    updateAddress, 
    removeAddress,
    validateAddressForDTDC,
    setDefaultAddress
} from '../../services/addressService';
import CustomModal from '../../Components/CustomModal';

const DeliveryAddress = () => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const [formErrors, setFormErrors] = useState([]);
    const [newAddress, setNewAddress] = useState({
        type: 'Home',
        name: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false
    });

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'confirm',
        confirmText: 'OK',
        cancelText: 'Cancel',
        isDanger: false,
        onConfirm: () => {}
    });

    const showConfirm = (title, message, onConfirm, isDanger = false) => {
        setModalConfig({
            isOpen: true,
            title,
            message,
            type: 'confirm',
            confirmText: 'Yes, Delete',
            cancelText: 'Cancel',
            isDanger,
            onConfirm: () => {
                onConfirm();
                setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const showAlert = (title, message) => {
        setModalConfig({
            isOpen: true,
            title,
            message,
            type: 'alert',
            confirmText: 'OK',
            cancelText: '',
            isDanger: false,
            onConfirm: () => {
                setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    useEffect(() => {
        const loadAddresses = async () => {
            if (user) {
                try {
                    const data = await fetchUserAddresses(user.id);
                    setAddresses(data);
                } catch (error) {
                    console.error("Failed to load addresses", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        loadAddresses();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const resetForm = () => {
        setNewAddress({
            type: 'Home',
            name: '',
            addressLine1: '',
            addressLine2: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            isDefault: false
        });
        setIsEditMode(false);
        setEditAddressId(null);
        setFormErrors([]);
    };

    const handleOpenAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (address) => {
        setNewAddress({
            type: address.type || 'Home',
            name: address.name || '',
            addressLine1: address.addressLine1 || '',
            addressLine2: address.addressLine2 || '',
            landmark: address.landmark || '',
            city: address.city || '',
            state: address.state || '',
            pincode: address.pincode || '',
            phone: address.phone || '',
            isDefault: address.isDefault || false
        });
        setIsEditMode(true);
        setEditAddressId(address.id);
        setFormErrors([]);
        setIsModalOpen(true);
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault();
        
        const errors = validateAddressForDTDC(newAddress);
        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            if (isEditMode) {
                await updateAddress(editAddressId, newAddress);
                if (newAddress.isDefault) {
                    await setDefaultAddress(user.id, editAddressId);
                }
                const updatedData = await fetchUserAddresses(user.id);
                setAddresses(updatedData);
            } else {
                const saved = await saveAddress(user.id, newAddress);
                if (newAddress.isDefault) {
                    await setDefaultAddress(user.id, saved.id);
                }
                const updatedData = await fetchUserAddresses(user.id);
                setAddresses(updatedData);
            }
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            showAlert("Save Error", "Failed to save address. Please try again.");
            console.error(error);
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await setDefaultAddress(user.id, id);
            const data = await fetchUserAddresses(user.id);
            setAddresses(data);
        } catch {
            showAlert("Error", "Failed to set default address.");
        }
    };

    const handleDeleteAddress = (id) => {
        showConfirm(
            "Delete Address",
            "Are you sure you want to delete this address? This action cannot be undone.",
            async () => {
                try {
                    await removeAddress(id);
                    setAddresses(addresses.filter(addr => addr.id !== id));
                } catch {
                    showAlert("Error", "Failed to delete address.");
                }
            },
            true
        );
    };

    if (loading) {
        return <div className="pt-32 min-h-screen text-center text-white">Loading addresses...</div>;
    }

    if (!user) {
        return <div className="pt-32 min-h-screen text-center text-white">Please sign in to manage addresses.</div>;
    }

    return (
        <div className="pt-32 min-h-screen text-white px-4 md:px-10 pb-20">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/50 pb-6 mb-12">
                    <h1 className="text-4xl font-Great_Vibes mb-4 md:mb-0">My Addresses</h1>
                    <button 
                        onClick={handleOpenAddModal}
                        className="bg-white text-black border border-white px-6 py-2.5 text-sm uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors duration-300"
                    >
                        + Add New Address
                    </button>
                </div>

                {addresses.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800 rounded-sm">
                        <p className="text-zinc-400 mb-6 text-lg">You don't have any saved delivery addresses.</p>
                        <button 
                            onClick={handleOpenAddModal}
                            className="text-white border-b border-white pb-1 hover:text-zinc-300 transition-colors uppercase tracking-widest text-sm"
                        >
                            Create One Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="bg-black p-8 rounded-sm border border-zinc-800 hover:border-zinc-600 transition-colors flex flex-col h-full">
                                <div className="mb-6 flex-grow">
                                    <div className="mb-4 inline-block px-3 py-1 bg-zinc-800 text-xs font-medium tracking-widest uppercase text-zinc-300">
                                        {addr.type}
                                    </div>
                                    <h3 className="font-semibold text-xl mb-2 text-white flex justify-between items-center">
                                        {addr.name}
                                        {addr.isDefault && (
                                            <span className="text-[10px] bg-white text-black px-2 py-0.5 tracking-tighter uppercase font-bold">Default</span>
                                        )}
                                    </h3>
                                    <div className="text-zinc-400 space-y-1 text-sm leading-relaxed">
                                        <p>{addr.addressLine1}</p>
                                        {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                        {addr.landmark && <p className="italic text-xs text-zinc-500">Landmark: {addr.landmark}</p>}
                                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p className="pt-2 text-white font-medium">Ph: {addr.phone}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-zinc-800">
                                    <button 
                                        onClick={() => handleOpenEditModal(addr)}
                                        className="py-2 text-sm text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider"
                                    >
                                        Edit
                                    </button>
                                    {!addr.isDefault ? (
                                        <button 
                                            onClick={() => handleSetDefault(addr.id)}
                                            className="py-2 text-sm text-zinc-400 border border-zinc-800 hover:border-zinc-400 hover:text-white transition-all duration-300 uppercase tracking-wider"
                                        >
                                            Set Default
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleDeleteAddress(addr.id)}
                                            className="py-2 text-sm text-zinc-500 border border-transparent hover:text-red-400 transition-all duration-300 uppercase tracking-wider"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                {!addr.isDefault && (
                                    <button 
                                        onClick={() => handleDeleteAddress(addr.id)}
                                        className="w-full mt-3 py-1.5 text-[10px] text-zinc-600 hover:text-red-500 uppercase tracking-widest transition-colors"
                                    >
                                        Delete Address
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
                        <div className="bg-black border border-zinc-800 rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex justify-between items-center z-10">
                                <h2 className="text-3xl font-Great_Vibes">{isEditMode ? 'Edit Address' : 'New Address'}</h2>
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="text-zinc-500 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="p-6">
                                {formErrors.length > 0 && (
                                    <div className="mb-6 p-4 bg-red-950/20 border border-red-900 rounded-sm">
                                        <div className="flex items-center mb-2 text-red-500">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span className="text-xs font-bold uppercase tracking-wider">Please fix the following:</span>
                                        </div>
                                        <ul className="text-xs text-red-400 list-disc list-inside space-y-1">
                                            {formErrors.map((err, i) => <li key={i}>{err}</li>)}
                                        </ul>
                                    </div>
                                )}
                                <form onSubmit={handleSaveAddress} className="space-y-5">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Type</label>
                                            <div className="relative">
                                                <select 
                                                    name="type" 
                                                    value={newAddress.type} 
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none appearance-none transition-colors text-sm"
                                                >
                                                    <option value="Home">Home</option>
                                                    <option value="Work">Work</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-end pb-3">
                                            <label className="flex items-center cursor-pointer group">
                                                <div className="relative">
                                                    <input 
                                                        type="checkbox" 
                                                        name="isDefault" 
                                                        checked={newAddress.isDefault}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-5 h-5 border transition-colors ${newAddress.isDefault ? 'bg-white border-white' : 'bg-transparent border-zinc-700'}`}>
                                                        {newAddress.isDefault && <svg className="w-4 h-4 text-black mx-auto mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                                    </div>
                                                </div>
                                                <span className="ml-3 text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Set as Default</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Full Name <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={newAddress.name} 
                                            onChange={handleInputChange} 
                                            placeholder="e.g. Rahul Sharma"
                                            className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Address Line 1 <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            name="addressLine1" 
                                            value={newAddress.addressLine1} 
                                            onChange={handleInputChange} 
                                            placeholder="House No, Building, Street"
                                            className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Address Line 2</label>
                                        <input 
                                            type="text" 
                                            name="addressLine2" 
                                            value={newAddress.addressLine2} 
                                            onChange={handleInputChange} 
                                            placeholder="Area, Colony, Sector"
                                            className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Landmark (Optional)</label>
                                        <input 
                                            type="text" 
                                            name="landmark" 
                                            value={newAddress.landmark} 
                                            onChange={handleInputChange} 
                                            placeholder="Near Apollo Hospital"
                                            className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">City <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                name="city" 
                                                value={newAddress.city} 
                                                onChange={handleInputChange} 
                                                className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">State <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                name="state" 
                                                value={newAddress.state} 
                                                onChange={handleInputChange} 
                                                className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Pincode (6-digit) <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                name="pincode" 
                                                value={newAddress.pincode} 
                                                onChange={handleInputChange} 
                                                maxLength="6"
                                                className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">Phone <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                name="phone" 
                                                value={newAddress.phone} 
                                                onChange={handleInputChange} 
                                                maxLength="10"
                                                placeholder="10-digit mobile number"
                                                className="w-full p-3 bg-black border border-zinc-800 text-white focus:border-white outline-none transition-colors text-sm"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full bg-white text-black font-semibold py-4 uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors duration-300 mt-8 shadow-2xl"
                                    >
                                        {isEditMode ? 'Update Address' : 'Save Delivery Address'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CustomModal 
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                confirmText={modalConfig.confirmText}
                cancelText={modalConfig.cancelText}
                isDanger={modalConfig.isDanger}
            />
        </div>
    );
};

export default DeliveryAddress;
