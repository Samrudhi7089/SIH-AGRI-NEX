// AGRI-NEX Realistic Mock Data for SIH 2026

export const CROPS_DATA = [
  { id: 'wheat', name: 'Wheat (गेहूं / गहू)', mspPerQuintal: 2275, unit: 'kg', icon: '🌾' },
  { id: 'soybean', name: 'Soybean (सोयाबीन)', mspPerQuintal: 4892, unit: 'kg', icon: '🌱' },
  { id: 'cotton', name: 'Cotton (कपास / कापूस)', mspPerQuintal: 7121, unit: 'kg', icon: '☁️' },
  { id: 'maize', name: 'Maize (मक्का / मका)', mspPerQuintal: 2090, unit: 'kg', icon: '🌽' },
  { id: 'jowar', name: 'Jowar (ज्वार / ज्वारी)', mspPerQuintal: 3180, unit: 'kg', icon: '🌾' },
];

export const CENTRES_DATA = [
  {
    id: 'centre-paithan',
    name: 'Paithan Procurement Centre',
    district: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    address: 'Near APMC Mandi Yard, Paithan - 431107',
    distance: '12 km away',
    availableSlotsToday: 18,
    totalSlotsToday: 80,
    currentQueueCount: 24,
    avgWaitTimeMinutes: 35,
    operatingHours: '09:00 AM - 05:00 PM',
    officerInCharge: 'Sunil Deshmukh (Procurement Officer #402)',
    phone: '+91 2431 223450',
    facilities: ['Electronic Weighbridge', 'Moisture Analyzer', 'Waiting Shade', 'Drinking Water', 'Helpdesk'],
    capacityPerDay: 400,
    coordinates: { lat: 19.4795, lng: 75.3855 }
  },
  {
    id: 'centre-aurangabad',
    name: 'Aurangabad Main APMC Centre',
    district: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    address: 'Jalna Road, Mondha, Chhatrapati Sambhajinagar - 431001',
    distance: '28 km away',
    availableSlotsToday: 32,
    totalSlotsToday: 120,
    currentQueueCount: 42,
    avgWaitTimeMinutes: 45,
    operatingHours: '08:30 AM - 05:30 PM',
    officerInCharge: 'R. K. Sharma (Senior Officer)',
    phone: '+91 240 2331189',
    facilities: ['Automated Grading', '3 Weighbridges', 'Farmer Canteen', 'Covered Storage'],
    capacityPerDay: 600,
    coordinates: { lat: 19.8762, lng: 75.3433 }
  },
  {
    id: 'centre-jalna',
    name: 'Jalna Agro Procurement Hub',
    district: 'Jalna',
    state: 'Maharashtra',
    address: 'Devalgaon Raja Road, APMC Complex, Jalna - 431203',
    distance: '45 km away',
    availableSlotsToday: 14,
    totalSlotsToday: 70,
    currentQueueCount: 19,
    avgWaitTimeMinutes: 25,
    operatingHours: '09:00 AM - 05:00 PM',
    officerInCharge: 'Anand Kulkarni (Officer)',
    phone: '+91 2482 230911',
    facilities: ['Electronic Weighbridge', 'Moisture Tester', 'Farmer Restroom'],
    capacityPerDay: 350,
    coordinates: { lat: 19.8410, lng: 75.8864 }
  }
];

export const INITIAL_SLOTS_DATA = [
  { id: 'slot-1', time: '09:00 – 10:00', capacity: 20, booked: 20, available: 0, status: 'FULL' },
  { id: 'slot-2', time: '10:00 – 11:00', capacity: 20, booked: 18, available: 2, status: 'OPEN' },
  { id: 'slot-3', time: '11:00 – 12:00', capacity: 20, booked: 12, available: 8, status: 'OPEN' },
  { id: 'slot-4', time: '12:00 – 01:00', capacity: 20, booked: 9, available: 11, status: 'OPEN' },
  { id: 'slot-5', time: '01:00 – 02:00', capacity: 0, booked: 0, available: 0, status: 'BREAK' },
  { id: 'slot-6', time: '02:00 – 03:00', capacity: 20, booked: 15, available: 5, status: 'OPEN' },
  { id: 'slot-7', time: '03:00 – 04:00', capacity: 20, booked: 6, available: 14, status: 'OPEN' },
  { id: 'slot-8', time: '04:00 – 05:00', capacity: 20, booked: 2, available: 18, status: 'OPEN' }
];

