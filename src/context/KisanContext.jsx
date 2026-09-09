import React, { createContext, useContext, useState, useEffect } from 'react';
import { CENTRES_DATA, CROPS_DATA, INITIAL_SLOTS_DATA, INITIAL_QUEUE_DATA } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

const KisanContext = createContext();

export function KisanProvider({ children }) {
  // Localization
  const [language, setLanguage] = useState(() => localStorage.getItem('agrinex_lang') || 'en');
  
  // Role & UI presentation
  const [userRole, setUserRole] = useState(() => localStorage.getItem('agrinex_role') || null);
  const [isDeviceFrame, setIsDeviceFrame] = useState(false);

  // Farmer Profile
  const [farmerProfile, setFarmerProfile] = useState({
    name: 'Ramesh Patil',
    mobile: '+91 98765 43210',
    farmerId: 'MH-CS-2026-F1023',
    state: 'Maharashtra',
    district: 'Chhatrapati Sambhajinagar',
    village: 'Paithan',
    primaryCrop: 'Wheat',
    bankName: 'State Bank of India',
    accountLast4: '4912',
    ifsc: 'SBIN0001234'
  });

  // Active Booking
  const [currentBooking, setCurrentBooking] = useState({
    token: 'A127',
    centreId: 'centre-paithan',
    centreName: 'Paithan Procurement Centre',
    district: 'Chhatrapati Sambhajinagar',
    date: '10 September 2026',
    timeSlot: '10:00 AM – 11:00 AM',
    crop: 'Wheat',
    quantity: '420 kg',
    amount: '₹25,000',
    status: 'Confirmed',
    bookedAt: '08 Sep 2026, 10:20 AM'
  });

  // Slots Data
  const [slotsList, setSlotsList] = useState(INITIAL_SLOTS_DATA);

  // Live Queue Data
  const [queueList, setQueueList] = useState(INITIAL_QUEUE_DATA);

  // Payment State for Ramesh Patil (A127)
  const [paymentState, setPaymentState] = useState({
    amount: '₹25,000',
    status: 'PROCESSING', // 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    paymentId: 'PAY12345',
    txnRef: 'TXN98765',
    expectedDate: 'Within 2–3 working days',
    disbursedAt: null,
    bankDetails: 'State Bank of India (A/C **** 4912)',
    cropDetails: '420 kg Wheat @ MSP ₹2,275/qtl + ₹125 Quality Bonus'
  });

  // Notifications Log
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'queue',
      title: 'Your turn is approaching',
      message: 'You currently have 6 farmers ahead of you in Paithan Centre.',
      timestamp: '10:15 AM',
      read: false,
      icon: 'Clock'
    },
    {
      id: 'notif-2',
      type: 'procurement',
      title: 'Slot booked successfully',
      message: 'Token A127 allocated for 10 Sep 2026, 10:00 AM – 11:00 AM.',
      timestamp: '08 Sep, 10:20 AM',
      read: true,
      icon: 'CheckCircle'
    },
    {
      id: 'notif-3',
      type: 'payment',
      title: 'Payment Record Created',
      message: 'Payment ID PAY12345 generated for 420 kg Wheat procurement.',
      timestamp: 'Yesterday',
      read: true,
      icon: 'IndianRupee'
    }
  ]);

  // Active SMS Simulator Banner
  const [activeSMS, setActiveSMS] = useState(null);

  // Sync language to local storage
  useEffect(() => {
    localStorage.setItem('agrinex_lang', language);
  }, [language]);

  // Translation helper
  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  // Derived Queue Metrics
  const myQueueItem = queueList.find(q => q.token === currentBooking.token) || {
    token: currentBooking.token,
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Processing'
  };

  const completedCount = queueList.filter(q => q.status === 'Completed').length;
  const processingItem = queueList.find(q => q.status === 'Processing');
  const servingToken = processingItem ? processingItem.token : (completedCount > 0 ? `A12${completedCount}` : 'A121');

  // Calculate my position among remaining non-completed items
  const activeWaitingList = queueList.filter(q => q.status !== 'Completed');
  const myIndexInActive = activeWaitingList.findIndex(q => q.token === currentBooking.token);
  const myPosition = myIndexInActive !== -1 ? myIndexInActive + 1 : (myQueueItem.status === 'Completed' ? 0 : 1);
  const farmersAhead = Math.max(0, myPosition - 1);
  const estimatedWaitMinutes = farmersAhead * 6;

  // Determine Procurement Status Phase
  let procurementPhase = 'WAITING';
  if (myQueueItem.status === 'Completed' || myQueueItem.procurementStatus === 'Completed') {
    procurementPhase = 'PROCUREMENT_COMPLETED';
  } else if (myQueueItem.status === 'Processing' || myQueueItem.procurementStatus === 'Processing') {
    procurementPhase = 'PROCUREMENT_IN_PROGRESS';
  } else if (myPosition === 1) {
    procurementPhase = 'YOUR_TURN';
  } else {
    procurementPhase = 'WAITING';
  }

  // Trigger SMS Simulation
  const triggerSimulatedSMS = (title, message) => {
    setActiveSMS({ id: Date.now(), title, message });
    setTimeout(() => {
      setActiveSMS(null);
    }, 6000);
  };

  // Add Notification
  const addNotification = (type, title, message, icon = 'Bell') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      icon
    };
    setNotifications(prev => [newNotif, ...prev]);
    triggerSimulatedSMS(title, message);
  };

  // Slot Booking Action
  const bookSlot = (centre, date, timeSlot, crop, quantity) => {
    const newToken = `A${Math.floor(130 + Math.random() * 20)}`;
    const newAmount = `₹${(parseInt(quantity || 400) * 59.5).toLocaleString('en-IN')}`;

    const newBooking = {
      token: newToken,
      centreId: centre.id,
      centreName: centre.name,
      district: centre.district,
      date: date || '10 September 2026',
      timeSlot: timeSlot || '10:00 AM – 11:00 AM',
      crop: crop || 'Wheat',
      quantity: `${quantity || 420} kg`,
      amount: newAmount,
      status: 'Confirmed',
      bookedAt: 'Just now'
    };

    setCurrentBooking(newBooking);

    // Add into live queue
    const newQueueEntry = {
      token: newToken,
      farmerId: farmerProfile.farmerId,
      farmerName: farmerProfile.name,
      mobile: farmerProfile.mobile,
      village: farmerProfile.village,
      crop: crop || 'Wheat',
      quantity: `${quantity || 420} kg`,
      amount: newAmount,
      status: 'Waiting',
      procurementStatus: 'Waiting',
      paymentStatus: 'Pending',
      timeSlot: timeSlot || '10:00 AM – 11:00 AM',
      weighedAt: '-',
      moisturePercent: '-',
      qualityGrade: '-',
      txnRef: `PAY${Math.floor(10000 + Math.random() * 90000)}`
    };

    setQueueList(prev => [...prev, newQueueEntry]);

    // Update slot counts
    setSlotsList(prev => prev.map(s => {
      if (s.time === timeSlot && s.available > 0) {
        return { ...s, booked: s.booked + 1, available: s.available - 1, status: s.available - 1 === 0 ? 'FULL' : 'OPEN' };
      }
      return s;
    }));

    addNotification(
      'procurement',
      'Slot Booked Successfully',
      `Token ${newToken} issued for ${centre.name} on ${date}, ${timeSlot}.`,
      'CheckCircle'
    );

    return newToken;
  };

  // Authority Updates Queue Status
  const updateQueueStatus = (token, newStatus) => {
    setQueueList(prev => prev.map(item => {
      if (item.token === token) {
        return {
          ...item,
          status: newStatus,
          procurementStatus: newStatus === 'Completed' ? 'Completed' : (newStatus === 'Processing' ? 'Processing' : 'Waiting'),
          weighedAt: newStatus === 'Completed' ? '10:45 AM' : (newStatus === 'Processing' ? 'In Weighbridge #1' : item.weighedAt),
          moisturePercent: newStatus === 'Completed' ? '11.8%' : item.moisturePercent,
          qualityGrade: newStatus === 'Completed' ? 'Grade A+' : item.qualityGrade
        };
      }
      return item;
    }));

    if (token === currentBooking.token) {
      if (newStatus === 'Processing') {
        addNotification(
          'queue',
          'Your Procurement has Started!',
          'Please bring your vehicle to Weighbridge #1 at Paithan Centre.',
          'Truck'
        );
      } else if (newStatus === 'Completed') {
        addNotification(
          'procurement',
          'Procurement Completed!',
          'Your procurement of 420 kg Wheat is successfully verified & stored.',
          'CheckCircle'
        );
      }
    }
  };

  // Advance Queue by One (Auto Process Next in line)
  const advanceQueueNext = () => {
    let hasUpdated = false;
    setQueueList(prev => {
      let currentProcessingIndex = prev.findIndex(item => item.status === 'Processing');
      
      if (currentProcessingIndex !== -1) {
        // Complete current processing item
        const updated = [...prev];
        updated[currentProcessingIndex] = {
          ...updated[currentProcessingIndex],
          status: 'Completed',
          procurementStatus: 'Completed',
          weighedAt: 'Just now',
          moisturePercent: '11.6%',
          qualityGrade: 'Grade A'
        };

        // Move next waiting item to processing
        const nextWaitingIndex = updated.findIndex((item, idx) => idx > currentProcessingIndex && item.status === 'Waiting');
        if (nextWaitingIndex !== -1) {
          updated[nextWaitingIndex] = {
            ...updated[nextWaitingIndex],
            status: 'Processing',
            procurementStatus: 'Processing',
            weighedAt: 'In Weighbridge #1'
          };
          if (updated[nextWaitingIndex].token === currentBooking.token) {
            addNotification('queue', 'Your Turn Has Arrived!', 'Token A127 is now at Weighbridge #1.', 'Truck');
          }
        }
        hasUpdated = true;
        return updated;
      } else {
        // Start first waiting item
        const firstWaitingIndex = prev.findIndex(item => item.status === 'Waiting');
        if (firstWaitingIndex !== -1) {
          const updated = [...prev];
          updated[firstWaitingIndex] = {
            ...updated[firstWaitingIndex],
            status: 'Processing',
            procurementStatus: 'Processing',
            weighedAt: 'In Weighbridge #1'
          };
          hasUpdated = true;
          return updated;
        }
      }
      return prev;
    });

    if (hasUpdated) {
      addNotification('queue', 'Queue Advanced', 'Next farmer token moved to processing station.', 'Clock');
    }
  };

  // Authority Updates Procurement Details
  const updateProcurement = (token, details) => {
    setQueueList(prev => prev.map(item => {
      if (item.token === token) {
        return {
          ...item,
          quantity: details.quantity ? `${details.quantity} kg` : item.quantity,
          moisturePercent: details.moisturePercent || item.moisturePercent,
          qualityGrade: details.qualityGrade || item.qualityGrade,
          procurementStatus: details.status || item.procurementStatus,
          status: details.status === 'Completed' ? 'Completed' : (details.status === 'Processing' ? 'Processing' : item.status)
        };
      }
      return item;
    }));

    if (token === currentBooking.token) {
      if (details.status === 'Completed') {
        addNotification(
          'procurement',
          'Procurement Weighment Verified',
          `Procurement of ${details.quantity || 420} kg ${currentBooking.crop} completed at Paithan Centre.`,
          'CheckCircle'
        );
      }
    }
  };

  // Authority Updates Payment Details
  const updatePayment = (token, { status, amount, txnRef }) => {
    setQueueList(prev => prev.map(item => {
      if (item.token === token) {
        return {
          ...item,
          paymentStatus: status,
          amount: amount || item.amount,
          txnRef: txnRef || item.txnRef
        };
      }
      return item;
    }));

    if (token === currentBooking.token) {
      setPaymentState(prev => ({
        ...prev,
        status: status.toUpperCase(),
        amount: amount || prev.amount,
        txnRef: txnRef || prev.txnRef,
        disbursedAt: status.toUpperCase() === 'COMPLETED' ? 'Today, 11:42 AM' : prev.disbursedAt
      }));

      if (status.toUpperCase() === 'COMPLETED') {
        addNotification(
          'payment',
          'DBT Payment Completed!',
          `₹${amount || '25,000'} has been credited to your SBI Account (Ref: ${txnRef || 'TXN98765'}).`,
          'IndianRupee'
        );
      } else if (status.toUpperCase() === 'PROCESSING') {
        addNotification(
          'payment',
          'Payment Processing Initiated',
          `Direct Benefit Transfer (DBT) of ₹${amount || '25,000'} initiated by Procurement Authority.`,
          'Clock'
        );
      }
    }
  };

  // Slot Management Operations
  const addSlot = (newSlot) => {
    setSlotsList(prev => [...prev, { ...newSlot, id: `slot-${Date.now()}` }]);
  };

  const updateSlot = (slotId, updates) => {
    setSlotsList(prev => prev.map(s => s.id === slotId ? { ...s, ...updates } : s));
  };

  // Reset Everything to Baseline for Judges
  const resetDemoData = () => {
    setQueueList(INITIAL_QUEUE_DATA);
    setSlotsList(INITIAL_SLOTS_DATA);
    setPaymentState({
      amount: '₹25,000',
      status: 'PROCESSING',
      paymentId: 'PAY12345',
      txnRef: 'TXN98765',
      expectedDate: 'Within 2–3 working days',
      disbursedAt: null,
      bankDetails: 'State Bank of India (A/C **** 4912)',
      cropDetails: '420 kg Wheat @ MSP ₹2,275/qtl + ₹125 Quality Bonus'
    });
    setCurrentBooking({
      token: 'A127',
      centreId: 'centre-paithan',
      centreName: 'Paithan Procurement Centre',
      district: 'Chhatrapati Sambhajinagar',
      date: '10 September 2026',
      timeSlot: '10:00 AM – 11:00 AM',
      crop: 'Wheat',
      quantity: '420 kg',
      amount: '₹25,000',
      status: 'Confirmed',
      bookedAt: '08 Sep 2026, 10:20 AM'
    });
    addNotification('general', 'Demo State Reset', 'Initial baseline queue & booking restored.', 'RefreshCw');
  };

  return (
    <KisanContext.Provider
      value={{
        language,
        setLanguage,
        t,
        userRole,
        setUserRole,
        isDeviceFrame,
        setIsDeviceFrame,
        farmerProfile,
        setFarmerProfile,
        currentBooking,
        setCurrentBooking,
        slotsList,
        queueList,
        myQueueItem,
        servingToken,
        myPosition,
        farmersAhead,
        estimatedWaitMinutes,
        procurementPhase,
        paymentState,
        notifications,
        activeSMS,
        setActiveSMS,
        centres: CENTRES_DATA,
        crops: CROPS_DATA,
        bookSlot,
        updateQueueStatus,
        advanceQueueNext,
        updateProcurement,
        updatePayment,
        addSlot,
        updateSlot,
        resetDemoData,
        triggerSimulatedSMS,
        addNotification
      }}
    >
      {children}
    </KisanContext.Provider>
  );
}

export function useKisan() {
  const context = useContext(KisanContext);
  if (!context) {
    throw new Error('useKisan must be used within a KisanProvider');
  }
  return context;
}
