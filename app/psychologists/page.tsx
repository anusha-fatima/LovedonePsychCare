// app/psychologists/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    Heart,
    Star,
    Video,
    Calendar,
    MessageCircle,
    Shield,
    Award,
    Clock,
    MapPin,
    CheckCircle,
    Filter,
    Search,
    ChevronRight,
    Sparkles,
    Users,
    Brain,
    Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Fake psychologist data
const psychologists = [
    {
        id: 1,
        name: "Dr. Ayesha Khan",
        title: "Clinical Psychologist",
        specialization: ["Anxiety", "Depression", "Trauma"],
        experience: "12+ years",
        sessions: 2450,
        rating: 4.9,
        reviews: 328,
        location: "Lahore",
        languages: ["English", "Urdu"],
        verified: true,
        image: "/psychologist-1.jpg",
        price: "Rs. 3,500/session",
        nextAvailable: "Today, 2:00 PM",
        education: "PhD Clinical Psychology - Punjab University",
        about: "Dr. Ayesha specializes in helping adults overcome anxiety, depression, and trauma using evidence-based approaches like CBT and EMDR."
    },
    {
        id: 2,
        name: "Dr. Bilal Ahmed",
        title: "Psychiatrist",
        specialization: ["OCD", "Bipolar Disorder", "ADHD"],
        experience: "15+ years",
        sessions: 3890,
        rating: 4.8,
        reviews: 456,
        location: "Karachi",
        languages: ["English", "Urdu", "Sindhi"],
        online: true,
        verified: true,
        image: "/psychologist-2.jpg",
        price: "Rs. 4,000/session",
        nextAvailable: "Tomorrow, 10:00 AM",
        education: "MD Psychiatry - Dow University",
        about: "Dr. Bilal is a board-certified psychiatrist with expertise in medication management and psychotherapy for complex mental health conditions."
    },
    {
        id: 3,
        name: "Ms. Sana Farooq",
        title: "Counseling Psychologist",
        specialization: ["Relationship Issues", "Stress", "Self-esteem"],
        experience: "8+ years",
        sessions: 1870,
        rating: 4.9,
        reviews: 234,
        location: "Islamabad",
        languages: ["English", "Urdu"],
        online: true,
        verified: true,
        image: "/psychologist-3.jpg",
        price: "Rs. 3,000/session",
        nextAvailable: "Today, 4:30 PM",
        education: "MSc Counseling Psychology - NUST",
        about: "Sana creates a warm, non-judgmental space for clients to explore relationships, build confidence, and navigate life transitions."
    },
    {
        id: 4,
        name: "Dr. Omar Raza",
        title: "Clinical Psychologist",
        specialization: ["PTSD", "Phobias", "Sleep Disorders"],
        experience: "10+ years",
        sessions: 2100,
        rating: 4.7,
        reviews: 189,
        location: "Rawalpindi",
        languages: ["English", "Urdu", "Punjabi"],
        online: false,
        verified: true,
        image: "/psychologist-4.jpg",
        price: "Rs. 3,800/session",
        nextAvailable: "Thu, 11:00 AM",
        education: "PhD Clinical Psychology - Quaid-i-Azam University",
        about: "Dr. Omar specializes in trauma-focused therapies and has extensive experience working with veterans and first responders."
    },
    {
        id: 5,
        name: "Ms. Zara Tariq",
        title: "Child Psychologist",
        specialization: ["Child Therapy", "Parenting", "ADHD"],
        experience: "7+ years",
        sessions: 1650,
        rating: 5.0,
        reviews: 278,
        location: "Lahore",
        languages: ["English", "Urdu"],
        online: true,
        verified: true,
        image: "/psychologist-5.jpg",
        price: "Rs. 3,200/session",
        nextAvailable: "Today, 3:00 PM",
        education: "MSc Child Psychology - Beaconhouse University",
        about: "Zara creates engaging, play-based therapy sessions for children and provides compassionate guidance for parents."
    },
    {
        id: 6,
        name: "Dr. Fatima Hassan",
        title: "Neuropsychologist",
        specialization: ["Memory Issues", "Brain Injury", "Dementia"],
        experience: "14+ years",
        sessions: 2980,
        rating: 4.9,
        reviews: 412,
        location: "Karachi",
        languages: ["English", "Urdu"],
        online: false,
        verified: true,
        image: "/psychologist-6.jpg",
        price: "Rs. 4,500/session",
        nextAvailable: "Fri, 9:00 AM",
        education: "PhD Neuropsychology - Aga Khan University",
        about: "Dr. Fatima provides comprehensive neuropsychological assessments and cognitive rehabilitation strategies."
    }
];

