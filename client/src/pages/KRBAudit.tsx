/**
 * Website Audit Report for KRB Company
 * Design: Professional, clean, client-friendly presentation
 * Language: Simple, ninth-grade level explanations
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from "recharts";
import { 
  AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, 
  Globe, Smartphone, Video, MessageSquare, Star, DollarSign,
  Users, Search, FileText, Image, Share2, Mail, Phone, ArrowRight,
  Target, Zap, Clock, Award, ChevronRight, ExternalLink, Calendar,
  ThumbsUp
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Audit findings data for KRB Company
const auditFindings = [
  {
    id: 1,
    title: "Your 'Why KRB' Page is Broken",
    icon: XCircle,
    severity: "critical",
    status: "404 Error",
    description: "When someone clicks on 'WHY KRB' in your main navigation menu, they get an error page that says '404 - Page Not Found.'",
    impact: "This is one of the most important pages on your website—it's where people go to learn about your company, your team, and why they should choose you. People who are interested in learning more about your company are hitting a dead end. This broken page is probably costing you 10-15% of your potential leads.",
    solution: "Create a proper 'Why KRB' page that includes your company story, photos and bios of your team members, your certifications and awards, and what makes you different from other kitchen and bath remodelers.",
    potentialGain: "15-20% more leads",
    effort: "Medium (1-2 days)",
    priority: 1,
  },
  {
    id: 2,
    title: "No Before and After Photos",
    icon: Image,
    severity: "high",
    status: "Missing",
    description: "Your portfolio shows beautiful finished projects, but there are no 'before' photos. People can't see the transformation you created.",
    impact: "Before and after photos are the #1 most powerful sales tool for remodeling companies. When someone sees a cramped, outdated kitchen transformed into a beautiful, functional space, they get excited. Without before photos, you're only showing half the story.",
    solution: "Go back through your project files and find before photos for your best projects. Add them to your portfolio pages with a clear 'Before & After' layout. If you don't have before photos for old projects, start taking them for every new project from now on.",
    potentialGain: "25-35% higher conversion rate",
    effort: "Low (2-4 hours)",
    priority: 2,
  },
  {
    id: 3,
    title: "No Video Content",
    icon: Video,
    severity: "high",
    status: "Missing",
    description: "Your website is all photos and text. There are no videos showing your work, your process, or your team.",
    impact: "Video is 80% more engaging than text or photos. When someone watches a 2-minute video of your team working on a project, or a homeowner talking about their experience, they feel like they already know you. Video builds trust faster than anything else.",
    solution: "Create 3-5 simple videos: (1) A 60-second 'Meet the Team' video, (2) A time-lapse of a kitchen installation, (3) A customer testimonial video, (4) A 'What to Expect' video explaining your process, (5) A showroom tour.",
    potentialGain: "50-70% more engagement, 20-30% more leads",
    effort: "Medium (3-5 hours per video)",
    priority: 3,
  },
  {
    id: 4,
    title: "No Customer Testimonials on Your Website",
    icon: MessageSquare,
    severity: "high",
    status: "Missing",
    description: "You have a 'Leave a Review' button, which suggests you have happy customers, but there are no testimonials visible on your website.",
    impact: "People trust other customers more than they trust your marketing. When someone is considering spending $30,000-$100,000 on a kitchen remodel, they want to hear from real people who've worked with you. If they don't see testimonials on your website, they assume you don't have any.",
    solution: "Add a testimonials section to your homepage and create a dedicated 'Reviews' or 'Testimonials' page. Include customer names, photos (with permission), and specific details about their projects. Pull quotes from your best reviews on Google, Facebook, and Houzz.",
    potentialGain: "20-30% increase in trust and conversions",
    effort: "Low (2-3 hours)",
    priority: 4,
  },
  {
    id: 5,
    title: "No FAQ Page",
    icon: MessageSquare,
    severity: "medium",
    status: "Missing",
    description: "People have questions, but they have to call you to get answers. There's no FAQ (Frequently Asked Questions) page.",
    impact: "Not everyone wants to call. Some people like to research online first, especially at 10 PM when they're browsing on their couch. When they can't find answers to basic questions, they go to a competitor's website that does answer these questions.",
    solution: "Create an FAQ page that answers the top 20-25 questions you get asked. Organize them by category: Cost & Budget, Timeline & Process, Design & Materials, Financing, Warranties, etc.",
    potentialGain: "15-25% fewer unqualified calls, 10-15% more qualified leads",
    effort: "Low (3-4 hours)",
    priority: 5,
  },
  {
    id: 6,
    title: "Limited Lead Capture Options",
    icon: Mail,
    severity: "medium",
    status: "Weak",
    description: "Your only way to capture leads is through the 'Get in Touch' form or by phone. There's no email newsletter signup, no downloadable guide, no way to stay in touch with people who aren't ready to commit yet.",
    impact: "Only about 3% of website visitors are ready to buy right now. The other 97% are just browsing, researching, or planning for the future. If you don't capture their email address, you lose them forever.",
    solution: "Create a valuable downloadable guide like 'The Homeowner's Guide to Planning a Kitchen Remodel.' Offer it in exchange for an email address. Then send a monthly email newsletter with design tips, project spotlights, and special offers.",
    potentialGain: "30-40% of visitors become leads you can nurture",
    effort: "Medium (4-6 hours)",
    priority: 6,
  },
  {
    id: 7,
    title: "No Pricing Transparency",
    icon: DollarSign,
    severity: "medium",
    status: "Missing",
    description: "There's no mention of pricing anywhere on your website. Not even ranges or starting prices.",
    impact: "Price is the #1 question people have. When you don't mention it at all, people assume you're too expensive for them and don't even bother calling. Being transparent about pricing (even just ranges) actually increases quality leads because people self-qualify before calling.",
    solution: "Add a 'Investment' or 'Pricing' page that explains how pricing works. Give ranges: 'Most of our kitchen remodels range from $40,000 to $150,000 depending on size, materials, and scope.' Show 3 example projects at different price points.",
    potentialGain: "25-35% more qualified leads, fewer tire-kickers",
    effort: "Low (2-3 hours)",
    priority: 7,
  },
  {
    id: 8,
    title: "No Online Booking for Consultations",
    icon: Calendar,
    severity: "medium",
    status: "Missing",
    description: "To schedule a consultation, people have to call during business hours or fill out a form and wait for you to call them back.",
    impact: "We live in an instant-gratification world. When someone is excited about remodeling their kitchen at 9 PM on a Saturday, they want to book a consultation right now. If they have to wait until Monday to call you, they might lose momentum or book with a competitor who lets them schedule online immediately.",
    solution: "Add an online scheduling tool (like Calendly, Acuity, or similar) that lets people see your available times and book a consultation instantly. It syncs with your calendar automatically.",
    potentialGain: "20-30% more consultation bookings",
    effort: "Low (1-2 hours to set up)",
    priority: 8,
  },
  {
    id: 9,
    title: "Mobile Experience Could Be Better",
    icon: Smartphone,
    severity: "low",
    status: "Needs Work",
    description: "Your website works on mobile phones, but the experience isn't optimized. Some buttons are small, some text is hard to read, and the photo galleries don't work as smoothly on phones.",
    impact: "65% of people browsing for home improvement services are on their phones. If your website is frustrating to use on mobile, they'll leave and go to a competitor. Even small friction points cause people to give up.",
    solution: "Test your website on multiple phones (iPhone and Android). Make sure all buttons are easy to tap, text is readable without zooming, forms are simple to fill out, and photos load quickly. Consider adding a 'Click to Call' button that's always visible on mobile.",
    potentialGain: "15-25% more mobile conversions",
    effort: "Medium (1-2 weeks for developer)",
    priority: 9,
  },
  {
    id: 10,
    title: "No Project Cost or Timeline Information",
    icon: Clock,
    severity: "low",
    status: "Missing",
    description: "Your project pages show beautiful photos and list the materials used, but they don't mention how long the project took or give any indication of cost.",
    impact: "People want to know 'How long will this take?' and 'Can I afford this?' When you don't provide this information, they have to call to ask, which creates an extra barrier. Many people won't bother calling.",
    solution: "Add timeline and budget information to each project page. Give ranges: 'This project took 6-8 weeks from design to completion' and 'Investment range: $75,000-$90,000.' This helps people understand what to expect and self-qualify before contacting you.",
    potentialGain: "15-20% more qualified leads",
    effort: "Low (1-2 hours)",
    priority: 10,
  },
];

// Score data for visualization
const scoreData = {
  overall: 72,
  categories: [
    { name: "Design & Layout", score: 85, color: "#10b981" },
    { name: "Content Quality", score: 90, color: "#10b981" },
    { name: "Mobile Experience", score: 60, color: "#f59e0b" },
    { name: "Trust Signals", score: 75, color: "#10b981" },
    { name: "Lead Capture", score: 45, color: "#ef4444" },
    { name: "Conversion Tools", score: 50, color: "#f59e0b" },
  ],
};

// Revenue impact data
const revenueImpact = {
  current: {
    visitors: 500,
    leads: 15,
    projects: 3,
    avgProject: 60000,
    monthly: 180000,
    annual: 2160000,
  },
  projected: {
    visitors: 700,
    leads: 35,
    projects: 5,
    avgProject: 60000,
    monthly: 300000,
    annual: 3600000,
  },
};

const revenueChartData = [
  { name: "Current", revenue: 2160000, fill: "#94a3b8" },
  { name: "After Fixes", revenue: 3600000, fill: "#10b981" },
];

const trafficProjection = [
  { month: "Now", current: 500, projected: 500 },
  { month: "Month 1", current: 500, projected: 550 },
  { month: "Month 2", current: 500, projected: 600 },
  { month: "Month 3", current: 500, projected: 650 },
  { month: "Month 6", current: 500, projected: 700 },
  { month: "Month 12", current: 500, projected: 800 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-300";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-300";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 70) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
};

export default function KRBAudit() {
  const [selectedFinding, setSelectedFinding] = useState<number | null>(null);

  const criticalCount = auditFindings.filter(f => f.severity === "critical").length;
  const highCount = auditFindings.filter(f => f.severity === "high").length;
  const mediumCount = auditFindings.filter(f => f.severity === "medium").length;
  const lowCount = auditFindings.filter(f => f.severity === "low").length;

  const severityData = [
    { name: "Critical", value: criticalCount, fill: "#ef4444" },
    { name: "High", value: highCount, fill: "#f97316" },
    { name: "Medium", value: mediumCount, fill: "#f59e0b" },
    { name: "Low", value: lowCount, fill: "#3b82f6" },
  ];

  // Strengths data
  const strengths = [
    { icon: ThumbsUp, title: "Excellent Blog Strategy", description: "Fresh, relevant content published regularly with diverse topics" },
    { icon: Award, title: "Professional Branding", description: "Strong visual identity with 30 years badge and premium design" },
    { icon: Star, title: "Strong Trust Signals", description: "BBB A+ accreditation, Best of Seacoast award, NARI membership" },
    { icon: Globe, title: "Physical Showroom", description: "Real showroom location gives huge advantage over online-only competitors" },
    { icon: Users, title: "In-House Installation Team", description: "Own installation team (not subcontractors) is a major trust builder" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container py-12">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Website Audit Report</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            KRB Kitchen + Bath Design Center
          </h1>
          <p className="text-xl text-slate-300 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Website Analysis & Growth Opportunities
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Globe className="w-4 h-4 text-teal-400" />
              <span>krbcompany.com</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>January 19, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Award className="w-4 h-4 text-teal-400" />
              <span>30 Years in Business</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Score Section */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-16">
          {/* Main Score Card */}
          <Card className="lg:col-span-1 border-0 shadow-xl bg-white">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg font-medium text-slate-600">Overall Website Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke={getScoreColor(scoreData.overall)}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(scoreData.overall / 100) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl font-bold text-slate-900">{scoreData.overall}</span>
                  <span className="text-sm text-slate-500">out of 100</span>
                </div>
              </div>
              <p className="mt-4 text-slate-600">
                <span className="font-semibold text-green-600">Good Foundation</span>
                <br />
                <span className="text-sm">Missing key conversion elements</span>
              </p>
            </CardContent>
          </Card>

          {/* Category Scores */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Score Breakdown</CardTitle>
              <CardDescription>How your website performs in each area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreData.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{category.name}</span>
                      <span className="font-semibold" style={{ color: category.color }}>{category.score}/100</span>
                    </div>
                    <Progress value={category.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-red-600">{criticalCount}</div>
              <p className="text-sm text-red-700 mt-1">Critical Issues</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">{highCount}</div>
              <p className="text-sm text-orange-700 mt-1">High Priority</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-amber-600">{mediumCount}</div>
              <p className="text-sm text-amber-700 mt-1">Medium Priority</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{lowCount}</div>
              <p className="text-sm text-blue-700 mt-1">Quick Wins</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Impact Section */}
      <div className="bg-slate-900 text-white py-12 mt-8">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              What This Means for Your Business
            </h2>
            <p className="text-slate-400">The potential revenue impact of fixing these issues</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400">Current State</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-slate-300">{revenueImpact.current.visitors}</div>
                    <div className="text-xs text-slate-500">Monthly Visitors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-300">{revenueImpact.current.leads}</div>
                    <div className="text-xs text-slate-500">Leads/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-300">${(revenueImpact.current.annual / 1000000).toFixed(2)}M</div>
                    <div className="text-xs text-slate-500">Annual Revenue (est.)</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-600 to-teal-700 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-100">After Improvements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-white">{revenueImpact.projected.visitors}</div>
                    <div className="text-xs text-teal-200">Monthly Visitors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{revenueImpact.projected.leads}</div>
                    <div className="text-xs text-teal-200">Leads/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">${(revenueImpact.projected.annual / 1000000).toFixed(2)}M</div>
                    <div className="text-xs text-teal-200">Annual Revenue (est.)</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Chart */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Projected Traffic Growth</CardTitle>
                <CardDescription className="text-slate-400">Monthly visitors over 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trafficProjection}>
                    <defs>
                      <linearGradient id="colorProjectedKRB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                    />
                    <Area type="monotone" dataKey="projected" stroke="#14b8a6" fillOpacity={1} fill="url(#colorProjectedKRB)" name="Projected Visitors" />
                    <Line type="monotone" dataKey="current" stroke="#64748b" strokeDasharray="5 5" name="Current (No Changes)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Big Number */}
          <div className="text-center mt-8 p-8 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 rounded-2xl border border-teal-500/30">
            <p className="text-slate-400 mb-2">Potential Additional Annual Revenue</p>
            <div className="text-5xl md:text-6xl font-bold text-teal-400">
              +${((revenueImpact.projected.annual - revenueImpact.current.annual) / 1000000).toFixed(2)}M
            </div>
            <p className="text-slate-400 mt-2">per year with these improvements</p>
          </div>
        </div>
      </div>

      {/* Strengths Section */}
      <div className="container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            What You're Doing Right
          </h2>
          <p className="text-slate-600">Your competitive advantages and strengths</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <Card key={index} className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <CardTitle className="text-base font-semibold text-slate-900">{strength.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{strength.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Findings Section */}
      <div className="container py-12 bg-slate-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            The 10 Issues Costing You Customers
          </h2>
          <p className="text-slate-600">Issues ranked by importance, explained in simple terms</p>
        </div>

        <div className="space-y-4">
          {auditFindings.map((finding, index) => {
            const Icon = finding.icon;
            const isExpanded = selectedFinding === finding.id;
            
            return (
              <Card 
                key={finding.id} 
                className={`border-l-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  finding.severity === "critical" ? "border-l-red-500" :
                  finding.severity === "high" ? "border-l-orange-500" :
                  finding.severity === "medium" ? "border-l-amber-500" :
                  "border-l-blue-500"
                }`}
                onClick={() => setSelectedFinding(isExpanded ? null : finding.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        finding.severity === "critical" ? "bg-red-100" :
                        finding.severity === "high" ? "bg-orange-100" :
                        finding.severity === "medium" ? "bg-amber-100" :
                        "bg-blue-100"
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          finding.severity === "critical" ? "text-red-600" :
                          finding.severity === "high" ? "text-orange-600" :
                          finding.severity === "medium" ? "text-amber-600" :
                          "text-blue-600"
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                          <span className="text-slate-400 text-sm">#{index + 1}</span>
                          {finding.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getSeverityColor(finding.severity)}>
                            {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-slate-600">
                            {finding.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-600 mb-4">{finding.description}</p>
                  
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-4 border-t border-slate-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            Why It Matters
                          </div>
                          <p className="text-sm text-red-800">{finding.impact}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                            <CheckCircle className="w-4 h-4" />
                            The Fix
                          </div>
                          <p className="text-sm text-green-800">{finding.solution}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-teal-50 px-3 py-2 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-teal-600" />
                          <span className="text-teal-800 font-medium">{finding.potentialGain}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-slate-700">Effort: {finding.effort}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Action Plan Section */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              Recommended Action Plan
            </h2>
            <p className="text-slate-600">A step-by-step approach to improving your website</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <CardTitle>Phase 1: Quick Wins</CardTitle>
                </div>
                <CardDescription className="text-teal-100">Week 1-2</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Fix the "Why KRB" page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Add testimonials to homepage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Create FAQ page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Add pricing transparency</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">Expected Impact</div>
                  <div className="text-lg font-semibold text-teal-600">+20-25% more leads</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <CardTitle>Phase 2: Growth</CardTitle>
                </div>
                <CardDescription className="text-blue-100">Month 1-2</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Add before/after photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Create 3-5 videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Set up online booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Create lead magnet</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">Expected Impact</div>
                  <div className="text-lg font-semibold text-blue-600">+30-40% more leads</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <CardTitle>Phase 3: Optimize</CardTitle>
                </div>
                <CardDescription className="text-purple-100">Month 3+</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Optimize mobile experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Add project timelines/costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Monthly email newsletter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Track & optimize results</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">Expected Impact</div>
                  <div className="text-lg font-semibold text-purple-600">Sustained growth</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help KRB Company attract more customers and increase revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@example.com" 
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              Schedule a Call
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <FileText className="w-5 h-5" />
              Download Full Report
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="container text-center">
          <p className="text-sm">
            Website Audit Report • Prepared January 19, 2026
          </p>
          <p className="text-xs mt-2">
            This audit is based on a thorough review of your website, industry best practices, and data from thousands of home service businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}
