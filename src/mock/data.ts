import { sleep } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  price: number;
  priceRange: [number, number];
  image: string;
  description: string;
  craftType: string;
  origin: string;
  artisanId: string;
  status: 'active' | 'draft' | 'inactive';
  keywords: string[];
  productionDays: number;
  enquiries: number;
  views: number;
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  region: string;
  state: string;
  experience: number;
  rating: number;
  products: number;
  growthScore: number;
  revenue: number;
  avatar: string;
  capacity: number;
}

export interface BuyerRequirement {
  id: string;
  title: string;
  category: string;
  quantity: number;
  budgetPerUnit: number;
  deadline: string;
  buyerId: string;
  status: string;
  matchedArtisans: ArtisanMatch[];
}

export interface ArtisanMatch {
  artisanId: string;
  name: string;
  craft: string;
  region: string;
  units: number;
  matchScore: number;
  rating: number;
}

export interface Enquiry {
  id: string;
  buyerName: string;
  company: string;
  product: string;
  quantity: number;
  budgetPerUnit: number;
  message: string;
  status: 'new' | 'in_progress' | 'quoted' | 'closed';
  date: string;
  matchScore: number;
}

export interface GrowthRecommendation {
  id: string;
  type: 'produce' | 'price' | 'market' | 'seasonal' | 'improve';
  title: string;
  reason: string;
  evidence: string;
  action: string;
  opportunity: string;
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
}

export interface MarketMatch {
  id: string;
  market: string;
  matchScore: number;
  reasoning: string;
  buyerCount: number;
  avgOrderValue: number;
  icon: string;
}

// ─── Mock Products ──────────────────────────────────────────────────────────────

