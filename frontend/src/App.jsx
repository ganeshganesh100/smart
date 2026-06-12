// frontend/src/App.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import heroImage from './assets/hero.png';
import forRentImg from './assets/for_rent.png';
import forSaleImg from './assets/for_sale.png';
import { 
  Sun, Moon, Search, ShieldAlert, FileText, CheckCircle, MapPin, 
  User, Plus, LogOut, Heart, MessageSquare, Trash, 
  TrendingUp, ShieldCheck, AlertOctagon, HelpCircle, X, Check, Eye
} from 'lucide-react';

const translations = {
  en: {
    language: 'Language',
    nepal: 'Nepal',
    login: 'Login',
    signUp: 'Sign Up',
    adminPanel: 'Admin Panel',
    marketplace: 'Marketplace',
    myListings: 'My Listings',
    addRoom: 'Add Room',
    favorites: 'Favorites',
    applications: 'Applications',
    myRequests: 'My Requests',
    leaseContracts: 'Lease Contracts',
    verifiedOnly: 'Verified Tenants & Landlords Only',
    heroTitle: 'Find Broker-Free Rental Rooms, Flats & Houses in Nepal',
    heroSubtitle: 'SmartBasai connects you directly with house owners. Cut out brokers, review verified listings, and generate digital rental agreements automatically.',
    district: 'Nepal District',
    allDistricts: 'All Districts',
    municipality: 'Municipality / Area',
    municipalityPlaceholder: 'e.g. Kirtipur',
    propertyType: 'Property Type',
    allTypes: 'All Types',
    singleRoom: 'Single Room',
    flat: 'Flat',
    apartment: 'Apartment',
    house: 'House',
    roomsCount: 'Rooms Count',
    anyRooms: 'Any Rooms',
    maxPrice: 'Max Price (NPR)',
    pricePlaceholder: 'e.g. 20000',
    clearFilters: 'Clear Active Filters',
    availableListings: 'Available Verified Rental Listings',
    guestBookingHint: 'Sign in to submit room bookings and contact landlords directly.',
    noListings: 'No verified listings found matching your search.',
    broadenFilters: 'Try broadening your filters or check back later.',
    verified: 'Verified',
    room: 'Room',
    rooms: 'Rooms',
    perMonth: '/ month',
    bookNow: 'Book Now',
    signInToBook: 'Sign in to Book',
    reportListing: 'Report suspicious listing',
    mapTitle: 'Interactive Location Registry (Nepal)',
    mapDescription: 'Locate apartments, water sources, transit paths, and university access routes using SmartBasai Maps.',
    kathmandu: 'Kathmandu, Bagmati',
    lalitpur: 'Lalitpur Metro',
    openFullMap: 'Open full map',
    activeRenters: 'Active Renters In Nepal',
    verifiedLandlords: 'Verified Landlords',
    brokerFreeDeals: 'Broker-Free Direct Deals',
    digitalLeases: 'Digital Leases Generated',
    instant: 'Instant',
    howItWorks: 'How SmartBasai Works',
    searchRooms: 'Search Verified Rooms',
    searchRoomsDesc: 'Browse real photos of rooms, flats, or houses verified by our administrators. Filter by location and budget.',
    bookChat: 'Book and Chat Directly',
    bookChatDesc: 'Send a booking request and message the landlord directly. Agree on terms without any broker fees.',
    signLease: 'Digitally Sign Lease',
    signLeaseDesc: 'Generate a legal rental agreement automatically with signatures, ready to download or print.',
    footerDesc: 'Secure and broker-free online rental management system designed specifically for the Nepalese housing market.',
    quickLinks: 'Quick Links',
    signIn: 'Sign In',
    registerListing: 'Register Listing',
    supportCenter: 'Support Center',
    rights: 'All Rights Reserved. Designed with premium HSL glassmorphism styling.',
    forgotPassword: 'Forgot Password',
    registerTitle: 'Register to SmartBasai',
    loginTitle: 'Log In to SmartBasai',
    resetAccess: 'Reset secure access',
    authSubtitle: 'Join the broker-free rental revolution in Nepal.',
    registeredEmail: 'Registered Email Address',
    sendResetCode: 'Send Reset Code',
    backToLogin: 'Back to Login',
    fullName: 'Full Name',
    phoneNumber: 'Contact Mobile Number (+977)',
    signupAs: 'I want to sign up as a:',
    tenantOption: 'Tenant (Looking for rooms)',
    landlordOption: 'Landlord (Rent property owner)',
    profilePicture: 'Profile Picture:',
    citizenshipDoc: 'Land Verification / Citizenship Document:',
    emailAddress: 'Email Address',
    password: 'Password (Min. 8 chars)',
    createAccount: 'Create Account',
    haveAccount: 'Have an account? Log In',
    newUser: 'New user? Register here'
  },
  ne: {
    language: 'भाषा',
    nepal: 'नेपाल',
    login: 'लगइन',
    signUp: 'साइन अप',
    adminPanel: 'एडमिन प्यानल',
    marketplace: 'मार्केटप्लेस',
    myListings: 'मेरो लिस्टिङ',
    addRoom: 'कोठा थप्नुहोस्',
    favorites: 'मनपर्ने',
    applications: 'आवेदनहरू',
    myRequests: 'मेरो अनुरोध',
    leaseContracts: 'भाडा सम्झौता',
    verifiedOnly: 'प्रमाणित भाडावाला र घरधनी मात्र',
    heroTitle: 'नेपालमा ब्रोकरबिना कोठा, फ्ल्याट र घर खोज्नुहोस्',
    heroSubtitle: 'SmartBasai ले तपाईंलाई घरधनीसँग सिधै जोड्छ। ब्रोकर हटाउनुहोस्, प्रमाणित लिस्टिङ हेर्नुहोस्, र डिजिटल भाडा सम्झौता सजिलै बनाउनुहोस्।',
    district: 'नेपाल जिल्ला',
    allDistricts: 'सबै जिल्ला',
    municipality: 'नगरपालिका / क्षेत्र',
    municipalityPlaceholder: 'जस्तै: कीर्तिपुर',
    propertyType: 'सम्पत्ति प्रकार',
    allTypes: 'सबै प्रकार',
    singleRoom: 'एक कोठा',
    flat: 'फ्ल्याट',
    apartment: 'अपार्टमेन्ट',
    house: 'घर',
    roomsCount: 'कोठा संख्या',
    anyRooms: 'कुनै पनि कोठा',
    maxPrice: 'अधिकतम मूल्य (रु)',
    pricePlaceholder: 'जस्तै: २००००',
    clearFilters: 'फिल्टर हटाउनुहोस्',
    availableListings: 'उपलब्ध प्रमाणित भाडा लिस्टिङ',
    guestBookingHint: 'बुकिङ पठाउन र घरधनीलाई सम्पर्क गर्न साइन इन गर्नुहोस्।',
    noListings: 'तपाईंको खोजसँग मिल्ने प्रमाणित लिस्टिङ भेटिएन।',
    broadenFilters: 'फिल्टर फराकिलो बनाउनुहोस् वा पछि फेरि हेर्नुहोस्।',
    verified: 'प्रमाणित',
    room: 'कोठा',
    rooms: 'कोठा',
    perMonth: '/ महिना',
    bookNow: 'बुक गर्नुहोस्',
    signInToBook: 'बुक गर्न साइन इन',
    reportListing: 'शंकास्पद लिस्टिङ रिपोर्ट गर्नुहोस्',
    mapTitle: 'इन्टरएक्टिभ लोकेसन रजिस्ट्री (नेपाल)',
    mapDescription: 'SmartBasai Maps प्रयोग गरेर अपार्टमेन्ट, पानी स्रोत, यातायात मार्ग र विश्वविद्यालय नजिकका क्षेत्रहरू हेर्नुहोस्।',
    kathmandu: 'काठमाडौं, बागमती',
    lalitpur: 'ललितपुर महानगर',
    openFullMap: 'पूरा नक्सा खोल्नुहोस्',
    activeRenters: 'नेपालका सक्रिय भाडावाला',
    verifiedLandlords: 'प्रमाणित घरधनी',
    brokerFreeDeals: 'ब्रोकरबिना सिधा सम्झौता',
    digitalLeases: 'डिजिटल सम्झौता तयार',
    instant: 'तुरुन्त',
    howItWorks: 'SmartBasai कसरी काम गर्छ',
    searchRooms: 'प्रमाणित कोठा खोज्नुहोस्',
    searchRoomsDesc: 'प्रशासकबाट प्रमाणित कोठा, फ्ल्याट वा घरका वास्तविक फोटोहरू हेर्नुहोस्। स्थान र बजेटअनुसार फिल्टर गर्नुहोस्।',
    bookChat: 'बुकिङ र च्याट सिधै',
    bookChatDesc: 'बुकिङ अनुरोध पठाउनुहोस् र घरधनीसँग सिधै कुरा गर्नुहोस्। ब्रोकर शुल्क बिना सर्त मिलाउनुहोस्।',
    signLease: 'डिजिटल सम्झौता गर्नुहोस्',
    signLeaseDesc: 'हस्ताक्षरसहित कानुनी भाडा सम्झौता स्वतः बनाउनुहोस्, डाउनलोड वा प्रिन्ट गर्न तयार।',
    footerDesc: 'नेपाली आवास बजारका लागि बनाइएको सुरक्षित र ब्रोकरबिना अनलाइन भाडा व्यवस्थापन प्रणाली।',
    quickLinks: 'छिटो लिंकहरू',
    signIn: 'साइन इन',
    registerListing: 'लिस्टिङ दर्ता',
    supportCenter: 'सहयोग केन्द्र',
    rights: 'सबै अधिकार सुरक्षित। प्रिमियम HSL ग्लासमोर्फिज्म शैलीमा डिजाइन गरिएको।',
    forgotPassword: 'पासवर्ड बिर्सनुभयो',
    registerTitle: 'SmartBasai मा दर्ता गर्नुहोस्',
    loginTitle: 'SmartBasai मा लगइन गर्नुहोस्',
    resetAccess: 'सुरक्षित पहुँच रिसेट गर्नुहोस्',
    authSubtitle: 'नेपालको ब्रोकरबिना भाडा सेवामा सामेल हुनुहोस्।',
    registeredEmail: 'दर्ता गरिएको इमेल',
    sendResetCode: 'रिसेट कोड पठाउनुहोस्',
    backToLogin: 'लगइनमा फर्कनुहोस्',
    fullName: 'पूरा नाम',
    phoneNumber: 'सम्पर्क मोबाइल नम्बर (+९७७)',
    signupAs: 'म यस रूपमा साइन अप गर्न चाहन्छु:',
    tenantOption: 'भाडावाला (कोठा खोज्दै)',
    landlordOption: 'घरधनी (सम्पत्ति भाडामा दिने)',
    profilePicture: 'प्रोफाइल फोटो:',
    citizenshipDoc: 'जग्गा प्रमाणीकरण / नागरिकता कागजात:',
    emailAddress: 'इमेल ठेगाना',
    password: 'पासवर्ड (कम्तीमा ८ अक्षर)',
    createAccount: 'खाता बनाउनुहोस्',
    haveAccount: 'खाता छ? लगइन गर्नुहोस्',
    newUser: 'नयाँ प्रयोगकर्ता? यहाँ दर्ता गर्नुहोस्'
  }
};

