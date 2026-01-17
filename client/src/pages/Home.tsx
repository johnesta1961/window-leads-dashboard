import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Search, TrendingUp, MapPin, Phone, Mail, Globe, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useMemo } from "react";

const leadsData = [
  {
    id: 1,
    company_name: "Coastal Windows & Siding",
    website: "https://www.coastalwindowsandsiding.com/",
    location: "Exeter, NH",
    phone: "603-609-5503",
    email: "coastalws@att.net",
    years_in_business: 30,
    traffic_level: "Low",
    search_visibility: "Low",
    marketing_opportunity: "High",
    qualified: true,
  },
  {
    id: 2,
    company_name: "Seacoast Replacement Windows",
    website: "https://www.seacoastwindowguys.com/",
    location: "Plaistow, NH",
    phone: "1-800-693-1307",
    email: "jsullivan@seacoastwindowguys.com",
    years_in_business: 20,
    traffic_level: "Moderate",
    search_visibility: "Moderate",
    marketing_opportunity: "Medium",
    qualified: true,
  },
  {
    id: 3,
    company_name: "Atlantic Window Warehouse",
    website: "https://www.atlwindow.com/",
    location: "Newburyport, MA",
    phone: "978-465-9696",
    email: "atlwindow@gmail.com",
    years_in_business: 32,
    traffic_level: "Moderate",
    search_visibility: "Moderate",
    marketing_opportunity: "Medium",
    qualified: true,
  },
  {
    id: 4,
    company_name: "Granite State Glass",
    website: "https://granitestateglass.com/",
    location: "Gilford, NH",
    phone: "603-528-4748",
    email: "toconnor@granitestateglass.com",
    years_in_business: 40,
    traffic_level: "High",
    search_visibility: "High",
    marketing_opportunity: "Low",
    qualified: false,
  },
  {
    id: 5,
    company_name: "The Window Source NH",
    website: "https://www.windowsourcenh.com/",
    location: "Seabrook, NH",
    phone: "888-467-0324",
    email: "info@thewindowsource.net",
    years_in_business: 15,
    traffic_level: "Moderate",
    search_visibility: "High",
    marketing_opportunity: "Medium",
    qualified: true,
  },
  {
    id: 6,
    company_name: "JC Home Improvement",
    website: "https://jchomeimprovement.com/",
    location: "Portsmouth, NH",
    phone: "207-752-6378",
    email: "ktuttle1987@gmail.com",
    years_in_business: 5,
    traffic_level: "Very Low",
    search_visibility: "Very Low",
    marketing_opportunity: "High",
    qualified: true,
  },
  {
    id: 7,
    company_name: "Silver Brothers Painting & Construction",
    website: "https://silverbrospainting.com/",
    location: "Seacoast, NH",
    phone: "N/A",
    email: "N/A",
    years_in_business: 10,
    traffic_level: "Low",
    search_visibility: "Low",
    marketing_opportunity: "High",
    qualified: true,
  },
  {
    id: 8,
    company_name: "Distinctive Siding & Window",
    website: "https://www.distinctivesidingandwindow.com/",
    location: "Rochester, NH",
    phone: "N/A",
    email: "N/A",
    years_in_business: 12,
    traffic_level: "Low",
    search_visibility: "Low",
    marketing_opportunity: "High",
    qualified: true,
  },
  {
    id: 9,
    company_name: "Window Authority",
    website: "https://www.windowauthority.com/",
    location: "Southern NH",
    phone: "N/A",
    email: "N/A",
    years_in_business: 8,
    traffic_level: "Moderate",
    search_visibility: "Moderate",
    marketing_opportunity: "Medium",
    qualified: true,
  },
  {
    id: 10,
    company_name: "All Weather Exteriors",
    website: "https://www.myallweatherexteriors.com/",
    location: "NH",
    phone: "N/A",
    email: "N/A",
    years_in_business: 10,
    traffic_level: "Moderate",
    search_visibility: "Moderate",
    marketing_opportunity: "Medium",
    qualified: true,
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    return leadsData.filter((lead) => {
      const matchesSearch = lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOpportunity = !selectedOpportunity || lead.marketing_opportunity === selectedOpportunity;
      return matchesSearch && matchesOpportunity;
    });
  }, [searchTerm, selectedOpportunity]);

  const stats = {
    total: leadsData.length,
    qualified: leadsData.filter(l => l.qualified).length,
    highOpportunity: leadsData.filter(l => l.marketing_opportunity === "High").length,
    mediumOpportunity: leadsData.filter(l => l.marketing_opportunity === "Medium").length,
  };

  const opportunityData = [
    { name: "High", value: stats.highOpportunity, fill: "#ef4444" },
    { name: "Medium", value: stats.mediumOpportunity, fill: "#f59e0b" },
    { name: "Low", value: leadsData.filter(l => l.marketing_opportunity === "Low").length, fill: "#10b981" },
  ];

  const trafficData = [
    { name: "High", count: leadsData.filter(l => l.traffic_level === "High").length },
    { name: "Moderate", count: leadsData.filter(l => l.traffic_level === "Moderate").length },
    { name: "Low", count: leadsData.filter(l => l.traffic_level === "Low" || l.traffic_level === "Very Low").length },
  ];

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "High":
        return "bg-red-100 text-red-800 border-red-300";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrafficColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-green-600";
      case "Moderate":
        return "text-blue-600";
      case "Low":
      case "Very Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Window Replacement Leads
            </h1>
            <div className="text-right">
              <p className="text-sm text-slate-600">Portsmouth, NH Region</p>
              <p className="text-xs text-slate-500">60-mile radius analysis</p>
            </div>
          </div>
          <p className="text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
            Qualified leads with traffic analysis and marketing opportunities
          </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
              <p className="text-xs text-slate-500 mt-1">Qualified companies</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">High Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.highOpportunity}</div>
              <p className="text-xs text-slate-500 mt-1">Low traffic, high potential</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Medium Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{stats.mediumOpportunity}</div>
              <p className="text-xs text-slate-500 mt-1">Growth potential</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Qualified Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">{stats.qualified}</div>
              <p className="text-xs text-slate-500 mt-1">Active in market</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Opportunity Distribution</CardTitle>
              <CardDescription>Marketing opportunity levels across leads</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={opportunityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {opportunityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Website Traffic Levels</CardTitle>
              <CardDescription>Current traffic distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#f1f5f9" }} />
                  <Bar dataKey="count" fill="#0891b2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search by company name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedOpportunity === null ? "default" : "outline"}
                onClick={() => setSelectedOpportunity(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                All
              </Button>
              <Button
                variant={selectedOpportunity === "High" ? "default" : "outline"}
                onClick={() => setSelectedOpportunity("High")}
                className={selectedOpportunity === "High" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                High Opportunity
              </Button>
              <Button
                variant={selectedOpportunity === "Medium" ? "default" : "outline"}
                onClick={() => setSelectedOpportunity("Medium")}
                className={selectedOpportunity === "Medium" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Medium
              </Button>
            </div>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold text-slate-900 line-clamp-2">
                      {lead.company_name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {lead.location}
                    </CardDescription>
                  </div>
                  <Badge className={`${getOpportunityColor(lead.marketing_opportunity)} border`}>
                    {lead.marketing_opportunity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Traffic Metrics */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Traffic Level:</span>
                    <span className={`font-semibold ${getTrafficColor(lead.traffic_level)}`}>
                      {lead.traffic_level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Search Visibility:</span>
                    <span className={`font-semibold ${getTrafficColor(lead.search_visibility)}`}>
                      {lead.search_visibility}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  {lead.phone !== "N/A" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <a href={`tel:${lead.phone}`} className="text-teal-600 hover:text-teal-700 font-medium">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  {lead.email !== "N/A" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <a href={`mailto:${lead.email}`} className="text-teal-600 hover:text-teal-700 font-medium truncate">
                        {lead.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-slate-400" />
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium truncate">
                      Visit Website
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                  <span>{lead.years_in_business} years in business</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No leads found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 mt-12">
        <div className="container py-6 text-center text-sm text-slate-600">
          <p>Window Replacement Leads Dashboard • Research Date: January 17, 2026</p>
          <p className="mt-1">60-mile radius from Portsmouth, NH</p>
        </div>
      </div>
    </div>
  );
}
