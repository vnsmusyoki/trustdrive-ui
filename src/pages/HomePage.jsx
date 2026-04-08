// HomePage.jsx
import { useState, useEffect, useRef } from 'react'
import Balanced from '@/assets/balanced.svg'
import User from '@/assets/user.svg'
import Search from '@/assets/search.svg'
import Verified from '@/assets/verified.svg'
export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [animatedStats, setAnimatedStats] = useState({ drivers: 0, owners: 0, passengers: 0 })
  const statsRef = useRef(null)

  function animateStats() {
    const targets = { drivers: 87, owners: 76, passengers: 91 }
    const duration = 1500
    const steps = 60
    let current = { drivers: 0, owners: 0, passengers: 0 }
    const increment = {
      drivers: targets.drivers / steps,
      owners: targets.owners / steps,
      passengers: targets.passengers / steps,
    }
    let step = 0
    const timer = setInterval(() => {
      step++
      current = {
        drivers: Math.min(current.drivers + increment.drivers, targets.drivers),
        owners: Math.min(current.owners + increment.owners, targets.owners),
        passengers: Math.min(current.passengers + increment.passengers, targets.passengers),
      }
      setAnimatedStats({ ...current })
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div> 
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F9FAFB] via-white to-[#EFF6FF]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2563EB] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7C3AED] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#10B981] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E5E7EB] shadow-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fadeInUp">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[#111827]">✨ Now Live —</span>
              <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent font-semibold">
                Neutral Reputation Intelligence
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#111827] mb-6 leading-[1.1] animate-fadeInUp animation-delay-100">
              Trust Without{' '}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                Boundaries
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#6B7280] mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
              Cross-platform reputation intelligence for drivers, car owners, and passengers.
              Verified ratings. AI insights. Total neutrality.
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-300">
              <button className="group relative bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button className="border-2 border-[#2563EB] text-[#2563EB] px-8 py-3.5 rounded-full font-semibold hover:bg-[#EFF6FF] transition-all duration-300 hover:-translate-y-0.5">
                Watch Demo
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-6 mt-12 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>GDPR Compliant</span>
              </div>
              <div className="w-1 h-1 bg-[#D1D5DB] rounded-full"></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Data Portability</span>
              </div>
              <div className="w-1 h-1 bg-[#D1D5DB] rounded-full"></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              { key: 'drivers', value: animatedStats.drivers, label: 'of drivers would use a neutral reputation platform', suffix: '%' },
              { key: 'owners', value: animatedStats.owners, label: 'of car owners would pay for verified driver history', suffix: '%' },
              { key: 'passengers', value: animatedStats.passengers, label: 'of passengers would check driver ratings before a trip', suffix: '%' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  {Math.round(stat.value)}{stat.suffix}
                </div>
                <div className="text-sm text-[#6B7280] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Core Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/0 to-[#7C3AED]/0 group-hover:from-[#2563EB]/5 group-hover:to-[#7C3AED]/5 transition-all duration-500"></div>
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    hoveredFeature === idx ? 'bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-lg scale-110' : 'bg-[#EFF6FF]'
                  }`}>
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className={`w-7 h-7 transition-all duration-300 ${hoveredFeature === idx ? 'brightness-0 invert scale-110' : ''}`}
                    />
                  </div>
                  <h3 className="font-bold text-[#111827] text-lg mb-2">{feature.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Data Portability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#EFF6FF] px-3 py-1 rounded-full text-sm text-[#2563EB] font-medium mb-4">
              <span>⚡ Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-4">
              Your Reputation. <span className="text-[#2563EB]">Portable.</span>
            </h2>
            <p className="text-lg text-[#6B7280]">
              DriveTrust lets you export your Uber/Bolt rating history and build a verified profile
              that works across all platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] -translate-x-8 z-0"></div>
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-[#111827] text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B7280]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:gap-3 transition-all">
              See how it works
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose DriveTrust - 4 Principles */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#F0FDF4] px-3 py-1 rounded-full text-sm text-[#10B981] font-medium mb-4">
              <span>🎯 Our Foundation</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-4">Four Immutable Principles</h2>
            <p className="text-lg text-[#6B7280]">Built on trust, transparency, and user ownership</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {principles.map((principle, idx) => (
              <div
                key={idx}
                className="group text-center p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#EFF6FF] to-[#F0F5FF] rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  <img src={principle.icon} alt={principle.title} className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">{principle.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FEF3C7] px-3 py-1 rounded-full text-sm text-[#D97706] font-medium mb-4">
              <span>💬 Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-4">Trusted by the Community</h2>
            <p className="text-lg text-[#6B7280]">Real stories from drivers, owners, and passengers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-2xl p-8 border border-[#E5E7EB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#F59E0B] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#4B5563] leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827]">{testimonial.name}</p>
                    <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#EFF6FF] px-3 py-1 rounded-full text-sm text-[#2563EB] font-medium mb-4">
              <span>💰 Pricing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-[#6B7280]">Start free. Scale as you grow. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-[#2563EB] shadow-xl shadow-blue-500/10'
                    : 'border-[#E5E7EB] hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price === 'Custom' ? (
                      <span className="text-2xl font-bold text-[#2563EB]">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-[#2563EB]">${plan.price}</span>
                        <span className="text-[#6B7280]">/month</span>
                      </>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-[#6B7280] flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#10B981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5'
                      : 'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] hover:-translate-y-0.5'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#1E40AF] to-[#1E3A5F]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Build Trust?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of drivers and owners who are making informed decisions every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group bg-white text-[#2563EB] px-8 py-3.5 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <span className="flex items-center gap-2">
                Get Started Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-8">Free forever • No credit card required • Cancel anytime</p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  )
}

// Data arrays
const features = [
  { icon: Verified, title: 'Driver Ratings', description: 'View aggregated ratings & verified history across all platforms you\'ve driven for.' },
  { icon: User, title: 'Owner Feedback', description: 'Rate car owners on payment timeliness, vehicle condition, and overall fairness.' },
  { icon: Search, title: 'Area Safety', description: 'Check destination safety via driver-reported heatmaps and real-time alerts.' },
  { icon: Balanced, title: 'AI Insights', description: 'Get smart summaries, reputation reports, and predictive reliability scores.' },
]

const steps = [
  { title: 'Request Export', description: 'Request your Uber/Bolt data export (your legal right under GDPR/DPA).' },
  { title: 'Upload CSV', description: 'Upload the CSV file to DriveTrust — fully encrypted and private.' },
  { title: 'Get Verified', description: 'Our system parses and verifies your rating history automatically.' },
  { title: 'Build Trust', description: 'Share your verified profile with owners and unlock better opportunities.' },
]

const principles = [
  { icon: Balanced, title: 'Neutral', description: 'No booking, no payments, no trip matching — just pure reputation intelligence.' },
  { icon: User, title: 'User Ownership', description: 'All data belongs to the user who submitted it. You control your information.' },
  { icon: Verified, title: 'Verification by Consent', description: 'No scraping. Users voluntarily upload their data with explicit consent.' },
  { icon: Search, title: 'Transparency', description: 'All AI summaries are clearly marked as generated. No black boxes.' },
]

const testimonials = [
  { quote: 'Finally, a way to find trustworthy drivers for my fleet. The verified history badge is an absolute game-changer.', name: 'John M.', role: 'Car Owner' },
  { quote: 'I can now show future employers my real track record across platforms. My 4.9 Uber rating finally means something.', name: 'Sarah K.', role: 'Professional Driver' },
  { quote: 'I check every driver\'s rating before booking a ride. The peace of mind is priceless. I feel so much safer now.', name: 'Alex W.', role: 'Passenger' },
]

const pricing = [
  { name: 'Free', price: '0', features: ['Basic driver search', 'View last 10 ratings', '3 reviews per month', 'Static area heatmap'], cta: 'Get Started', popular: false },
  { name: 'Driver Premium', price: '3', features: ['Unlimited searches', 'AI-powered summaries', 'PDF reputation report', 'Verified badge', 'Priority support'], cta: 'Upgrade', popular: true },
  { name: 'Owner Premium', price: '10', features: ['Monitor driver reviews', 'Respond to feedback', 'AI hiring assistant', 'Bulk driver search', 'Analytics dashboard'], cta: 'Upgrade', popular: false },
  { name: 'Enterprise', price: 'Custom', features: ['Full API access', 'Anonymized bulk data', 'Custom dashboards', 'Dedicated account manager', 'SLA guarantee'], cta: 'Contact Sales', popular: false },
]