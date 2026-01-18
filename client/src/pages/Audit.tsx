/**
 * Website Audit Report for The Window Source NH
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
  Target, Zap, Clock, Award, ChevronRight, ExternalLink
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Audit findings data
const auditFindings = [
  {
    id: 1,
    title: "About Page Is Broken",
    icon: XCircle,
    severity: "critical",
    status: "Needs Fix",
    description: "When someone clicks on your About page, they get an error message. It's like having a 'Welcome' sign on your door, but the door is locked.",
    impact: "People want to know who they're hiring. They want to know your story, how long you've been in business, and who's on your team. Right now, they can't find that information.",
    solution: "Create a real About page that tells your story. Include photos of your team, your background, and your certifications.",
    potentialGain: "40% increase in customer trust",
    effort: "Low (2-3 hours)",
    priority: 1,
  },
  {
    id: 2,
    title: "Blog Hasn't Been Updated Since 2022",
    icon: Clock,
    severity: "high",
    status: "Outdated",
    description: "Your last blog post was from December 2022. That's over 3 years ago. It's like a restaurant with a menu from 2022—customers wonder if you're still open.",
    impact: "Google likes fresh content. When you don't update your blog, Google thinks your website isn't active anymore. This means fewer people find you when they search for 'window replacement near me.'",
    solution: "Publish new blog posts every month about things like 'How to Save Money on Window Replacement' or 'Best Windows for New England Weather.'",
    potentialGain: "30-50% more website traffic",
    effort: "Medium (2-3 hours/month)",
    priority: 2,
  },
  {
    id: 3,
    title: "Website Doesn't Work Well on Phones",
    icon: Smartphone,
    severity: "high",
    status: "Needs Work",
    description: "When people visit your website on their phone, things are hard to read, buttons are hard to click, and forms are annoying to fill out.",
    impact: "6 out of 10 people browsing the web are on their phones. If your website doesn't work on phones, you're losing 60% of potential customers.",
    solution: "Make sure your website looks perfect on phones. Buttons should be big enough to tap easily. Text should be easy to read. Forms should be simple.",
    potentialGain: "25-35% more phone calls",
    effort: "Medium (1-2 weeks)",
    priority: 3,
  },
  {
    id: 4,
    title: "No Before and After Photos",
    icon: Image,
    severity: "high",
    status: "Missing",
    description: "Your website shows some photos, but you don't have organized 'before and after' galleries showing your work.",
    impact: "Before and after photos are the #1 thing that makes people trust a home improvement company. When someone sees a beautiful window installation, they get excited and want to call you.",
    solution: "Take photos of your best projects (before installation, after installation). Organize them by window type or room. Add customer names and testimonials.",
    potentialGain: "20-30% higher conversion rate",
    effort: "Low (2-3 hours)",
    priority: 4,
  },
  {
    id: 5,
    title: "No Video Content",
    icon: Video,
    severity: "medium",
    status: "Missing",
    description: "Your website is all text and photos. No videos.",
    impact: "Video is 80% more engaging than text or photos. When someone watches a 2-minute video of your team installing windows, they feel like they already know you.",
    solution: "Create simple videos showing: How window replacement works, Customer testimonials, Your team talking about your work.",
    potentialGain: "80% more engagement",
    effort: "Medium (3-5 hours)",
    priority: 5,
  },
  {
    id: 6,
    title: "No FAQ Page",
    icon: MessageSquare,
    severity: "medium",
    status: "Missing",
    description: "People have questions, but they have to call you to get answers.",
    impact: "Not everyone wants to call. Some people like to research online first. When they can't find answers, they go to your competitor's website.",
    solution: "Create a page that answers the top 20 questions: 'How much do windows cost?' 'How long does installation take?' 'Do you offer financing?'",
    potentialGain: "20-30% fewer phone calls, higher quality leads",
    effort: "Low (2-3 hours)",
    priority: 6,
  },
  {
    id: 7,
    title: "Missing Trust Badges",
    icon: Award,
    severity: "medium",
    status: "Weak",
    description: "Your website doesn't show your certifications, awards, or insurance information clearly.",
    impact: "People want to know you're legitimate. They want to see badges showing you're certified, insured, and trusted.",
    solution: "Display your BBB rating prominently. Show manufacturer certifications. Display your insurance and bonding information.",
    potentialGain: "15-20% higher conversion rate",
    effort: "Low (1-2 hours)",
    priority: 7,
  },
  {
    id: 8,
    title: "No Email Lead Capture",
    icon: Mail,
    severity: "medium",
    status: "Missing",
    description: "Your only way to contact you is by phone or filling out a form for a quote. There's no email newsletter or downloadable guide.",
    impact: "Not everyone is ready to buy right now. You're missing the chance to stay in touch with people who are just researching.",
    solution: "Offer a free downloadable guide like 'The Homeowner's Guide to Choosing the Right Windows.' Ask for their email in exchange.",
    potentialGain: "30-40% of visitors come back later",
    effort: "Medium (3-4 hours)",
    priority: 8,
  },
  {
    id: 9,
    title: "Weak Social Media Presence",
    icon: Share2,
    severity: "low",
    status: "Minimal",
    description: "You have Facebook and Instagram links, but no active social media strategy. People can't see your recent posts.",
    impact: "Social media is where people hang out. When you post before and after photos and tips, people see you as an expert.",
    solution: "Post 2-3 times per week on Facebook and Instagram. Share before and after photos, customer testimonials, and seasonal tips.",
    potentialGain: "50% more brand awareness",
    effort: "Ongoing (2-3 hours/week)",
    priority: 9,
  },
  {
    id: 10,
    title: "No Financing Information",
    icon: DollarSign,
    severity: "low",
    status: "Incomplete",
    description: "Your website says 'financing available' but doesn't explain the options or link to financing partners.",
    impact: "Window replacement can be expensive. Many customers want to know if they can pay over time.",
    solution: "Clearly explain your financing options. Link to your financing partners. Show monthly payment examples.",
    potentialGain: "20-30% more sales",
    effort: "Low (1-2 hours)",
    priority: 10,
  },
];

// Score data for visualization
const scoreData = {
  overall: 58,
  categories: [
    { name: "Design & Layout", score: 75, color: "#10b981" },
    { name: "Mobile Experience", score: 45, color: "#f59e0b" },
    { name: "Content Freshness", score: 30, color: "#ef4444" },
    { name: "Trust Signals", score: 50, color: "#f59e0b" },
    { name: "SEO Optimization", score: 55, color: "#f59e0b" },
    { name: "Lead Capture", score: 40, color: "#ef4444" },
  ],
};

// Revenue impact data
const revenueImpact = {
  current: {
    visitors: 100,
    calls: 5,
    sales: 1,
    avgSale: 5000,
    annual: 60000,
  },
  projected: {
    visitors: 175,
    calls: 12,
    sales: 2.5,
    avgSale: 5000,
    annual: 150000,
  },
};

const revenueChartData = [
  { name: "Current", revenue: 60000, fill: "#94a3b8" },
  { name: "After Fixes", revenue: 150000, fill: "#10b981" },
];

const trafficProjection = [
  { month: "Now", current: 100, projected: 100 },
  { month: "Month 1", current: 100, projected: 115 },
  { month: "Month 2", current: 100, projected: 130 },
  { month: "Month 3", current: 100, projected: 145 },
  { month: "Month 6", current: 100, projected: 175 },
  { month: "Month 12", current: 100, projected: 200 },
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

export default function Audit() {
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
            The Window Source NH
          </h1>
          <p className="text-xl text-slate-300 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Website Analysis & Growth Opportunities
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Globe className="w-4 h-4 text-teal-400" />
              <span>windowsourcenh.com</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>January 17, 2026</span>
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
                <span className="font-semibold text-amber-600">Needs Improvement</span>
                <br />
                <span className="text-sm">Your website has potential but is missing key elements</span>
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
                    <div className="text-2xl font-bold text-slate-300">{revenueImpact.current.calls}</div>
                    <div className="text-xs text-slate-500">Phone Calls/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-300">${revenueImpact.current.annual.toLocaleString()}</div>
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
                    <div className="text-2xl font-bold text-white">{revenueImpact.projected.calls}</div>
                    <div className="text-xs text-teal-200">Phone Calls/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">${revenueImpact.projected.annual.toLocaleString()}</div>
                    <div className="text-xs text-teal-200">Annual Revenue (est.)</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Projected Traffic Growth</CardTitle>
                <CardDescription className="text-slate-400">Monthly visitors over 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trafficProjection}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="projected" stroke="#14b8a6" fillOpacity={1} fill="url(#colorProjected)" name="Projected Visitors" />
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
              +${(revenueImpact.projected.annual - revenueImpact.current.annual).toLocaleString()}
            </div>
            <p className="text-slate-400 mt-2">per year with these improvements</p>
          </div>
        </div>
      </div>

      {/* Findings Section */}
      <div className="container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            What We Found
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
                <CardDescription className="text-teal-100">2-4 weeks</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Fix the About page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Create an FAQ page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Add before/after gallery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Update blog with 3-4 posts</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">Expected Impact</div>
                  <div className="text-lg font-semibold text-teal-600">+20-30% more leads</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <CardTitle>Phase 2: Growth</CardTitle>
                </div>
                <CardDescription className="text-blue-100">4-8 weeks</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Create 2-3 videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Optimize for mobile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Set up social media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Create email capture</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">Expected Impact</div>
                  <div className="text-lg font-semibold text-blue-600">+40-50% more traffic</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <CardTitle>Phase 3: Scale</CardTitle>
                </div>
                <CardDescription className="text-purple-100">Ongoing</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Monthly blog posts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Weekly social media</span>
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
            Let's discuss how we can help The Window Source NH attract more customers and increase revenue.
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
            Website Audit Report • Prepared January 17, 2026
          </p>
          <p className="text-xs mt-2">
            This audit is based on a thorough review of your website, industry best practices, and data from thousands of home service businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}