export const mockProducts: Product[] = [
  {
    id: 'prod-001', name: 'Bamboo Storage Basket Set', category: 'Bamboo Craft',
    material: 'Natural Bamboo', price: 2800, priceRange: [2500, 3200],
    image: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=400',
    description: 'Handcrafted bamboo storage baskets woven using traditional Thanjavur techniques. Set of 3 nested baskets with decorative pattern.',
    craftType: 'Bamboo Weaving', origin: 'Thanjavur, Tamil Nadu',
    artisanId: 'artisan-demo-001', status: 'active',
    keywords: ['bamboo', 'storage', 'eco-friendly', 'handmade', 'basket'],
    productionDays: 4, enquiries: 47, views: 312,
  },
  {
    id: 'prod-002', name: 'Handwoven Cotton Saree', category: 'Handloom',
    material: '100% Cotton', price: 3200, priceRange: [2800, 3800],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
    description: 'Traditional handloom cotton saree with geometric border pattern. Woven on traditional pit loom, takes 3 days to complete.',
    craftType: 'Handloom Weaving', origin: 'Kanchipuram, Tamil Nadu',
    artisanId: 'artisan-demo-001', status: 'active',
    keywords: ['handloom', 'saree', 'cotton', 'traditional', 'Tamil Nadu'],
    productionDays: 3, enquiries: 23, views: 189,
  },
  {
    id: 'prod-003', name: 'Blue Pottery Wall Plate', category: 'Pottery',
    material: 'Kaolinite Clay', price: 1400, priceRange: [1200, 1800],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
    description: 'Authentic Jaipur Blue Pottery decorative wall plate with traditional floral motifs.',
    craftType: 'Blue Pottery', origin: 'Jaipur, Rajasthan',
    artisanId: 'artisan-002', status: 'active',
    keywords: ['pottery', 'blue pottery', 'wall decor', 'Jaipur', 'handmade'],
    productionDays: 7, enquiries: 31, views: 245,
  },
  {
    id: 'prod-004', name: 'Dhokra Brass Elephant', category: 'Brass Work',
    material: 'Bell Metal (Brass)', price: 4500, priceRange: [4000, 5500],
    image: 'https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=400',
    description: 'Lost-wax cast Dhokra brass elephant using ancient tribal technique from Bastar region.',
    craftType: 'Dhokra Metal Casting', origin: 'Bastar, Chhattisgarh',
    artisanId: 'artisan-003', status: 'active',
    keywords: ['dhokra', 'brass', 'elephant', 'tribal', 'traditional'],
    productionDays: 10, enquiries: 18, views: 156,
  },
  {
    id: 'prod-005', name: 'Block Print Bedsheet Set', category: 'Block Print',
    material: 'Cotton + Natural Dyes', price: 2200, priceRange: [1900, 2600],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    description: 'Hand block-printed bedsheet with pillow covers using traditional Sanganer printing technique.',
    craftType: 'Hand Block Printing', origin: 'Sanganer, Rajasthan',
    artisanId: 'artisan-002', status: 'active',
    keywords: ['block print', 'bedsheet', 'natural dye', 'cotton', 'Rajasthan'],
    productionDays: 5, enquiries: 38, views: 298,
  },
  {
    id: 'prod-006', name: 'Ikat Silk Dupatta', category: 'Silk Weaving',
    material: 'Pure Silk', price: 5800, priceRange: [5000, 7000],
    image: 'https://images.unsplash.com/photo-1594938298603-b8fc83a6a8a4?w=400',
    description: 'Traditional Odisha Ikat silk dupatta with geometric patterns. Single-ikat technique requiring 6 days of skilled work.',
    craftType: 'Ikat Weaving', origin: 'Sambalpur, Odisha',
    artisanId: 'artisan-004', status: 'active',
    keywords: ['ikat', 'silk', 'dupatta', 'Odisha', 'handwoven'],
    productionDays: 6, enquiries: 14, views: 123,
  },
  {
    id: 'prod-007', name: 'Terracotta Garden Pot', category: 'Terracotta',
    material: 'Red Clay', price: 850, priceRange: [700, 1100],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400',
    description: 'Hand-thrown terracotta garden pot with incised traditional pattern. Kiln fired at 900°C.',
    craftType: 'Terracotta Pottery', origin: 'Bishnupur, West Bengal',
    artisanId: 'artisan-005', status: 'active',
    keywords: ['terracotta', 'pottery', 'garden', 'clay', 'handmade'],
    productionDays: 3, enquiries: 55, views: 421,
  },
  {
    id: 'prod-008', name: 'Kutch Leather Mojari', category: 'Leather Craft',
    material: 'Vegetable-tanned Leather', price: 1800, priceRange: [1500, 2200],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: 'Traditional Kutchi leather mojari with intricate embroidery and mirror work. Handcrafted pair.',
    craftType: 'Leather Craft', origin: 'Kutch, Gujarat',
    artisanId: 'artisan-003', status: 'active',
    keywords: ['leather', 'mojari', 'Kutch', 'embroidery', 'traditional footwear'],
    productionDays: 4, enquiries: 27, views: 203,
  },
];

// ─── Mock Artisans ──────────────────────────────────────────────────────────────

export const mockArtisans: Artisan[] = [
  { id: 'artisan-demo-001', name: 'Meera Devi', craft: 'Bamboo & Block Print', region: 'Thanjavur', state: 'Tamil Nadu', experience: 18, rating: 4.8, products: 12, growthScore: 78, revenue: 84500, avatar: 'MD', capacity: 50 },
  { id: 'artisan-002', name: 'Ramesh Kumawat', craft: 'Blue Pottery & Block Print', region: 'Jaipur', state: 'Rajasthan', experience: 25, rating: 4.9, products: 24, growthScore: 85, revenue: 142000, avatar: 'RK', capacity: 80 },
  { id: 'artisan-003', name: 'Kavitha Baghel', craft: 'Dhokra Metal Casting', region: 'Bastar', state: 'Chhattisgarh', experience: 12, rating: 4.6, products: 8, growthScore: 65, revenue: 62000, avatar: 'KB', capacity: 30 },
  { id: 'artisan-004', name: 'Sunita Mohanty', craft: 'Ikat & Sambalpuri Weaving', region: 'Sambalpur', state: 'Odisha', experience: 20, rating: 4.7, products: 16, growthScore: 72, revenue: 98000, avatar: 'SM', capacity: 40 },
  { id: 'artisan-005', name: 'Rina Karmakar', craft: 'Terracotta & Bishnupur Pottery', region: 'Bishnupur', state: 'West Bengal', experience: 15, rating: 4.5, products: 19, growthScore: 69, revenue: 56000, avatar: 'RK', capacity: 100 },
];

