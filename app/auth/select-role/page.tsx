// app/auth/select-role/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  UserCircle, 
  Stethoscope, 
  ArrowRight,
  Shield,
  MessageCircle,
  Calendar,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState<'user' | 'psychologist' | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole === 'user') {
      router.push('/dashboard');
    } else if (selectedRole === 'psychologist') {
      router.push('/psychologist/onboarding');
    }
  };

  const userFeatures = [
    { icon: MessageCircle, text: 'Free AI Chat Support' },
    { icon: Calendar, text: 'Book Therapy Sessions' },
    { icon: Heart, text: 'Personalized Care Plans' },
    { icon: Shield, text: '100% Confidential' },
  ];

  const psychologistFeatures = [
    { icon: Users, text: 'Manage Client Sessions' },
    { icon: Award, text: 'Verified Professional Badge' },
    { icon: Calendar, text: 'Flexible Scheduling' },
    { icon: Clock, text: 'Earn Competitive Rates' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 " style={{ color: 'rgba(50,60,100,0.9)' }}>
            Welcome to LovedOne PsyCare
          </h1>
          <p className="text-lg opacity-70"  style={{ color: 'rgba(50,60,100,0.9)' }}>
            Please tell us how you'd like to use our platform
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Role Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setSelectedRole('user')}
            className={`cursor-pointer transition-all duration-300 ${
              selectedRole === 'user' 
                ? 'scale-105' 
                : 'hover:scale-102'
            }`}
          >
            <div className={`rounded-3xl p-8 premium-card h-full transition-all ${
              selectedRole === 'user' 
                ? 'shadow-2xl border-2' 
                : 'hover:shadow-xl'
            }`}
            style={{
              borderColor: selectedRole === 'user' 
                ? 'rgba(50,60,100,0.9)' 
                : 'rgba(171, 196, 255, 0.2)'
            }}>
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl premium-gradient flex items-center justify-center">
                  <UserCircle className="w-10 h-10"  style={{ color: 'rgba(50,60,100,0.9)' }} />
                </div>
                {selectedRole === 'user' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full premium-gradient flex items-center justify-center"
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-2"  style={{ color: 'rgba(50,60,100,0.9)' }}>
                I Need Support
              </h2>
              <p className="opacity-70 mb-6" style={{ color: 'rgba(50,60,100,0.9)' }}>
                I'm looking for mental health support, therapy sessions, or someone to talk to.
              </p>

              <div className="space-y-3 mb-8">
                {userFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5" style={{ color: 'rgba(50,60,100,0.9)' }} />
                    <span className="text-sm" style={{ color: 'rgba(50,60,100,0.9)' }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={selectedRole === 'user' ? 'premium' : 'outline'}
                className="w-full"
                onClick={handleContinue}
                 style={{ color: 'rgba(50,60,100,0.9)', backgroundColor: 'rgb(var(--baby-blue-ice))' }}
              >
                Continue as Seeker
                <ArrowRight className="ml-2 w-4 h-4"  />
              </Button>
            </div>
          </motion.div>

          {/* Psychologist Role Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => setSelectedRole('psychologist')}
            className={`cursor-pointer transition-all duration-300 ${
              selectedRole === 'psychologist' 
                ? 'scale-105' 
                : 'hover:scale-102'
            }`}
            
          >
            <div className={`rounded-3xl p-8 h-full transition-all ${
              selectedRole === 'psychologist' 
                ? 'shadow-2xl border-2' 
                : 'hover:shadow-xl'
            }`}
            style={{
              borderColor: selectedRole === 'psychologist' 
                ? 'rgba(50,60,100,0.9)' 
                : 'rgba(171, 196, 255, 0.2)'
            }}>
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl premium-gradient flex items-center justify-center">
                  <Stethoscope className="w-10 h-10"  style={{ color: 'rgba(50,60,100,0.9)' }} />
                </div>
                {selectedRole === 'psychologist' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full premium-gradient flex items-center justify-center"
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-2" style={{ color: 'rgba(50,60,100,0.9)' }}>
                I'm a Psychologist
              </h2>
              <p className="opacity-70 mb-6" style={{ color: 'rgba(50,60,100,0.9)' }}>
                I'm a licensed mental health professional wanting to help others.
              </p>

              <div className="space-y-3 mb-8">
                {psychologistFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5" style={{ color: 'rgba(50,60,100,0.9)' }} />
                    <span className="text-sm" style={{ color: 'rgba(50,60,100,0.9)' }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={selectedRole === 'psychologist' ? 'premium' : 'outline'}
                className="w-full"
                onClick={handleContinue}
                style={{ color: 'rgba(50,60,100,0.9)', backgroundColor: 'rgb(var(--baby-blue-ice))' }}
              >
                Continue as Psychologist
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl premium-card text-center"
        >
          <p className="text-sm"  style={{ color: 'rgba(50,60,100,0.9)' }}>
            <Shield className="w-4 h-4 inline mr-2"  style={{ color: 'rgba(50,60,100,0.9)' }} />
            Both options are completely free to start. Psychologists will need to verify their credentials.
            <br />
            Your information is always kept confidential and secure.
          </p>
        </motion.div>
      </div>
    </div>
  );
}