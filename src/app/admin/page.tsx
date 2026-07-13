"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Sliders,
  Info,
  TrendingUp,
  Briefcase,
  FolderKanban,
  Contact,
  Inbox,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Settings,
  Phone,
  MessageSquare,
  Globe,
  Upload,
  Lock,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { DatabaseSchema, ProjectItem, ServiceItem, HeroSlide, LeadItem } from "@/lib/db";

export default function AdminDashboard() {
  const [db, setDb] = useState<DatabaseSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("dashboard");

  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authChecking, setAuthChecking] = useState(true);

  // Project form states
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({});

  // Services form state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({});

  // Temporary list item inputs
  const [newHighlight, setNewHighlight] = useState("");
  const [newAmenity, setNewAmenity] = useState("");
  const [newAdvantage, setNewAdvantage] = useState("");
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/login");
      const data = await res.json();
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        fetchDB();
      }
    } catch (err) {
      console.error("Auth check error:", err);
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthChecking(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchDB();
      } else {
        setAuthError(data.error || "Incorrect password. Please try again.");
      }
    } catch (err) {
      setAuthError("Failed to authenticate. Server is not reachable.");
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      setIsAuthenticated(false);
      setDb(null);
      showToast("Logged out successfully");
    } catch (err) {
      showToast("Logout failed", "error");
    }
  };

  const fetchDB = async () => {
    try {
      const res = await fetch("/api/db");
      const data = await res.json();
      setDb(data);
    } catch (error) {
      showToast("Error loading database content", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4500);
  };

  // Global Image Uploader directly hitting Cloudinary via Server API
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploadSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    showToast("Uploading media asset to Cloudinary secure cloud...");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onUploadSuccess(data.url);
        showToast("Asset uploaded and synced successfully!");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to upload image file", "error");
    } finally {
      setUploading(false);
    }
  };

  // Global Save for CMS Configuration data
  const saveSection = async (updatedDb: DatabaseSchema, sectionName: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDb),
      });
      const data = await res.json();
      if (data.success) {
        setDb(data.db);
        showToast(`${sectionName} synced to Cloud MongoDB database!`);
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to sync to MongoDB", "error");
    } finally {
      setSaving(false);
    }
  };

  // Lead status updates
  const updateLead = async (leadId: string, newStatus: LeadItem["status"]) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-status", leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDB(); // Refresh leads
        showToast("Lead status updated successfully!");
      }
    } catch (error) {
      showToast("Failed to update lead status", "error");
    }
  };

  // Project actions
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.slug || !projectForm.name) {
      showToast("Project Name and Slug are required", "error");
      return;
    }

    const formattedSlug = projectForm.slug.toLowerCase().replace(/[^a-z0-9-_]/g, "-");
    const projectToSave = { ...projectForm, slug: formattedSlug } as ProjectItem;

    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectToSave),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Listing saved to Cloud MongoDB!");
        fetchDB();
        setIsAddingProject(false);
        setEditingProject(null);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      showToast(error.message || "Error saving project", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`/api/projects?slug=${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Listing removed from database!");
        fetchDB();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      showToast(error.message || "Error deleting project", "error");
    }
  };

  const handleEditProjectClick = (project: ProjectItem) => {
    setEditingProject(project);
    setProjectForm(project);
    setIsAddingProject(true);
  };

  const handleAddProjectClick = () => {
    setEditingProject(null);
    setProjectForm({
      slug: "",
      name: "",
      coverImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80",
      galleryImages: [],
      description: "",
      shortDescription: "",
      startingPrice: "20 Lakhs",
      plotSizes: "1200 - 3000 Sq.Ft.",
      status: "Ready to Construct",
      reraNumber: "",
      address: "",
      developer: "DreamSpace Developers",
      brochurePdfUrl: "",
      masterPlanUrl: "",
      googleMapEmbedUrl: "",
      highlights: [],
      amenities: [],
      locationAdvantages: [],
      faqs: [],
      seoTitle: "",
      seoDescription: "",
      publishStatus: "published",
    });
    setIsAddingProject(true);
  };

  // Login Screen Render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-[#C0A060] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Lock size={22} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wider">DreamSpace Admin Portal</h2>
            <p className="text-slate-400 text-xs">Enter your authorization password to access the database CMS.</p>
          </div>

          {authError && (
            <div className="bg-red-500/20 text-red-200 border border-red-500/30 text-xs p-3.5 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C0A060] focus:bg-white/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={authChecking}
              className="w-full bg-[#C0A060] hover:bg-[#b09050] disabled:bg-slate-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow-lg transition-colors"
            >
              {authChecking ? "Checking password..." : "Sign In to Database"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#2E3B26] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 font-medium text-sm">Synchronizing Cloud Collections...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      
      {/* Toast Notification */}
      {message.text && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-white flex items-center gap-3 transition-all duration-300 ${
            message.type === "error" ? "bg-red-600" : "bg-[#2E3B26]"
          }`}
        >
          {message.type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <span className="text-sm font-semibold">{message.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#2E3B26] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10 flex items-center justify-center">
          <img src="/logo.png" alt="DreamSpace Realties Logo" className="h-10 w-auto object-contain brightness-0 invert" />
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "dashboard" ? "bg-[#C0A060] text-white" : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("stats")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "stats" ? "bg-[#C0A060] text-white" : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <TrendingUp size={18} /> Statistics
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "services" ? "bg-[#C0A060] text-white" : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <Briefcase size={18} /> Services
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "projects" ? "bg-[#C0A060] text-white" : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <FolderKanban size={18} /> Projects CMS
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "leads" ? "bg-[#C0A060] text-white" : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Inbox size={18} /> Leads & Enquiries
            </div>
            {db.leads.filter((l) => l.status === "New").length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {db.leads.filter((l) => l.status === "New").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "contact" ? "bg-[#C0A060] text-white" : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <Contact size={18} /> Contact & Settings
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 text-slate-400 text-xs flex flex-col gap-2.5">
          <Link href="/" target="_blank" className="hover:text-white flex items-center justify-center gap-1.5 font-semibold text-[#C0A060]">
            <Globe size={14} /> Open Live Site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 py-1 text-slate-400 hover:text-red-300 text-xs font-medium bg-white/5 hover:bg-red-950/20 rounded border border-white/10 transition-colors"
          >
            <LogOut size={13} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-6xl overflow-y-auto">
        
        {/* TAB 1: DASHBOARD METRICS */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-extrabold text-[#2E3B26]">Admin Console Dashboard</h2>
              <p className="text-slate-500 text-xs mt-1">Real-time leads tracking and database configuration overview.</p>
            </div>

            {/* Counters Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Leads Received</span>
                <span className="text-3xl font-black text-slate-800 mt-2">{db.leads.length}</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between border-l-4 border-l-blue-500">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">New Enquiries</span>
                <span className="text-3xl font-black text-blue-600 mt-2">{db.leads.filter((l) => l.status === "New").length}</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between border-l-4 border-l-amber-500">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Contacted / In Progress</span>
                <span className="text-3xl font-black text-amber-600 mt-2">
                  {db.leads.filter((l) => l.status === "Contacted" || l.status === "In Progress").length}
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between border-l-4 border-l-green-600">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Closed Deals</span>
                <span className="text-3xl font-black text-green-700 mt-2">{db.leads.filter((l) => l.status === "Closed").length}</span>
              </div>
            </div>

            {/* Recent Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-extrabold text-base text-slate-800">Recent Customer Enquiries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Contact Detail</th>
                      <th className="py-3 px-4">Project</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Source / Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.leads.slice(0, 5).map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 space-y-1">
                          <span className="font-bold text-slate-800 block">{lead.name}</span>
                          <span className="text-slate-500 font-medium block">{lead.phone}</span>
                          <span className="text-slate-400 text-[11px] block">{lead.email}</span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#2E3B26]">{lead.project}</td>
                        <td className="py-3.5 px-4 text-slate-600 leading-normal max-w-xs truncate" title={lead.message}>
                          {lead.message}
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{lead.source}</span>
                          <span className="text-slate-400 text-[10px] block">{new Date(lead.date).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLead(lead.id, e.target.value as any)}
                            className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-[#2E3B26]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                            <option value="Junk">Junk</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO SLIDER CMS */}
        {activeTab === "hero" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#2E3B26]">Hero Slider</h2>
                <p className="text-slate-500 text-xs mt-1">Manage sliding banners, overlay text, and call-to-actions.</p>
              </div>
              <button
                onClick={() => {
                  const newSlide: HeroSlide = {
                    id: `slide-${Date.now()}`,
                    title: "New Slider Headline Title",
                    subtitle: "Description goes here.",
                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                    cta1Text: "Explore Projects",
                    cta1Link: "#projects",
                    cta2Text: "Contact Us",
                    cta2Link: "#contact",
                  };
                  const updated = { ...db, hero: [...db.hero, newSlide] };
                  setDb(updated);
                  saveSection(updated, "Hero Slider");
                }}
                className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Plus size={16} /> Add Slider Banner
              </button>
            </div>

            {db.hero.map((slide, idx) => (
              <div key={slide.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-extrabold text-sm text-[#2E3B26] uppercase tracking-wider">Banner Slide #{idx + 1}</h4>
                  <button
                    onClick={() => {
                      if (db.hero.length <= 1) {
                        alert("You must have at least 1 hero banner.");
                        return;
                      }
                      const updated = { ...db, hero: db.hero.filter((h) => h.id !== slide.id) };
                      setDb(updated);
                      saveSection(updated, "Hero Slider Banner Removed");
                    }}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-bold"
                  >
                    <Trash2 size={14} /> Remove Banner
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Headline Text</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updatedHero = [...db.hero];
                          updatedHero[idx].title = e.target.value;
                          setDb({ ...db, hero: updatedHero });
                        }}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Sub-description Text</label>
                      <textarea
                        value={slide.subtitle}
                        rows={3}
                        onChange={(e) => {
                          const updatedHero = [...db.hero];
                          updatedHero[idx].subtitle = e.target.value;
                          setDb({ ...db, hero: updatedHero });
                        }}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1 flex items-center justify-between">
                        <span>Background Image URL</span>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, (url) => {
                                const updatedHero = [...db.hero];
                                updatedHero[idx].image = url;
                                setDb({ ...db, hero: updatedHero });
                              })
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                          />
                          <button
                            type="button"
                            className="text-[#C0A060] hover:underline text-[10px] font-bold uppercase flex items-center gap-1"
                          >
                            <Upload size={12} /> Upload to Cloudinary
                          </button>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => {
                          const updatedHero = [...db.hero];
                          updatedHero[idx].image = e.target.value;
                          setDb({ ...db, hero: updatedHero });
                        }}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase mb-1">CTA 1 Text</label>
                        <input
                          type="text"
                          value={slide.cta1Text}
                          onChange={(e) => {
                            const updatedHero = [...db.hero];
                            updatedHero[idx].cta1Text = e.target.value;
                            setDb({ ...db, hero: updatedHero });
                          }}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase mb-1">CTA 1 Link</label>
                        <input
                          type="text"
                          value={slide.cta1Link}
                          onChange={(e) => {
                            const updatedHero = [...db.hero];
                            updatedHero[idx].cta1Link = e.target.value;
                            setDb({ ...db, hero: updatedHero });
                          }}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase mb-1">CTA 2 Text</label>
                        <input
                          type="text"
                          value={slide.cta2Text}
                          onChange={(e) => {
                            const updatedHero = [...db.hero];
                            updatedHero[idx].cta2Text = e.target.value;
                            setDb({ ...db, hero: updatedHero });
                          }}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase mb-1">CTA 2 Link</label>
                        <input
                          type="text"
                          value={slide.cta2Link}
                          onChange={(e) => {
                            const updatedHero = [...db.hero];
                            updatedHero[idx].cta2Link = e.target.value;
                            setDb({ ...db, hero: updatedHero });
                          }}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => saveSection(db, "Hero Banner Content")}
                    disabled={saving || uploading}
                    className="bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow flex items-center gap-1.5"
                  >
                    <Save size={14} /> {saving ? "Saving..." : "Save Banner Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ABOUT PAGE CMS */}
        {activeTab === "about" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-extrabold text-[#2E3B26]">About Page Content</h2>
              <p className="text-slate-500 text-xs mt-1">Configure company profiles, images, and description blocks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={db.about.title}
                    onChange={(e) => setDb({ ...db, about: { ...db.about, title: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={db.about.subtitle}
                    onChange={(e) => setDb({ ...db, about: { ...db.about, subtitle: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">About Description</label>
                  <textarea
                    value={db.about.description}
                    rows={8}
                    onChange={(e) => setDb({ ...db, about: { ...db.about, description: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5 flex items-center justify-between">
                    <span>Drone Site Image URL</span>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setDb({ ...db, about: { ...db.about, image: url } }))}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full"
                      />
                      <button
                        type="button"
                        className="text-[#C0A060] hover:underline text-[10px] font-bold uppercase flex items-center gap-1"
                      >
                        <Upload size={12} /> Upload to Cloudinary
                      </button>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={db.about.image}
                    onChange={(e) => setDb({ ...db, about: { ...db.about, image: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                  {db.about.image && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200 mt-2 bg-slate-50">
                      <img src={db.about.image} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">CTA Text</label>
                    <input
                      type="text"
                      value={db.about.ctaText}
                      onChange={(e) => setDb({ ...db, about: { ...db.about, ctaText: e.target.value } })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">CTA Link</label>
                    <input
                      type="text"
                      value={db.about.ctaLink}
                      onChange={(e) => setDb({ ...db, about: { ...db.about, ctaLink: e.target.value } })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => saveSection(db, "About Page")}
                disabled={saving || uploading}
                className="bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider shadow flex items-center gap-1.5"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save About Settings"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: STATISTICS CMS */}
        {activeTab === "stats" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-extrabold text-[#2E3B26]">Project Statistics</h2>
              <p className="text-slate-500 text-xs mt-1">Configure statistics displayed in the primary dark-olive layout bar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {db.statistics.map((stat, idx) => (
                <div key={stat.id} className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50">
                  <span className="font-bold text-xs text-slate-400 uppercase tracking-widest block">Counter Box #{idx + 1}</span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-slate-600 text-[10px] font-bold uppercase mb-1">Value (e.g. 100+)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updatedStats = [...db.statistics];
                          updatedStats[idx].value = e.target.value;
                          setDb({ ...db, statistics: updatedStats });
                        }}
                        className="w-full border border-slate-200 rounded-lg p-2 text-sm text-center font-bold text-[#C0A060] bg-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-600 text-[10px] font-bold uppercase mb-1">Label Title</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updatedStats = [...db.statistics];
                          updatedStats[idx].label = e.target.value;
                          setDb({ ...db, statistics: updatedStats });
                        }}
                        className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => saveSection(db, "Project Statistics")}
                disabled={saving}
                className="bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider shadow flex items-center gap-1.5"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Statistics Data"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES CMS */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#2E3B26]">Services Configuration</h2>
                <p className="text-slate-500 text-xs mt-1">Configure service cards, display order, and Lucide vector icons.</p>
              </div>
              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceForm({
                    id: `service-${Date.now()}`,
                    title: "New Marketing Service",
                    description: "Details on marketing solutions.",
                    iconName: "Megaphone",
                    displayOrder: db.services.length + 1,
                  });
                  setIsAddingService(true);
                }}
                className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Plus size={16} /> Add New Service
              </button>
            </div>

            {!isAddingService ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {db.services
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((service) => (
                    <div key={service.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <span className="text-[#C0A060] font-bold text-[9px] uppercase tracking-wider bg-[#2E3B26]/5 px-2 py-0.5 rounded">
                          Order: {service.displayOrder} • Icon: {service.iconName}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base pt-1">{service.title}</h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingService(service);
                            setServiceForm(service);
                            setIsAddingService(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (!confirm("Delete this service?")) return;
                            const updated = { ...db, services: db.services.filter((s) => s.id !== service.id) };
                            setDb(updated);
                            saveSection(updated, "Service Deleted");
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!serviceForm.title) return;
                  const updatedServices = [...db.services];
                  const existingIdx = updatedServices.findIndex((s) => s.id === serviceForm.id);
                  
                  if (existingIdx >= 0) {
                    updatedServices[existingIdx] = serviceForm as ServiceItem;
                  } else {
                    updatedServices.push(serviceForm as ServiceItem);
                  }

                  const updatedDb = { ...db, services: updatedServices };
                  setDb(updatedDb);
                  saveSection(updatedDb, "Services list updated");
                  setIsAddingService(false);
                }}
                className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-xl"
              >
                <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-2">
                  {editingService ? "Modify Service Item" : "Create Service Item"}
                </h3>
                
                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Lucide Vector Icon Name</label>
                    <select
                      value={serviceForm.iconName}
                      onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white"
                    >
                      <option value="Megaphone">Megaphone (Marketing)</option>
                      <option value="TrendingUp">TrendingUp (Advice)</option>
                      <option value="Users">Users (Consultation)</option>
                      <option value="Network">Network (Partner CP)</option>
                      <option value="Headphones">Headphones (Support)</option>
                      <option value="BarChart3">BarChart3 (Research)</option>
                      <option value="Home">Home (Default)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Display Order</label>
                    <input
                      type="number"
                      required
                      value={serviceForm.displayOrder}
                      onChange={(e) => setServiceForm({ ...serviceForm, displayOrder: parseInt(e.target.value) })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingService(false)}
                    className="border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 6: PROJECTS CMS */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#2E3B26]">Projects CMS Database</h2>
                <p className="text-slate-500 text-xs mt-1">Full control over listing variables, galleries, brochure links, maps, and SEO.</p>
              </div>
              {!isAddingProject && (
                <button
                  onClick={handleAddProjectClick}
                  className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                >
                  <Plus size={16} /> Create Project Listing
                </button>
              )}
            </div>

            {!isAddingProject ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                      <th className="py-3 px-4">Project Image</th>
                      <th className="py-3 px-4">Project Details</th>
                      <th className="py-3 px-4">Starting Price</th>
                      <th className="py-3 px-4">RERA Number</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.projects.map((project) => (
                      <tr key={project.slug} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 w-24">
                          <div className="relative w-16 h-12 rounded overflow-hidden bg-slate-100 border border-slate-200">
                            <img src={project.coverImage} alt={project.name} className="object-cover w-full h-full" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-extrabold text-slate-800 text-sm block">{project.name}</span>
                          <span className="text-slate-400 text-[10px] font-semibold block uppercase tracking-wider mt-0.5">Slug: {project.slug}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#2E3B26]">₹{project.startingPrice}</td>
                        <td className="py-3 px-4 text-slate-600 font-medium text-[11px] truncate max-w-xxs" title={project.reraNumber}>
                          {project.reraNumber || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            project.publishStatus === "published" ? "bg-green-50 text-green-700 border border-green-200" : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}>
                            {project.publishStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleEditProjectClick(project)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded inline-flex items-center"
                            title="Edit project details"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.slug)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded inline-flex items-center"
                            title="Delete project listing"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <form onSubmit={handleSaveProject} className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in zoom-in duration-300">
                <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>{editingProject ? `Edit Listing: ${editingProject.name}` : "Create Gated Community Listing"}</span>
                  <span className="text-[10px] uppercase font-bold text-[#C0A060]">CMS Editor</span>
                </h3>

                {/* Section A: Core Metadata */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-xs uppercase text-[#2E3B26] border-l-4 border-l-[#C0A060] pl-2">Section A: Core Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Project Name *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.name || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">URL Slug (lowercase & hyphens) *</label>
                      <input
                        type="text"
                        required
                        disabled={!!editingProject}
                        value={projectForm.slug || ""}
                        placeholder="e.g. mega-project"
                        onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Starting Price *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.startingPrice || ""}
                        placeholder="e.g. 25 Lakhs"
                        onChange={(e) => setProjectForm({ ...projectForm, startingPrice: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-[#2E3B26]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Plot Sizes *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.plotSizes || ""}
                        placeholder="e.g. 1200 - 3000 Sq.Ft."
                        onChange={(e) => setProjectForm({ ...projectForm, plotSizes: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Project Status *</label>
                      <select
                        value={projectForm.status || "Ready to Construct"}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white"
                      >
                        <option value="Ready to Construct">Ready to Construct</option>
                        <option value="Under Development">Under Development</option>
                        <option value="Pre-Launch">Pre-Launch</option>
                        <option value="Almost Sold Out">Almost Sold Out</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">RERA Certificate ID</label>
                      <input
                        type="text"
                        value={projectForm.reraNumber || ""}
                        placeholder="e.g. PRM/KA/RERA/..."
                        onChange={(e) => setProjectForm({ ...projectForm, reraNumber: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Developer name</label>
                      <input
                        type="text"
                        value={projectForm.developer || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, developer: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Coordinates Address</label>
                      <input
                        type="text"
                        value={projectForm.address || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, address: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Media & Assets */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-extrabold text-xs uppercase text-[#2E3B26] border-l-4 border-l-[#C0A060] pl-2">Section B: Media & Graphic URLs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1 flex items-center justify-between">
                        <span>Cover/Main Layout Image URL</span>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => setProjectForm({ ...projectForm, coverImage: url }))}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                          />
                          <button
                            type="button"
                            className="text-[#C0A060] hover:underline text-[10px] font-bold uppercase flex items-center gap-1"
                          >
                            <Upload size={12} /> Upload
                          </button>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={projectForm.coverImage || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1 flex items-center justify-between">
                        <span>Layout Master Plan Image URL</span>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => setProjectForm({ ...projectForm, masterPlanUrl: url }))}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                          />
                          <button
                            type="button"
                            className="text-[#C0A060] hover:underline text-[10px] font-bold uppercase flex items-center gap-1"
                          >
                            <Upload size={12} /> Upload
                          </button>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={projectForm.masterPlanUrl || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, masterPlanUrl: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Google Maps Iframe coordinates Embed URL</label>
                    <input
                      type="text"
                      value={projectForm.googleMapEmbedUrl || ""}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      onChange={(e) => setProjectForm({ ...projectForm, googleMapEmbedUrl: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1 flex items-center justify-between">
                      <span>Gallery Images List (Add Image URLs)</span>
                      <div className="flex gap-4">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, (url) =>
                                setProjectForm({
                                  ...projectForm,
                                  galleryImages: [...(projectForm.galleryImages || []), url],
                                })
                              )
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                          />
                          <button
                            type="button"
                            className="text-[#C0A060] hover:underline text-[10px] font-bold uppercase flex items-center gap-1"
                          >
                            <Upload size={12} /> Upload Gallery
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt("Enter Image URL:");
                            if (url) {
                              setProjectForm({
                                ...projectForm,
                                galleryImages: [...(projectForm.galleryImages || []), url],
                              });
                            }
                          }}
                          className="text-[#C0A060] hover:underline text-[10px] font-bold uppercase flex items-center gap-1"
                        >
                          <Plus size={12} /> Link URL
                        </button>
                      </div>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      {projectForm.galleryImages?.map((url, idx) => (
                        <div key={idx} className="relative aspect-video rounded border border-slate-200 overflow-hidden bg-slate-50 group">
                          <img src={url} alt={`Gallery ${idx + 1}`} className="object-cover w-full h-full" />
                          <button
                            type="button"
                            onClick={() => {
                              setProjectForm({
                                ...projectForm,
                                galleryImages: projectForm.galleryImages?.filter((_, i) => i !== idx),
                              });
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section C: Description & Highlights */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-extrabold text-xs uppercase text-[#2E3B26] border-l-4 border-l-[#C0A060] pl-2">Section C: Description Content</h4>
                  
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Short Card Summary Description *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.shortDescription || ""}
                      placeholder="Brief card summary shown in project lists"
                      onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Extended Overview Description</label>
                    <textarea
                      value={projectForm.description || ""}
                      rows={5}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Key Highlights</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          placeholder="e.g. 100% Clear Title"
                          className="flex-grow border border-slate-200 rounded-lg px-3 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newHighlight) return;
                            setProjectForm({
                              ...projectForm,
                              highlights: [...(projectForm.highlights || []), newHighlight],
                            });
                            setNewHighlight("");
                          }}
                          className="bg-[#2E3B26] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {projectForm.highlights?.map((item, idx) => (
                          <li key={idx} className="bg-slate-50 px-3 py-1.5 rounded flex items-center justify-between text-xs font-semibold text-slate-700">
                            <span>{item}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setProjectForm({
                                  ...projectForm,
                                  highlights: projectForm.highlights?.filter((_, i) => i !== idx),
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Amenities</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAmenity}
                          onChange={(e) => setNewAmenity(e.target.value)}
                          placeholder="e.g. 24/7 Security"
                          className="flex-grow border border-slate-200 rounded-lg px-3 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newAmenity) return;
                            setProjectForm({
                              ...projectForm,
                              amenities: [...(projectForm.amenities || []), newAmenity],
                            });
                            setNewAmenity("");
                          }}
                          className="bg-[#2E3B26] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {projectForm.amenities?.map((item, idx) => (
                          <li key={idx} className="bg-slate-50 px-3 py-1.5 rounded flex items-center justify-between text-xs font-semibold text-slate-700">
                            <span>{item}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setProjectForm({
                                  ...projectForm,
                                  amenities: projectForm.amenities?.filter((_, i) => i !== idx),
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section D: SEO Fields */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-extrabold text-xs uppercase text-[#2E3B26] border-l-4 border-l-[#C0A060] pl-2">Section D: SEO Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1">SEO Title Tag</label>
                      <input
                        type="text"
                        value={projectForm.seoTitle || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, seoTitle: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2E3B26] text-xs font-bold uppercase mb-1">Publish Status</label>
                      <select
                        value={projectForm.publishStatus || "published"}
                        onChange={(e) => setProjectForm({ ...projectForm, publishStatus: e.target.value as any })}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft / Hidden</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">SEO Meta Description</label>
                    <textarea
                      value={projectForm.seoDescription || ""}
                      rows={2}
                      onChange={(e) => setProjectForm({ ...projectForm, seoDescription: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="border border-slate-200 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow flex items-center gap-1.5"
                  >
                    <Save size={14} /> {saving ? "Saving..." : "Save Project Data"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 7: LEADS AND ENQUIRIES */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#2E3B26]">Customer Lead Tracking</h2>
                <p className="text-slate-500 text-xs mt-1">Review contact inquiries captured from site forms and WhatsApp clicks.</p>
              </div>
              <button
                onClick={fetchDB}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh Leads
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Project Target</th>
                    <th className="py-3 px-4">Enquiry Message</th>
                    <th className="py-3 px-4">Source / Date</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {db.leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 space-y-1">
                        <span className="font-bold text-slate-800 block text-sm">{lead.name}</span>
                        <span className="text-slate-500 font-semibold block">{lead.phone}</span>
                        <span className="text-slate-400 text-xs block">{lead.email || "No Email Provided"}</span>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#2E3B26]">{lead.project}</td>
                      <td className="py-4 px-4 text-slate-600 leading-relaxed text-xs max-w-sm whitespace-pre-line">
                        {lead.message}
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {lead.source}
                        </span>
                        <span className="text-slate-400 text-[10px] block mt-1">
                          {new Date(lead.date).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLead(lead.id, e.target.value as any)}
                          className={`border rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-[#2E3B26] ${
                            lead.status === "New"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : lead.status === "Contacted"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : lead.status === "In Progress"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : lead.status === "Closed"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                          <option value="Junk">Junk</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: CONTACT & GENERAL SETTINGS */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-extrabold text-[#2E3B26]">Contact & General Settings</h2>
              <p className="text-slate-500 text-xs mt-1">Configure company telephone numbers, social handles, maps, and email addresses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-extrabold text-xs uppercase text-[#2E3B26] border-l-4 border-l-[#C0A060] pl-2">Office Details</h4>
                
                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Company Phone</label>
                  <input
                    type="text"
                    value={db.contact.phone}
                    onChange={(e) => setDb({ ...db, contact: { ...db.contact, phone: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">WhatsApp API phone (e.g. 919876543210)</label>
                  <input
                    type="text"
                    value={db.contact.whatsapp}
                    onChange={(e) => setDb({ ...db, contact: { ...db.contact, whatsapp: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold text-green-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Office Email address</label>
                  <input
                    type="email"
                    value={db.contact.email}
                    onChange={(e) => setDb({ ...db, contact: { ...db.contact, email: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Working hours info</label>
                  <input
                    type="text"
                    value={db.contact.workingHours}
                    onChange={(e) => setDb({ ...db, contact: { ...db.contact, workingHours: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Office coordinates address</label>
                  <textarea
                    value={db.contact.address}
                    rows={3}
                    onChange={(e) => setDb({ ...db, contact: { ...db.contact, address: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-extrabold text-xs uppercase text-[#2E3B26] border-l-4 border-l-[#C0A060] pl-2">Social links & Map</h4>
                
                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Google Maps Iframe Coordinate Embed URL</label>
                  <input
                    type="text"
                    value={db.contact.googleMapsLink}
                    onChange={(e) => setDb({ ...db, contact: { ...db.contact, googleMapsLink: e.target.value } })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={db.contact.socialFacebook}
                      onChange={(e) => setDb({ ...db, contact: { ...db.contact, socialFacebook: e.target.value } })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={db.contact.socialInstagram}
                      onChange={(e) => setDb({ ...db, contact: { ...db.contact, socialInstagram: e.target.value } })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Twitter URL</label>
                    <input
                      type="text"
                      value={db.contact.socialTwitter}
                      onChange={(e) => setDb({ ...db, contact: { ...db.contact, socialTwitter: e.target.value } })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={db.contact.socialLinkedin}
                      onChange={(e) => setDb({ ...db, contact: { ...db.contact, socialLinkedin: e.target.value } })}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => saveSection(db, "General Settings")}
                disabled={saving}
                className="bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider shadow flex items-center gap-1.5"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Config Settings"}
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