// ─── Mock Enquiries ─────────────────────────────────────────────────────────────

export const mockEnquiries: Enquiry[] = [
  { id: 'enq-001', buyerName: 'Arjun Sharma', company: 'Craftivo Retail', product: 'Bamboo Storage Basket Set', quantity: 200, budgetPerUnit: 2500, message: 'Looking for bulk supply for our premium gifting catalog. Can you provide samples?', status: 'new', date: '2026-08-28', matchScore: 88 },
  { id: 'enq-002', buyerName: 'Priya Hotels', company: 'Priya Hotels & Resorts', product: 'Bamboo Storage Basket Set', quantity: 500, budgetPerUnit: 2800, message: 'Need for our new eco-resort property. Looking for customized sizes.', status: 'in_progress', date: '2026-08-25', matchScore: 92 },
  { id: 'enq-003', buyerName: 'EcoGift India', company: 'EcoGift India Pvt. Ltd.', product: 'Block Print Bedsheet Set', quantity: 150, budgetPerUnit: 2000, message: 'Festival season corporate gifts. Need within 45 days.', status: 'quoted', date: '2026-08-20', matchScore: 84 },
  { id: 'enq-004', buyerName: 'Green Living Co.', company: 'Green Living Co.', product: 'Bamboo Storage Basket Set', quantity: 1000, budgetPerUnit: 2200, message: 'Large export order to Germany. Need GI certification documents.', status: 'new', date: '2026-08-27', matchScore: 76 },
  { id: 'enq-005', buyerName: 'HomeDecor Plus', company: 'HomeDecor Plus', product: 'Handwoven Cotton Saree', quantity: 50, budgetPerUnit: 3000, message: 'Display pieces for our boutique chain. Premium quality required.', status: 'closed', date: '2026-08-15', matchScore: 79 },
];

// ─── Growth Recommendations ─────────────────────────────────────────────────────

export const mockGrowthRecommendations: GrowthRecommendation[] = [
  {
    id: 'rec-001', type: 'produce', title: 'Increase Bamboo Basket Production',
    reason: 'Bamboo storage baskets are showing strong B2B demand with 47 enquiries in 30 days.',
    evidence: '47 buyer enquiries last month. 92% match score with Hotel Décor segment. 3 pending large orders.',
    action: 'Increase production by 20% for the next quarter. Target 60 units/month.',
    opportunity: 'Estimated additional revenue: ₹18,000–₹24,000/month.',
    priority: 'high',
  },
  {
    id: 'rec-002', type: 'price', title: 'Optimize Pricing for Basket Collection',
    reason: 'Similar products are receiving higher buyer engagement in the ₹3,000–₹3,500 range.',
    evidence: 'Products at ₹3,000–₹3,500 have 34% higher click-to-enquiry conversion rate.',
    action: 'Test price at ₹3,100 for your next batch of 20 units. Monitor for 2 weeks.',
    opportunity: 'Potential revenue increase: 8–12% with same production effort.',
    priority: 'medium',
  },
  {
    id: 'rec-003', type: 'market', title: 'Enter Corporate Gifting Market',
    reason: 'Corporate gifting has a high product-match score (88%) for your bamboo products.',
    evidence: '12 corporate buyers are actively sourcing eco-friendly gifts in your category.',
    action: 'Create a dedicated corporate gifting catalog with MOQ pricing (min. 50 units). Add customization options.',
    opportunity: 'Average corporate order value: ₹45,000. High repeat order rate.',
    priority: 'high',
  },
  {
    id: 'rec-004', type: 'seasonal', title: 'Festival Season Inventory Preparation',
    reason: 'Eco-friendly gifting demand increases 340% during Diwali and Christmas seasons.',
    evidence: 'Historical trend shows surge starting 30 days before festival. Early suppliers get 25% premium.',
    action: 'Start production of 150 gift-ready units 30 days before festival season. Prepare packaging.',
    opportunity: 'Festival orders typically 3× regular orders. Premium pricing justified.',
    priority: 'medium',
  },
  {
    id: 'rec-005', type: 'improve', title: 'Add Product Dimensions to Listings',
    reason: 'Buyers frequently ask for product dimensions in 62% of enquiries.',
    evidence: 'Listings with dimensions (L × W × H) get 2× more enquiries than those without.',
    action: 'Add exact dimensions (cm) to all 12 bamboo basket listings. Include weight in grams.',
    opportunity: 'Could double your enquiry-to-quote conversion rate at zero additional cost.',
    priority: 'low',
  },
];

