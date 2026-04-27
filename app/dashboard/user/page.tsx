// app/dashboard/user/page.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Heart, Activity, FileText, 
  MessageCircle, TrendingUp, Bell, Settings, 
  ChevronRight, Star, Video, Pill
} from 'lucide-react';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-white to-soft-sand pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-muted-taupe">
              Welcome back, <span className="font-medium">Ayesha</span>
            </h1>
            <p className="text-muted-taupe/70 mt-1">Your wellness journey continues</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-warm-nude/10 transition-colors relative">
              <Bell className="w-5 h-5 text-muted-taupe" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-accent-sage" />
            </button>
            <button className="p-2 rounded-full hover:bg-warm-nude/10 transition-colors">
              <Settings className="w-5 h-5 text-muted-taupe" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Mood Score', value: '7.8/10', icon: Heart, trend: '+0.5' },
            { label: 'Sessions This Month', value: '4', icon: Calendar, trend: '2 upcoming' },
            { label: 'Wellness Streak', value: '12 days', icon: Activity, trend: 'Personal best' },
            { label: 'AI Check-ins', value: '23', icon: MessageCircle, trend: 'This week' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-warm-nude/20 hover:border-warm-nude/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warm-nude/20 to-accent-sage/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-muted-taupe" />
                </div>
                <span className="text-xs text-accent-sage">{stat.trend}</span>
              </div>
              <div className="text-2xl font-light text-muted-taupe">{stat.value}</div>
              <div className="text-sm text-muted-taupe/70 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-nude/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-muted-taupe">Upcoming Sessions</h2>
              <button className="text-sm text-accent-sage hover:text-muted-taupe transition-colors flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  date: 'Today',
                  time: '3:00 PM',
                  psychologist: 'Dr. Fatima Hassan',
                  type: 'Video Session',
                  status: 'confirmed',
                },
                {
                  date: 'Tomorrow',
                  time: '11:00 AM',
                  psychologist: 'AI Emotional Support',
                  type: 'Chat Session',
                  status: 'scheduled',
                },
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-soft-sand/50 hover:bg-soft-sand transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      session.type === 'Video Session' 
                        ? 'bg-warm-nude/20' 
                        : 'bg-accent-sage/20'
                    }`}>
                      {session.type === 'Video Session' ? (
                        <Video className="w-6 h-6 text-muted-taupe" />
                      ) : (
                        <MessageCircle className="w-6 h-6 text-muted-taupe" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-muted-taupe">{session.psychologist}</div>
                      <div className="text-sm text-muted-taupe/70">{session.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-muted-taupe">{session.date}</div>
                    <div className="text-sm text-accent-sage">{session.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emotional Tracker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-nude/20 p-6"
          >
            <h2 className="text-xl font-medium text-muted-taupe mb-6">Mood Journal</h2>
            <div className="space-y-4">
              {['Happy', 'Calm', 'Grateful', 'Anxious', 'Tired'].map((mood) => (
                <button
                  key={mood}
                  className="w-full px-4 py-3 rounded-xl bg-soft-sand/50 hover:bg-warm-nude/20 transition-colors text-left text-muted-taupe"
                >
                  {mood}
                </button>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-warm-nude/10 to-accent-sage/10">
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-accent-sage mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-muted-taupe">Daily Insight</div>
                  <p className="text-sm text-muted-taupe/70 mt-1">
                    Your mood has been improving over the last week. Keep up the great work!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { label: 'Book Session', icon: Calendar, href: '/booking' },
            { label: 'AI Chat', icon: MessageCircle, href: '/ai-chat' },
            { label: 'View Notes', icon: FileText, href: '/notes' },
            { label: 'Prescriptions', icon: Pill, href: '/prescriptions' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-warm-nude/20 hover:border-warm-nude/40 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-warm-nude/20 to-accent-sage/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <action.icon className="w-7 h-7 text-muted-taupe" />
              </div>
              <span className="text-sm font-medium text-muted-taupe">{action.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}