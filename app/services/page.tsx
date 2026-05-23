import { SiteFooter } from "@/components/sections/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Stethoscope,
  Video,
  Mic,
  Shield,
  Sparkles,
  Clock,
  Users,
  Lock,
  ArrowUpRight,
} from "lucide-react";

export const metadata = {
  title: "Services · LovedOne PsyCare",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-14">
        <div className="absolute inset-0 bg-[rgb(var(--canvas))]" />

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-periwinkle-200/30 blur-3xl rounded-full opacity-40" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-midnight-200/20 blur-3xl rounded-full opacity-30" />

        <div className="container-page relative z-10">
          <div
            className="rounded-[36px] p-8 md:p-12 overflow-hidden relative"
            style={{ background: "rgb(11, 20, 55)" }}
          >
            <div className="absolute inset-0 opacity-10 grain" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <p
                className="text-sm font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Services
              </p>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] tracking-tight"
                style={{ color: "white" }}
              >
                Everything you need,
                <br />
                in one safe space.
              </h1>

              <p
                className="mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                AI support, licensed therapists, secure sessions, and emotional
                care — designed for real life.
              </p>

              <div className="flex justify-center mt-7">
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-gray-100 transition-all font-sans"
                >
                  Start Free Trial
                  <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow font-sans">What We Provide</p>

            <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight text-ink-900">
              Four pillars of support
            </h2>

            <p className="mt-3 text-ink-500 font-sans">
              Simple, private, and built around emotional wellbeing.
            </p>
          </div>

          {/* Asymmetric Alternating Layout Container */}
          <div className="space-y-10">
            {/* Service Module 1: AI-Powered Chat */}
            <div 
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-10 rounded-[40px] md:rounded-[56px] transition-all duration-500 hover:shadow-xl border border-white/60"
              style={{ backgroundColor: "rgba(226, 231, 255, 0.7)", backdropFilter: "blur(20px)" }}
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-6 h-6 text-midnight-700" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-ink-900 mb-3">
                    AI-Powered Chat
                  </h3>
                  <p className="text-sm md:text-base text-ink-500 leading-relaxed max-w-md font-sans">
                    Talk with Sukoon anytime for calm guidance, emotional support, and daily mental wellness tasks mapped out uniquely for you.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>24/7 support available</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>English & Urdu processing</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 relative w-full h-[260px] md:h-[320px] rounded-[30px] overflow-hidden shadow-md bg-[rgb(var(--cream))] flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/AI-chat.png"
                    alt="AI Chat Interface"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Service Module 2: Licensed Therapists */}
            <div 
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-10 rounded-[40px] md:rounded-[56px] transition-all duration-500 hover:shadow-xl border border-white/60"
              style={{ backgroundColor: "rgba(226, 231, 255, 0.7)", backdropFilter: "blur(20px)" }}
            >
              <div className="lg:col-span-6 lg:order-2 space-y-5 lg:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Stethoscope className="w-6 h-6 text-midnight-700" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-ink-900 mb-3">
                    Licensed Therapists
                  </h3>
                  <p className="text-sm md:text-base text-ink-500 leading-relaxed max-w-md font-sans">
                    Connect directly with certified professionals who understand your distinct culture, dialect, language requirements, and real system experiences.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>Verified field experts</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>Flexible digital booking</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 lg:order-1 relative w-full h-[260px] md:h-[320px] rounded-[30px] overflow-hidden shadow-md bg-[rgb(var(--cream))] flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/psychologist-preview.png"
                    alt="Therapists Panel"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Service Module 3: Video Sessions */}
            <div 
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-10 rounded-[40px] md:rounded-[56px] transition-all duration-500 hover:shadow-xl border border-white/60"
              style={{ backgroundColor: "rgba(226, 231, 255, 0.7)", backdropFilter: "blur(20px)" }}
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Video className="w-6 h-6 text-midnight-700" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-ink-900 mb-3">
                    Video Sessions
                  </h3>
                  <p className="text-sm md:text-base text-ink-500 leading-relaxed max-w-md font-sans">
                    Meet your designated counselor securely from your personal space using end-to-end encrypted real-time transmission portals.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>Fully secure architecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>Zero hassle scheduling</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 relative w-full h-[260px] md:h-[320px] rounded-[30px] overflow-hidden shadow-md bg-[rgb(var(--cream))]">
                <Image
                  src="/video-call-preview.png"
                  alt="Video Consultation Layout"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
            </div>

            {/* Service Module 4: Grief Support Tools */}
            <div 
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-10 rounded-[40px] md:rounded-[56px] transition-all duration-500 hover:shadow-xl border border-white/60"
              style={{ backgroundColor: "rgba(226, 231, 255, 0.7)", backdropFilter: "blur(20px)" }}
            >
              <div className="lg:col-span-6 lg:order-2 space-y-5 lg:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Mic className="w-6 h-6 text-midnight-700" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-ink-900 mb-3">
                    Grief Support Tools
                  </h3>
                  <p className="text-sm md:text-base text-ink-500 leading-relaxed max-w-md font-sans">
                    Thoughtfully built vocal preservation systems intended specifically for relational processing, remembrance, and healthy integration paths.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>Therapeutic frameworks</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-600 font-medium font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-midnight-500" />
                    <span>Strict consent protection</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 lg:order-1 relative w-full h-[260px] md:h-[320px] rounded-[30px] overflow-hidden shadow-md bg-[rgb(var(--cream))] flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/voice-cloning-preview.png"
                    alt="Grief Support Environment"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-midnight-50/30">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow font-sans">Why Trust Us</p>

            <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight text-ink-900">
              Your safety comes first
            </h2>

            <p className="mt-3 text-ink-500 font-sans">
              Built around privacy, trust, and emotional care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="text-center p-6 rounded-[26px] bg-white/70 backdrop-blur-sm">
              <div className="w-11 h-11 rounded-full bg-midnight-50 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-5 h-5 text-midnight-700" />
              </div>

              <h3 className="font-display font-semibold text-ink-900 mb-2">
                Local Privacy
              </h3>

              <p className="text-sm text-ink-500 font-sans">
                Secure Pakistani data protection standards.
              </p>
            </div>

            <div className="text-center p-6 rounded-[26px] bg-white/70 backdrop-blur-sm">
              <div className="w-11 h-11 rounded-full bg-midnight-50 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-midnight-700" />
              </div>

              <h3 className="font-display font-semibold text-ink-900 mb-2">
                End-to-End Security
              </h3>

              <p className="text-sm text-ink-500 font-sans">
                Your sessions stay completely confidential.
              </p>
            </div>

            <div className="text-center p-6 rounded-[26px] bg-white/70 backdrop-blur-sm">
              <div className="w-11 h-11 rounded-full bg-midnight-50 flex items-center justify-center mx-auto mb-4">
                <Users className="w-5 h-5 text-midnight-700" />
              </div>

              <h3 className="font-display font-semibold text-ink-900 mb-2">
                Verified Experts
              </h3>

              <p className="text-sm text-ink-500 font-sans">
                Trusted licensed psychologists and counselors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}