import { connectToDatabase } from "./mongodb";

// Define the Database Schema Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface StatisticItem {
  id: string;
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  displayOrder: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProjectItem {
  slug: string;
  name: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  shortDescription: string;
  startingPrice: string;
  plotSizes: string;
  status: "Ready to Construct" | "Under Development" | "Pre-Launch" | "Almost Sold Out";
  reraNumber: string;
  address: string;
  developer: string;
  brochurePdfUrl: string;
  masterPlanUrl: string;
  googleMapEmbedUrl: string;
  highlights: string[];
  amenities: string[];
  locationAdvantages: string[];
  faqs: FAQItem[];
  seoTitle: string;
  seoDescription: string;
  publishStatus: "published" | "draft";
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
  source: string;
  status: "New" | "Contacted" | "In Progress" | "Closed" | "Junk";
  date: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  avatar: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  googleMapsLink: string;
  workingHours: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialLinkedin: string;
}

export interface DatabaseSchema {
  hero: HeroSlide[];
  about: AboutSection;
  statistics: StatisticItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  values: ValueItem[];
  testimonials: TestimonialItem[];
  contact: ContactInfo;
  leads: LeadItem[];
}

// Seed Data
const DEFAULT_DATA = {
  hero: [
    {
      id: "slide-1",
      title: "Turning Dreams into Reality",
      subtitle: "DreamSpace Realties is a distinguished real estate firm that makes property buying and selling simple, reliable, and hassle-free. We deal in residential plots, flats, and houses, ensuring that buyers get access to genuine and verified options. Our focus is on maintaining transparency, offering prime locations, and guiding clients at every step—from site visits to final documentation—so they can make confident decisions and secure their dream property.",
      image: "/hero-bg.jpg",
      cta1Text: "Explore Projects",
      cta1Link: "#projects",
      cta2Text: "Contact us",
      cta2Link: "#contact",
    },
    {
      id: "slide-2",
      title: "Premium Plots in Strategic Locations",
      subtitle: "Invest in high-growth residential plotted developments in Bangalore's most sought-after corridors. With wide internal roads, underground utilities, fully loaded amenities, and immediate construction readiness, DreamSpace helps you secure your family's future.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      cta1Text: "Our Projects",
      cta1Link: "#projects",
      cta2Text: "Book Site Visit",
      cta2Link: "#contact",
    }
  ],
  about: {
    title: "About DreamSpace Realties",
    subtitle: "Your Trusted Property Partner",
    description: "DreamSpace Realties is a trusted name in the real estate space, focused on making property deals smooth and transparent.\n\nWe help clients buy and sell residential plots, flats, and houses with complete confidence. Our team ensures every property is verified and offers genuine value to buyers.\n\nWe guide you through every step, from selecting the right property to final documentation. With a focus on prime locations and customer satisfaction, we aim to simplify your journey. At DreamSpace Realties, our mission is to turn your property goals into reality with trust and ease.",
    image: "/about-drone.jpg",
    ctaText: "Know more",
    ctaLink: "#contact",
  },
  statistics: [
    { id: "stat-1", value: "2+", label: "Developer Partner" },
    { id: "stat-2", value: "10+", label: "Projects Marketed" },
    { id: "stat-3", value: "100+", label: "Happy Families" },
    { id: "stat-4", value: "3+", label: "Years of Experience" },
  ],
  services: [
    {
      id: "service-1",
      title: "Project Marketing",
      description: "Strategic Marketing for Maximum reach and impact.",
      iconName: "Megaphone",
      displayOrder: 1,
    },
    {
      id: "service-2",
      title: "Property Advice",
      description: "Expert Advice to helping you to make right investment decision.",
      iconName: "TrendingUp",
      displayOrder: 2,
    },
    {
      id: "service-3",
      title: "Property Consultation",
      description: "End-to-End Support from Selection to Possession.",
      iconName: "Users",
      displayOrder: 3,
    },
    {
      id: "service-4",
      title: "Channel Partner Management",
      description: "Strong network of channel partner for seamless sales.",
      iconName: "Network",
      displayOrder: 4,
    },
    {
      id: "service-5",
      title: "Customer Support",
      description: "Dedicated support throughout your buying journey.",
      iconName: "Headphones",
      displayOrder: 5,
    },
    {
      id: "service-6",
      title: "Market Research",
      description: "In-depth market insights to guide better decisions.",
      iconName: "BarChart3",
      displayOrder: 6,
    },
  ],
  values: [
    {
      id: "val-1",
      title: "Trust & Transparency",
      description: "We believe in honest communication and ethical practices",
    },
    {
      id: "val-2",
      title: "Strong developer tie-ups",
      description: "Our partnership enables us to brings you the best projects",
    },
    {
      id: "val-3",
      title: "Customer First",
      description: "Your satisfaction and dreams are our top priority",
    },
    {
      id: "val-4",
      title: "Timely Delivery",
      description: "We ensure a smooth and timely experience from start to finish",
    },
  ],
  testimonials: [
    {
      id: "t-1",
      name: "Rohan Sharma",
      role: "IT Consultant",
      feedback: "Bought a plot in Mega Project through DreamSpace. The documentation process was extremely smooth, and their representative was there with me at the registrar's office. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "t-2",
      name: "Anjali Deshmukh",
      role: "Business Owner",
      feedback: "DreamSpace Realties was helpful in explaining the RERA details and checking the land titles. I bought a plot in Panchwati Nagar and am looking forward to building my house next year.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    }
  ],
  contact: {
    phone: "+91 99055 58959",
    email: "info@dreamspacerealties.com",
    whatsapp: "919905558959",
    address: "123 DreamSpace Tower, Outer Ring Road, Bangalore, Karnataka - 560103",
    googleMapsLink: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM, Sunday: Closed",
    socialFacebook: "https://facebook.com/dreamspace",
    socialTwitter: "https://twitter.com/dreamspace",
    socialInstagram: "https://instagram.com/dreamspace",
    socialLinkedin: "https://linkedin.com/company/dreamspace",
  },
};

const SEED_PROJECTS: ProjectItem[] = [
  {
    slug: "mega-project",
    name: "MEGA PROJECT",
    coverImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Mega Project offers premium villa plots designed for fine living. Situated in Bangalore's fastest-growing residential hub, it features wide black-topped roads, underground electricity and drainage, a fully equipped clubhouse, and round-the-clock security. This layout combines peaceful green living with urban convenience, making it the perfect choice for your dream home or a high-return investment.",
    shortDescription: "Premium villa plots with state-of-the-art amenities on Outer Ring Road.",
    startingPrice: "25 Lakhs",
    plotSizes: "1200 - 3000 Sq.Ft.",
    status: "Ready to Construct",
    reraNumber: "PRM/KA/RERA/1251/446/PR/220524/005912",
    address: "Outer Ring Road Extension, Near Tech Park, Bangalore North",
    developer: "DreamSpace Developers",
    brochurePdfUrl: "",
    masterPlanUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    highlights: [
      "100% Clear Title & DC Converted",
      "Gated community with 30ft & 40ft wide internal tar roads",
      "Underground cabling for electricity, internet, and telephone lines",
      "Sewage treatment plant (STP) & rainwater harvesting conduits",
      "Overhead water tank with connections to every plot"
    ],
    amenities: [
      "24/7 Gated Security & CCTV",
      "Lush Green Parks & Pathways",
      "Modern Clubhouse & Fitness Gym",
      "Yoga & Meditation Deck",
      "Multi-purpose Play Arena",
      "Water & Electricity Pipelines"
    ],
    locationAdvantages: [
      "10 Mins from Major IT Parks & Tech Hubs",
      "5 Mins drive from Proposed Metro Station",
      "Top-rated international schools within a 3km radius",
      "Premium multi-specialty hospitals within 15 mins",
      "Direct access to Outer Ring Road & NH44"
    ],
    faqs: [
      {
        question: "Is the project RERA approved?",
        answer: "Yes, the project is registered with Karnataka RERA. The registration number is PRM/KA/RERA/1251/446/PR/220524/005912."
      },
      {
        question: "Can I get a bank loan for purchasing a plot?",
        answer: "Absolutely! The project is approved by major banks like SBI, HDFC, ICICI, and LIC HFL. Loans up to 70-80% are easily available depending on eligibility."
      }
    ],
    seoTitle: "Premium Villa Plots for Sale on Outer Ring Road Bangalore | Mega Project",
    seoDescription: "Buy premium villa plots in Mega Project on Outer Ring Road Bangalore. Ready to construct gated community with 20+ amenities and bank approval.",
    publishStatus: "published"
  },
  {
    slug: "panchwati-nagar",
    name: "PANCHWATI NAGAR",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Panchwati Nagar is a nature-centric plotted township near Devanahalli. Nestled in a peaceful green valley, it is designed for those who appreciate organic living and clean air. The layout features beautiful organic gardens, fruit-bearing tree pathways, jogging trails, and a natural lake view park, while providing high-quality infrastructure like wide concrete roads, electricity, and continuous water supply.",
    shortDescription: "Nature-themed luxury villa plots located near Devanahalli Airport.",
    startingPrice: "18 Lakhs",
    plotSizes: "1200 - 2400 Sq.Ft.",
    status: "Ready to Construct",
    reraNumber: "PRM/KA/RERA/1250/301/PR/210823/004218",
    address: "Panchwati Nagar, Devanahalli Airport Road, Bangalore Rural",
    developer: "DreamSpace Realties",
    brochurePdfUrl: "",
    masterPlanUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    highlights: [
      "Surrounded by reserve forests with 100% pollution-free air",
      "Over 500 fruit-bearing trees planted along avenues",
      "High-quality concrete roads with rainwater gutters"
    ],
    amenities: [
      "Fruit Orchards & Botanical Parks",
      "Elders' Leisure Sitout",
      "Outdoor Gym & Jogging track",
      "Grand Gateway Arch",
      "Overhead Water Tank"
    ],
    locationAdvantages: [
      "15 Mins drive from Bangalore International Airport",
      "Close proximity to Aerospace SEZ & Hardware Park",
      "Easy connection to NH44 (Hyderabad Highway)"
    ],
    faqs: [
      {
        question: "When is possession available?",
        answer: "The layout is fully ready and plots are registered immediately upon purchase. You can start constructing your villa right away."
      }
    ],
    seoTitle: "Plots in Devanahalli | Panchwati Nagar Gated Community Bangalore Rural",
    seoDescription: "Explore nature-themed residential plots for sale at Panchwati Nagar, Devanahalli. Buy villa plots near Bangalore Airport with world-class facilities.",
    publishStatus: "published"
  },
  {
    slug: "greenfield-meadows",
    name: "GREENFIELD MEADOWS",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Greenfield Meadows is a premium eco-friendly plotted community in the fast-growing Sarjapur East corridor. Spread across lush acres, it features modern infrastructure, sewage treatment facilities, solar street lighting, and a grand gated archway. Perfect for self-use or high appreciation investments.",
    shortDescription: "Plotted township near Sarjapur Road with eco-friendly infrastructure.",
    startingPrice: "15 Lakhs",
    plotSizes: "1200 - 2400 Sq.Ft.",
    status: "Pre-Launch",
    reraNumber: "PRM/KA/RERA/1251/310/PR/230114/006120",
    address: "Sarjapur Road Extension, East Bangalore",
    developer: "DreamSpace Developers",
    brochurePdfUrl: "",
    masterPlanUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    highlights: [
      "100% LED Solar Powered Streetlights",
      "Gated township with security guard kiosk",
      "Wide concrete road networks"
    ],
    amenities: [
      "Jogging Track & Cycle Bay",
      "Open Air Amphitheatre",
      "Children Play Zone"
    ],
    locationAdvantages: [
      "10 Mins from Proposed Outer Ring Road metro link",
      "Near major multi-specialty healthcare centers"
    ],
    faqs: [
      {
        question: "When is the launch price valid till?",
        answer: "The pre-launch price of 15 Lakhs is valid for the first 30 bookings only."
      }
    ],
    seoTitle: "Eco-friendly Plotted Township Sarjapur | Greenfield Meadows",
    seoDescription: "Secure premium plots in Sarjapur East Bangalore at pre-launch pricing. Fully loaded eco-friendly community infrastructure and clear titles.",
    publishStatus: "published"
  },
  {
    slug: "silver-oak-enclave",
    name: "SILVER OAK ENCLAVE",
    coverImage: "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Located in the heart of Bangalore's IT capital, Silver Oak Enclave features ultra-luxury plotted community living. Secure a corner block plot in a high-demand gated compound fully loaded with continuous utilities, a concrete underground sewer grid, and concrete avenues.",
    shortDescription: "Luxury plotted development located in Whitefield's prime residential zone.",
    startingPrice: "30 Lakhs",
    plotSizes: "1500 - 4000 Sq.Ft.",
    status: "Under Development",
    reraNumber: "PRM/KA/RERA/1251/320/PR/230418/006450",
    address: "Whitefield Extension, East Bangalore",
    developer: "Prestige Group Partner",
    brochurePdfUrl: "",
    masterPlanUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    highlights: [
      "High security gates with automated license plate readers",
      "Underground drainage and telecom layout grids"
    ],
    amenities: [
      "Luxury Swimming Pool & Clubhouse",
      "Tennis & Basketball Courts",
      "Landscaped Reflexology Garden"
    ],
    locationAdvantages: [
      "5 Mins drive from ITPL Bangalore",
      "Surrounded by top tier international academies"
    ],
    faqs: [
      {
        question: "Is there immediate registration?",
        answer: "Yes, registration is open and execution begins on signing the agreement."
      }
    ],
    seoTitle: "Plots for Sale in Whitefield Bangalore | Silver Oak Enclave",
    seoDescription: "Luxury gated layouts in Whitefield with clubhouse, swimming pool, and underground wiring. Premium community plots ready for booking.",
    publishStatus: "published"
  },
  {
    slug: "palm-county-plotted",
    name: "PALM COUNTY PLOTTED",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Palm County offers premium plotting solutions on the Jigani-Anekal main road. Positioned in the South Bangalore development zone, this layout features continuous water grids, wide concrete drainage structures, and landscaped palm avenues.",
    shortDescription: "Premium plotted layout with top class amenities near Electronic City.",
    startingPrice: "22 Lakhs",
    plotSizes: "1200 - 2400 Sq.Ft.",
    status: "Ready to Construct",
    reraNumber: "PRM/KA/RERA/1250/305/PR/230910/006814",
    address: "Jigani-Anekal Corridor, Bangalore South",
    developer: "DreamSpace Developers",
    brochurePdfUrl: "",
    masterPlanUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    highlights: [
      "100% Vaastu Compliant plots",
      "Complete avenue plantation of royal palm trees"
    ],
    amenities: [
      "Jogging path and elders sitout",
      "Security cameras with control office"
    ],
    locationAdvantages: [
      "15 Mins drive from Electronic City Phase 1",
      "Direct highway connectivity"
    ],
    faqs: [
      {
        question: "Is there water supply connected?",
        answer: "Yes, individual overhead connection points exist for every layout block."
      }
    ],
    seoTitle: "Plots Near Electronic City Bangalore | Palm County Plotted",
    seoDescription: "Premium villa plots near Jigani and Electronic City Bangalore South. Secure Vaastu compliant plots with instant builder support.",
    publishStatus: "published"
  },
  {
    slug: "orchid-springs-villas",
    name: "ORCHID SPRINGS VILLAS",
    coverImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Orchid Springs features luxury lake-facing plotted blocks on Bannerghatta main road. With only a few premium blocks remaining, this boutique plotted township offers premium clubhouses, yoga studios, and continuous underground networks.",
    shortDescription: "Lake-view boutique plotted township located on Bannerghatta Road.",
    startingPrice: "40 Lakhs",
    plotSizes: "2000 - 4500 Sq.Ft.",
    status: "Almost Sold Out",
    reraNumber: "PRM/KA/RERA/1250/307/PR/231122/006990",
    address: "Bannerghatta Main Road, Bangalore South",
    developer: "DreamSpace Developers",
    brochurePdfUrl: "",
    masterPlanUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed",
    highlights: [
      "Panoramic natural lake views from corner plots",
      "Strict security boundaries with 24/7 guard tracking"
    ],
    amenities: [
      "Yoga & Spa Pavilion",
      "Lake-view walk path",
      "Children adventure parks"
    ],
    locationAdvantages: [
      "10 Mins from Nice Road entry point",
      "Direct access to top shopping malls and hospitals"
    ],
    faqs: [
      {
        question: "How many plots are remaining?",
        answer: "Currently only 5 premium lake-facing blocks are left for sale."
      }
    ],
    seoTitle: "Plots in Bannerghatta Road Bangalore | Orchid Springs Villas",
    seoDescription: "Luxury lakeview plots on Bannerghatta Road. Buy premium villa plots with immediate builder registration and layout amenities.",
    publishStatus: "published"
  }
];

// Read config data (combines collections to match schema)
export async function readDB(): Promise<DatabaseSchema> {
  try {
    const { db } = await connectToDatabase();
    
    // Fetch global config
    let config = await db.collection("config").findOne({ _id: "global_cms" as any });
    if (!config) {
      // Seed initial config
      await db.collection("config").insertOne({ _id: "global_cms" as any, ...DEFAULT_DATA });
      config = await db.collection("config").findOne({ _id: "global_cms" as any });
    }

    // Fetch projects
    let projects = await db.collection("projects").find({}).toArray();
    if (projects.length < 5) {
      // Clear old listings and reseed with all 6 projects
      await db.collection("projects").deleteMany({});
      await db.collection("projects").insertMany(SEED_PROJECTS);
      projects = await db.collection("projects").find({}).toArray();
    }

    // Fetch leads
    const leads = await db.collection("leads").find({}).sort({ date: -1 }).toArray();

    // Map documents to plain objects (remove MongoDB binary _id field)
    const cleanProjects = projects.map((p) => {
      const { _id, ...rest } = p;
      return rest;
    }) as unknown as ProjectItem[];

    const cleanLeads = leads.map((l) => {
      const { _id, ...rest } = l;
      return rest;
    }) as unknown as LeadItem[];

    return {
      hero: config.hero,
      about: config.about,
      statistics: config.statistics,
      services: config.services,
      values: config.values,
      testimonials: config.testimonials || [],
      contact: config.contact,
      projects: cleanProjects,
      leads: cleanLeads,
    };
  } catch (error) {
    console.error("MongoDB error reading database, returning default fallback:", error);
    // Return mock fallback mapping
    return {
      ...DEFAULT_DATA,
      projects: SEED_PROJECTS,
      leads: [],
    };
  }
}

// Write config data back to MongoDB
export async function writeDB(data: Partial<DatabaseSchema>): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    
    const updateData: any = {};
    if (data.hero) updateData.hero = data.hero;
    if (data.about) updateData.about = data.about;
    if (data.statistics) updateData.statistics = data.statistics;
    if (data.services) updateData.services = data.services;
    if (data.values) updateData.values = data.values;
    if (data.testimonials) updateData.testimonials = data.testimonials;
    if (data.contact) updateData.contact = data.contact;

    await db.collection("config").updateOne(
      { _id: "global_cms" as any },
      { $set: updateData },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error("MongoDB error writing configuration:", error);
    return false;
  }
}