export const INITIAL_CENTRE_OPERATIONS = {
  centreId: 'centre-paithan',
  centreName: 'Paithan Procurement Centre',
  operatingHours: '09:00 AM - 05:00 PM',
  defaultHourlyCapacity: 20,
  activeWeighbridges: 2,
  gracePeriodMinutes: 15,
  isTemporarilyClosed: false,
  closureReason: '',
  holidays: [
    { id: 'hol-1', date: '15 September 2026', occasion: 'Anant Chaturdashi / Mandi Maintenance', declaredBy: 'Sunil Deshmukh (Officer #402)', declaredAt: '05 Sep 2026, 02:15 PM' },
    { id: 'hol-2', date: '02 October 2026', occasion: 'Gandhi Jayanti (Gazetted Holiday)', declaredBy: 'Govt APMC Directorate', declaredAt: '01 Sep 2026, 10:00 AM' }
  ]
};

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-9021',
    timestamp: '09 Sep 2026, 04:30 PM',
    officerName: 'Sunil Deshmukh',
    officerId: 'Officer #402',
    category: 'Capacity Adjustment',
    action: 'Slot 01:00-02:00 set to BREAK (Capacity 0)',
    previousValue: 'Capacity: 20 (OPEN)',
    newValue: 'Capacity: 0 (BREAK)',
    reason: 'Daily weighbridge calibration & sensor load-cell zero-point verification.',
    status: 'System Verified'
  },
  {
    id: 'AUD-9018',
    timestamp: '08 Sep 2026, 11:15 AM',
    officerName: 'Sunil Deshmukh',
    officerId: 'Officer #402',
    category: 'Operating Hours',
    action: 'Configured standard operating hours 09:00 AM – 05:00 PM',
    previousValue: '09:00 AM - 04:30 PM',
    newValue: '09:00 AM - 05:00 PM',
    reason: 'Extended by 30 mins to accommodate bumper Rabi harvest intake.',
    status: 'System Verified'
  },
  {
    id: 'AUD-9012',
    timestamp: '05 Sep 2026, 02:15 PM',
    officerName: 'Sunil Deshmukh',
    officerId: 'Officer #402',
    category: 'Holiday Declared',
    action: 'Declared holiday for 15 September 2026',
    previousValue: 'Open for booking',
    newValue: 'Procurement Centre Closed (Holiday)',
    reason: 'Anant Chaturdashi public holiday & annual electrical transformer overhaul.',
    status: 'System Verified'
  }
];

export const INITIAL_WAITLIST_DATA = [
  {
    waitlistId: 'WL-101',
    farmerId: 'F1045',
    farmerName: 'Baban Bhosale',
    mobile: '+91 98229 88120',
    village: 'Paithan',
    crop: 'Wheat',
    quantity: '350 kg',
    requestedDate: '10 September 2026',
    requestedSlot: '09:00 – 10:00',
    joinedAt: '08 Sep 2026, 11:30 AM',
    priority: 1,
    status: 'WAITING'
  },
  {
    waitlistId: 'WL-102',
    farmerId: 'F1048',
    farmerName: 'Kavita Kadam',
    mobile: '+91 98221 44512',
    village: 'Waluj',
    crop: 'Wheat',
    quantity: '400 kg',
    requestedDate: '10 September 2026',
    requestedSlot: '09:00 – 10:00',
    joinedAt: '08 Sep 2026, 01:10 PM',
    priority: 2,
    status: 'WAITING'
  }
];