// ─── Market Matches ─────────────────────────────────────────────────────────────

export const mockMarketMatches: MarketMatch[] = [
  { id: 'mm-001', market: 'Hotel & Resort Décor', matchScore: 92, icon: '🏨', reasoning: 'Your bamboo baskets suit luxury hotel lobbies and eco-resort décor. Natural material, premium finish, and customization potential make this an ideal match.', buyerCount: 23, avgOrderValue: 85000 },
  { id: 'mm-002', market: 'Corporate Gifting', matchScore: 88, icon: '🎁', reasoning: 'Eco-friendly material, bulk production potential, and customizable design make bamboo baskets ideal for corporate gifting trends.', buyerCount: 17, avgOrderValue: 45000 },
  { id: 'mm-003', market: 'Home Décor Retailers', matchScore: 84, icon: '🏠', reasoning: 'Trending sustainable home décor category. Strong online demand, repeat orders possible, and compatible with modern interior aesthetics.', buyerCount: 31, avgOrderValue: 22000 },
  { id: 'mm-004', market: 'Handicraft Stores', matchScore: 81, icon: '🛍️', reasoning: 'Direct category match. GI-tag potential adds authenticity premium. Tourist destinations drive consistent demand.', buyerCount: 45, avgOrderValue: 12000 },
  { id: 'mm-005', market: 'Export Buyers', matchScore: 76, icon: '🌍', reasoning: 'Growing international demand for sustainable Indian crafts. EU and US markets actively sourcing eco-friendly alternatives to plastic.', buyerCount: 8, avgOrderValue: 180000 },
];

// ─── Buyer Requirements ─────────────────────────────────────────────────────────

export const mockBuyerRequirements: BuyerRequirement[] = [
  {
    id: 'req-001', title: 'Need 1,000 Handmade Bamboo Baskets for Corporate Gifting',
    category: 'Bamboo Craft', quantity: 1000, budgetPerUnit: 2500, deadline: '2026-11-01',
    buyerId: 'buyer-demo-001', status: 'active',
    matchedArtisans: [
      { artisanId: 'artisan-demo-001', name: 'Meera Devi', craft: 'Bamboo Weaving', region: 'Tamil Nadu', units: 300, matchScore: 92, rating: 4.8 },
      { artisanId: 'artisan-002', name: 'Ramesh Kumawat', craft: 'Bamboo Craft', region: 'Rajasthan', units: 250, matchScore: 87, rating: 4.9 },
      { artisanId: 'artisan-005', name: 'Rina Karmakar', craft: 'Bamboo Weaving', region: 'West Bengal', units: 500, matchScore: 83, rating: 4.5 },
    ],
  },
  {
    id: 'req-002', title: 'Block Print Fabric for Export — 500m',
    category: 'Block Print', quantity: 500, budgetPerUnit: 450, deadline: '2026-10-15',
    buyerId: 'buyer-demo-001', status: 'active',
    matchedArtisans: [
      { artisanId: 'artisan-002', name: 'Ramesh Kumawat', craft: 'Block Printing', region: 'Rajasthan', units: 300, matchScore: 94, rating: 4.9 },
    ],
  },
];

// ─── Admin Stats ────────────────────────────────────────────────────────────────