// Get projects list
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const { db } = await connectToDatabase();
    const projects = await db.collection("projects").find({}).toArray();
    return projects.map((p) => {
      const { _id, ...rest } = p;
      return rest;
    }) as unknown as ProjectItem[];
  } catch (error) {
    console.error("MongoDB error fetching projects:", error);
    return SEED_PROJECTS;
  }
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  try {
    const { db } = await connectToDatabase();
    const project = await db.collection("projects").findOne({ slug });
    if (project) {
      const { _id, ...rest } = project;
      return rest as unknown as ProjectItem;
    }
    return undefined;
  } catch (error) {
    console.error(`MongoDB error fetching project slug ${slug}:`, error);
    return SEED_PROJECTS.find((p) => p.slug === slug);
  }
}

// Save project (Create or Update)
export async function saveProject(project: ProjectItem): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    await db.collection("projects").updateOne(
      { slug: project.slug },
      { $set: project },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error("MongoDB error saving project:", error);
    return false;
  }
}

// Delete project
export async function deleteProject(slug: string): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("projects").deleteOne({ slug });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("MongoDB error deleting project:", error);
    return false;
  }
}

// Save Leads
export async function saveLead(lead: Omit<LeadItem, "id" | "date">): Promise<LeadItem> {
  const newLead: LeadItem = {
    ...lead,
    id: `lead-${Date.now()}`,
    date: new Date().toISOString(),
  };
  try {
    const { db } = await connectToDatabase();
    await db.collection("leads").insertOne(newLead);
  } catch (error) {
    console.error("MongoDB error saving lead:", error);
  }
  return newLead;
}