export const INITIAL_QUEUE_DATA = [
  {
    token: 'A121',
    farmerId: 'F1001',
    farmerName: 'Suresh More',
    mobile: '+91 98221 11201',
    village: 'Paithan',
    crop: 'Wheat',
    quantity: '400 kg',
    amount: '₹24,000',
    status: 'Completed',
    procurementStatus: 'Completed',
    paymentStatus: 'Completed',
    timeSlot: '09:00 AM – 10:00 AM',
    weighedAt: '09:22 AM',
    moisturePercent: '11.8%',
    qualityGrade: 'Grade A',
    txnRef: 'TXN98701'
  },
  {
    token: 'A122',
    farmerId: 'F1008',
    farmerName: 'Anita Shinde',
    mobile: '+91 98221 34912',
    village: 'Gangapur',
    crop: 'Wheat',
    quantity: '350 kg',
    amount: '₹21,000',
    status: 'Completed',
    procurementStatus: 'Completed',
    paymentStatus: 'Completed',
    timeSlot: '09:00 AM – 10:00 AM',
    weighedAt: '09:44 AM',
    moisturePercent: '12.1%',
    qualityGrade: 'Grade A',
    txnRef: 'TXN98712'
  },
  {
    token: 'A123',
    farmerId: 'F1014',
    farmerName: 'Vijay Jadhav',
    mobile: '+91 94220 88231',
    village: 'Waluj',
    crop: 'Wheat',
    quantity: '420 kg',
    amount: '₹25,200',
    status: 'Completed',
    procurementStatus: 'Completed',
    paymentStatus: 'Processing',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: '10:05 AM',
    moisturePercent: '11.5%',
    qualityGrade: 'Grade A+',
    txnRef: 'TXN98733'
  },
  {
    token: 'A124',
    farmerId: 'F1019',
    farmerName: 'Meena Pawar',
    mobile: '+91 98500 44219',
    village: 'Kannad',
    crop: 'Wheat',
    quantity: '300 kg',
    amount: '₹18,000',
    status: 'Processing',
    procurementStatus: 'Processing',
    paymentStatus: 'Pending',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: 'In Weighbridge #1',
    moisturePercent: '12.0%',
    qualityGrade: 'Under Verification',
    txnRef: 'Pending'
  },
  {
    token: 'A125',
    farmerId: 'F1020',
    farmerName: 'Ganesh Kale',
    mobile: '+91 97632 99120',
    village: 'Jalna',
    crop: 'Soybean',
    quantity: '500 kg',
    amount: '₹24,500',
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Pending',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: '-',
    moisturePercent: '-',
    qualityGrade: '-',
    txnRef: '-'
  },
  {
    token: 'A126',
    farmerId: 'F1021',
    farmerName: 'Prakash Raut',
    mobile: '+91 98901 22340',
    village: 'Paithan',
    crop: 'Cotton',
    quantity: '600 kg',
    amount: '₹42,700',
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Pending',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: '-',
    moisturePercent: '-',
    qualityGrade: '-',
    txnRef: '-'
  },
  {
    token: 'A127',
    farmerId: 'F1023',
    farmerName: 'Ramesh Patil',
    mobile: '+91 98765 43210',
    village: 'Paithan',
    crop: 'Wheat',
    quantity: '420 kg',
    amount: '₹25,000',
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Processing',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: '-',
    moisturePercent: '-',
    qualityGrade: '-',
    txnRef: 'PAY12345'
  },
  {
    token: 'A128',
    farmerId: 'F1024',
    farmerName: 'Sunita Rao',
    mobile: '+91 98230 77112',
    village: 'Waluj',
    crop: 'Maize',
    quantity: '250 kg',
    amount: '₹15,000',
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Pending',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: '-',
    moisturePercent: '-',
    qualityGrade: '-',
    txnRef: '-'
  },
  {
    token: 'A129',
    farmerId: 'F1028',
    farmerName: 'Dilip Shinde',
    mobile: '+91 94222 19830',
    village: 'Gangapur',
    crop: 'Jowar',
    quantity: '380 kg',
    amount: '₹22,800',
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Pending',
    timeSlot: '10:00 AM – 11:00 AM',
    weighedAt: '-',
    moisturePercent: '-',
    qualityGrade: '-',
    txnRef: '-'
  },
  {
    token: 'A130',
    farmerId: 'F1031',
    farmerName: 'Rahul Pawar',
    mobile: '+91 98810 55671',
    village: 'Paithan',
    crop: 'Soybean',
    quantity: '450 kg',
    amount: '₹22,000',
    status: 'Waiting',
    procurementStatus: 'Waiting',
    paymentStatus: 'Pending',
    timeSlot: '11:00 AM – 12:00 PM',
    weighedAt: '-',
    moisturePercent: '-',
    qualityGrade: '-',
    txnRef: '-'
  }
];