export const mockAdminStats = {
  totalArtisans: 128450,
  productsDigitized: 384920,
  b2bMatches: 42680,
  buyerEnquiries: 18430,
  ordersGenerated: 12760,
  estimatedMarketValue: 820000000, // ₹82 Cr
  avgGrowthScore: 71,
  voiceCatalogsCreated: 156320,
  aiImagesProcessed: 298450,
  languageBreakdown: [
    { language: 'Tamil', percentage: 34, color: '#f97316' },
    { language: 'Hindi', percentage: 28, color: '#6366f1' },
    { language: 'Telugu', percentage: 16, color: '#16a34a' },
    { language: 'Bengali', percentage: 12, color: '#0891b2' },
    { language: 'Others', percentage: 10, color: '#9ca3af' },
  ],
};

// ─── Regional Data ──────────────────────────────────────────────────────────────

export const mockRegionalData = [
  { state: 'Tamil Nadu', artisans: 24320, products: 68900, enquiries: 4210, topCraft: 'Handloom', growthRate: 18 },
  { state: 'Rajasthan', artisans: 28450, products: 84200, enquiries: 5120, topCraft: 'Block Print', growthRate: 22 },
  { state: 'West Bengal', artisans: 19820, products: 54300, enquiries: 3180, topCraft: 'Terracotta', growthRate: 15 },
  { state: 'Odisha', artisans: 12340, products: 38100, enquiries: 2450, topCraft: 'Ikat Weaving', growthRate: 19 },
  { state: 'Gujarat', artisans: 22100, products: 71400, enquiries: 3890, topCraft: 'Patola Silk', growthRate: 25 },
  { state: 'Uttar Pradesh', artisans: 21420, products: 68020, enquiries: 3580, topCraft: 'Chikankari', growthRate: 17 },
];

// ─── Monthly Analytics Data ─────────────────────────────────────────────────────

export const mockMonthlyData = [
  { month: 'Sep 25', artisans: 8200, products: 24300, enquiries: 1120, orders: 780 },
  { month: 'Oct 25', artisans: 9800, products: 29100, enquiries: 1340, orders: 920 },
  { month: 'Nov 25', artisans: 12400, products: 36800, enquiries: 1890, orders: 1240 },
  { month: 'Dec 25', artisans: 15200, products: 45600, enquiries: 2340, orders: 1680 },
  { month: 'Jan 26', artisans: 11800, products: 35200, enquiries: 1760, orders: 1120 },
  { month: 'Feb 26', artisans: 10900, products: 32400, enquiries: 1580, orders: 1040 },
  { month: 'Mar 26', artisans: 13600, products: 40800, enquiries: 2120, orders: 1480 },
  { month: 'Apr 26', artisans: 14800, products: 44400, enquiries: 2340, orders: 1620 },
  { month: 'May 26', artisans: 16200, products: 48600, enquiries: 2560, orders: 1780 },
  { month: 'Jun 26', artisans: 17400, products: 52200, enquiries: 2780, orders: 1920 },
  { month: 'Jul 26', artisans: 18900, products: 56700, enquiries: 3010, orders: 2080 },
  { month: 'Aug 26', artisans: 20450, products: 61400, enquiries: 3280, orders: 2340 },
];

// ─── Craft Categories ───────────────────────────────────────────────────────────

export const mockCraftCategories = [
  { name: 'Bamboo Craft', value: 18, color: '#16a34a' },
  { name: 'Handloom', value: 24, color: '#f97316' },
  { name: 'Pottery', value: 14, color: '#c2590d' },
  { name: 'Block Print', value: 16, color: '#6366f1' },
  { name: 'Metal Craft', value: 10, color: '#0891b2' },
  { name: 'Leather Craft', value: 8, color: '#7c3d10' },
  { name: 'Others', value: 10, color: '#9ca3af' },
];

// ─── AI Chat Responses ──────────────────────────────────────────────────────────