// Update Lead status
export async function updateLeadStatus(id: string, status: LeadItem["status"]): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("leads").updateOne(
      { id },
      { $set: { status } }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("MongoDB error updating lead status:", error);
    return false;
  }
}

// Blog Post Interface
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  publishStatus: "draft" | "published";
}

// Get blog posts list
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection("blogs").find({}).toArray();
    return blogs.map((b) => {
      const { _id, ...rest } = b;
      return rest;
    }) as unknown as BlogPost[];
  } catch (error) {
    console.error("MongoDB error fetching blogs:", error);
    return [];
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const { db } = await connectToDatabase();
    const blog = await db.collection("blogs").findOne({ slug });
    if (blog) {
      const { _id, ...rest } = blog;
      return rest as unknown as BlogPost;
    }
    return undefined;
  } catch (error) {
    console.error(`MongoDB error fetching blog slug ${slug}:`, error);
    return undefined;
  }
}

// Get all leads
export async function getLeads(): Promise<LeadItem[]> {
  try {
    const { db } = await connectToDatabase();
    const leads = await db.collection("leads").find({}).sort({ date: -1 }).toArray();
    return leads.map((l) => {
      const { _id, ...rest } = l;
      return rest;
    }) as unknown as LeadItem[];
  } catch (error) {
    console.error("MongoDB error fetching leads:", error);
    return [];
  }
}