const specialties = [
    "All", "Anxiety", "Depression", "Trauma", "Relationship Issues",
    "Child Therapy", "Addiction", "OCD", "Stress Management", "Sleep Disorders"
];

export default function PsychologistsPage() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPsychologist, setSelectedPsychologist] = useState<typeof psychologists[0] | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();
        window.addEventListener('themeChange', checkDarkMode);
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true });
        return () => {
            window.removeEventListener('themeChange', checkDarkMode);
            observer.disconnect();
        };
    }, []);

    if (!mounted) return null;

    // Light theme colors (Dark text for light background)
    const lightColors = {
        textPrimary: '#0f172a', // Dark slate
        textSecondary: '#334155', // Slate-700
        textTertiary: '#475569', // Slate-600
        buttonGradient: 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))',
        cardBg: 'rgba(255,255,255,0.7)',
        cardBorder: '1px solid rgba(171,196,255,0.3)',
        badgeBg: 'rgba(255,255,255,0.8)',
        badgeBorder: '1px solid rgba(171,196,255,0.4)',
        featureBg: 'rgba(120,137,179,0.12)',
        featureBorder: '1px solid rgba(120,137,179,0.25)',
        iconBg: 'rgba(120,137,179,0.15)',
        heroBg: 'linear-gradient(135deg, rgb(237,242,251), rgb(226,234,252))',
    };

    // Dark theme colors (Light text for dark background)
    const darkColors = {
        textPrimary: '#f1f5f9', // Light slate
        textSecondary: '#cbd5e1', // Slate-300
        textTertiary: '#94a3b8', // Slate-400
        buttonGradient: 'linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254), rgb(204,219,253))',
        cardBg: 'rgba(255,255,255,0.08)',
        cardBorder: '1px solid rgba(200,220,255,0.15)',
        badgeBg: 'rgba(15,23,42,0.8)',
        badgeBorder: '1px solid rgba(200,220,255,0.2)',
        featureBg: 'rgba(171,196,255,0.12)',
        featureBorder: '1px solid rgba(171,196,255,0.2)',
        iconBg: 'rgba(171,196,255,0.15)',
        heroBg: 'linear-gradient(135deg, rgb(15,23,42), rgb(30,41,59))',
    };

    const colors = isDark ? darkColors : lightColors;

    const filteredPsychologists = psychologists.filter(psych => {
        const matchesSpecialty = selectedSpecialty === "All" ||
            psych.specialization.includes(selectedSpecialty);
        const matchesSearch = psych.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            psych.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSpecialty && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: colors.heroBg,
                    }}
                />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        background: isDark
                            ? 'radial-gradient(circle at 30% 30%, rgb(171,196,255), transparent)'
                            : 'radial-gradient(circle at 30% 30%, rgb(120,137,179), transparent)',
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 transition-all duration-300"
                            style={{
                                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
                                border: isDark ? '1px solid rgba(200,220,255,0.2)' : '1px solid rgba(171,196,255,0.3)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <Heart className="w-4 h-4" style={{ color: colors.textPrimary }} />
                            <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                                Expert Mental Health Professionals
                            </span>
                        </div>

                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
                            style={{ backgroundImage: colors.buttonGradient }}
                        >
                            Find Your Perfect Therapist
                        </h1>

                        <p className="text-xl mb-8 transition-colors duration-300" style={{ color: colors.textSecondary }}>
                            Psychologists committed to good thinking, feeling & doing.
                            Connect with licensed professionals who understand Pakistani culture.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textTertiary }} />
                                <input
                                    type="text"
                                    placeholder="Search by name or specialty..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-full transition-all duration-300 focus:ring-2 focus:outline-none"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
                                        border: `1px solid ${isDark ? 'rgba(200,220,255,0.2)' : 'rgba(171,196,255,0.3)'}`,
                                        color: colors.textPrimary,
                                    }}
                                />
                            </div>
                            <Button
                                size="lg"
                                className="shadow-lg hover:scale-105 transition-all duration-300 border-0"
                                style={{ background: colors.buttonGradient, color: isDark ? '#0f172a' : '#ffffff' }}
                            >
                                Find Therapist
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2
                                className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
                                style={{ backgroundImage: colors.buttonGradient }}
                            >
                                Our values
                            </h2>
                            <p className="text-lg mb-6 transition-colors duration-300" style={{ color: colors.textSecondary }}>
                                We are a collaborative team of independent psychologists with a shared mission
                                to provide good resources and care to:
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {["Children", "Teens", "Young Adults", "Parents"].map((group, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <Users className="w-4 h-4" style={{ color: colors.textPrimary }}/>
                                        <span style={{ color: colors.textPrimary }}>{group}</span>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="p-6 rounded-2xl transition-all duration-300"
                                style={{
                                    background: colors.cardBg,
                                    border: colors.cardBorder,
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
                                    OUR PHILOSOPHY IS SIMPLE:
                                </h3>
                                <p style={{ color: colors.textSecondary }}>
                                    Mental healthcare should be approachable, accessible, and designed for you.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Shield, text: "Licensed Professionals" },
                                    { icon: Award, text: "Evidence-Based Care" },
                                    { icon: Clock, text: "Flexible Scheduling" },
                                    { icon: Video, text: "Online Sessions" }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-4 rounded-xl text-center transition-all duration-300"
                                        style={{
                                            background: colors.cardBg,
                                            border: colors.cardBorder,
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: colors.textPrimary }} />
                                        <span className="text-sm" style={{ color: colors.textPrimary }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Specialties Filter */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {specialties.map((specialty) => (
                            <button
                                key={specialty}
                                onClick={() => setSelectedSpecialty(specialty)}
                                className="px-5 py-2 rounded-full transition-all duration-300"
                                style={{
                                    background: selectedSpecialty === specialty
                                        ? colors.buttonGradient
                                        : colors.cardBg,
                                    border: selectedSpecialty === specialty
                                        ? 'none'
                                        : colors.cardBorder,
                                    color: selectedSpecialty === specialty 
                                        ? (isDark ? '#0f172a' : '#ffffff') 
                                        : colors.textPrimary,
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                {specialty}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Psychologists Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPsychologists.map((psych, index) => (
                            <motion.div
                                key={psych.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedPsychologist(psych)}
                                className="cursor-pointer"
                            >
                                <div
                                    className="rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                    style={{
                                        background: colors.cardBg,
                                        border: colors.cardBorder,
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <div
                                        className="relative h-48 flex items-center justify-center"
                                        style={{ background: colors.buttonGradient }}
                                    >
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="relative z-10 text-center">
                                            <div
                                                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-3"
                                                style={{
                                                    background: 'rgba(255,255,255,0.2)',
                                                    backdropFilter: 'blur(10px)',
                                                }}
                                            >
                                                <span className="text-4xl font-bold text-white">
                                                    {psych.name.charAt(0)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{psych.name}</h3>
                                            <p className="text-white/90 text-sm">{psych.title}</p>
                                        </div>
                                        {psych.verified && (
                                            <div className="absolute top-4 left-4">
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 fill-current" style={{ color: colors.textPrimary }} />
                                                <span className="font-semibold" style={{ color: colors.textPrimary }}>{psych.rating}</span>
                                                <span className="text-xs" style={{ color: colors.textTertiary }}>
                                                    ({psych.reviews} reviews)
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="w-3 h-3" style={{ color: colors.textTertiary }} />
                                                <span className="text-xs" style={{ color: colors.textTertiary }}>
                                                    {psych.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {psych.specialization.slice(0, 3).map((spec, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 rounded-full transition-all duration-300"
                                                    style={{
                                                        backgroundColor: colors.featureBg,
                                                        border: colors.featureBorder,
                                                        color: colors.textSecondary,
                                                    }}
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span style={{ color: colors.textTertiary }}>Experience</span>
                                                <span className="font-medium" style={{ color: colors.textSecondary }}>{psych.experience}</span>
                                            </div>
                    
                                            <div className="flex items-center justify-between text-sm">
                                                <span style={{ color: colors.textTertiary }}>Languages</span>
                                                <span className="font-medium" style={{ color: colors.textSecondary }}>{psych.languages.join(", ")}</span>
                                            </div>
                                        </div>

                                        <div
                                            className="border-t pt-4"
                                            style={{ borderColor: isDark ? 'rgba(200,220,255,0.1)' : 'rgba(171,196,255,0.15)' }}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
                                                    {psych.price}
                                                </span>
                                                <span className="text-xs" style={{ color: colors.textTertiary }}>
                                                    Next: {psych.nextAvailable}
                                                </span>
                                            </div>
                                            <Button
                                                className="w-full shadow-md hover:shadow-xl transition-all duration-300"
                                                style={{ background: colors.buttonGradient, color: isDark ? '#0f172a' : '#ffffff' }}
                                            >
                                                View Profile
                                                <ChevronRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Therapist Profile Modal */}
            {selectedPsychologist && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setSelectedPsychologist(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl transition-all duration-300"
                        style={{
                            background: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(20px)',
                            border: isDark ? '1px solid rgba(200,220,255,0.15)' : '1px solid rgba(171,196,255,0.25)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSubscribed ? (
                            // Full profile for subscribed users
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2
                                            className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
                                            style={{ backgroundImage: colors.buttonGradient }}
                                        >
                                            {selectedPsychologist.name}
                                        </h2>
                                        <p className="text-lg" style={{ color: colors.textSecondary }}>{selectedPsychologist.title}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPsychologist(null)}
                                        className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
                                        style={{ color: colors.textPrimary }}
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>About</h3>
                                            <p className="leading-relaxed" style={{ color: colors.textSecondary }}>{selectedPsychologist.about}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>Education</h3>
                                            <p style={{ color: colors.textSecondary }}>{selectedPsychologist.education}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>Specializations</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPsychologist.specialization.map((spec, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-full text-sm transition-all duration-300"
                                                        style={{
                                                            background: colors.featureBg,
                                                            border: colors.featureBorder,
                                                            color: colors.textSecondary,
                                                        }}
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div
                                            className="p-4 rounded-xl transition-all duration-300"
                                            style={{
                                                background: colors.cardBg,
                                                border: colors.cardBorder,
                                                backdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <div className="text-center mb-4">
                                                <div
                                                    className="text-2xl font-bold bg-clip-text text-transparent"
                                                    style={{ backgroundImage: colors.buttonGradient }}
                                                >
                                                    {selectedPsychologist.price}
                                                </div>
                                                <p className="text-sm" style={{ color: colors.textTertiary }}>per session</p>
                                            </div>
                                            <Button className="w-full mb-3" style={{ background: colors.buttonGradient, color: isDark ? '#0f172a' : '#ffffff' }}>
                                                <Calendar className="mr-2 w-4 h-4" />
                                                Book Session
                                            </Button>
                                            <Button variant="outline" className="w-full" style={{ color: colors.textPrimary, borderColor: isDark ? 'rgba(200,220,255,0.2)' : 'rgba(171,196,255,0.3)' }}>
                                                <MessageCircle className="mr-2 w-4 h-4" />
                                                Send Message
                                            </Button>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl transition-all duration-300"
                                            style={{
                                                background: colors.cardBg,
                                                border: colors.cardBorder,
                                                backdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <h4 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>Session Info</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span style={{ color: colors.textTertiary }}>Duration</span>
                                                    <span style={{ color: colors.textSecondary }}>50 minutes</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span style={{ color: colors.textTertiary }}>Next Available</span>
                                                    <span style={{ color: colors.textSecondary }}>{selectedPsychologist.nextAvailable}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span style={{ color: colors.textTertiary }}>Languages</span>
                                                    <span style={{ color: colors.textSecondary }}>{selectedPsychologist.languages.join(", ")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Subscribe prompt for non-subscribed users
                            <div className="p-12 text-center">
                                <Lock className="w-16 h-16 mx-auto mb-6" style={{ color: isDark ? 'rgb(171,196,255)' : 'rgb(120,137,179)' }} />
                                <h2
                                    className="text-2xl font-bold mb-4 bg-clip-text text-transparent"
                                    style={{ backgroundImage: colors.buttonGradient }}
                                >
                                    Subscribe to View Full Profile
                                </h2>
                                <p className="mb-8 max-w-md mx-auto" style={{ color: colors.textSecondary }}>
                                    Get access to detailed therapist profiles, book sessions, and receive personalized mental health support.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button
                                        onClick={() => {
                                            setShowSubscribeModal(true);
                                            setSelectedPsychologist(null);
                                        }}
                                        style={{ background: colors.buttonGradient, color: isDark ? '#0f172a' : '#ffffff' }}
                                    >
                                        Subscribe Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedPsychologist(null)}
                                        style={{ color: colors.textPrimary, borderColor: isDark ? 'rgba(200,220,255,0.2)' : 'rgba(171,196,255,0.3)' }}
                                    >
                                        Maybe Later
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="rounded-3xl p-12 text-center relative overflow-hidden transition-all duration-300"
                        style={{
                            background: colors.cardBg,
                            border: colors.cardBorder,
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <div className="absolute inset-0 opacity-10" style={{ background: colors.buttonGradient }} />
                        <div className="relative z-10">
                            <h2
                                className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
                                style={{ backgroundImage: colors.buttonGradient }}
                            >
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                                Take the first step toward better mental health. Book a session with one of our expert psychologists today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" style={{ background: colors.buttonGradient, color: isDark ? '#0f172a' : '#ffffff' }}>
                                    Book Appointment
                                    <Calendar className="ml-2 w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" style={{ color: colors.textPrimary, borderColor: isDark ? 'rgba(200,220,255,0.2)' : 'rgba(171,196,255,0.3)' }}>
                                    <MessageCircle className="mr-2 w-5 h-5" />
                                    Chat with Support
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}