// 20,000 Scalable Directory Mock Generator
export function generateScalableFarmerList(page = 1, pageSize = 10, search = '', filterStatus = 'all', filterCentre = 'all', filterCrop = 'all') {
  const TOTAL_SCALE_RECORDS = 20000;
  const villages = ['Paithan', 'Waluj', 'Gangapur', 'Kannad', 'Jalna', 'Georai', 'Shevgaon', 'Ambad', 'Vaijapur', 'Sillod'];
  const firstNames = ['Ramesh', 'Rahul', 'Anita', 'Suresh', 'Vijay', 'Meena', 'Ganesh', 'Prakash', 'Sunita', 'Dilip', 'Santosh', 'Vikas', 'Kavita', 'Sachin', 'Nitin', 'Archana', 'Ashok', 'Kisan', 'Baban', 'Tukaram'];
  const lastNames = ['Patil', 'Pawar', 'Shinde', 'More', 'Jadhav', 'Kale', 'Raut', 'Rao', 'Kulkarni', 'Deshmukh', 'Chavan', 'Gaikwad', 'Bhosale', 'Kadam', 'Thorat', 'Wagh'];
  const crops = ['Wheat', 'Soybean', 'Cotton', 'Maize', 'Jowar'];
  const centres = ['Paithan Procurement Centre', 'Aurangabad Main APMC Centre', 'Jalna Agro Procurement Hub'];
  const statuses = ['Waiting', 'Processing', 'Completed', 'Slot Booked'];

  // Base list starts with our core queue items
  let records = [...INITIAL_QUEUE_DATA];

  // Deterministically generate pseudo records up to virtual list size
  const startId = 1032;
  for (let i = 0; i < 40; i++) {
    const idNum = startId + i;
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const v = villages[(i * 2) % villages.length];
    const c = crops[(i * 5) % crops.length];
    const cen = centres[i % centres.length];
    const stat = statuses[i % statuses.length];
    const tokenLetter = String.fromCharCode(65 + Math.floor(i / 20));
    const tokenNum = 131 + i;
    const qty = 200 + (i % 8) * 50;
    const amount = qty * 58;

    records.push({
      token: `${tokenLetter}${tokenNum}`,
      farmerId: `F${idNum}`,
      farmerName: `${fn} ${ln}`,
      mobile: `+91 98${(i * 13) % 90 + 10} ${(i * 27) % 900 + 100} ${(i * 39) % 90 + 10}`,
      village: v,
      crop: c,
      centre: cen,
      quantity: `${qty} kg`,
      amount: `₹${amount.toLocaleString('en-IN')}`,
      status: stat,
      procurementStatus: stat === 'Completed' ? 'Completed' : (stat === 'Processing' ? 'Processing' : 'Waiting'),
      paymentStatus: stat === 'Completed' ? (i % 2 === 0 ? 'Completed' : 'Processing') : 'Pending',
      timeSlot: `${10 + (i % 6)}:00 – ${11 + (i % 6)}:00`,
      weighedAt: stat === 'Completed' ? '11:15 AM' : '-',
      moisturePercent: stat === 'Completed' ? '12.2%' : '-',
      qualityGrade: stat === 'Completed' ? 'Grade A' : '-',
      txnRef: stat === 'Completed' ? `TXN988${i + 10}` : '-'
    });
  }

  // Filter
  let filtered = records.filter(r => {
    const matchSearch = !search || 
      r.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      r.farmerId.toLowerCase().includes(search.toLowerCase()) ||
      r.token.toLowerCase().includes(search.toLowerCase()) ||
      r.mobile.includes(search) ||
      r.village.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === 'all' || r.status.toLowerCase() === filterStatus.toLowerCase();
    const matchCrop = filterCrop === 'all' || r.crop.toLowerCase() === filterCrop.toLowerCase();
    return matchSearch && matchStatus && matchCrop;
  });

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);

  return {
    farmers: paginated,
    totalRecords: TOTAL_SCALE_RECORDS,
    totalFiltered,
    currentPage: page,
    totalPages,
    pageSize
  };
}
