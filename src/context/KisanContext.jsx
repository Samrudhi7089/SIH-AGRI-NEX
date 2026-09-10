import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CENTRES_DATA, 
  CROPS_DATA, 
  INITIAL_SLOTS_DATA, 
  INITIAL_QUEUE_DATA,
  INITIAL_CENTRE_OPERATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_WAITLIST_DATA
} from '../data/mockData';
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

  // Active Booking with Unique Booking ID & System Allocation metadata
  const [currentBooking, setCurrentBooking] = useState({
    bookingId: 'BK-98421',
    token: 'A127',
    centreId: 'centre-paithan',
    centreName: 'Paithan Procurement Centre',
    district: 'Chhatrapati Sambhajinagar',
    date: '10 September 2026',
    timeSlot: '10:00 AM – 11:00 AM',
    crop: 'Wheat',
    quantity: '420 kg',
    amount: '₹25,000',
    status: 'Confirmed', // 'Confirmed' | 'Late / No-show' | 'Rescheduled' | 'Cancelled'
    allocatedAt: '08 Sep 2026, 10:20 AM',
    allocationType: 'Automated Algorithmic Allocation',
    gracePeriodMinutes: 15,
    appointmentTime: '10:00 AM',
    isLate: false,
    rescheduledOffer: null
  });

  // Historical bookings
  const [bookingHistory, setBookingHistory] = useState([]);

  // Slots Data
  const [slotsList, setSlotsList] = useState(INITIAL_SLOTS_DATA);

  // Live Queue Data
  const [queueList, setQueueList] = useState(INITIAL_QUEUE_DATA);

  // Centre Operations Configuration
  const [centreOperations, setCentreOperations] = useState(INITIAL_CENTRE_OPERATIONS);

  // Anti-Manipulation Audit Log
  const [operationalAuditLog, setOperationalAuditLog] = useState(INITIAL_AUDIT_LOGS);

  // Fair FIFO Waitlist
  const [waitlist, setWaitlist] = useState(INITIAL_WAITLIST_DATA);

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
      title: 'Appointment Reminder & Turn Approaching',
      message: 'Your slot is 10:00 AM – 11:00 AM at Paithan Centre. 15-min arrival grace period applies.',
      timestamp: '10:00 AM',
      read: false,
      icon: 'Clock'
    },
    {
      id: 'notif-2',
      type: 'procurement',
      title: 'System Confirmed Slot Allocation',
      message: 'Booking ID BK-98421 confirmed. Token A127 allocated automatically by AGRI-NEX.',
      timestamp: '08 Sep, 10:20 AM',
      read: true,
      icon: 'CheckCircle'
    },
    {
      id: 'notif-3',
      type: 'payment',
      title: 'Payment Record Initialized',
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
    status: currentBooking.status === 'Late / No-show' ? 'Late / No-show' : 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Processing'
  };

  const completedCount = queueList.filter(q => q.status === 'Completed').length;
  const processingItem = queueList.find(q => q.status === 'Processing');
  const servingToken = processingItem ? processingItem.token : (completedCount > 0 ? `A12${completedCount}` : 'A121');

  // Calculate my position among remaining non-completed & non-late items
  const activeWaitingList = queueList.filter(q => q.status !== 'Completed' && q.status !== 'Late / No-show');
  const myIndexInActive = activeWaitingList.findIndex(q => q.token === currentBooking.token);
  const myPosition = myIndexInActive !== -1 
    ? myIndexInActive + 1 
    : (myQueueItem.status === 'Completed' ? 0 : (myQueueItem.status === 'Late / No-show' ? 0 : 1));
  const farmersAhead = Math.max(0, myPosition - 1);
  const estimatedWaitMinutes = farmersAhead * 6;

  // Determine Procurement Status Phase
  let procurementPhase = 'WAITING';
  if (myQueueItem.status === 'Completed' || myQueueItem.procurementStatus === 'Completed') {
    procurementPhase = 'PROCUREMENT_COMPLETED';
  } else if (myQueueItem.status === 'Processing' || myQueueItem.procurementStatus === 'Processing') {
    procurementPhase = 'PROCUREMENT_IN_PROGRESS';
  } else if (myQueueItem.status === 'Late / No-show') {
    procurementPhase = 'LATE_NO_SHOW';
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

  // Append Audit Log
  const logOperationalChange = ({ category, action, previousValue, newValue, reason, officerName = 'Sunil Deshmukh', officerId = 'Officer #402' }) => {
    const newLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      officerName,
      officerId,
      category,
      action,
      previousValue,
      newValue,
      reason: reason || 'Routine operational update as per APMC protocol',
      status: 'System Verified & Immutable'
    };
    setOperationalAuditLog(prev => [newLog, ...prev]);
  };

  // 1. AUTOMATED SLOT BOOKING WITH SERVER-SIDE CAPACITY VALIDATION
  const bookSlot = (centre, date, timeSlot, crop, quantity) => {
    // Check capacity server-side validation
    const targetSlot = slotsList.find(s => s.time === timeSlot);
    if (!targetSlot || targetSlot.available <= 0 || targetSlot.status === 'FULL' || targetSlot.status === 'BREAK') {
      addNotification(
        'error',
        'Capacity Exceeded',
        `Slot ${timeSlot} is already fully booked. Please select another slot or join the fair waitlist.`,
        'AlertCircle'
      );
      return null;
    }

    const uniqueBookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newToken = `A${Math.floor(130 + Math.random() * 20)}`;
    const newAmount = `₹${(parseInt(quantity || 400) * 59.5).toLocaleString('en-IN')}`;
    const timestampStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newBooking = {
      bookingId: uniqueBookingId,
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
      allocatedAt: timestampStr,
      allocationType: 'Automated Algorithmic Allocation',
      gracePeriodMinutes: centreOperations.gracePeriodMinutes || 15,
      appointmentTime: timeSlot ? timeSlot.split('–')[0].trim() : '10:00 AM',
      isLate: false,
      rescheduledOffer: null
    };

    // Save previous active booking to history
    if (currentBooking && currentBooking.token) {
      setBookingHistory(prev => [currentBooking, ...prev]);
    }

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

    // Update slot capacity
    setSlotsList(prev => prev.map(s => {
      if (s.time === timeSlot && s.available > 0) {
        const remaining = s.available - 1;
        return {
          ...s,
          booked: s.booked + 1,
          available: remaining,
          status: remaining === 0 ? 'FULL' : 'OPEN'
        };
      }
      return s;
    }));

    addNotification(
      'procurement',
      'Slot Automatically Allocated & Confirmed',
      `Booking ID ${uniqueBookingId} created with Token ${newToken} for ${centre.name}. No manual authority approval required.`,
      'CheckCircle'
    );

    return { token: newToken, bookingId: uniqueBookingId };
  };

  // 2. FAIR FIFO WAITLIST SYSTEM
  const joinWaitlist = (centre, date, timeSlot, crop, quantity) => {
    const newWaitlistEntry = {
      waitlistId: `WL-${Math.floor(100 + Math.random() * 900)}`,
      farmerId: farmerProfile.farmerId,
      farmerName: farmerProfile.name,
      mobile: farmerProfile.mobile,
      village: farmerProfile.village,
      crop: crop || 'Wheat',
      quantity: `${quantity || 420} kg`,
      requestedDate: date || '10 September 2026',
      requestedSlot: timeSlot,
      joinedAt: 'Just now',
      priority: waitlist.length + 1,
      status: 'WAITING'
    };

    setWaitlist(prev => [...prev, newWaitlistEntry]);

    addNotification(
      'queue',
      'Added to Fair FIFO Waitlist',
      `You are position #${waitlist.length + 1} on the waitlist for ${timeSlot}. AGRI-NEX will automatically allocate any freed slot by fair rule.`,
      'Clock'
    );
  };

  // 3. PROMOTE NEXT FARMER FROM WAITLIST AUTOMATICALLY
  const promoteFromWaitlist = (slotTime) => {
    if (waitlist.length === 0) return;

    const candidateIndex = waitlist.findIndex(w => w.status === 'WAITING' && (!slotTime || w.requestedSlot === slotTime));
    const targetCandidate = candidateIndex !== -1 ? waitlist[candidateIndex] : waitlist[0];

    if (!targetCandidate) return;

    // Issue Token & Book
    const newToken = `A${Math.floor(135 + Math.random() * 20)}`;
    const newQueueEntry = {
      token: newToken,
      farmerId: targetCandidate.farmerId,
      farmerName: targetCandidate.farmerName,
      mobile: targetCandidate.mobile,
      village: targetCandidate.village,
      crop: targetCandidate.crop,
      quantity: targetCandidate.quantity,
      amount: `₹${(parseInt(targetCandidate.quantity || 400) * 59.5).toLocaleString('en-IN')}`,
      status: 'Waiting',
      procurementStatus: 'Waiting',
      paymentStatus: 'Pending',
      timeSlot: slotTime || targetCandidate.requestedSlot || '11:00 AM – 12:00 PM',
      weighedAt: '-',
      moisturePercent: '-',
      qualityGrade: '-',
      txnRef: `PAY${Math.floor(10000 + Math.random() * 90000)}`
    };

    setQueueList(prev => [...prev, newQueueEntry]);

    // Update waitlist entry
    setWaitlist(prev => prev.filter(w => w.waitlistId !== targetCandidate.waitlistId));

    addNotification(
      'procurement',
      'Waitlist Auto-Promoted',
      `Waitlisted farmer ${targetCandidate.farmerName} automatically allocated slot ${slotTime || targetCandidate.requestedSlot} (Token ${newToken}) by fair algorithmic rule.`,
      'Sparkles'
    );
  };

  // 4. SMART NO-SHOW / LATE ARRIVAL GRACE PERIOD HANDLER
  const handleNoShow = (token = currentBooking.token) => {
    // 1. Mark token as Late / No-show in queueList
    setQueueList(prev => prev.map(item => {
      if (item.token === token) {
        return {
          ...item,
          status: 'Late / No-show',
          procurementStatus: 'Late / No-show',
          weighedAt: 'Grace Period Expired'
        };
      }
      return item;
    }));

    // 2. Find next available open slot to offer automatically
    const availableSlot = slotsList.find(s => s.available > 0 && s.status === 'OPEN' && s.time !== currentBooking.timeSlot) || {
      time: '11:00 AM – 12:00 PM',
      date: '10 September 2026'
    };

    const offeredSlotToken = `A${Math.floor(140 + Math.random() * 20)}`;

    // 3. Update currentBooking state
    if (token === currentBooking.token) {
      setCurrentBooking(prev => ({
        ...prev,
        status: 'Late / No-show',
        isLate: true,
        rescheduledOffer: {
          newDate: '10 September 2026',
          newTimeSlot: availableSlot.time,
          newToken: offeredSlotToken,
          offeredAt: 'Just now'
        }
      }));
    }

    // 4. Add to history
    setBookingHistory(prev => [
      {
        ...currentBooking,
        status: 'Late / No-show',
        markedAt: new Date().toLocaleTimeString()
      },
      ...prev
    ]);

    // 5. Notify farmer and release queue
    addNotification(
      'queue',
      'Appointment Grace Period Expired (Late / No-show)',
      `Arrival grace period (15 min) expired for Token ${token}. Queue position temporarily released. System has automatically reserved next available slot: ${availableSlot.time}.`,
      'AlertCircle'
    );
  };

  // 5. ACCEPT RESCHEDULED SLOT
  const acceptRescheduledSlot = () => {
    if (!currentBooking.rescheduledOffer) return;

    const offer = currentBooking.rescheduledOffer;
    const newBookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;

    const updatedBooking = {
      ...currentBooking,
      bookingId: newBookingId,
      token: offer.newToken,
      timeSlot: offer.newTimeSlot,
      date: offer.newDate,
      status: 'Confirmed',
      isLate: false,
      rescheduledOffer: null,
      allocatedAt: 'Just now (Rescheduled)'
    };

    setCurrentBooking(updatedBooking);

    // Add new token into live queue
    const newQueueEntry = {
      token: offer.newToken,
      farmerId: farmerProfile.farmerId,
      farmerName: farmerProfile.name,
      mobile: farmerProfile.mobile,
      village: farmerProfile.village,
      crop: currentBooking.crop,
      quantity: currentBooking.quantity,
      amount: currentBooking.amount,
      status: 'Waiting',
      procurementStatus: 'Waiting',
      paymentStatus: 'Pending',
      timeSlot: offer.newTimeSlot,
      weighedAt: '-',
      moisturePercent: '-',
      qualityGrade: '-',
      txnRef: `PAY${Math.floor(10000 + Math.random() * 90000)}`
    };

    setQueueList(prev => [...prev.filter(q => q.token !== currentBooking.token), newQueueEntry]);

    addNotification(
      'procurement',
      'Rescheduled Slot Confirmed',
      `Token ${offer.newToken} confirmed for ${offer.newTimeSlot}. You are now in the live queue for your new slot.`,
      'CheckCircle'
    );
  };

  // 6. CANCEL ACTIVE BOOKING (FREES CAPACITY & PROMOTES WAITLIST)
  const cancelBooking = (token = currentBooking.token) => {
    // Free slot capacity
    setSlotsList(prev => prev.map(s => {
      if (s.time === currentBooking.timeSlot) {
        return {
          ...s,
          booked: Math.max(0, s.booked - 1),
          available: s.available + 1,
          status: 'OPEN'
        };
      }
      return s;
    }));

    // Remove from queue
    setQueueList(prev => prev.filter(q => q.token !== token));

    // Update booking status
    setCurrentBooking(prev => ({
      ...prev,
      status: 'Cancelled'
    }));

    addNotification(
      'procurement',
      'Booking Cancelled',
      `Token ${token} has been cancelled and capacity returned to the pool.`,
      'AlertCircle'
    );

    // Auto-promote waitlist
    setTimeout(() => {
      promoteFromWaitlist(currentBooking.timeSlot);
    }, 1000);
  };

  // 7. AUTHORITY OPERATIONAL CAPACITY & SETTINGS MANAGEMENT (WITH AUDIT LOGGING)
  const updateCentreOperations = ({ 
    operatingHours, 
    defaultHourlyCapacity, 
    activeWeighbridges, 
    gracePeriodMinutes, 
    isTemporarilyClosed, 
    closureReason,
    holidays 
  }, reason, officerName = 'Sunil Deshmukh', officerId = 'Officer #402') => {
    const prevOps = { ...centreOperations };

    const newOps = {
      ...centreOperations,
      operatingHours: operatingHours !== undefined ? operatingHours : centreOperations.operatingHours,
      defaultHourlyCapacity: defaultHourlyCapacity !== undefined ? parseInt(defaultHourlyCapacity) : centreOperations.defaultHourlyCapacity,
      activeWeighbridges: activeWeighbridges !== undefined ? parseInt(activeWeighbridges) : centreOperations.activeWeighbridges,
      gracePeriodMinutes: gracePeriodMinutes !== undefined ? parseInt(gracePeriodMinutes) : centreOperations.gracePeriodMinutes,
      isTemporarilyClosed: isTemporarilyClosed !== undefined ? isTemporarilyClosed : centreOperations.isTemporarilyClosed,
      closureReason: closureReason !== undefined ? closureReason : centreOperations.closureReason,
      holidays: holidays !== undefined ? holidays : centreOperations.holidays
    };

    setCentreOperations(newOps);

    // Log the operational changes
    if (operatingHours && operatingHours !== prevOps.operatingHours) {
      logOperationalChange({
        category: 'Operating Hours',
        action: `Updated centre operating hours to ${operatingHours}`,
        previousValue: prevOps.operatingHours,
        newValue: operatingHours,
        reason,
        officerName,
        officerId
      });
    }

    if (defaultHourlyCapacity !== undefined && defaultHourlyCapacity !== prevOps.defaultHourlyCapacity) {
      logOperationalChange({
        category: 'Capacity Adjustment',
        action: `Updated default slot intake quota to ${defaultHourlyCapacity} farmers/hr`,
        previousValue: `${prevOps.defaultHourlyCapacity} farmers/hr`,
        newValue: `${defaultHourlyCapacity} farmers/hr`,
        reason,
        officerName,
        officerId
      });

      // Update all slot capacities
      setSlotsList(prev => prev.map(s => {
        if (s.status === 'BREAK') return s;
        const newCap = parseInt(defaultHourlyCapacity);
        const avail = Math.max(0, newCap - s.booked);
        return {
          ...s,
          capacity: newCap,
          available: avail,
          status: avail === 0 ? 'FULL' : 'OPEN'
        };
      }));
    }

    if (isTemporarilyClosed !== undefined && isTemporarilyClosed !== prevOps.isTemporarilyClosed) {
      logOperationalChange({
        category: 'Temporary Closure',
        action: isTemporarilyClosed ? `Initiated temporary centre intake closure` : `Resumed centre intake operations`,
        previousValue: prevOps.isTemporarilyClosed ? 'Closed' : 'Operational',
        newValue: isTemporarilyClosed ? `Closed (${closureReason || reason})` : 'Operational',
        reason: reason || closureReason,
        officerName,
        officerId
      });
    }

    addNotification(
      'general',
      'Operational Settings Updated',
      `Centre capacity and parameters saved. Reason logged in Anti-Manipulation Audit Trail.`,
      'ShieldCheck'
    );
  };

  // Authority Updates Specific Slot Capacity with Required Reason
  const updateSlotCapacity = (slotId, newCapacity, newStatus, reason, officerName = 'Sunil Deshmukh', officerId = 'Officer #402') => {
    const slot = slotsList.find(s => s.id === slotId);
    if (!slot) return;

    const prevCap = slot.capacity;
    const prevStatus = slot.status;
    const capNum = parseInt(newCapacity);
    const availNum = Math.max(0, capNum - slot.booked);
    const statVal = availNum === 0 ? 'FULL' : (newStatus || 'OPEN');

    setSlotsList(prev => prev.map(s => {
      if (s.id === slotId) {
        return {
          ...s,
          capacity: capNum,
          available: availNum,
          status: statVal
        };
      }
      return s;
    }));

    logOperationalChange({
      category: 'Slot Quota Modification',
      action: `Adjusted slot ${slot.time} capacity to ${capNum} (${statVal})`,
      previousValue: `Capacity: ${prevCap} (${prevStatus})`,
      newValue: `Capacity: ${capNum} (${statVal})`,
      reason: reason || 'Scheduled operational calibration/capacity adjustment',
      officerName,
      officerId
    });

    // If capacity increased, check waitlist promotion
    if (availNum > 0) {
      promoteFromWaitlist(slot.time);
    }
  };

  // Authority Declares Holiday with Reason
  const declareHoliday = (date, occasion, reason, officerName = 'Sunil Deshmukh', officerId = 'Officer #402') => {
    const newHol = {
      id: `hol-${Date.now()}`,
      date,
      occasion,
      declaredBy: `${officerName} (${officerId})`,
      declaredAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setCentreOperations(prev => ({
      ...prev,
      holidays: [newHol, ...prev.holidays]
    }));

    logOperationalChange({
      category: 'Holiday Declared',
      action: `Declared procurement holiday for ${date} (${occasion})`,
      previousValue: 'Open for booking',
      newValue: `Closed (${occasion})`,
      reason,
      officerName,
      officerId
    });

    addNotification(
      'general',
      'Holiday Declared & Logged',
      `Procurement holiday on ${date} logged in public audit register.`,
      'Calendar'
    );
  };

  // Authority Updates Queue Status
  const updateQueueStatus = (token, newStatus) => {
    setQueueList(prev => prev.map(item => {
      if (item.token === token) {
        return {
          ...item,
          status: newStatus,
          procurementStatus: newStatus === 'Completed' ? 'Completed' : (newStatus === 'Processing' ? 'Processing' : (newStatus === 'Late / No-show' ? 'Late / No-show' : 'Waiting')),
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

  // Reset Everything to Baseline for Demonstration
  const resetDemoData = () => {
    setQueueList(INITIAL_QUEUE_DATA);
    setSlotsList(INITIAL_SLOTS_DATA);
    setCentreOperations(INITIAL_CENTRE_OPERATIONS);
    setOperationalAuditLog(INITIAL_AUDIT_LOGS);
    setWaitlist(INITIAL_WAITLIST_DATA);
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
      bookingId: 'BK-98421',
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
      allocatedAt: '08 Sep 2026, 10:20 AM',
      allocationType: 'Automated Algorithmic Allocation',
      gracePeriodMinutes: 15,
      appointmentTime: '10:00 AM',
      isLate: false,
      rescheduledOffer: null
    });
    addNotification('general', 'Demo Baseline Restored', 'Reset queue, centre operations, and farmer state.', 'RefreshCw');
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
        bookingHistory,
        slotsList,
        setSlotsList,
        queueList,
        centreOperations,
        operationalAuditLog,
        waitlist,
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
        joinWaitlist,
        promoteFromWaitlist,
        handleNoShow,
        acceptRescheduledSlot,
        cancelBooking,
        updateCentreOperations,
        updateSlotCapacity,
        declareHoliday,
        logOperationalChange,
        updateQueueStatus,
        advanceQueueNext,
        updateProcurement,
        updatePayment,
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