function App() {
  const { user, login, logout } = useContext(AuthContext);
  
  // Design theme
  const [theme, setTheme] = useState(localStorage.getItem('smartBasaiTheme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('smartBasaiLanguage') || 'en');
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;
  
  // App views: 'browse', 'my-listings', 'add-property', 'my-bookings', 'my-agreements', 'admin-panel', 'chat', 'favorites'
  const [view, setView] = useState('browse');

  // Recently Added Slider
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderItems = [
    { name: 'Sunshine Flat', price: 18000, type: 'Flat' },
    { name: 'Green Valley Apartment', price: 22000, type: 'Apartment' },
    { name: 'Kirtipur Studio Room', price: 9000, type: 'Room' },
    { name: 'Lalitpur City House', price: 35000, type: 'House' },
    { name: 'Bouddha Family Flat', price: 15000, type: 'Flat' },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % sliderItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  
  // Data State
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('smartBasaiFavorites') || '[]'));
  
  // Admin Panel Data
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminReports, setAdminReports] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [adminChatThreads, setAdminChatThreads] = useState([]);
  const [selectedAdminChatUserId, setSelectedAdminChatUserId] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Authentication Fields
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('tenant');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [citizenshipDocFile, setCitizenshipDocFile] = useState(null);
  const [authMsg, setAuthMsg] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  // Admin Booking Edit Modal State
  const [editingBooking, setEditingBooking] = useState(null);
  const [editBookingPrice, setEditBookingPrice] = useState('');
  const [editBookingOffer, setEditBookingOffer] = useState('');
  const [editBookingLocation, setEditBookingLocation] = useState('');
  const [editBookingStatus, setEditBookingStatus] = useState('');
  const [editBookingPayStatus, setEditBookingPayStatus] = useState('');
  const [editBookingPayMethod, setEditBookingPayMethod] = useState('');

  // Advanced Filters
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterMunicipality, setFilterMunicipality] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterRooms, setFilterRooms] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');

  // Property Creation Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('Kathmandu');
  const [municipality, setMunicipality] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('1');
  const [propertyType, setPropertyType] = useState('Room');
  const [amenities, setAmenities] = useState([]);
  const [assetImage, setAssetImage] = useState('/room.png'); // Default asset image selection

  // Rental Agreement Generation Form (modal or state)
  const [activeBookingForAgreement, setActiveBookingForAgreement] = useState(null);
  const [agreementStartDate, setAgreementStartDate] = useState('');
  const [agreementEndDate, setAgreementEndDate] = useState('');
  const [agreementTerms, setAgreementTerms] = useState('1. Monthly rent must be paid by the 5th of each Nepali month.\n2. Security deposit of 1 month is refundable upon lease end.\n3. The tenant must keep the premises clean and notify the landlord of any major repairs needed.');
  const [agreementTenantSig, setAgreementTenantSig] = useState('');
  const [agreementLandlordSig, setAgreementLandlordSig] = useState('');

  // Selected Agreement View Modal
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  // Report Modal State
  const [reportTargetId, setReportTargetId] = useState(null);
  const [reportTargetType, setReportTargetType] = useState('Property');
  const [reportReason, setReportReason] = useState('');

  // Admin support chat state
  const [supportMessages, setSupportMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [chatPartner, setChatPartner] = useState('Admin Moderation Support');

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('smartBasaiTheme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('smartBasaiLanguage', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const showAuthView = (registerMode = false) => {
    setIsRegistering(registerMode);
    setForgotPassword(false);
    setAuthMsg('');
    setView('auth');
  };

  // Load datasets based on user roles
  const loadData = async () => {
    try {
      // Build query string
      let queryStr = `http://127.0.0.1:5000/api/properties?`;
      if (filterDistrict) queryStr += `district=${filterDistrict}&`;
      if (filterMunicipality) queryStr += `municipality=${filterMunicipality}&`;
      if (filterType) queryStr += `propertyType=${filterType}&`;
      if (filterRooms) queryStr += `rooms=${filterRooms}&`;
      if (filterMaxPrice) queryStr += `maxPrice=${filterMaxPrice}&`;
      
      const propRes = await axios.get(queryStr);
      setProperties(propRes.data.data);

      if (user) {
        // Fetch User Bookings
        const bookRes = await axios.get('http://127.0.0.1:5000/api/bookings');
        setBookings(bookRes.data.data);

        // Fetch User Agreements
        const agreeRes = await axios.get('http://127.0.0.1:5000/api/agreements');
        setAgreements(agreeRes.data.data);

        const chatRes = await axios.get('http://127.0.0.1:5000/api/chats');
        setSupportMessages(chatRes.data.data);

        // Fetch Admin Panel datasets if admin
        if (user.role === 'admin') {
          const statsRes = await axios.get('http://127.0.0.1:5000/api/admin/stats');
          setAdminStats(statsRes.data.stats);

          const usersRes = await axios.get('http://127.0.0.1:5000/api/admin/users');
          setAdminUsers(usersRes.data.data);

          const reportsRes = await axios.get('http://127.0.0.1:5000/api/reports');
          setAdminReports(reportsRes.data.data);

          const bookingsRes = await axios.get('http://127.0.0.1:5000/api/admin/bookings');
          setAdminBookings(bookingsRes.data.data);

          const chatThreadRes = await axios.get('http://127.0.0.1:5000/api/admin/chats');
          setAdminChatThreads(chatThreadRes.data.data);
          if (!selectedAdminChatUserId && chatThreadRes.data.data.length > 0) {
            setSelectedAdminChatUserId(chatThreadRes.data.data[0].user._id);
          }
        }
      }
    } catch (err) {
      console.error("Error retrieving dataset snapshots:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [user, filterDistrict, filterMunicipality, filterType, filterRooms, filterMaxPrice]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    try {
      if (isRegistering) {
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('role', role);
        if (profilePicFile) {
          formData.append('profilePicture', profilePicFile);
        }
        if (citizenshipDocFile) {
          formData.append('citizenshipDoc', citizenshipDocFile);
        }

        const res = await axios.post('http://127.0.0.1:5000/api/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (res.data.success) {
          setAuthMsg('✨ Account Registered! Please log in below.');
          setIsRegistering(false);
          setProfilePicFile(null);
          setCitizenshipDocFile(null);
        }
      } else {
        await login(email, password);
        setView('browse');
      }
    } catch (err) {
      setAuthMsg(`❌ ${err.response?.data?.message || 'Authentication failed'}`);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/properties', {
        title, 
        description, 
        district, 
        municipality, 
        location, 
        price: Number(price), 
        rooms: Number(rooms), 
        propertyType,
        images: [assetImage],
        amenities
      });
      if (res.data.success) {
        alert('🎉 Listing created! Waiting for Admin verification before appearing publicly.');
        setTitle(''); setDescription(''); setLocation(''); setPrice(''); setRooms('1');
        loadData();
        setView('my-listings');
      }
    } catch (err) {
      alert(`Submission Blocked: ${err.response?.data?.message}`);
    }
  };

  const handleBookProperty = async (id) => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/bookings', { propertyId: id });
      if (res.data.success) {
        alert('🚀 Room booking request dispatched directly to Landlord dashboard!');
        loadData();
        setView('my-bookings');
      }
    } catch (err) {
      alert('Failed to execute rental process sequence.');
    }
  };

  const handleUpdateStatus = async (bookingId, decision) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/bookings/${bookingId}`, { status: decision });
      if (res.data.success) {
        alert(`Application successfully marked as ${decision}!`);
        loadData();
      }
    } catch (err) {
      alert(`Could not execute action: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleGenerateAgreement = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/agreements', {
        bookingId: activeBookingForAgreement._id,
        startDate: agreementStartDate,
        endDate: agreementEndDate,
        terms: agreementTerms,
        tenantSignature: agreementTenantSig,
        landlordSignature: agreementLandlordSig
      });
      if (res.data.success) {
        alert('📜 Digital lease agreement generated successfully!');
        setActiveBookingForAgreement(null);
        setAgreementStartDate('');
        setAgreementEndDate('');
        setAgreementTenantSig('');
        setAgreementLandlordSig('');
        loadData();
        setView('my-agreements');
      }
    } catch (err) {
      alert(`Could not generate agreement: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleVerifyProperty = async (id, status) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/properties/${id}/verify`, { verified: status });
      if (res.data.success) {
        alert(`Property listing verification set to ${status}!`);
        loadData();
      }
    } catch (err) {
      alert('Failed to update property status.');
    }
  };

  const handleToggleBan = async (id) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/admin/users/${id}/ban`);
      if (res.data.success) {
        alert(res.data.message);
        loadData();
      }
    } catch (err) {
      alert('Failed to modify user status.');
    }
  };

  const handleToggleVerifyLandlord = async (id) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/admin/users/${id}/verify-landlord`);
      if (res.data.success) {
        alert(res.data.message);
        loadData();
      }
    } catch (err) {
      alert('Failed to update landlord status.');
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/reports', {
        targetId: reportTargetId,
        targetType: reportTargetType,
        reason: reportReason
      });
      if (res.data.success) {
        alert('🚨 Report filed. Admin moderators will review this listing shortly.');
        setReportTargetId(null);
        setReportReason('');
      }
    } catch (err) {
      alert(`Could not submit report: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleResolveReport = async (id) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/reports/${id}/resolve`);
      if (res.data.success) {
        alert('Report ticket marked as resolved.');
        loadData();
      }
    } catch (err) {
      alert('Failed to resolve report.');
    }
  };

  const handleUpdateAdminBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/admin/bookings/${editingBooking._id}`, {
        price: Number(editBookingPrice),
        offer: editBookingOffer,
        location: editBookingLocation,
        status: editBookingStatus,
        paymentStatus: editBookingPayStatus,
        paymentMethod: editBookingPayMethod
      });
      if (res.data.success) {
        alert('🎉 Booking updated successfully by Admin!');
        setEditingBooking(null);
        loadData();
      }
    } catch (err) {
      alert(`Could not update booking: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await axios.delete(`http://127.0.0.1:5000/api/properties/${id}`);
      if (res.data.success) {
        alert('Listing deleted successfully!');
        loadData();
      }
    } catch (err) {
      alert('Failed to delete listing.');
    }
  };

  const toggleFavorite = (id) => {
    let nextFavs;
    if (favorites.includes(id)) {
      nextFavs = favorites.filter(f => f !== id);
    } else {
      nextFavs = [...favorites, id];
    }
    setFavorites(nextFavs);
    localStorage.setItem('smartBasaiFavorites', JSON.stringify(nextFavs));
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/chats', { text: newChatMessage });
      setSupportMessages(prev => [...prev, res.data.data]);
      setNewChatMessage('');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not send support message.');
    }
  };

  const handleAdminReply = async (e) => {
    e.preventDefault();
    const replyUserId = selectedAdminChatUserId || selectedAdminThread?.user?._id;
    if (!replyUserId || !adminReplyText.trim()) return;

    try {
      await axios.post(`http://127.0.0.1:5000/api/admin/chats/${replyUserId}/reply`, {
        text: adminReplyText
      });
      setAdminReplyText('');

      const chatThreadRes = await axios.get('http://127.0.0.1:5000/api/admin/chats');
      setAdminChatThreads(chatThreadRes.data.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Could not send admin reply.');
    }
  };

  const selectedAdminThread = adminChatThreads.find(thread => thread.user?._id === selectedAdminChatUserId) || adminChatThreads[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Navigation Bar */}
      <nav className="navbar no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setView('browse')}>
          <h2 style={{ color: '#ffffff', margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#fbbf24' }}>Smart</span>Basai 🏠
          </h2>
          <span style={{ fontSize: '11px', background: 'rgba(218, 41, 28, 0.9)', color: 'white', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{t('nepal')}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            aria-label={t('language')}
            style={{ width: 'auto', minWidth: '96px', padding: '8px 12px', background: 'rgba(15,23,42,0.55)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <option value="en">English</option>
            <option value="ne">नेपाली</option>
          </select>

          <button onClick={toggleTheme} className="btn-secondary" style={{ padding: '8px 12px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <>
              {user.role === 'admin' ? (
                <button onClick={() => setView('admin-panel')} className="btn-primary" style={{ background: '#fbbf24', color: '#1e293b' }}>
                  <TrendingUp size={16} /> {t('adminPanel')}
                </button>
              ) : (
                <>
                  <button onClick={() => setView('browse')} className="btn-secondary" style={{ color: '#ffffff', border: 'none' }}>{t('marketplace')}</button>
                  {user.role === 'landlord' ? (
                    <>
                      <button onClick={() => setView('my-listings')} className="btn-secondary" style={{ color: '#ffffff', border: 'none' }}>{t('myListings')}</button>
                      <button onClick={() => setView('add-property')} className="btn-primary" style={{ background: '#10b981' }}><Plus size={16} /> {t('addRoom')}</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setView('favorites')} className="btn-secondary" style={{ color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={16} /> {t('favorites')}</button>
                    </>
                  )}
                  <button onClick={() => setView('my-bookings')} className="btn-secondary" style={{ color: '#ffffff', border: 'none' }}>
                    {user.role === 'landlord' ? t('applications') : t('myRequests')} ({bookings.length})
                  </button>
                  <button onClick={() => setView('my-agreements')} className="btn-secondary" style={{ color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={16} /> {t('leaseContracts')}</button>
                </>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '15px' }}>
                {user.profilePicture && (
                  <img src={`http://127.0.0.1:5000/${user.profilePicture}`} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                )}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 'bold' }}>{user.fullname}</span>
                  <span style={{ color: '#cbd5e1', fontSize: '11px', textTransform: 'capitalize' }}>{user.role}</span>
                </div>
                <button onClick={logout} className="btn-accent" style={{ padding: '8px 12px', background: '#da291c' }} title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => showAuthView(false)} className="btn-secondary" style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}>{t('login')}</button>
              <button onClick={() => showAuthView(true)} className="btn-primary" style={{ background: '#da291c' }}>{t('signUp')}</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Grid: Sidebar + Content when logged in, or full Landing Screen when Guest */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* LANDING PAGE / marketplace view when no user, OR when clicking browse */}
        {view === 'browse' && (
          <div className="no-print">
            
            {/* Hero banner */}
            <div style={{ 
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(26, 54, 93, 0.72)), url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              padding: '80px 20px', 
              color: 'white', 
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <span style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: 'bold', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  🔒 {t('verifiedOnly')}
                </span>
                <h1 style={{ fontSize: '48px', fontWeight: '800', marginTop: '20px', lineHeight: '1.2' }}>
                  {t('heroTitle')}
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '18px', marginTop: '15px' }}>
                  {t('heroSubtitle')}
                </p>

                {/* Main Search and Advanced Filtering Bar */}
                <div className="glass-card" style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.15)',
                  marginTop: '40px', 
                  padding: '20px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                    
                    <div>
                      <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', textAlign: 'left', marginBottom: '6px', fontWeight: 'bold' }}>{t('district')}</label>
                      <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                        <option value="">{t('allDistricts')}</option>
                        <option value="Kathmandu">Kathmandu</option>
                        <option value="Lalitpur">Lalitpur</option>
                        <option value="Bhaktapur">Bhaktapur</option>
                        <option value="Kaski">Kaski (Pokhara)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', textAlign: 'left', marginBottom: '6px', fontWeight: 'bold' }}>{t('municipality')}</label>
                      <input type="text" placeholder={t('municipalityPlaceholder')} value={filterMunicipality} onChange={e => setFilterMunicipality(e.target.value)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', textAlign: 'left', marginBottom: '6px', fontWeight: 'bold' }}>{t('propertyType')}</label>
                      <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                        <option value="">{t('allTypes')}</option>
                        <option value="Room">{t('singleRoom')}</option>
                        <option value="Flat">{t('flat')}</option>
                        <option value="Apartment">{t('apartment')}</option>
                        <option value="House">{t('house')}</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', textAlign: 'left', marginBottom: '6px', fontWeight: 'bold' }}>{t('roomsCount')}</label>
                      <select value={filterRooms} onChange={e => setFilterRooms(e.target.value)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                        <option value="">{t('anyRooms')}</option>
                        <option value="1">1 {t('room')}</option>
                        <option value="2">2 {t('rooms')}</option>
                        <option value="3">3 {t('rooms')}</option>
                        <option value="4">4+ {t('rooms')}</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', textAlign: 'left', marginBottom: '6px', fontWeight: 'bold' }}>{t('maxPrice')}</label>
                      <input type="number" placeholder={t('pricePlaceholder')} value={filterMaxPrice} onChange={e => setFilterMaxPrice(e.target.value)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                    </div>

                  </div>
                  
                  {(filterDistrict || filterMunicipality || filterType || filterRooms || filterMaxPrice) && (
                    <button onClick={() => {
                      setFilterDistrict(''); setFilterMunicipality(''); setFilterType(''); setFilterRooms(''); setFilterMaxPrice('');
                    }} className="btn-secondary" style={{ marginTop: '15px', color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '6px 12px', fontSize: '12px' }}>
                      {t('clearFilters')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── RECENTLY ADDED SLIDER ── */}
            <div style={{
              background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
              borderBottom: '1px solid #ffcc80',
              padding: '0',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '14px 24px',
                gap: '16px',
              }}>
                {/* Property thumbnail placeholder */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #ff9800, #f44336)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  boxShadow: '0 4px 12px rgba(255,152,0,0.4)',
                }}>
                  🏠
                </div>
                {/* Slide content */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{
                    animation: 'slideIn 0.5s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#e65100',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      📍 Recently Added :
                    </span>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '700',
                      color: '#1a237e',
                      marginTop: '2px',
                    }}>
                      {sliderItems[sliderIndex].name}
                      <span style={{ fontWeight: '400', color: '#5d4037', marginLeft: '8px' }}>
                        | Price ( Rs. {sliderItems[sliderIndex].price.toLocaleString()} )
                      </span>
                    </span>
                  </div>
                </div>
                {/* Dot indicators */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {sliderItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSliderIndex(i)}
                      style={{
                        width: i === sliderIndex ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: i === sliderIndex ? '#e65100' : '#ffcc80',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── CATEGORY SECTION ── */}
            <div style={{
              maxWidth: '1200px',
              margin: '50px auto 0 auto',
              padding: '0 20px',
            }}>
              <h2 style={{
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '30px',
                color: 'var(--text-main)',
                letterSpacing: '-0.5px',
              }}>Category</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '50px',
              }}>
                {/* FOR RENT card */}
                <div
                  onClick={() => { setFilterType(''); setView('browse'); }}
                  style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    height: '260px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
                >
                  <img
                    src={forRentImg}
                    alt="For Rent"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Dark gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: '22px',
                    color: '#ffffff',
                    fontSize: '22px',
                    fontWeight: '800',
                    letterSpacing: '2px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  }}>FOR RENT</div>
                </div>

                {/* FOR SALE card */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    height: '260px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
                >
                  <img
                    src={forSaleImg}
                    alt="For Sale"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: '22px',
                    color: '#ffffff',
                    fontSize: '22px',
                    fontWeight: '800',
                    letterSpacing: '2px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  }}>FOR SALE</div>
                </div>
              </div>
            </div>

            {/* Main Marketplace Grid */}
            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700' }}>{t('availableListings')} ({properties.length})</h3>
                {!user && (
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t('guestBookingHint')}</span>
                )}
              </div>

              {properties.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                  <HelpCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
                  <h4>{t('noListings')}</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{t('broadenFilters')}</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                  {properties.map(p => (
                    <div key={p._id} className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
                      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        <img src={p.images?.[0] || '/room.png'} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ 
                          position: 'absolute', 
                          top: '15px', 
                          left: '15px', 
                          background: 'rgba(26, 54, 93, 0.95)', 
                          color: '#ffffff', 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          fontSize: '11px', 
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>
                          {p.propertyType}
                        </span>
                        
                        {p.verified && (
                          <span style={{ 
                            position: 'absolute', 
                            top: '15px', 
                            right: '15px', 
                            background: '#10b981', 
                            color: '#ffffff', 
                            padding: '4px 10px', 
                            borderRadius: '6px', 
                            fontSize: '11px', 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <ShieldCheck size={12} /> {t('verified')}
                          </span>
                        )}
                      </div>

                      <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{p.title}</h4>
                          {user && user.role === 'tenant' && (
                            <button onClick={() => toggleFavorite(p._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: favorites.includes(p._id) ? '#da291c' : 'var(--text-muted)' }}>
                              <Heart size={20} fill={favorites.includes(p._id) ? '#da291c' : 'none'} />
                            </button>
                          )}
                        </div>

                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', margin: '8px 0' }}>
                          <MapPin size={14} /> {p.location}, {p.municipality}, {p.district}
                        </p>
                        
                        <p style={{ color: 'var(--text-main)', fontSize: '14px', height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '15px 0' }}>
                          <span style={{ background: 'var(--border-color)', color: 'var(--text-main)', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }}>
                            🚪 {p.rooms} {p.rooms === 1 ? t('room') : t('rooms')}
                          </span>
                          {p.amenities?.map((amenity, idx) => (
                            <span key={idx} style={{ background: 'var(--border-color)', color: 'var(--text-main)', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }}>
                              ⚡ {amenity}
                            </span>
                          ))}
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '15px 0' }} />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '20px', fontWeight: '800', color: '#da291c' }}>Rs. {p.price}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> {t('perMonth')}</span>
                          </div>
                          
                          {user ? (
                            user.role === 'tenant' ? (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => {
                                  setChatPartner('Admin Moderation Support');
                                  setView('chat');
                                }} className="btn-secondary" style={{ padding: '8px 12px' }} title="Chat with Admin Support">
                                  <MessageSquare size={16} />
                                </button>
                                <button onClick={() => handleBookProperty(p._id)} className="btn-primary" style={{ padding: '8px 14px', fontSize: '13px' }}>
                                  {t('bookNow')}
                                </button>
                              </div>
                            ) : null
                          ) : (
                            <button onClick={() => showAuthView(false)} className="btn-primary" style={{ padding: '8px 14px', fontSize: '13px' }}>
                              {t('signInToBook')}
                            </button>
                          )}
                        </div>

                        {/* Report fraud option */}
                        {user && user.role === 'tenant' && (
                          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => {
                              setReportTargetId(p._id);
                              setReportTargetType('Property');
                            }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <AlertOctagon size={12} /> {t('reportListing')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MOCK GOOGLE MAPS INTEGRATION SECTION */}
              <div className="glass-card" style={{ marginTop: '50px', padding: '0px', overflow: 'hidden' }}>
                <div style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{t('mapTitle')}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t('mapDescription')}</p>
                </div>
                <div style={{ height: '380px', background: '#cbd5e1', position: 'relative', overflow: 'hidden' }}>
                  <iframe
                    title="SmartBasai Nepal location map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=85.2338%2C27.6283%2C85.4274%2C27.7632&layer=mapnik&marker=27.7172%2C85.3240"
                    style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div style={{
                    position: 'absolute',
                    left: '16px',
                    bottom: '16px',
                    display: 'grid',
                    gap: '8px',
                    zIndex: 2
                  }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.9)', color: 'white', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: '#fbbf24' }} /> {t('kathmandu')}
                    </div>
                    <div style={{ background: 'rgba(15, 23, 42, 0.9)', color: 'white', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: '#10b981' }} /> {t('lalitpur')}
                    </div>
                  </div>
                  <a
                    href="https://www.openstreetmap.org/?mlat=27.7172&mlon=85.3240#map=12/27.7172/85.3240"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      position: 'absolute',
                      right: '16px',
                      bottom: '16px',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      zIndex: 2,
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}
                  >
                    {t('openFullMap')}
                  </a>
                </div>
              </div>

              {/* STATISTICS SECTION */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '50px 0' }}>
                <div className="glass-card" style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#da291c' }}>1,500+</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>{t('activeRenters')}</p>
                </div>
                <div className="glass-card" style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#1a365d' }}>450+</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>{t('verifiedLandlords')}</p>
                </div>
                <div className="glass-card" style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#d97706' }}>100%</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>{t('brokerFreeDeals')}</p>
                </div>
                <div className="glass-card" style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#10b981' }}>{t('instant')}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>{t('digitalLeases')}</p>
                </div>
              </div>

              {/* HOW IT WORKS SECTION */}
              <div style={{ textAlign: 'center', margin: '70px 0' }}>
                <h3 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '40px' }}>{t('howItWorks')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                  <div className="glass-card">
                    <div style={{ background: 'rgba(26, 54, 93, 0.1)', color: '#1a365d', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 auto 15px auto' }}>1</div>
                    <h4 style={{ marginBottom: '10px' }}>{t('searchRooms')}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t('searchRoomsDesc')}</p>
                  </div>
                  <div className="glass-card">
                    <div style={{ background: 'rgba(218, 41, 28, 0.1)', color: '#da291c', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 auto 15px auto' }}>2</div>
                    <h4 style={{ marginBottom: '10px' }}>{t('bookChat')}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t('bookChatDesc')}</p>
                  </div>
                  <div className="glass-card">
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 auto 15px auto' }}>3</div>
                    <h4 style={{ marginBottom: '10px' }}>{t('signLease')}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t('signLeaseDesc')}</p>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Elegant footer */}
            <footer style={{ 
              background: '#0f172a', 
              color: '#94a3b8', 
              padding: '60px 20px 20px 20px', 
              borderTop: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center'
            }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'left', marginBottom: '40px' }}>
                <div>
                  <h3 style={{ color: '#ffffff', marginBottom: '15px' }}>SmartBasai 🏠</h3>
                  <p style={{ fontSize: '14px' }}>{t('footerDesc')}</p>
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '15px' }}>{t('quickLinks')}</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    <li onClick={() => setView('browse')} style={{ cursor: 'pointer' }}>{t('marketplace')}</li>
                    <li onClick={() => showAuthView(false)} style={{ cursor: 'pointer' }}>{t('signIn')}</li>
                    <li onClick={() => showAuthView(true)} style={{ cursor: 'pointer' }}>{t('registerListing')}</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '15px' }}>{t('supportCenter')}</h4>
                  <p style={{ fontSize: '14px' }}>📧 support@smartbasai.com.np<br/>📞 +977 1-4200000<br/>📍 Kirtipur, Kathmandu, Nepal</p>
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '20px 0' }} />
              <p style={{ fontSize: '12px' }}>© {new Date().getFullYear()} SmartBasai Nepal. {t('rights')}</p>
            </footer>

          </div>
        )}

        {/* AUTHENTICATION VIEW SCREEN */}
        {view === 'auth' && !user && (
          <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '20px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '420px' }}>
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>
                  {forgotPassword ? t('forgotPassword') : isRegistering ? t('registerTitle') : t('loginTitle')}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
                  {forgotPassword ? t('resetAccess') : t('authSubtitle')}
                </p>
              </div>

              {authMsg && (
                <div style={{ 
                  background: authMsg.startsWith('❌') ? 'var(--accent-light)' : 'var(--success-light)', 
                  color: authMsg.startsWith('❌') ? 'var(--accent)' : 'var(--success)', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {authMsg}
                </div>
              )}

              {forgotPassword ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setAuthMsg('✨ A password recovery code has been sent via SMS/Email simulation.');
                  setForgotPassword(false);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="email" placeholder={t('registeredEmail')} required />
                  <button type="submit" className="btn-primary">{t('sendResetCode')}</button>
                  <button type="button" onClick={() => setForgotPassword(false)} className="btn-secondary">{t('backToLogin')}</button>
                </form>
              ) : (
                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {isRegistering && (
                    <>
                      <input type="text" placeholder={t('fullName')} value={fullname} onChange={e => setFullname(e.target.value)} required />
                      <input type="text" placeholder={t('phoneNumber')} value={phone} onChange={e => setPhone(e.target.value)} required />
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>{t('signupAs')}</label>
                        <select value={role} onChange={e => setRole(e.target.value)}>
                          <option value="tenant">{t('tenantOption')}</option>
                          <option value="landlord">{t('landlordOption')}</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'left' }}>{t('profilePicture')}</label>
                        <input type="file" accept="image/*" onChange={e => setProfilePicFile(e.target.files[0])} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} />
                      </div>

                      {role === 'landlord' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'left' }}>{t('citizenshipDoc')}</label>
                          <input type="file" accept="image/*" onChange={e => setCitizenshipDocFile(e.target.files[0])} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} required />
                        </div>
                      )}
                    </>
                  )}
                  <input type="email" placeholder={t('emailAddress')} value={email} onChange={e => setEmail(e.target.value)} required />
                  <input type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} minLength={8} required />
                  
                  <button type="submit" className="btn-primary" style={{ background: '#da291c' }}>
                    {isRegistering ? t('createAccount') : t('login')}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '10px' }}>
                    <span onClick={() => { setIsRegistering(!isRegistering); setAuthMsg(''); }} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>
                      {isRegistering ? t('haveAccount') : t('newUser')}
                    </span>
                    {!isRegistering && (
                      <span onClick={() => setForgotPassword(true)} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {t('forgotPassword')}?
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* LOGGED IN VIEWPORT: Sidebar + Main Panel Container */}
        {user && (
          <div className="dashboard-container">
            
            {/* Sidebar Controls */}
            <aside className="sidebar no-print">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                {user.profilePicture ? (
                  <img src={`http://127.0.0.1:5000/${user.profilePicture}`} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} />
                ) : (
                  <div style={{ background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {user.fullname[0]}
                  </div>
                )}
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)' }}>{user.fullname}</h4>
                  <small style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role} Account</small>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dashboard</span>
              
              <button onClick={() => setView('browse')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'browse' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                🏠 Marketplace
              </button>

              {user.role === 'admin' ? (
                <>
                  <button onClick={() => setView('admin-panel')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'admin-panel' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                    📈 Admin Analytics
                  </button>
                </>
              ) : user.role === 'landlord' ? (
                <>
                  <button onClick={() => setView('my-listings')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'my-listings' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                    📋 My Properties
                  </button>
                  <button onClick={() => setView('add-property')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'add-property' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                    ➕ Add Property
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setView('favorites')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'favorites' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                    ❤️ Favorites ({favorites.length})
                  </button>
                </>
              )}

              <button onClick={() => setView('my-bookings')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'my-bookings' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                📩 {user.role === 'landlord' ? 'Booking Requests' : 'My Requests'} ({bookings.length})
              </button>

              <button onClick={() => setView('my-agreements')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'my-agreements' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                📜 Rental Agreements ({agreements.length})
              </button>

              <button onClick={() => setView('chat')} className={`btn-secondary`} style={{ justifyContent: 'flex-start', background: view === 'chat' ? 'var(--border-color)' : 'transparent', border: 'none' }}>
                💬 Chat Rooms
              </button>
            </aside>

            {/* Dashboard Right Main Panel */}
            <main className="main-content">
              
              {/* FAVORITES VIEW */}
              {view === 'favorites' && user.role === 'tenant' && (
                <div className="no-print">
                  <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>Your Saved Favorites</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                    {properties.filter(p => favorites.includes(p._id)).map(p => (
                      <div key={p._id} className="glass-card" style={{ padding: '20px' }}>
                        <img src={p.images?.[0] || '/room.png'} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                        <h4 style={{ margin: 0 }}>{p.title}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '5px 0' }}>📍 {p.location}, {p.district}</p>
                        <strong style={{ color: '#da291c', fontSize: '16px' }}>Rs. {p.price}</strong>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                          <button onClick={() => handleBookProperty(p._id)} className="btn-primary" style={{ flex: 1, padding: '8px' }}>Book Now</button>
                          <button onClick={() => toggleFavorite(p._id)} className="btn-secondary" style={{ padding: '8px' }}>Remove</button>
                        </div>
                      </div>
                    ))}
                    {properties.filter(p => favorites.includes(p._id)).length === 0 && (
                      <p style={{ color: 'var(--text-muted)' }}>No bookmarked listings found. Browse and tap the heart icon to save.</p>
                    )}
                  </div>
                </div>
              )}

              {/* LANDLORD LISTINGS */}
              {view === 'my-listings' && user.role === 'landlord' && (
                <div className="no-print">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '26px', fontWeight: '800' }}>Your Property Asset Registry</h3>
                    <button onClick={() => setView('add-property')} className="btn-primary" style={{ background: '#10b981' }}><Plus size={16} /> List Property</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                    {properties.filter(p => p.landlordId?._id === user.id || p.landlordId === user.id).map(p => (
                      <div key={p._id} className="glass-card" style={{ padding: '20px' }}>
                        <img src={p.images?.[0] || '/room.png'} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ margin: 0 }}>{p.title}</h4>
                          <span style={{ 
                            fontSize: '11px', 
                            background: p.verified ? 'var(--success-light)' : 'var(--accent-light)', 
                            color: p.verified ? 'var(--success)' : 'var(--accent)', 
                            padding: '3px 8px', 
                            borderRadius: '12px',
                            fontWeight: 'bold'
                          }}>
                            {p.verified ? 'Verified' : 'Pending Review'}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '5px 0' }}>📍 {p.location}, {p.district}</p>
                        <strong style={{ color: '#da291c', fontSize: '16px' }}>Rs. {p.price} / month</strong>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                          <button onClick={() => {
                            setTitle(p.title);
                            setDescription(p.description);
                            setDistrict(p.district);
                            setMunicipality(p.municipality);
                            setLocation(p.location);
                            setPrice(p.price.toString());
                            setRooms(p.rooms.toString());
                            setPropertyType(p.propertyType);
                            setView('add-property');
                          }} className="btn-secondary" style={{ flex: 1, padding: '8px' }}>Edit Details</button>
                          <button onClick={() => handleDeleteProperty(p._id)} className="btn-accent" style={{ background: '#da291c', padding: '8px' }}><Trash size={16} /></button>
                        </div>
                      </div>
                    ))}
                    {properties.filter(p => p.landlordId?._id === user.id || p.landlordId === user.id).length === 0 && (
                      <p style={{ color: 'var(--text-muted)' }}>You haven't listed any properties yet. Click Add Property to start.</p>
                    )}
                  </div>

                  {/* LANDLORD EARNINGS ANALYTICS GRAPH (SVG) */}
                  <div className="glass-card" style={{ marginTop: '40px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>Earnings & Active Tenant Snapshot</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px', alignItems: 'center' }}>
                      
                      {/* SVG Line chart representing monthly rental collections */}
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>Monthly Earnings (NPR)</span>
                        <svg viewBox="0 0 500 200" style={{ width: '100%', height: '180px', background: 'var(--border-color)', borderRadius: '8px', padding: '10px' }}>
                          <path d="M 50 150 Q 150 120 250 80 T 450 30" fill="none" stroke="#da291c" strokeWidth="4" />
                          <circle cx="50" cy="150" r="5" fill="#1a365d" />
                          <circle cx="250" cy="80" r="5" fill="#1a365d" />
                          <circle cx="450" cy="30" r="5" fill="#1a365d" />
                          <text x="45" y="175" fill="var(--text-main)" fontSize="10">Baisakh</text>
                          <text x="235" y="105" fill="var(--text-main)" fontSize="10">Ashadh</text>
                          <text x="430" y="55" fill="var(--text-main)" fontSize="10">Bhadra</text>
                        </svg>
                      </div>

                      <div style={{ background: 'var(--bg-app)', padding: '20px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Verified Income</span>
                        <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#10b981', margin: '5px 0' }}>Rs. 75,000</h3>
                        <small style={{ color: 'var(--text-muted)' }}>From 3 active occupancy listings.</small>
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                          <div style={{ flex: 1, background: 'var(--bg-card)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Occupancy</span>
                            <strong style={{ display: 'block', fontSize: '16px' }}>85%</strong>
                          </div>
                          <div style={{ flex: 1, background: 'var(--bg-card)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Reviews</span>
                            <strong style={{ display: 'block', fontSize: '16px' }}>4.8 ★</strong>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* ADD/EDIT PROPERTY FORM */}
              {view === 'add-property' && user.role === 'landlord' && (
                <div className="no-print" style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <div className="glass-card">
                    <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '20px', color: 'var(--primary)' }}>List New Rental Asset</h3>
                    
                    <form onSubmit={handleCreateProperty} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Property Title</label>
                        <input type="text" placeholder="e.g. Cozy 2-Room Flat with Water Facility" value={title} onChange={e => setTitle(e.target.value)} required />
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Description Details</label>
                        <textarea placeholder="Specify floor, water availability (Melamchi/well), electricity sub-meters, parking spaces, preference on tenants (family/students)..." value={description} onChange={e => setDescription(e.target.value)} style={{ minHeight: '120px' }} required />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>District</label>
                          <select value={district} onChange={e => setDistrict(e.target.value)}>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Lalitpur">Lalitpur</option>
                            <option value="Bhaktapur">Bhaktapur</option>
                            <option value="Kaski">Kaski (Pokhara)</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Municipality / Ward No.</label>
                          <input type="text" placeholder="e.g. Kirtipur Municipality - 4" value={municipality} onChange={e => setMunicipality(e.target.value)} required />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Exact Street / Landmark Address</label>
                        <input type="text" placeholder="e.g. Near TU Gate, Bagh Bhairab Road" value={location} onChange={e => setLocation(e.target.value)} required />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Monthly Rent (NPR)</label>
                          <input type="number" placeholder="e.g. 12000" value={price} onChange={e => setPrice(e.target.value)} required />
                        </div>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Rooms Count</label>
                          <input type="number" placeholder="1" value={rooms} onChange={e => setRooms(e.target.value)} min="1" required />
                        </div>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Asset Category</label>
                          <select value={propertyType} onChange={e => {
                            setPropertyType(e.target.value);
                            // Auto map corresponding image choice
                            if (e.target.value === 'House') setAssetImage('/house.png');
                            else if (e.target.value === 'Room' || e.target.value === 'Flat' || e.target.value === 'Apartment') setAssetImage('/room.png');
                            else setAssetImage('/land.png');
                          }}>
                            <option value="Room">Single Room</option>
                            <option value="Flat">Flat</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House">Full House</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Amenities Checkboxes</label>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                          {['Melamchi Water', '24h Electricity', 'Parking Stall', 'High Speed Wifi', 'Furnished'].map(amenity => (
                            <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                              <input type="checkbox" checked={amenities.includes(amenity)} onChange={e => {
                                if (e.target.checked) setAmenities([...amenities, amenity]);
                                else setAmenities(amenities.filter(a => a !== amenity));
                              }} style={{ width: 'auto' }} />
                              {amenity}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button type="submit" className="btn-primary" style={{ flex: 1, background: '#da291c' }}>Publish Property Listing</button>
                        <button type="button" onClick={() => setView('my-listings')} className="btn-secondary">Cancel</button>
                      </div>

                    </form>
                  </div>
                </div>
              )}

              {/* BOOKING REQUESTS / MY REQUESTS */}
              {view === 'my-bookings' && (
                <div className="no-print">
                  <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
                    {user.role === 'landlord' ? 'Booking Application Requests' : 'Your Rental Requests'}
                  </h3>

                  {bookings.length === 0 ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                      <HelpCircle size={40} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                      <p style={{ color: 'var(--text-muted)' }}>No booking records found in the database registry.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {bookings.map(b => (
                        <div key={b._id} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'center' }}>
                          <div>
                            <span style={{ 
                              fontSize: '11px', 
                              padding: '4px 10px', 
                              borderRadius: '12px', 
                              fontWeight: 'bold', 
                              background: b.status === 'Approved' ? 'var(--success-light)' : b.status === 'Rejected' ? 'var(--accent-light)' : 'var(--gold-light)', 
                              color: b.status === 'Approved' ? 'var(--success)' : b.status === 'Rejected' ? 'var(--accent)' : 'var(--gold)' 
                            }}>
                              Status: {b.status}
                            </span>
                            <h4 style={{ fontSize: '18px', fontWeight: '700', marginTop: '10px', marginBottom: '5px' }}>{b.propertyId?.title || 'Unknown Property'}</h4>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                              📍 {b.propertyId?.location || 'N/A'}, {b.propertyId?.district || 'N/A'}
                            </p>
                            
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '10px 0' }} />
                            
                            <p style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                              <strong>{user.role === 'landlord' ? 'Applicant Tenant:' : 'Property Landlord:'}</strong> {user.role === 'landlord' ? b.tenantId?.fullname : b.landlordId?.fullname}
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              📞 Mobile: {user.role === 'landlord' ? b.tenantId?.phone : b.landlordId?.phone}
                            </p>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                            {user.role === 'landlord' && b.status === 'Pending' && (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleUpdateStatus(b._id, 'Accepted')} className="btn-primary" style={{ background: '#10b981', padding: '6px 12px', fontSize: '12px' }}>Accept Request</button>
                                <button onClick={() => handleUpdateStatus(b._id, 'Rejected')} className="btn-accent" style={{ background: '#da291c', padding: '6px 12px', fontSize: '12px' }}>Reject</button>
                              </div>
                            )}

                            {user.role === 'landlord' && b.status === 'Approved' && (
                              <button onClick={() => {
                                setActiveBookingForAgreement(b);
                                setAgreementTenantSig(b.tenantId?.fullname || '');
                                setAgreementLandlordSig(user.fullname);
                              }} className="btn-primary" style={{ background: '#fbbf24', color: '#1e293b', padding: '8px 12px', fontSize: '12px' }}>
                                <FileText size={14} /> Draft Lease Contract
                              </button>
                            )}

                            {b.status === 'Approved' && (
                              <button onClick={async () => {
                                try {
                                  const agreeRes = await axios.get(`http://127.0.0.1:5000/api/agreements/booking/${b._id}`);
                                  setSelectedAgreement(agreeRes.data.data);
                                } catch (err) {
                                  alert('Agreement draft not completed by Landlord yet.');
                                }
                              }} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
                                <Eye size={14} /> View Digital Contract
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTIVE AGREEMENT GENERATION FORM MODAL */}
                  {activeBookingForAgreement && (
                    <div style={{ 
                      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                      background: 'rgba(0,0,0,0.5)', zIndex: 1000, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                    }}>
                      <div className="glass-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h4 style={{ fontSize: '20px', fontWeight: '800' }}>Draft Digital Lease Contract</h4>
                          <button onClick={() => setActiveBookingForAgreement(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleGenerateAgreement} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Agreement Start Date</label>
                              <input type="date" value={agreementStartDate} onChange={e => setAgreementStartDate(e.target.value)} required />
                            </div>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Agreement End Date</label>
                              <input type="date" value={agreementEndDate} onChange={e => setAgreementEndDate(e.target.value)} required />
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Standard Rental Terms & Conditions</label>
                            <textarea value={agreementTerms} onChange={e => setAgreementTerms(e.target.value)} style={{ minHeight: '120px' }} required />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Tenant Signature Name</label>
                              <input type="text" value={agreementTenantSig} onChange={e => setAgreementTenantSig(e.target.value)} required />
                            </div>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Landlord Signature Name</label>
                              <input type="text" value={agreementLandlordSig} onChange={e => setAgreementLandlordSig(e.target.value)} required />
                            </div>
                          </div>

                          <button type="submit" className="btn-primary" style={{ background: '#da291c' }}>Generate & Sign Agreement</button>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* RENTAL AGREEMENTS / LEASE CONTRACTS */}
              {view === 'my-agreements' && (
                <div className="no-print">
                  <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>Your Signed Rental Contracts</h3>
                  {agreements.length === 0 ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                      <HelpCircle size={40} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                      <p style={{ color: 'var(--text-muted)' }}>No digital rental agreements generated or signed yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                      {agreements.map(a => (
                        <div key={a._id} className="glass-card" style={{ padding: '20px' }}>
                          <FileText size={36} style={{ color: '#da291c', marginBottom: '15px' }} />
                          <h4 style={{ margin: '0 0 10px 0' }}>{a.propertyId?.title || 'Unknown Asset'}</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '5px 0' }}>
                            🗓️ Valid: {new Date(a.startDate).toLocaleDateString()} to {new Date(a.endDate).toLocaleDateString()}
                          </p>
                          <p style={{ fontSize: '13px', color: 'var(--text-main)', margin: '10px 0' }}>
                            <strong>Rent:</strong> Rs. {a.propertyId?.price || 'N/A'} / month
                          </p>
                          <button onClick={() => setSelectedAgreement(a)} className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                            <Eye size={16} /> View & Download PDF
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CHAT VIEW */}
              {view === 'chat' && (
                <div className="no-print glass-card" style={{ display: 'flex', flexDirection: 'column', height: '550px', padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: 'var(--primary)', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>💬 Admin Support Chat</h4>
                      <small style={{ color: '#cbd5e1' }}>Connected with {chatPartner}</small>
                    </div>
                    <span style={{ background: '#10b981', width: '10px', height: '10px', borderRadius: '50%' }}></span>
                  </div>

                  <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: 'var(--bg-app)' }}>
                    {supportMessages.length === 0 && (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '80px' }}>
                        <MessageSquare size={36} style={{ marginBottom: '10px' }} />
                        <p>Send a message to Admin Support. Replies from admin will appear here.</p>
                      </div>
                    )}
                    {supportMessages.map((m) => {
                      const isMine = (m.senderId?._id || m.senderId) === (user?._id || user?.id);
                      return (
                      <div key={m._id} style={{ 
                        alignSelf: isMine ? 'flex-end' : 'flex-start',
                        maxWidth: '75%',
                        background: isMine ? '#da291c' : 'var(--bg-card)',
                        color: isMine ? 'white' : 'var(--text-main)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        borderBottomRightRadius: isMine ? '0' : '12px',
                        borderBottomLeftRadius: isMine ? '12px' : '0',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      }}>
                        <strong style={{ fontSize: '10px', display: 'block', opacity: 0.8, marginBottom: '4px' }}>
                          {isMine ? user.fullname : m.senderId?.role === 'admin' ? 'Admin Support' : m.senderId?.fullname}
                        </strong>
                        <span style={{ fontSize: '14px' }}>{m.text}</span>
                      </div>
                    )})}
                  </div>

                  <form onSubmit={handleSendChatMessage} style={{ display: 'flex', padding: '15px', gap: '10px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                    <input type="text" placeholder="Type a message for admin support..." value={newChatMessage} onChange={e => setNewChatMessage(e.target.value)} />
                    <button type="submit" className="btn-primary" style={{ background: '#da291c' }}>Send</button>
                  </form>
                </div>
              )}

              {/* ADMIN PANEL VIEW */}
              {view === 'admin-panel' && user.role === 'admin' && (
                <div className="no-print">
                  <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>System Administrator Dashboard</h3>
                  
                  {/* Stats Badges */}
                  {adminStats && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                      <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Registered Users</span>
                        <h4 style={{ fontSize: '24px', fontWeight: '800', margin: '5px 0' }}>{adminStats.totalUsers}</h4>
                        <small style={{ color: 'var(--text-muted)' }}>{adminStats.landlords} Landlords, {adminStats.tenants} Tenants</small>
                      </div>
                      <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Listings</span>
                        <h4 style={{ fontSize: '24px', fontWeight: '800', margin: '5px 0' }}>{adminStats.totalProperties}</h4>
                        <small style={{ color: 'var(--text-muted)' }}>{adminStats.verifiedProperties} Verified, {adminStats.pendingProperties} Pending</small>
                      </div>
                      <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Bookings</span>
                        <h4 style={{ fontSize: '24px', fontWeight: '800', margin: '5px 0' }}>{adminStats.totalBookings}</h4>
                        <small style={{ color: 'var(--text-muted)' }}>{adminStats.approvedBookings} Approved deals</small>
                      </div>
                      <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Report Tickets</span>
                        <h4 style={{ fontSize: '24px', fontWeight: '800', margin: '5px 0' }}>{adminStats.totalReports}</h4>
                        <small style={{ color: '#da291c', fontWeight: 'bold' }}>{adminStats.pendingReports} Actions Pending</small>
                      </div>
                    </div>
                  )}

                  {/* Admin Support Chat Inbox */}
                  <div className="glass-card" style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div>
                        <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>Admin Support Inbox</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Reply to tenant and landlord messages from the chat room.</p>
                      </div>
                      <button onClick={loadData} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>Refresh</button>
                    </div>

                    {adminChatThreads.length === 0 ? (
                      <div style={{ padding: '35px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                        <MessageSquare size={34} style={{ marginBottom: '10px' }} />
                        <p>No tenant or landlord support messages yet.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: '18px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '430px', overflowY: 'auto' }}>
                          {adminChatThreads.map(thread => (
                            <button
                              key={thread.user._id}
                              onClick={() => setSelectedAdminChatUserId(thread.user._id)}
                              className="btn-secondary"
                              style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                textAlign: 'left',
                                border: '1px solid var(--border-color)',
                                background: (selectedAdminChatUserId || selectedAdminThread?.user?._id) === thread.user._id ? 'var(--border-color)' : 'transparent',
                                padding: '12px'
                              }}
                            >
                              <div>
                                <strong style={{ display: 'block', color: 'var(--text-main)' }}>{thread.user.fullname}</strong>
                                <small style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{thread.user.role} • {thread.user.email}</small>
                                <span style={{ display: 'block', marginTop: '6px', color: 'var(--text-muted)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>
                                  {thread.lastMessage?.senderRole === 'admin' ? 'Admin: ' : ''}{thread.lastMessage?.text}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', minHeight: '430px', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ padding: '14px 16px', background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)' }}>
                            <strong>{selectedAdminThread?.user?.fullname || 'Select a chat'}</strong>
                            {selectedAdminThread?.user && (
                              <small style={{ display: 'block', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                                {selectedAdminThread.user.role} support conversation
                              </small>
                            )}
                          </div>

                          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-app)' }}>
                            {selectedAdminThread?.messages?.map(message => {
                              const fromAdmin = message.senderRole === 'admin';
                              return (
                                <div
                                  key={message._id}
                                  style={{
                                    alignSelf: fromAdmin ? 'flex-end' : 'flex-start',
                                    maxWidth: '78%',
                                    background: fromAdmin ? '#da291c' : 'var(--bg-card)',
                                    color: fromAdmin ? '#ffffff' : 'var(--text-main)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '10px',
                                    padding: '10px 12px'
                                  }}
                                >
                                  <strong style={{ display: 'block', fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>
                                    {fromAdmin ? 'Admin Support' : message.senderId?.fullname}
                                  </strong>
                                  <span style={{ fontSize: '14px' }}>{message.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          <form onSubmit={handleAdminReply} style={{ display: 'flex', gap: '10px', padding: '14px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                            <input
                              type="text"
                              placeholder="Reply as admin..."
                              value={adminReplyText}
                              onChange={e => setAdminReplyText(e.target.value)}
                              disabled={!selectedAdminThread}
                            />
                            <button type="submit" className="btn-primary" style={{ background: '#da291c' }} disabled={!selectedAdminThread}>
                              Reply
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Property Verification Grid */}
                  <div className="glass-card" style={{ marginBottom: '30px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px' }}>Property Verification Queue</h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '13px' }}>
                            <th style={{ padding: '12px' }}>Property Title</th>
                            <th style={{ padding: '12px' }}>District</th>
                            <th style={{ padding: '12px' }}>Price</th>
                            <th style={{ padding: '12px' }}>Landlord</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {properties.map(p => (
                            <tr key={p._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '14px' }}>
                              <td style={{ padding: '12px', fontWeight: 'bold' }}>{p.title}</td>
                              <td style={{ padding: '12px' }}>{p.district}</td>
                              <td style={{ padding: '12px' }}>Rs. {p.price}</td>
                              <td style={{ padding: '12px' }}>{p.landlordId?.fullname || 'Unknown'}</td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ 
                                  padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                                  background: p.verified ? 'var(--success-light)' : 'var(--accent-light)',
                                  color: p.verified ? 'var(--success)' : 'var(--accent)'
                                }}>
                                  {p.verified ? 'Verified' : 'Pending'}
                                </span>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <button 
                                  onClick={() => handleVerifyProperty(p._id, !p.verified)} 
                                  className="btn-secondary" 
                                  style={{ padding: '5px 10px', fontSize: '12px' }}
                                >
                                  {p.verified ? 'Reject / Revoke' : 'Approve & Verify'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                   {/* Registered Users Table */}
                  <div className="glass-card" style={{ marginBottom: '30px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px' }}>Registered User Accounts</h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '13px' }}>
                            <th style={{ padding: '12px' }}>Profile</th>
                            <th style={{ padding: '12px' }}>Full Name</th>
                            <th style={{ padding: '12px' }}>Email</th>
                            <th style={{ padding: '12px' }}>Phone</th>
                            <th style={{ padding: '12px' }}>Role</th>
                            <th style={{ padding: '12px' }}>Land/Citizenship Doc</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminUsers.map(u => (
                            <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '14px' }}>
                              <td style={{ padding: '12px' }}>
                                {u.profilePicture ? (
                                  <img src={`http://127.0.0.1:5000/${u.profilePicture}`} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                                ) : (
                                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>{u.fullname[0]}</div>
                                )}
                              </td>
                              <td style={{ padding: '12px', fontWeight: 'bold' }}>{u.fullname}</td>
                              <td style={{ padding: '12px' }}>{u.email}</td>
                              <td style={{ padding: '12px' }}>{u.phone}</td>
                              <td style={{ padding: '12px', textTransform: 'capitalize' }}>{u.role}</td>
                              <td style={{ padding: '12px' }}>
                                {u.role === 'landlord' && u.citizenshipDoc ? (
                                  <a href={`http://127.0.0.1:5000/${u.citizenshipDoc}`} target="_blank" rel="noopener noreferrer" style={{ color: '#da291c', fontWeight: 'bold', textDecoration: 'underline' }}>
                                    View Land Doc
                                  </a>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)' }}>N/A</span>
                                )}
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ 
                                  padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                                  background: u.banned ? 'var(--accent-light)' : 'var(--success-light)',
                                  color: u.banned ? 'var(--accent)' : 'var(--success)'
                                }}>
                                  {u.banned ? 'Suspended' : 'Active'}
                                </span>
                              </td>
                              <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                <button 
                                  onClick={() => handleToggleBan(u._id)} 
                                  className="btn-accent" 
                                  style={{ padding: '5px 10px', fontSize: '12px', background: u.banned ? '#10b981' : '#da291c' }}
                                >
                                  {u.banned ? 'Unban' : 'Ban'}
                                </button>
                                {u.role === 'landlord' && (
                                  <button 
                                    onClick={() => handleToggleVerifyLandlord(u._id)} 
                                    className="btn-secondary" 
                                    style={{ padding: '5px 10px', fontSize: '12px' }}
                                  >
                                    {u.verified ? 'Revoke Verify' : 'Verify Owner'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Abuse Reports Tickets */}
                  <div className="glass-card">
                    <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px' }}>Abuse & Moderation Report Tickets</h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '13px' }}>
                            <th style={{ padding: '12px' }}>Reporter</th>
                            <th style={{ padding: '12px' }}>Target Type</th>
                            <th style={{ padding: '12px' }}>Reason / Details</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminReports.map(r => (
                            <tr key={r._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '14px' }}>
                              <td style={{ padding: '12px' }}>
                                <strong>{r.reporterId?.fullname}</strong><br/>
                                <small style={{ color: 'var(--text-muted)' }}>📞 {r.reporterId?.phone}</small>
                              </td>
                              <td style={{ padding: '12px' }}>{r.targetType}</td>
                              <td style={{ padding: '12px', maxWidth: '300px' }}>
                                <strong>Reason:</strong> {r.reason}<br/>
                                <small style={{ color: '#da291c' }}>
                                  Target: {r.targetDetail?.title || r.targetDetail?.fullname || 'Unknown'}
                                </small>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ 
                                  padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                                  background: r.status === 'Resolved' ? 'var(--success-light)' : 'var(--accent-light)',
                                  color: r.status === 'Resolved' ? 'var(--success)' : 'var(--accent)'
                                }}>
                                  {r.status}
                                </span>
                              </td>
                              <td style={{ padding: '12px' }}>
                                {r.status === 'Pending' && (
                                  <button 
                                    onClick={() => handleResolveReport(r._id)} 
                                    className="btn-secondary" 
                                    style={{ padding: '5px 10px', fontSize: '12px' }}
                                  >
                                    Mark Resolved
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                          {adminReports.length === 0 && (
                            <tr>
                              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No abuse report tickets submitted yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bookings & Payments System Monitoring */}
                  <div className="glass-card" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px' }}>Bookings & Payments System Monitoring</h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '13px' }}>
                            <th style={{ padding: '12px' }}>Tenant (User)</th>
                            <th style={{ padding: '12px' }}>Landlord (Owner)</th>
                            <th style={{ padding: '12px' }}>Property Details</th>
                            <th style={{ padding: '12px' }}>Price & Offer</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Payment Info</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminBookings && adminBookings.map(b => (
                            <tr key={b._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '14px' }}>
                              <td style={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {b.tenantId?.profilePicture ? (
                                    <img src={`http://127.0.0.1:5000/${b.tenantId.profilePicture}`} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                                  ) : (
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>T</div>
                                  )}
                                  <div>
                                    <strong>{b.tenantId?.fullname || 'Unknown'}</strong><br/>
                                    <small style={{ color: 'var(--text-muted)' }}>{b.tenantId?.phone}</small>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {b.landlordId?.profilePicture ? (
                                    <img src={`http://127.0.0.1:5000/${b.landlordId.profilePicture}`} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                                  ) : (
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>L</div>
                                  )}
                                  <div>
                                    <strong>{b.landlordId?.fullname || 'Unknown'}</strong><br/>
                                    <small style={{ color: 'var(--text-muted)' }}>{b.landlordId?.phone}</small>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <strong>{b.propertyId?.title || 'Removed Property'}</strong><br/>
                                <small style={{ color: 'var(--text-muted)' }}>📍 {b.propertyId?.location || 'Unknown'}, {b.propertyId?.municipality}, {b.propertyId?.district}</small>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ fontWeight: 'bold', color: '#da291c' }}>Rs. {b.price}</span><br/>
                                <small style={{ color: 'var(--text-muted)' }}>Offer: {b.offer || 'None'}</small>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ 
                                  padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                                  background: b.status === 'Completed' || b.status === 'Approved' || b.status === 'Accepted' ? 'var(--success-light)' : b.status === 'Rejected' ? 'var(--accent-light)' : 'rgba(251, 191, 36, 0.2)',
                                  color: b.status === 'Completed' || b.status === 'Approved' || b.status === 'Accepted' ? 'var(--success)' : b.status === 'Rejected' ? 'var(--accent)' : '#d97706'
                                }}>
                                  {b.status}
                                </span>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ fontWeight: 'bold', color: b.paymentStatus === 'Paid' ? 'var(--success)' : 'var(--accent)' }}>
                                  {b.paymentStatus}
                                </span><br/>
                                <small style={{ color: 'var(--text-muted)' }}>Method: {b.paymentMethod}</small>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <button 
                                  onClick={() => {
                                    setEditingBooking(b);
                                    setEditBookingPrice(b.price);
                                    setEditBookingOffer(b.offer || '');
                                    setEditBookingLocation(b.propertyId?.location || '');
                                    setEditBookingStatus(b.status);
                                    setEditBookingPayStatus(b.paymentStatus || 'Pending');
                                    setEditBookingPayMethod(b.paymentMethod || 'None');
                                  }}
                                  className="btn-primary" 
                                  style={{ padding: '5px 10px', fontSize: '12px', background: '#1e3a8a' }}
                                >
                                  Manage
                                </button>
                              </td>
                            </tr>
                          ))}
                          {(!adminBookings || adminBookings.length === 0) && (
                            <tr>
                              <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No bookings recorded in the system yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Booking Edit Modal */}
                  {editingBooking && (
                    <div style={{
                      position: 'fixed',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1000,
                      padding: '20px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', padding: '25px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                          <h4 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Manage Booking & Payments</h4>
                          <button onClick={() => setEditingBooking(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
                            <X size={20} />
                          </button>
                        </div>

                        <form onSubmit={handleUpdateAdminBooking} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: 'var(--text-main)', textAlign: 'left' }}>Rent Price (NPR)</label>
                            <input type="number" value={editBookingPrice} onChange={e => setEditBookingPrice(e.target.value)} required style={{ width: '100%' }} />
                          </div>

                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: 'var(--text-main)', textAlign: 'left' }}>Negotiation Offer / Discount Info</label>
                            <input type="text" value={editBookingOffer} onChange={e => setEditBookingOffer(e.target.value)} placeholder="e.g., Rs. 500 off first month" style={{ width: '100%' }} />
                          </div>

                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: 'var(--text-main)', textAlign: 'left' }}>Property Street Location</label>
                            <input type="text" value={editBookingLocation} onChange={e => setEditBookingLocation(e.target.value)} placeholder="e.g., Kirtipur ward 3, Town planning" style={{ width: '100%' }} />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: 'var(--text-main)', textAlign: 'left' }}>Booking Status</label>
                              <select value={editBookingStatus} onChange={e => setEditBookingStatus(e.target.value)} style={{ width: '100%' }}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>

                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: 'var(--text-main)', textAlign: 'left' }}>Payment Status</label>
                              <select value={editBookingPayStatus} onChange={e => setEditBookingPayStatus(e.target.value)} style={{ width: '100%' }}>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Failed">Failed</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: 'var(--text-main)', textAlign: 'left' }}>Payment Method</label>
                            <select value={editBookingPayMethod} onChange={e => setEditBookingPayMethod(e.target.value)} style={{ width: '100%' }}>
                              <option value="None">None</option>
                              <option value="Khalti">Khalti (Nepal)</option>
                              <option value="eSewa">eSewa (Nepal)</option>
                              <option value="Stripe">Stripe (Card)</option>
                              <option value="Cash">Hand Cash</option>
                            </select>
                          </div>

                          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="button" onClick={() => setEditingBooking(null)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                            <button type="submit" className="btn-primary" style={{ flex: 1, background: '#da291c' }}>Save Updates</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </main>
          </div>
        )}

      </div>

      {/* RENTAL AGREEMENT DETAIL VIEW MODAL (PRINT AND VIEW COMPONENT) */}
      {selectedAgreement && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.85)', zIndex: 5000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          overflowY: 'auto'
        }}>
          <div className="glass-card print-agreement" style={{ width: '100%', maxWidth: '800px', background: '#ffffff', color: '#1e293b', maxHeight: '95vh', overflowY: 'auto', padding: '40px' }}>
            
            {/* Control buttons */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <button onClick={() => window.print()} className="btn-primary" style={{ background: '#da291c' }}>🖨️ Print / Save as PDF</button>
              <button onClick={() => setSelectedAgreement(null)} className="btn-secondary">Close View</button>
            </div>

            {/* Official Looking Document Header */}
            <div style={{ border: '4px double #1a365d', padding: '24px', background: '#f8fafc', position: 'relative' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px' }}>🇳🇵</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a365d', textTransform: 'uppercase', margin: '5px 0' }}>Digital Rental Agreement</h2>
                <h3 style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>SmartBasai Housing Registry, Nepal</h3>
                <small style={{ color: '#94a3b8' }}>Doc ID: {selectedAgreement._id}</small>
              </div>

              <hr style={{ border: 'none', borderTop: '2px solid #1a365d', margin: '20px 0' }} />

              {/* Lease Content */}
              <div style={{ fontSize: '14px', lineHeight: '1.7', textAlign: 'justify' }}>
                <p>This digital lease contract is created and signed on <strong>{new Date(selectedAgreement.createdAt).toLocaleDateString()}</strong> by and between:</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '15px 0', background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <strong>FIRST PARTY (LANDLORD):</strong><br/>
                    Full Name: {selectedAgreement.landlordId?.fullname}<br/>
                    Email: {selectedAgreement.landlordId?.email}<br/>
                    Phone: {selectedAgreement.landlordId?.phone}
                  </div>
                  <div>
                    <strong>SECOND PARTY (TENANT):</strong><br/>
                    Full Name: {selectedAgreement.tenantId?.fullname}<br/>
                    Email: {selectedAgreement.tenantId?.email}<br/>
                    Phone: {selectedAgreement.tenantId?.phone}
                  </div>
                </div>

                <p>Whereas, the Landlord agrees to rent out and the Tenant agrees to occupy the property asset detailed below:</p>
                <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '15px 0' }}>
                  <strong>PROPERTY DETAILS:</strong><br/>
                  Title: {selectedAgreement.propertyId?.title}<br/>
                  Location: {selectedAgreement.propertyId?.location}, {selectedAgreement.propertyId?.municipality}, {selectedAgreement.propertyId?.district}<br/>
                  Asset Type: {selectedAgreement.propertyId?.propertyType}<br/>
                  Monthly Rental Charge: <strong>Rs. {selectedAgreement.propertyId?.price} NPR</strong>
                </div>

                <p>Both parties mutually agree to the following lease dates and regulatory terms:</p>
                <ul>
                  <li><strong>Lease Term Period:</strong> Valid from <strong>{new Date(selectedAgreement.startDate).toLocaleDateString()}</strong> to <strong>{new Date(selectedAgreement.endDate).toLocaleDateString()}</strong>.</li>
                  <li><strong>Tenant Obligations:</strong> The Tenant agrees to pay the monthly rental fee on time and avoid damage to building assets.</li>
                  <li><strong>Landlord Obligations:</strong> The Landlord agrees to ensure supply of basic utilities (water, electricity).</li>
                </ul>

                <div style={{ marginTop: '20px', whiteSpace: 'pre-line', background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
                  <strong>SPECIAL TERMS & CONDITIONS:</strong><br/>
                  {selectedAgreement.terms}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '18px', color: '#1e3a8a', height: '40px' }}>
                      {selectedAgreement.landlordSignature}
                    </div>
                    <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '5px', fontSize: '12px' }}>
                      <strong>Landlord Digital Signature</strong><br/>
                      IP Stamp Verified
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '18px', color: '#1e3a8a', height: '40px' }}>
                      {selectedAgreement.tenantSignature}
                    </div>
                    <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '5px', fontSize: '12px' }}>
                      <strong>Tenant Digital Signature</strong><br/>
                      IP Stamp Verified
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* REPORT SUBMISSION DIALOG MODAL */}
      {reportTargetId && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '450px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#da291c' }}>🚨 File Abuse/Fraud Report</h4>
              <button onClick={() => setReportTargetId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmitReport} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Please provide concrete reasons for reporting this property/user. The SmartBasai administration team will review and ban fraudulent accounts.
              </p>
              
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Reason for Report</label>
                <textarea 
                  placeholder="e.g. The listing uses fake pictures, or the landlord is demanding booking payment outside the app, or the property does not exist." 
                  value={reportReason} 
                  onChange={e => setReportReason(e.target.value)} 
                  style={{ minHeight: '100px' }} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-accent" style={{ flex: 1, background: '#da291c' }}>Submit Report</button>
                <button type="button" onClick={() => setReportTargetId(null)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
