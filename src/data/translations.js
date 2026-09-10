// AGRI-NEX Multilingual Dictionary (English, Hindi, Marathi)

export const TRANSLATIONS = {
  en: {
    appName: 'AGRI-NEX',
    tagline: 'Smart Procurement. Less Waiting.',
    govtSupport: 'Ministry of Agriculture & Farmers Welfare • Government of India',
    
    // Roles
    farmerRoleTitle: 'Farmer',
    farmerRoleDesc: 'Book slots, track real-time queues & monitor payment status',
    authorityRoleTitle: 'Procurement Authority',
    authorityRoleDesc: 'Manage slots, live queues, weighbridge & payment authorizations',
    continueBtn: 'Continue',
    
    // Login
    welcomeFarmer: 'Welcome, Farmer',
    mobileNumberPrompt: 'Enter your 10-digit mobile number to access procurement services',
    sendOtp: 'Send OTP',
    demoFarmerLogin: 'Continue as Demo Farmer (Ramesh Patil)',
    enterMobile: 'Enter mobile number',
    
    // OTP
    verifyNumber: 'Verify your mobile number',
    otpSubtext: 'Enter the 6-digit OTP sent to your registered mobile number.',
    verifyContinue: 'Verify & Continue',
    resendOtpIn: 'Resend OTP in',
    seconds: 'seconds',
    resendNow: 'Resend OTP Now',
    
    // Profile Setup
    profileSetupTitle: 'Farmer Profile Setup',
    fullName: 'Full Name',
    farmerId: 'Farmer ID / Aadhaar Linked ID',
    state: 'State',
    district: 'District',
    village: 'Village',
    primaryCrop: 'Primary Crop',
    stepAccount: 'Account',
    stepDetails: 'Details',
    stepReady: 'Ready',
    
    // Dashboard
    goodMorning: 'Good Morning',
    nextProcurement: 'NEXT PROCUREMENT',
    token: 'Token',
    turnApproaching: 'Your turn is approaching',
    trackQueue: 'Track Live Queue',
    todayCentreStatus: "Today's Centre Status",
    currentQueue: 'Current Queue',
    estimatedWaiting: 'Estimated Waiting',
    farmers: 'farmers',
    minutes: 'minutes',
    quickActions: 'Quick Actions',
    bookNewSlot: 'Book New Slot',
    myBookings: 'My Bookings',
    paymentStatus: 'Payment Status',
    helpSupport: 'Help & Support',
    
    // Centre Selection
    selectCentre: 'Select Procurement Centre',
    searchCentres: 'Search village, district or pincode',
    away: 'away',
    slotsAvailable: 'Slots available',
    select: 'Select',
    
    // Book Slot
    bookProcSlot: 'Book Procurement Slot',
    selectedCentre: 'Selected Centre',
    chooseDate: 'Choose Procurement Date',
    availableTimeSlots: 'Available Time Slots',
    book: 'Book Slot',
    full: 'FULL',
    breakTime: 'LUNCH BREAK',
    quantityToProcure: 'Estimated Quantity (kg)',
    confirmBooking: 'Confirm Slot Booking',
    
    // Success
    slotBookedSuccess: 'Slot Booked Successfully!',
    tokenNumber: 'Token Number',
    date: 'Date',
    time: 'Time',
    centre: 'Centre',
    notifMessage: 'You will receive real-time SMS & app alerts as your turn approaches.',
    viewMyBooking: 'View My Booking',
    goToHome: 'Go to Home',
    
    // Live Queue
    liveQueue: 'Live Queue Tracking',
    yourPosition: 'Your Position',
    currentlyServing: 'Currently Serving',
    processed: 'processed',
    aheadOfYou: 'farmers ahead of you',
    refresh: 'Refresh Live Status',
    lastUpdated: 'Last updated',
    completed: 'Completed',
    processing: 'Processing',
    waiting: 'Waiting',
    you: 'YOU',
    
    // Procurement Status
    myProcurement: 'My Procurement Status',
    registered: 'Registered',
    slotBooked: 'Slot Booked',
    inProgress: 'Procurement In Progress',
    
    // Payment Status
    amount: 'Amount',
    paymentId: 'Payment ID',
    expectedTime: 'Expected within 2–3 working days via DBT Direct Bank Transfer',
    txnRef: 'Transaction Reference',
    dbtNotice: 'Direct Benefit Transfer (DBT) is credited directly to your Aadhaar-seeded Bank Account (SBI **** 4912).',
    
    // Bottom Nav
    navHome: 'Home',
    navBookings: 'Centres & Slots',
    navQueue: 'Live Queue',
    navProcurement: 'Status',
    navPayment: 'Payment',
    navNotifications: 'Alerts',
    navProfile: 'Profile',

    // New Capacity & Operations, Fair Allocation, and Smart No-show keys
    centreCapacityOps: 'Centre Capacity & Operations',
    automatedAllocation: 'Automated Fair Allocation',
    systemConfirmed: 'System-Confirmed',
    gracePeriod: 'Grace Period',
    gracePeriodNotice: '15-minute check-in grace period applies upon slot arrival.',
    lateNoShow: 'Late / No-show',
    rescheduled: 'Rescheduled',
    waitlist: 'Waitlist',
    joinWaitlist: 'Join Fair FIFO Waitlist',
    auditLog: 'Anti-Manipulation Audit Log',
    acceptRescheduledSlot: 'Accept Rescheduled Slot',
    fairnessGuarantee: 'Fair FCFS algorithmic allocation (Zero manual authority intervention)'
  },
  
  hi: {
    appName: 'AGRI-NEX (एग्री-नेक्स)',
    tagline: 'स्मार्ट खरीद। कम प्रतीक्षा।',
    govtSupport: 'कृषि एवं किसान कल्याण मंत्रालय • भारत सरकार',
    
    // Roles
    farmerRoleTitle: 'किसान',
    farmerRoleDesc: 'स्लॉट बुक करें, कतार ट्रैक करें और भुगतान स्थिति देखें',
    authorityRoleTitle: 'खरीद अधिकारी',
    authorityRoleDesc: 'केंद्र क्षमता, संचालन, लाइव कतार व भुगतान प्रबंधित करें',
    continueBtn: 'आगे बढ़ें',
    
    // Login
    welcomeFarmer: 'नमस्ते, किसान भाई',
    mobileNumberPrompt: 'सरकारी खरीद सेवाओं का लाभ उठाने के लिए अपना मोबाइल नंबर दर्ज करें',
    sendOtp: 'ओटीपी (OTP) भेजें',
    demoFarmerLogin: 'डेमो किसान (रमेश पाटिल) के रूप में लॉगिन करें',
    enterMobile: 'मोबाइल नंबर दर्ज करें',
    
    // OTP
    verifyNumber: 'अपना मोबाइल नंबर सत्यापित करें',
    otpSubtext: 'आपके पंजीकृत मोबाइल नंबर पर भेजा गया 6 अंकों का ओटीपी दर्ज करें।',
    verifyContinue: 'सत्यापित करें और आगे बढ़ें',
    resendOtpIn: 'ओटीपी पुनः भेजें',
    seconds: 'सेकंड में',
    resendNow: 'अभी ओटीपी भेजें',
    
    // Profile Setup
    profileSetupTitle: 'किसान प्रोफाइल सेटअप',
    fullName: 'पूरा नाम',
    farmerId: 'किसान आईडी / आधार लिंक आईडी',
    state: 'राज्य',
    district: 'जिला',
    village: 'गांव',
    primaryCrop: 'मुख्य फसल',
    stepAccount: 'खाता',
    stepDetails: 'विवरण',
    stepReady: 'तैयार',
    
    // Dashboard
    goodMorning: 'शुभ प्रभात',
    nextProcurement: 'आगामी खरीद स्लॉट',
    token: 'टोकन',
    turnApproaching: 'आपकी बारी आने वाली है',
    trackQueue: 'लाइव कतार देखें',
    todayCentreStatus: 'आज केंद्र की स्थिति',
    currentQueue: 'वर्तमान कतार',
    estimatedWaiting: 'अनुमानित प्रतीक्षा',
    farmers: 'किसान',
    minutes: 'मिनट',
    quickActions: 'त्वरित सेवाएं',
    bookNewSlot: 'नया स्लॉट बुक करें',
    myBookings: 'मेरी बुकिंग',
    paymentStatus: 'भुगतान स्थिति',
    helpSupport: 'सहायता एवं संपर्क',
    
    // Centre Selection
    selectCentre: 'खरीद केंद्र चुनें',
    searchCentres: 'गांव, जिला या पिनकोड खोजें',
    away: 'दूरी',
    slotsAvailable: 'उपलब्ध स्लॉट',
    select: 'चुनें',
    
    // Book Slot
    bookProcSlot: 'खरीद स्लॉट बुक करें',
    selectedCentre: 'चयनित केंद्र',
    chooseDate: 'खरीद की तारीख चुनें',
    availableTimeSlots: 'उपलब्ध समय स्लॉट',
    book: 'स्लॉट बुक करें',
    full: 'पूर्ण (फुल)',
    breakTime: 'भोजन अवकाश',
    quantityToProcure: 'अनुमानित मात्रा (किलो)',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    
    // Success
    slotBookedSuccess: 'स्लॉट सफलतापूर्वक बुक हुआ!',
    tokenNumber: 'टोकन संख्या',
    date: 'तारीख',
    time: 'समय',
    centre: 'खरीद केंद्र',
    notifMessage: 'आपकी बारी आने पर आपको एसएमएस और ऐप के माध्यम से सूचित किया जाएगा।',
    viewMyBooking: 'बुकिंग विवरण देखें',
    goToHome: 'होम पेज पर जाएं',
    
    // Live Queue
    liveQueue: 'लाइव कतार ट्रैकिंग',
    yourPosition: 'आपकी स्थिति',
    currentlyServing: 'वर्तमान सेवा टोकन',
    processed: 'प्रक्रिया पूरी हुई',
    aheadOfYou: 'किसान आपसे आगे हैं',
    refresh: 'ताजा जानकारी लें',
    lastUpdated: 'अंतिम अपडेट',
    completed: 'पूर्ण',
    processing: 'प्रक्रिया जारी',
    waiting: 'प्रतीक्षारत',
    you: 'आप (YOU)',
    
    // Procurement Status
    myProcurement: 'मेरी खरीद स्थिति',
    registered: 'पंजीकृत',
    slotBooked: 'स्लॉट बुक हुआ',
    inProgress: 'खरीद प्रक्रिया जारी',
    
    // Payment Status
    amount: 'राशि',
    paymentId: 'भुगतान आईडी',
    expectedTime: 'डीबीटी द्वारा 2-3 कार्य दिवसों के भीतर',
    txnRef: 'लेनदेन संदर्भ',
    dbtNotice: 'डीबीटी राशि सीधे आपके आधार से जुड़े बैंक खाते (SBI **** 4912) में जमा की जाएगी।',
    
    // Bottom Nav
    navHome: 'होम',
    navBookings: 'केंद्र व स्लॉट',
    navQueue: 'लाइव कतार',
    navProcurement: 'खरीद स्थिति',
    navPayment: 'भुगतान',
    navNotifications: 'सूचनाएं',
    navProfile: 'प्रोफाइल',

    // New Capacity & Operations, Fair Allocation, and Smart No-show keys
    centreCapacityOps: 'केंद्र क्षमता एवं संचालन',
    automatedAllocation: 'स्वचालित निष्पक्ष आवंटन',
    systemConfirmed: 'सिस्टम द्वारा पुष्ट',
    gracePeriod: 'अतिरिक्त समय (ग्रेस पीरियड)',
    gracePeriodNotice: 'स्लॉट समय पर पहुंचने के लिए 15 मिनट का ग्रेस पीरियड लागू है।',
    lateNoShow: 'विलंबित / अनुपस्थित',
    rescheduled: 'पुनर्निर्धारित',
    waitlist: 'प्रतीक्षा सूची (Waitlist)',
    joinWaitlist: 'निष्पक्ष प्रतीक्षा सूची में शामिल हों',
    auditLog: 'हेरफेर-रोधी ऑडिट लॉग',
    acceptRescheduledSlot: 'प्रस्तावित नया स्लॉट स्वीकार करें',
    fairnessGuarantee: 'स्वचालित निष्पक्ष प्रणाली (अधिकारी द्वारा कोई मैनुअल हस्तक्षेप नहीं)'
  },

  mr: {
    appName: 'AGRI-NEX (अ‍ॅग्री-नेक्स)',
    tagline: 'स्मार्ट खरेदी. कमी प्रतीक्षा.',
    govtSupport: 'कृषी व शेतकरी कल्याण मंत्रालय • भारत सरकार',
    
    // Roles
    farmerRoleTitle: 'शेतकरी',
    farmerRoleDesc: 'स्लॉट बुक करा, थेट रांग तपासा आणि पेमेंट स्थिती पहा',
    authorityRoleTitle: 'खरेदी अधिकारी',
    authorityRoleDesc: 'केंद्र क्षमता, कामकाज, थेट रांग व पेमेंट व्यवस्थापन करा',
    continueBtn: 'पुढे जा',
    
    // Login
    welcomeFarmer: 'नमस्कार, शेतकरी बांधवांनो',
    mobileNumberPrompt: 'शासकीय हमीभाव खरेदी सेवेसाठी आपला १० अंकी मोबाईल नंबर टाका',
    sendOtp: 'ओटीपी पाठवा',
    demoFarmerLogin: 'डेमो शेतकरी (रमेश पाटील) म्हणून प्रवेश करा',
    enterMobile: 'मोबाईल नंबर टाका',
    
    // OTP
    verifyNumber: 'मोबाईल नंबर पडताळणी करा',
    otpSubtext: 'आपल्या नोंदणीकृत मोबाईलवर आलेला ६ अंकी ओटीपी टाका.',
    verifyContinue: 'पडताळणी करा आणि पुढे जा',
    resendOtpIn: 'ओटीपी पुन्हा पाठवा',
    seconds: 'सेकंदात',
    resendNow: 'आता ओटीपी पाठवा',
    
    // Profile Setup
    profileSetupTitle: 'शेतकरी माहिती नोंदणी',
    fullName: 'पूर्ण नाव',
    farmerId: 'शेतकरी ओळख क्रमांक / आधार क्रमांक',
    state: 'राज्य',
    district: 'जिल्हा',
    village: 'गाव',
    primaryCrop: 'मुख्य पीक',
    stepAccount: 'खाते',
    stepDetails: 'तपशील',
    stepReady: 'सज्ज',
    
    // Dashboard
    goodMorning: 'शुभ सकाळ',
    nextProcurement: 'पुढील खरेदी स्लॉट',
    token: 'टोकन',
    turnApproaching: 'तुमचा नंबर लवकरच येत आहे',
    trackQueue: 'थेट रांग पहा',
    todayCentreStatus: 'आजची केंद्र स्थिती',
    currentQueue: 'सध्याची रांग',
    estimatedWaiting: 'अंदाजे वेळ',
    farmers: 'शेतकरी',
    minutes: 'मिनिटे',
    quickActions: 'जलद सेवा',
    bookNewSlot: 'नवीन स्लॉट बुक करा',
    myBookings: 'माझी नोंदणी',
    paymentStatus: 'पेमेंट स्थिती',
    helpSupport: 'मदत व संपर्क',
    
    // Centre Selection
    selectCentre: 'खरेदी केंद्र निवडा',
    searchCentres: 'गाव, जिल्हा किंवा पिनकोड शोधा',
    away: 'अंतर',
    slotsAvailable: 'उपलब्ध स्लॉट',
    select: 'निवडा',
    
    // Book Slot
    bookProcSlot: 'खरेदी स्लॉट निवडा',
    selectedCentre: 'निवडलेले केंद्र',
    chooseDate: 'खरेदीची तारीख निवडा',
    availableTimeSlots: 'उपलब्ध वेळ स्लॉट',
    book: 'स्लॉट बुक करा',
    full: 'पूर्ण (फुल)',
    breakTime: 'दुपारची सुट्टी',
    quantityToProcure: 'अंदाजे वजन (किलो)',
    confirmBooking: 'बुकिंग निश्चित करा',
    
    // Success
    slotBookedSuccess: 'स्लॉट यशस्वीरित्या बुक झाला!',
    tokenNumber: 'टोकन क्रमांक',
    date: 'तारीख',
    time: 'वेळ',
    centre: 'खरेदी केंद्र',
    notifMessage: 'तुमचा नंबर जवळ आल्यावर तुम्हाला एसएमएसद्वारे कळवले जाईल.',
    viewMyBooking: 'बुकिंग पहा',
    goToHome: 'मुख्य पानावर जा',
    
    // Live Queue
    liveQueue: 'थेट रांग ट्रॅकिंग',
    yourPosition: 'तुमचा रांगेतील नंबर',
    currentlyServing: 'सध्या सुरू असलेला टोकन',
    processed: 'पूर्ण झालेले शेतकरी',
    aheadOfYou: 'शेतकरी तुमच्या पुढे आहेत',
    refresh: 'रिफ्रेश करा',
    lastUpdated: 'शेवटचे अपडेट',
    completed: 'पूर्ण झाले',
    processing: 'वजन सुरू आहे',
    waiting: 'प्रतीक्षेत',
    you: 'तुम्ही (YOU)',
    
    // Procurement Status
    myProcurement: 'माझी खरेदी स्थिती',
    registered: 'नोंदणीकृत',
    slotBooked: 'स्लॉट बुक झाला',
    inProgress: 'खरेदी प्रक्रिया सुरू आहे',
    
    // Payment Status
    amount: 'रक्कम',
    paymentId: 'पेमेंट आयडी',
    expectedTime: 'डीबीटी द्वारे २-३ कामकाजाच्या दिवसात',
    txnRef: 'व्यवहार संदर्भ (TXN)',
    dbtNotice: 'डीबीटी रक्कम थेट आपल्या आधार लिंक असलेल्या बँक खात्यात (SBI **** 4912) जमा होईल.',
    
    // Bottom Nav
    navHome: 'मुख्य पान',
    navBookings: 'केंद्र व स्लॉट',
    navQueue: 'थेट रांग',
    navProcurement: 'खरेदी स्थिती',
    navPayment: 'पेमेंट',
    navNotifications: 'सूचना',
    navProfile: 'माझे खाते',

    // New Capacity & Operations, Fair Allocation, and Smart No-show keys
    centreCapacityOps: 'केंद्र क्षमता व कामकाज',
    automatedAllocation: 'स्वयंचलित पारदर्शक वाटप',
    systemConfirmed: 'सिस्टमद्वारे निश्चित',
    gracePeriod: 'ग्रेस पिरियड (अतिरिक्त वेळ)',
    gracePeriodNotice: 'वेळेवर पोहोचण्यासाठी १५ मिनिटांची अतिरिक्त सवलत उपलब्ध आहे.',
    lateNoShow: 'उशीर / अनुपस्थित',
    rescheduled: 'पुनर्नियोजित',
    waitlist: 'प्रतीक्षा यादी',
    joinWaitlist: 'पारदर्शक प्रतीक्षा यादीत सामील व्हा',
    auditLog: 'गैरव्यवहार प्रतिबंधक ऑडिट नोंद',
    acceptRescheduledSlot: 'पुनर्नियोजित स्लॉट स्वीकारा',
    fairnessGuarantee: 'स्वयंचलित निष्पक्ष वाटप (अधिकाऱ्यांचा कोणताही मानवी हस्तक्षेप नाही)'
  }
};
