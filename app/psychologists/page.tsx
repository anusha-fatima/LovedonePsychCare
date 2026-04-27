// app/psychologists/page.tsx
'use client';

import { useState } from 'react';
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

const primaryText = "rgb(var(--periwinkle-3))";
const secondaryText = "rgba(92, 108, 156, 0.85)";
const subtleText = "rgba(92, 108, 156, 0.65)";
const buttonGradient =
    "linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--periwinkle-2)), rgb(var(--baby-blue-ice)))";

const specialties = [
    "All", "Anxiety", "Depression", "Trauma", "Relationship Issues",
    "Child Therapy", "Addiction", "OCD", "Stress Management", "Sleep Disorders"
];

export default function PsychologistsPage() {
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPsychologist, setSelectedPsychologist] = useState<typeof psychologists[0] | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false); // This would come from auth context
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);

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
                <div className="absolute inset-0 premium-gradient opacity-5" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full premium-card mb-6">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                Expert Mental Health Professionals
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient" style={{ color: 'rgba(60,70,120,0.85)' }}>
                            Find Your Perfect Therapist
                        </h1>

                        <p className="text-xl opacity-80 mb-8" style={{ color: 'rgba(60,70,120,0.85)' }}>
                            Psychologists committed to good thinking, feeling & doing.
                            Connect with licensed professionals who understand Pakistani culture.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Search by name or specialty..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-full premium-card focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: 'rgba(237, 242, 251, 0.08)',
                                        borderColor: 'rgba(171, 196, 255, 0.2)',
                                        color: 'rgb(var(--periwinkle-3))'
                                    }}
                                />
                            </div>
                            <Button
                                size="lg"
                                className="text-white shadow-lg hover:scale-105 transition-all duration-300 border-0"
                                style={{ background: buttonGradient }}
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
                            <h2 className="text-3xl font-bold mb-4 text-gradient">Our values</h2>
                            <p className="text-lg mb-6 opacity-80" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                We are a collaborative team of independent psychologists with a shared mission
                                to provide good resources and care to:
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {["Children", "Teens", "Young Adults", "Parents"].map((group, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <Users className="w-4 h-4" style={{ color: 'rgba(60,70,120,0.85)' }}/>
                                        <span style={{ color: 'rgba(60,70,120,0.85)' }}>{group}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 rounded-2xl premium-card">
                                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                    OUR PHILOSOPHY IS SIMPLE:
                                </h3>
                                <p
                                    className="opacity-90"
                                    style={{ color: secondaryText }}
                                >
                                    Mental healthcare should be approachable...
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
                                    <div key={i} className="p-4 rounded-xl premium-card text-center">
                                        <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: 'rgba(60,70,120,0.85)' }} />
                                        <span className="text-sm" style={{ color: 'rgba(60,70,120,0.85)' }}>{item.text}</span>
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
                                className={`px-5 py-2 rounded-full transition-all duration-300 ${selectedSpecialty === specialty
                                        ? 'premium-gradient text-white shadow-md'
                                        : 'premium-card hover:shadow-md'
                                    }`}
                                style={{ color: selectedSpecialty === specialty ? 'white' : 'rgba(60,70,120,0.85)' }}
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
                                <div className="premium-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                    <div className="relative h-48 premium-gradient flex items-center justify-center">
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="relative z-10 text-center">
                                            <div className="w-24 h-24 mx-auto rounded-full rgba(255,255,255,0.2) backdrop-blur-md flex items-center justify-center mb-3">
                                                <span className="text-4xl font-bold text-white">
                                                    {psych.name.charAt(0)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{psych.name}</h3>
                                            <p className="text-white/90 text-sm">{psych.title}</p>
                                        </div>
                                        {/* {psych.online && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <div className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse" />
                        Online
                      </div>
                    )} */}
                                        {psych.verified && (
                                            <div className="absolute top-4 left-4">
                                                <CheckCircle className="w-6 h-6" style={{ color: 'rgba(60,70,120,0.85)' }} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 fill-current" style={{ color: 'rgba(60,70,120,0.85)' }} />
                                                <span className="font-semibold" style={{ color: 'rgba(60,70,120,0.85)' }}>{psych.rating}</span>
                                                <span className="text-xs opacity-60" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                                    ({psych.reviews} reviews)
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="w-3 h-3 opacity-60" style={{ color: 'rgba(60,70,120,0.85)' }} />
                                                <span className="text-xs opacity-60" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                                    {psych.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {psych.specialization.slice(0, 3).map((spec, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 rounded-full"
                                                    style={{
                                                        backgroundColor: 'rgba(171, 196, 255, 0.15)',
                                                        color: 'rgba(60,70,120,0.85)'
                                                    }}
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="opacity-60" style={{ color: 'rgba(60,70,120,0.85)' }}>Experience</span>
                                                <span className="font-medium" style={{ color: 'rgba(60,70,120,0.85)' }}>{psych.experience}</span>
                                            </div>
                    
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="opacity-60" style={{ color: 'rgba(60,70,120,0.85)' }}>Languages</span>
                                                <span className="font-medium" style={{ color: 'rgba(60,70,120,0.85)' }}>{psych.languages.join(", ")}</span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4" style={{ borderColor: 'rgba(171, 196, 255, 0.1)' }}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-semibold" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                                    {psych.price}
                                                </span>
                                                <span className="text-xs opacity-60" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                                    Next: {psych.nextAvailable}
                                                </span>
                                            </div>
                                            <Button
                                                className="w-full text-white shadow-md hover:shadow-xl transition-all duration-300"
                                                style={{ background: buttonGradient }}
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
                        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl premium-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSubscribed ? (
                            // Full profile for subscribed users
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-gradient">{selectedPsychologist.name}</h2>
                                        <p className="text-lg opacity-80">{selectedPsychologist.title}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPsychologist(null)}
                                        className="text-2xl opacity-60 hover:opacity-100"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3" style={{ color: 'rgba(60,70,120,0.85)' }}>About</h3>
                                            <p className="opacity-80 leading-relaxed">{selectedPsychologist.about}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-3" style={{ color: 'rgba(60,70,120,0.85)' }}>Education</h3>
                                            <p className="opacity-80">{selectedPsychologist.education}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-3" style={{ color: 'rgba(60,70,120,0.85)' }}>Specializations</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPsychologist.specialization.map((spec, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-sm premium-card">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl premium-card">
                                            <div className="text-center mb-4">
                                                <div className="text-2xl font-bold text-gradient">{selectedPsychologist.price}</div>
                                                <p className="text-sm opacity-60">per session</p>
                                            </div>
                                            <Button className="w-full premium-gradient text-white mb-3">
                                                <Calendar className="mr-2 w-4 h-4" />
                                                Book Session
                                            </Button>
                                            <Button variant="outline" className="w-full">
                                                <MessageCircle className="mr-2 w-4 h-4" />
                                                Send Message
                                            </Button>
                                        </div>

                                        <div className="p-4 rounded-xl premium-card">
                                            <h4 className="font-semibold mb-2">Session Info</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="opacity-60">Duration</span>
                                                    <span>50 minutes</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="opacity-60">Next Available</span>
                                                    <span>{selectedPsychologist.nextAvailable}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="opacity-60">Languages</span>
                                                    <span>{selectedPsychologist.languages.join(", ")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Subscribe prompt for non-subscribed users
                            <div className="p-12 text-center">
                                <Lock className="w-16 h-16 mx-auto mb-6" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
                                <h2 className="text-2xl font-bold mb-4 text-gradient">Subscribe to View Full Profile</h2>
                                <p className="opacity-80 mb-8 max-w-md mx-auto">
                                    Get access to detailed therapist profiles, book sessions, and receive personalized mental health support.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button
                                        onClick={() => {
                                            setShowSubscribeModal(true);
                                            setSelectedPsychologist(null);
                                        }}
                                        className="bg-slate-400 texxt-black"
                                    >
                                        Subscribe Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedPsychologist(null)}
                                    >
                                        Maybe Later
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* Subscribe Modal */}
            {showSubscribeModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowSubscribeModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full rounded-2xl premium-card p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
                            <h2 className="text-2xl font-bold mb-4 text-gradient">Choose Your Plan</h2>

                            <div className="space-y-4 mb-8">
                                <div
                                    className="p-5 rounded-2xl border transition-all hover:shadow-xl"
                                    style={{
                                        background: "rgba(255,255,255,0.7)",
                                        borderColor: "rgba(171,196,255,0.2)"
                                    }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 style={{ color: primaryText }} className="font-semibold text-lg">
                                            Monthly Plan
                                        </h3>
                                        <span className="text-2xl font-bold" style={{ color: primaryText }}>
                                            Rs. 999
                                        </span>
                                    </div>
                                    <p className="text-sm" style={{ color: subtleText }}>
                                        Flexible monthly billing
                                    </p>
                                </div>

                                <div
                                    className="p-5 rounded-2xl shadow-xl text-white"
                                    style={{ background: buttonGradient }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-lg">Yearly Plan</h3>
                                        <span className="text-2xl font-bold">Rs. 9,999</span>
                                    </div>
                                    <p className="text-sm text-white/90">
                                        Save 16% • 2 months free
                                    </p>
                                </div>
                            </div>

                            <Button
                                className="w-full text-white shadow-xl hover:scale-105 transition-all"
                                style={{ background: buttonGradient }}
                            >
                                Start Free Trial (7 days)
                            </Button>
                            <p className="text-xs opacity-60">No commitment. Cancel anytime.</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="premium-card rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 premium-gradient opacity-10" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(60,70,120,0.85)' }}>
                                Take the first step toward better mental health. Book a session with one of our expert psychologists today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" style={{ color: 'rgba(60,70,120,0.85)', background: buttonGradient  }}>
                                    Book Appointment
                                    <Calendar className="ml-2 w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" style={{ color: 'rgba(60,70,120,0.85)', background: buttonGradient  }}>
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