export const mockAIChatResponses: Record<string, string> = {
  'make next': 'Based on current market trends and your production capacity, I recommend making **Bamboo Gift Basket Sets** (3-piece nested). Corporate gifting buyers are actively looking for eco-friendly sets priced between ₹1,800–₹2,500. Your bamboo weaving skill is a perfect match. I also suggest adding a small personalization option (name engraving or custom tag) which can increase price by 15–20%.',
  'sell this': 'Your bamboo products have the strongest B2B potential in: 1️⃣ **Corporate Gifting** (88% match, avg order ₹45,000), 2️⃣ **Hotel Décor** (92% match, avg order ₹85,000), 3️⃣ **Export via India Handlooms portal** (growing 23% YoY). I recommend starting with the corporate gifting segment as it offers consistent bulk orders with higher margins.',
  'price': 'For your Bamboo Storage Basket Set: Material cost ~₹420 + Labour (4 days × ₹300) ~₹1,200 + Overhead 15% = ₹243. Total cost ~₹1,863. The market benchmark for premium eco-baskets is ₹2,800–₹3,400. **Recommended price: ₹3,000**. During festival season, you can charge ₹3,200–₹3,500. This gives you a healthy 38–45% margin.',
  'buyers': '34 buyers have shown interest in your product category in the last 30 days. Top enquiries: 🏨 Priya Hotels (500 units, ₹2,800/unit), 🎁 EcoGift India (200 units, ₹2,500/unit), 🌍 GreenLiving Export (1,000 units). I recommend responding to Priya Hotels first as they have the highest budget and are ready to place an order immediately.',
  'improve': 'Here are the top improvements for your listings: 1️⃣ **Add dimensions** (L×W×H in cm) — 62% of buyers ask for this. 2️⃣ **Add weight** — helps buyers calculate shipping cost. 3️⃣ **Add 2 more photos** — a top-down view and a lifestyle shot increase enquiries by 78%. 4️⃣ **Mention bulk pricing** — B2B buyers want to know your MOQ and bulk discount.',
  'hindi': '**हिंदी में उत्पाद विवरण:**\nउत्पाद: बांस की भंडारण टोकरी सेट\nसामग्री: प्राकृतिक बांस\nशिल्प: बांस बुनाई\nनिर्माण समय: 4 दिन\nमूल्य: ₹2,800 – ₹3,200\nविशेषता: पर्यावरण के अनुकूल, हस्तनिर्मित, थंजावुर की पारंपरिक कला',
  'bulk order': '**Bulk Order Description (Corporate Ready):**\n\nProduct: Bamboo Storage Basket Set (3-piece nested)\nMaterial: Premium Natural Bamboo, Eco-certified\nMOQ: 50 sets | 100 sets | 500 sets\nPricing:\n• 50–99 sets: ₹2,800/set\n• 100–499 sets: ₹2,500/set\n• 500+ sets: ₹2,200/set (negotiable)\nCustomization: Logo tag, custom color wrapping\nLead time: 15 days (50 units), 30 days (200+ units)\nCertification: GI Region craft, Eco-friendly',
  'growth score': 'Your current Growth Score is **78/100** — up 12 points this month! 🎉\n\nBreakdown:\n📱 Digital Readiness: 82/100\n✨ Product Quality: 76/100\n🌍 Market Reach: 71/100\n💬 Buyer Engagement: 84/100\n📝 Catalog Quality: 79/100\n\nTo reach 85+, focus on: adding product dimensions, responding to enquiries within 24 hours, and uploading 2 more product photos.',
  'default': 'I\'m KarigarAI, your AI Business Manager! 🤖 I can help you with:\n• **"What should I make next?"** — Market demand analysis\n• **"How to price my product?"** — AI pricing recommendation\n• **"Where can I sell this?"** — B2B market matching\n• **"Translate my product"** — Multilingual catalog\n• **"How to improve my listing?"** — Catalog optimization\n• **"What is my growth score?"** — Performance analysis\n\nJust ask me anything about your craft business!',
};

export const getAIChatResponse = async (query: string): Promise<string> => {
  await sleep(1200);
  const lower = query.toLowerCase();
  for (const [key, response] of Object.entries(mockAIChatResponses)) {
    if (lower.includes(key)) return response;
  }
  return mockAIChatResponses['default'];
};
