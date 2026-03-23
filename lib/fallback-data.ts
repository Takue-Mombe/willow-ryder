import type {
  BlogPost,
  JourneyTheme,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

export const fallbackSiteSettings: SiteSettings = {
  id: "site-settings-default",
  businessName: "Winmore Creations",
  businessTagline:
    "Bespoke carpentry, interior design, and luxury flooring in Victoria Falls, Zimbabwe.",
  businessDescription:
    "Winmore Creations is a Victoria Falls studio shaping spaces through bespoke carpentry, custom furniture, interior design, epoxy flooring, and wooden flooring for homes, lodges, offices, and hospitality brands across Zimbabwe.",
  phone: "+263 78 000 0000",
  whatsapp: "+263 78 000 0000",
  email: "hello@winmorecreations.co.zw",
  streetAddress: "Victoria Falls",
  addressLocality: "Victoria Falls",
  addressRegion: "Matabeleland North",
  addressCountry: "ZW",
  websiteUrl: "https://winmorecreations.co.zw",
  foundedYear: "2016",
  heroEyebrow: "Carpentry · Flooring · Interiors — Victoria Falls",
  heroTitlePrefix: "Craft that",
  heroTitleEmphasis: "defines",
  heroTitleSuffix: "a space.",
  heroDescription:
    "Bespoke carpentry, luxury epoxy and wooden flooring, and transformative interior design - handcrafted in the heart of Victoria Falls for clients ready to build spaces with character.",
  primaryCtaLabel: "View Our Work",
  primaryCtaHref: "/portfolio",
  secondaryCtaLabel: "Free Consultation",
  secondaryCtaHref: "/contact",
  yearsCrafting: "8+",
  projectsCompleted: "200+",
  clientRating: "4.9★",
  marqueeItems: [
    "Bespoke Carpentry",
    "Epoxy Flooring",
    "Hardwood Floors",
    "Interior Design",
    "Custom Furniture",
    "Victoria Falls",
    "Zimbabwe Craftsmanship",
    "Commercial Fit-Outs",
  ],
  aboutStory:
    "Winmore Creations was born from a simple conviction: that the spaces we inhabit shape the lives we live. Founded in the Smoke That Thunders, our studio blends the raw beauty of the Zambezi with precision craftsmanship passed down through generations.",
  aboutStorySecondary:
    "From a small workshop on the edge of town, we have grown into a trusted Victoria Falls carpentry and interior design studio serving homeowners, lodges, restaurants, and offices across Zimbabwe with the same care whether the brief is a single chair or a full commercial fit-out.",
  aboutStoryTertiary:
    "Every joint, every finish, every colour choice is made with intention. We do not do cookie-cutter. We do your space, done right.",
  contactIntro:
    "Ready to transform your space? Tell us about your project and we will get back to you within 24 hours with ideas, timelines, and a no-obligation quote.",
  seoDefaultTitle:
    "Winmore Creations | Bespoke Carpentry, Interior Design & Flooring in Victoria Falls, Zimbabwe",
  seoDefaultDescription:
    "Winmore Creations is Victoria Falls' premium carpentry and interior design studio. We craft bespoke furniture, epoxy floors, wooden floors, custom desks, chairs, and full interior transformations across Zimbabwe.",
  seoKeywords: [
    "carpentry Victoria Falls",
    "interior design Victoria Falls Zimbabwe",
    "epoxy flooring Victoria Falls",
    "wooden flooring Zimbabwe",
    "bespoke furniture Zimbabwe",
    "custom desks Victoria Falls",
    "carpentry studio Zimbabwe",
    "luxury interiors Victoria Falls",
    "wood craftsmanship Zimbabwe",
  ],
  ogImageUrl: "/opengraph-image",
};

export const fallbackServices: Service[] = [
  {
    id: "service-01",
    slug: "interior-design",
    title: "Interior Design",
    shortDescription:
      "Full-spectrum interior transformations that balance atmosphere, utility, and timeless detail.",
    fullDescription:
      "We design interiors for homes, lodges, restaurants, and commercial spaces that need more than decoration. From layout strategy and material curation to fitted joinery and finishing layers, every decision is built to make the space feel intentional, memorable, and deeply aligned with the client.",
    icon: "✦",
    category: "Interiors",
    imageUrl: "",
    bullets: [
      "Space planning and layout design",
      "Material and finish selection",
      "Residential and commercial interiors",
      "Concept presentation and fit-out direction",
    ],
    featured: true,
    sortOrder: 1,
    seoTitle:
      "Interior Design Victoria Falls | Winmore Creations Zimbabwe",
    seoDescription:
      "Interior design in Victoria Falls for homes, lodges, restaurants, and offices. Winmore Creations delivers refined interiors with bespoke material palettes and custom-fitted detail.",
  },
  {
    id: "service-02",
    slug: "flooring-solutions",
    title: "Flooring Solutions",
    shortDescription:
      "Luxury epoxy and hardwood flooring that anchors each room with depth, warmth, and durability.",
    fullDescription:
      "Our flooring work is where technical precision meets visual impact. We install metallic epoxy floors, polished concrete-inspired finishes, and warm hardwood systems that are designed for residential calm, commercial traffic, and hospitality drama - always with long-term durability in mind.",
    icon: "⬡",
    category: "Flooring",
    imageUrl: "",
    bullets: [
      "3D metallic and solid epoxy floors",
      "Hardwood and engineered wood floors",
      "Floor restoration and refinishing",
      "Hospitality and high-traffic solutions",
    ],
    featured: true,
    sortOrder: 2,
    seoTitle:
      "Epoxy and Wooden Flooring Victoria Falls | Winmore Creations",
    seoDescription:
      "Looking for epoxy flooring or wooden flooring in Victoria Falls? Winmore Creations installs premium surfaces for homes, lodges, hospitality venues, and offices across Zimbabwe.",
  },
  {
    id: "service-03",
    slug: "bespoke-carpentry",
    title: "Bespoke Carpentry",
    shortDescription:
      "Custom furniture and architectural joinery built to fit the space, the brief, and the life around it.",
    fullDescription:
      "We craft one-off pieces that feel inevitable inside the spaces they belong to. From executive desks and dining tables to shelving, wardrobes, and signature hospitality pieces, every commission is designed around use, proportion, timber character, and longevity.",
    icon: "🪵",
    category: "Carpentry",
    imageUrl: "",
    bullets: [
      "Custom desks and workstations",
      "Chairs, tables, and seating pieces",
      "Built-in wardrobes and shelving",
      "Doors, frames, and architectural joinery",
    ],
    featured: true,
    sortOrder: 3,
    seoTitle:
      "Bespoke Carpentry Victoria Falls | Custom Furniture Zimbabwe",
    seoDescription:
      "Bespoke carpentry in Victoria Falls for desks, chairs, shelving, wardrobes, doors, and custom furniture. Winmore Creations crafts made-to-measure woodwork for homes and hospitality spaces.",
  },
  {
    id: "service-04",
    slug: "kitchen-and-cabinetry",
    title: "Kitchen & Cabinetry",
    shortDescription:
      "Storage and cabinetry shaped around how people actually live, cook, and move through a room.",
    fullDescription:
      "Our cabinetry projects combine studio-level detailing with everyday practicality. Kitchens, bathroom vanities, bars, service counters, and integrated storage solutions are designed for flow, function, and finish - never just catalog aesthetics.",
    icon: "▣",
    category: "Cabinetry",
    imageUrl: "",
    bullets: [
      "Full kitchen installations",
      "Custom cabinetry and joinery",
      "Bathroom vanities and utility units",
      "Built-in storage solutions",
    ],
    featured: false,
    sortOrder: 4,
    seoTitle:
      "Kitchen Cabinets Victoria Falls | Custom Cabinetry Zimbabwe",
    seoDescription:
      "Custom kitchen cabinetry, bathroom vanities, and storage solutions in Victoria Falls. Winmore Creations builds tailored cabinetry for homes, lodges, and commercial interiors.",
  },
  {
    id: "service-05",
    slug: "commercial-fit-outs",
    title: "Commercial Fit-Outs",
    shortDescription:
      "Spaces for hospitality, retail, and offices that feel distinct, on-brand, and expertly executed.",
    fullDescription:
      "We work with lodges, cafes, restaurants, retail brands, and offices across Victoria Falls and Zimbabwe to deliver interiors that draw people in and hold their attention. We design for brand story, operational reality, and spatial memory all at once.",
    icon: "◫",
    category: "Commercial",
    imageUrl: "",
    bullets: [
      "Office and workspace design",
      "Lodge and hospitality interiors",
      "Restaurant and bar fit-outs",
      "Retail space transformations",
    ],
    featured: false,
    sortOrder: 5,
    seoTitle:
      "Commercial Fit-Outs Victoria Falls | Lodges, Offices & Retail",
    seoDescription:
      "Commercial fit-outs in Victoria Falls for lodges, restaurants, retail spaces, and offices. Winmore Creations combines custom carpentry, flooring, and interior design for standout business spaces.",
  },
  {
    id: "service-06",
    slug: "repairs-and-restoration",
    title: "Repairs & Restoration",
    shortDescription:
      "Expert restoration of woodwork, flooring, and furniture to bring aged pieces back with dignity.",
    fullDescription:
      "Not every beautiful piece needs replacing. We restore worn surfaces, heirloom furniture, damaged timber, and aged floors with respect for the original material and a modern eye for durability, finish, and renewed use.",
    icon: "⟲",
    category: "Restoration",
    imageUrl: "",
    bullets: [
      "Furniture repair and refinishing",
      "Floor sanding and sealing",
      "Structural wood repair",
      "Heritage piece restoration",
    ],
    featured: false,
    sortOrder: 6,
    seoTitle:
      "Furniture Restoration Victoria Falls | Wood Repair Zimbabwe",
    seoDescription:
      "Furniture restoration, floor refinishing, and wood repair in Victoria Falls. Winmore Creations restores worn surfaces and cherished pieces with expert craftsmanship.",
  },
];

export const fallbackProjects: Project[] = [
  {
    id: "project-01",
    slug: "riverstone-lodge-interior-redesign",
    title: "Riverstone Lodge",
    summary:
      "A hospitality redesign that paired warm Zimbabwean timber, softened lighting, and custom joinery for a lodge that needed more presence.",
    description:
      "Riverstone Lodge came to us needing a reception and dining experience that felt elevated without losing the grounded warmth visitors expect from Victoria Falls. We reimagined circulation, layered in custom-built reception joinery, reshaped the dining mood through finish selections, and introduced tactile materials that perform under daily guest traffic while still feeling deeply premium.",
    category: "Interiors",
    location: "Victoria Falls",
    year: "2025",
    featured: true,
    sortOrder: 1,
    challenge:
      "The lodge needed a stronger brand presence and a more memorable guest first impression without shutting down operations for an extended refit.",
    solution:
      "We phased the work, introduced custom timber elements, refined lighting and finishes, and delivered a warmer, more sculpted hospitality atmosphere with minimal interruption.",
    imageUrl: "",
    palette: ["#2C1A0E", "#C4956A", "#E8D5BB"],
    materials: ["Zimbabwean teak", "Brushed brass", "Textured stone", "Warm linen"],
    metrics: ["Reception redesign", "Dining refresh", "Custom lodge joinery"],
    seoTitle:
      "Lodge Interior Design Victoria Falls | Riverstone Lodge Project",
    seoDescription:
      "See how Winmore Creations transformed Riverstone Lodge in Victoria Falls with bespoke joinery, refined materials, and hospitality-led interior design.",
  },
  {
    id: "project-02",
    slug: "cascade-epoxy-floor",
    title: "Cascade Epoxy Floor",
    summary:
      "A residential metallic epoxy floor designed to read like liquid stone under changing daylight.",
    description:
      "This project turned a plain concrete slab into one of the most dramatic surfaces in the home. The brief called for movement, gloss, and durability. We built the finish through careful surface prep, layered pigments, and a clear topcoat that gave the floor its reflective depth while holding up to everyday wear.",
    category: "Flooring",
    location: "Victoria Falls",
    year: "2025",
    featured: true,
    sortOrder: 2,
    challenge:
      "The client wanted a statement floor with gallery-level drama, but it still needed to feel elegant rather than loud.",
    solution:
      "We developed a blue-smoke metallic pour with quiet movement and a clear protective finish that amplified depth without making the room feel overdesigned.",
    imageUrl: "",
    palette: ["#1E3040", "#5AADCC", "#D7F2FF"],
    materials: ["Two-part epoxy", "Metallic pigment", "Polyaspartic topcoat"],
    metrics: ["3D metallic finish", "Residential lounge", "Low-maintenance surface"],
    seoTitle:
      "Epoxy Flooring Victoria Falls | Cascade Metallic Floor Project",
    seoDescription:
      "Explore a metallic epoxy flooring project in Victoria Falls by Winmore Creations. Premium prep, layered pigment work, and a polished long-life finish.",
  },
  {
    id: "project-03",
    slug: "teak-executive-desk",
    title: "Teak Executive Desk",
    summary:
      "A made-to-measure executive desk with weight, warmth, and crisp joinery for a private office.",
    description:
      "Designed for a client who wanted something impossible to mistake for catalogue furniture, this teak desk balances generous proportions with precise detailing. Breadboard ends, refined edge profiling, integrated cable management, and a hand-oiled finish turned the piece into the center of the room rather than a functional afterthought.",
    category: "Carpentry",
    location: "Victoria Falls",
    year: "2024",
    featured: true,
    sortOrder: 3,
    challenge:
      "The desk needed to feel commanding without reading as bulky in a relatively compact office.",
    solution:
      "We used slimmer visual lines, carefully proportioned leg geometry, and a quiet understructure to preserve presence while keeping the piece elegant.",
    imageUrl: "",
    palette: ["#4A2E18", "#C4956A", "#F2EDE4"],
    materials: ["Solid teak", "Hand-rubbed oil", "Concealed hardware"],
    metrics: ["Custom commission", "Cable-managed", "Hand-finished surface"],
    seoTitle:
      "Custom Desk Victoria Falls | Bespoke Teak Executive Desk",
    seoDescription:
      "A bespoke teak executive desk crafted in Victoria Falls by Winmore Creations. See the detail, timber selection, and custom office carpentry behind the project.",
  },
  {
    id: "project-04",
    slug: "hardwood-dining-set",
    title: "Hardwood Dining Set",
    summary:
      "A family dining set built around everyday durability and a relaxed, heirloom-quality finish.",
    description:
      "The dining set pairs a solid hardwood table with eight chairs designed for long dinners, daily family use, and hospitality-level resilience. The brief was clear: make it warm, comfortable, and timeless. The result is a set that carries the atmosphere of handcraft without feeling precious or untouchable.",
    category: "Custom Furniture",
    location: "Hwange",
    year: "2024",
    featured: true,
    sortOrder: 4,
    challenge:
      "The family wanted a handcrafted set that could survive heavy use, children, and gatherings without sacrificing finish quality.",
    solution:
      "We selected a forgiving hardwood species, softened edge profiles, and applied a finish that can be maintained over time instead of replaced.",
    imageUrl: "",
    palette: ["#2E1A10", "#B77B4D", "#EFE6DA"],
    materials: ["Mukwa hardwood", "Hardwax oil", "Traditional joinery"],
    metrics: ["8-seater set", "Hospitality-grade finish", "Built for daily use"],
    seoTitle:
      "Custom Dining Table and Chairs Zimbabwe | Winmore Creations",
    seoDescription:
      "Winmore Creations builds custom dining tables and chairs in Zimbabwe. Explore this handcrafted hardwood dining set created for lasting everyday use.",
  },
  {
    id: "project-05",
    slug: "zambezi-cafe-fit-out",
    title: "Zambezi Cafe Fit-Out",
    summary:
      "A commercial interior refresh that fused reclaimed timber, durable finishes, and stronger customer flow.",
    description:
      "For this cafe fit-out, the aim was to create a more memorable brand environment with practical durability for daily service. We introduced a custom bar, feature wall treatment, updated flooring, and furniture accents that made the room feel more confident, layered, and social from the moment guests walked in.",
    category: "Commercial",
    location: "Victoria Falls",
    year: "2025",
    featured: true,
    sortOrder: 5,
    challenge:
      "The cafe needed stronger visual identity and more efficient service flow without losing warmth.",
    solution:
      "We redesigned the front-of-house hierarchy with statement timber elements and durable surfaces that supported both operations and atmosphere.",
    imageUrl: "",
    palette: ["#1A2810", "#7AA050", "#E7D7B0"],
    materials: ["Reclaimed timber", "Commercial-grade finish", "Feature lighting"],
    metrics: ["Bar redesign", "Dining ambience upgrade", "Brand-led fit-out"],
    seoTitle:
      "Commercial Fit-Out Victoria Falls | Zambezi Cafe Project",
    seoDescription:
      "See a Victoria Falls cafe fit-out by Winmore Creations featuring custom timber work, durable flooring, and commercial interior design tailored for hospitality.",
  },
  {
    id: "project-06",
    slug: "mosi-home-kitchen-cabinetry",
    title: "Mosi Home Kitchen",
    summary:
      "A full kitchen and cabinetry project designed for open-plan living with cleaner lines and warmer timber accents.",
    description:
      "This kitchen redesign focused on movement, storage, and visual calm. Flat-front cabinetry was balanced with teak-toned surfaces, open shelving, and a stronger island presence to anchor the open-plan space. The end result feels custom, resolved, and more expensive than the footprint suggests.",
    category: "Cabinetry",
    location: "Victoria Falls",
    year: "2024",
    featured: false,
    sortOrder: 6,
    challenge:
      "The kitchen lacked storage hierarchy and felt disconnected from the dining and living spaces.",
    solution:
      "We simplified the palette, reworked the storage plan, and designed cabinetry that helped the kitchen hold the entire open-plan room together.",
    imageUrl: "",
    palette: ["#E7E0D5", "#6B4A2C", "#B8A48B"],
    materials: ["Painted cabinetry", "Teak veneer", "Stone-look counters"],
    metrics: ["Open-plan integration", "Storage-led design", "Bespoke cabinetry"],
    seoTitle:
      "Kitchen Cabinetry Victoria Falls | Bespoke Kitchen Design",
    seoDescription:
      "Custom kitchen cabinetry and bespoke kitchen design in Victoria Falls by Winmore Creations. Explore this open-plan home transformation.",
  },
  {
    id: "project-07",
    slug: "smoke-that-thunders-boardroom",
    title: "Smoke That Thunders Boardroom",
    summary:
      "A boardroom interior centered around authority, calm acoustics, and made-to-measure timber detailing.",
    description:
      "This office commission required a space that felt serious and polished without defaulting to generic corporate finishes. We produced a custom conference table, wall joinery, shelving, and finish strategy that gave the boardroom presence while improving practical use for meetings and client presentations.",
    category: "Commercial",
    location: "Bulawayo",
    year: "2025",
    featured: false,
    sortOrder: 7,
    challenge:
      "The boardroom needed to communicate credibility for clients and partners while remaining warm enough for all-day internal use.",
    solution:
      "We built visual authority through dark timber, tailored joinery, and a restrained palette that made the room feel decisive rather than cold.",
    imageUrl: "",
    palette: ["#20160E", "#8A6A4C", "#DCC8B5"],
    materials: ["Dark stained timber", "Integrated cable detailing", "Acoustic soft finishes"],
    metrics: ["Boardroom fit-out", "Custom conference table", "Executive wall joinery"],
    seoTitle:
      "Office Interior Design Zimbabwe | Boardroom Carpentry Project",
    seoDescription:
      "Winmore Creations designs premium offices and boardrooms in Zimbabwe. Explore this commercial carpentry and interior project for a high-level meeting space.",
  },
  {
    id: "project-08",
    slug: "rainforest-hardwood-installation",
    title: "Rainforest Hardwood Installation",
    summary:
      "A timber floor installation designed to bring warmth and permanence to a modern home renovation.",
    description:
      "The home renovation called for a floor that could soften minimal architecture without losing contemporary clarity. We selected a warm Zimbabwean hardwood, planned board rhythm carefully, and finished the surface to highlight grain movement while keeping the room bright and grounded.",
    category: "Flooring",
    location: "Harare",
    year: "2025",
    featured: false,
    sortOrder: 8,
    challenge:
      "The architecture was strong but emotionally flat; the owners wanted warmth without rustic heaviness.",
    solution:
      "We used long-board timber installation, a lighter finish, and a precise sanding sequence that preserved grain character while keeping the overall mood contemporary.",
    imageUrl: "",
    palette: ["#4F3017", "#C99763", "#F7EEDF"],
    materials: ["Zimbabwean hardwood", "Hardwax finish", "Precision sanding"],
    metrics: ["Whole-home installation", "Warm modern tone", "Long-board layout"],
    seoTitle:
      "Wooden Flooring Zimbabwe | Hardwood Installation by Winmore",
    seoDescription:
      "See a premium hardwood flooring installation by Winmore Creations in Zimbabwe, crafted for warmth, durability, and timeless architectural presence.",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "testimonial-01",
    name: "Tendai Mhaka",
    role: "Operations Lead",
    company: "Elephant Hills Resort",
    location: "Victoria Falls",
    quote:
      "Winmore transformed our lodge reception and dining area. The epoxy floor alone stops guests in their tracks every morning. The work feels world-class, but still rooted in local craft.",
    rating: 5,
    sortOrder: 1,
  },
  {
    id: "testimonial-02",
    name: "Sibongile Ndlovu",
    role: "Homeowner",
    company: "Private Residence",
    location: "Victoria Falls",
    quote:
      "Our custom desk and bookshelf unit is a masterpiece. The team listened closely, improved the brief, and delivered ahead of schedule. It feels like something we will keep for life.",
    rating: 5,
    sortOrder: 2,
  },
  {
    id: "testimonial-03",
    name: "Grace Zimuto",
    role: "Founder",
    company: "The Mosi Kitchen",
    location: "Victoria Falls",
    quote:
      "We hired Winmore for our restaurant fit-out and they exceeded every expectation. The woodwork, the flooring, the cohesion of the room - everything feels carefully considered and beautifully built.",
    rating: 5,
    sortOrder: 3,
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "post-01",
    slug: "epoxy-vs-hardwood-victoria-falls-home",
    title:
      "Epoxy vs Hardwood: Which Floor Is Right for Your Victoria Falls Home?",
    excerpt:
      "A practical comparison of Zimbabwe's two most requested flooring directions - durability, atmosphere, cost, and upkeep included.",
    content:
      "Flooring decisions shape the entire character of a room. In Victoria Falls, where climate, dust, hospitality use, and maintenance realities all matter, the right answer depends on more than taste alone.\n\nEpoxy flooring is ideal when the client wants drama, seamless maintenance, and high resilience. It works especially well in lodges, restaurants, modern homes, and commercial settings where surface performance matters as much as visual impact.\n\nHardwood flooring offers a different kind of richness. Timber softens a room, ages with grace, and creates an atmosphere that feels permanent rather than applied. For homes, boutique suites, and design-led spaces, hardwood often delivers the emotional warmth clients are really looking for.\n\nThe right choice depends on how the space will be lived in. At Winmore Creations, we guide clients through finish, traffic, maintenance, and mood before recommending a system - because a floor should fit the space for years, not just impress on day one.",
    category: "Flooring Guide",
    readTime: "5 min read",
    featured: true,
    publishedAt: "2025-11-10",
    coverAccent: "#5AADCC",
    coverImageUrl: "",
    seoTitle:
      "Epoxy vs Hardwood Flooring in Victoria Falls | Winmore Creations",
    seoDescription:
      "Should you choose epoxy or hardwood flooring in Victoria Falls? Winmore Creations breaks down durability, design impact, and maintenance for Zimbabwean homes and hospitality spaces.",
  },
  {
    id: "post-02",
    slug: "bring-natural-wood-into-modern-interiors",
    title: "5 Ways to Bring Natural Wood Into a Modern Interior",
    excerpt:
      "You do not have to choose between contemporary clarity and organic warmth. Here is how our studio balances the two.",
    content:
      "Modern interiors are at their best when they do not feel sterile. One of the fastest ways to bring warmth into a clean contemporary space is through natural wood - but it needs restraint.\n\nThe first move is usually one anchor element: a dining table, shelving wall, statement desk, or timber-clad island. When everything is wood, the room can become visually heavy. When the right thing is wood, the room comes alive.\n\nSecond, contrast matters. Timber reads beautifully against plaster, stone, muted paint, brushed metal, and matte surfaces. We often use wood to soften straight architectural lines without turning the room rustic.\n\nThird, species and finish decide the mood. A paler oiled timber feels airy and contemporary. A dark stained hardwood feels more dramatic and formal. The trick is choosing the tone that supports the architecture already present.\n\nDone right, natural wood does not fight a modern interior. It gives it soul.",
    category: "Design Tips",
    readTime: "4 min read",
    featured: true,
    publishedAt: "2025-10-22",
    coverAccent: "#C4956A",
    coverImageUrl: "",
    seoTitle:
      "Modern Interior Design with Natural Wood | Victoria Falls Design Studio",
    seoDescription:
      "Learn how to use natural wood in a modern interior. Winmore Creations shares design tips for Victoria Falls homes, lodges, and contemporary Zimbabwean spaces.",
  },
  {
    id: "post-03",
    slug: "why-zimbabwean-timber-is-among-africas-finest",
    title:
      "Why Zimbabwe's Timber Is Among Africa's Finest - and How We Use It",
    excerpt:
      "Teak, mukwa, and mahogany grow in our backyard. Here is why local timber remains our first choice whenever the brief allows it.",
    content:
      "Local timber is not just a sourcing choice; it is a design decision. Zimbabwean teak, mukwa, and mahogany carry grain character, density, and colour that make them extraordinary materials for furniture, flooring, and architectural joinery.\n\nWhat matters most is selection. Great woodwork starts before a single cut is made. We inspect boards for grain movement, stability, and how the material will behave once shaped, joined, and finished.\n\nThere is also a cultural and environmental logic to working locally. Using regional materials helps connect a project to place, supports local craft economies, and often results in a more honest final object.\n\nWhen clients want spaces that feel grounded in Zimbabwe rather than imported from a catalogue, local timber is often where that authenticity begins.",
    category: "Local Craftsmanship",
    readTime: "4 min read",
    featured: true,
    publishedAt: "2025-09-15",
    coverAccent: "#8B6A40",
    coverImageUrl: "",
    seoTitle:
      "Zimbabwean Timber for Carpentry and Interiors | Winmore Creations",
    seoDescription:
      "Discover why Zimbabwean timber is prized for custom furniture, flooring, and interiors. Winmore Creations explains local species, finish quality, and craft value.",
  },
  {
    id: "post-04",
    slug: "custom-furniture-for-lodges-in-victoria-falls",
    title: "Why Custom Furniture Gives Lodges in Victoria Falls a Stronger Identity",
    excerpt:
      "Hospitality spaces compete on memory. Bespoke furniture is one of the fastest ways to make a lodge feel specific, premium, and unforgettable.",
    content:
      "In hospitality, sameness is expensive. Guests remember spaces that feel specific - and custom furniture is one of the clearest ways to create that specificity.\n\nFor lodges in Victoria Falls, the opportunity is even stronger. The landscape already offers drama and story. Interiors should extend that experience rather than dilute it with generic imported pieces.\n\nCustom desks, reception counters, dining tables, bedheads, shelving, and seating allow a brand to build atmosphere through material, scale, and detail. These pieces also solve practical issues around use, durability, and maintenance more effectively than off-the-shelf alternatives.\n\nWhen a guest remembers the room, the lounge, or the dining space after they leave, that memory becomes part of the brand. Bespoke furniture helps create exactly that kind of memory.",
    category: "Hospitality Design",
    readTime: "5 min read",
    featured: false,
    publishedAt: "2025-08-08",
    coverAccent: "#5D3B21",
    coverImageUrl: "",
    seoTitle:
      "Custom Furniture for Lodges in Victoria Falls | Winmore Creations",
    seoDescription:
      "Winmore Creations designs custom furniture for lodges in Victoria Falls. Learn how bespoke carpentry helps hospitality brands create distinctive guest experiences.",
  },
];

export const fallbackJourneys: JourneyTheme[] = [
  {
    key: "epoxy",
    number: "01",
    label: "Epoxy Flooring",
    description:
      "From bare concrete to a liquid-art surface. A technical process, executed with aesthetic control.",
    category: "Flooring",
    colors: ["#0D2030", "#1D4F78", "#8AD7F2"],
    steps: [
      {
        phase: "Stage 1 - Assessment",
        title: "Every floor starts with truth.",
        body: "Before a drop of resin touches the slab, we read the floor: moisture, cracks, porosity, and surface condition. The quality of the finish is decided before the bucket is even opened.",
        details: [
          "Moisture meter readings across the room",
          "Crack mapping and structural review",
          "Surface porosity testing",
          "Photographic condition record",
        ],
        quote:
          "The finish people remember is built on work they never see.",
        accent: "#5AADCC",
        mood: "Assessment",
      },
      {
        phase: "Stage 2 - Surface Prep",
        title: "Grind it down to truth.",
        body: "Diamond grinding opens the slab and creates the bond every premium epoxy floor depends on. This stage is slow, physical, and absolutely non-negotiable.",
        details: [
          "Diamond grinding and edge work",
          "Crack routing and filling",
          "Full dust extraction during prep",
          "Mechanical bond preparation",
        ],
        quote: "A floor that lasts starts with preparation that most people never witness.",
        accent: "#8CD2E8",
        mood: "Preparation",
      },
      {
        phase: "Stage 3 - Primer",
        title: "The coat nobody sees.",
        body: "The primer penetrates, locks in adhesion, and creates the unseen foundation for the entire system. It is the least glamorous stage and the most important.",
        details: [
          "Low-viscosity primer application",
          "Quartz broadcast for grip where needed",
          "Cure window monitoring",
          "Inspection before colour work",
        ],
        quote: "The invisible layer is often the reason the whole thing survives.",
        accent: "#94E2F8",
        mood: "Foundation",
      },
      {
        phase: "Stage 4 - The Pour",
        title: "Where craft becomes art.",
        body: "Pigments, movement, depth, and timing come together here. Metallic epoxy is not just installed - it is composed, and no two pours are ever truly the same.",
        details: [
          "Metallic pigment placement",
          "Layering, swirl, and wave control",
          "One-off visual composition",
          "Clear coat preparation",
        ],
        quote: "We do not pour a floor. We compose one.",
        accent: "#B4F0FF",
        mood: "Composition",
      },
      {
        phase: "Stage 5 - Finish",
        title: "Sealed, polished, forever.",
        body: "The topcoat gives the floor its endurance and its final visual depth. When the room catches the reflection for the first time, the whole process makes sense.",
        details: [
          "Protective topcoat system",
          "UV and wear resistance layer",
          "Final light-level inspection",
          "Client care guidance",
        ],
        quote: "The last coat is where durability and spectacle finally become the same thing.",
        accent: "#D5FAFF",
        mood: "Reveal",
      },
    ],
  },
  {
    key: "hardwood",
    number: "02",
    label: "Hardwood Flooring",
    description:
      "Follow rough-sawn timber as it becomes a warm, living floor that grows richer every year.",
    category: "Flooring",
    colors: ["#2A1800", "#6B3A14", "#C4956A"],
    steps: [
      {
        phase: "Stage 1 - Timber Selection",
        title: "Choosing the right tree.",
        body: "We hand-select boards for grain, tone, moisture content, and character because the best floors begin with patient material choices.",
        details: [
          "Species selection and grading",
          "Moisture content testing",
          "Grain and knot review",
          "Board set planning",
        ],
        quote: "The best floors feel like they always belonged to the room.",
        accent: "#C4956A",
        mood: "Selection",
      },
      {
        phase: "Stage 2 - Acclimatisation",
        title: "Let the wood breathe first.",
        body: "Boards sit in the room where they will live so the timber can settle before installation begins. Patience here saves years of problems later.",
        details: [
          "In-room acclimatisation",
          "Humidity and temperature tracking",
          "Spacer stacking for airflow",
          "Pre-install moisture recheck",
        ],
        quote: "Rushed timber always finds a way to remind you later.",
        accent: "#D7AB7A",
        mood: "Acclimatisation",
      },
      {
        phase: "Stage 3 - Installation",
        title: "Board by board, by hand.",
        body: "Layout, direction, joint rhythm, and the way the floor moves through the room are all decided during installation. This is where order becomes atmosphere.",
        details: [
          "Pattern and board rhythm planning",
          "Perimeter movement allowance",
          "Glue or hybrid fixing method",
          "Detailed edge work",
        ],
        quote: "A well-laid hardwood floor should look inevitable.",
        accent: "#E5B98A",
        mood: "Installation",
      },
      {
        phase: "Stage 4 - Sanding",
        title: "Revealing the grain.",
        body: "Sanding is where the floor stops being a construction element and starts becoming a surface with presence, tone, and tactility.",
        details: [
          "Multi-pass sanding sequence",
          "Edge and corner finishing",
          "Surface levelling and correction",
          "Grain inspection under raking light",
        ],
        quote: "Sanding is sculpture. You are finding the floor inside the wood.",
        accent: "#F1CBA2",
        mood: "Refinement",
      },
      {
        phase: "Stage 5 - Finishing",
        title: "Sealed for a lifetime.",
        body: "The final finish determines how the timber lives underfoot. Whether oiled or lacquered, the goal is always the same: protect the floor without flattening its character.",
        details: [
          "Oil or lacquer system selection",
          "Buffing between coats",
          "Final tone balancing",
          "Maintenance guidance for the client",
        ],
        quote: "The floor does not end when we leave. It only gets better.",
        accent: "#F6D9B8",
        mood: "Finish",
      },
    ],
  },
  {
    key: "carpentry",
    number: "03",
    label: "Bespoke Carpentry",
    description:
      "A sketch becomes a joint. A joint becomes a piece. Follow the making of furniture built to last.",
    category: "Carpentry",
    colors: ["#1C120A", "#6C3B18", "#D4A56A"],
    steps: [
      {
        phase: "Stage 1 - The Brief",
        title: "A conversation before a cut.",
        body: "We begin with how the piece will live: how it works, how it should feel, and what problem it needs to solve. Good furniture starts with listening.",
        details: [
          "Usage and dimension briefing",
          "Reference and mood review",
          "Material and finish direction",
          "Timeline and budget alignment",
        ],
        quote: "The most important tool in our workshop is the question.",
        accent: "#D4A56A",
        mood: "Brief",
      },
      {
        phase: "Stage 2 - Drawing",
        title: "From sketch to certainty.",
        body: "Hand sketches become technical drawings that resolve proportion, joinery, and finish before a board is even ordered.",
        details: [
          "Concept sketching",
          "Scaled technical drawing",
          "Material and hardware specification",
          "Client approval before build",
        ],
        quote: "We draw until there are no surprises left.",
        accent: "#E2B47D",
        mood: "Design",
      },
      {
        phase: "Stage 3 - Workshop",
        title: "Timber, jigs, and craft.",
        body: "Boards are selected, dimensioned, and joined with methods chosen for strength and longevity rather than convenience. This is where material becomes structure.",
        details: [
          "Board dimensioning and matching",
          "Joinery selection by load and use",
          "Glue-up and clamping sequence",
          "Test fitting before finish work",
        ],
        quote: "Slow is smooth. Smooth is beautiful.",
        accent: "#EBC28F",
        mood: "Making",
      },
      {
        phase: "Stage 4 - Finishing",
        title: "Surface work is everything.",
        body: "The piece is sanded, raised, re-sanded, and finished until the surface feels inevitable under the hand. Finish is not decoration - it is the final act of the build.",
        details: [
          "Progressive hand sanding",
          "Grain raise and de-nib",
          "Oil, wax, or lacquer application",
          "Final buff and inspection",
        ],
        quote: "The first time someone runs a hand across the finished piece - that never gets old.",
        accent: "#F2D2A5",
        mood: "Finish",
      },
      {
        phase: "Stage 5 - Delivery",
        title: "In your space, forever.",
        body: "We deliver, install, level, and adjust every piece ourselves. A Winmore object is meant to settle into the room as if it always belonged there.",
        details: [
          "Protected white-glove delivery",
          "On-site placement and adjustment",
          "Final hardware and fit check",
          "Care guidance at handover",
        ],
        quote: "A piece of good furniture is not bought. It is inherited.",
        accent: "#F8DFC0",
        mood: "Handover",
      },
    ],
  },
  {
    key: "interior",
    number: "04",
    label: "Interior Design",
    description:
      "The full arc - from blank room and brief through concept boards, sourcing, install, and the reveal.",
    category: "Interiors",
    colors: ["#141A10", "#4B6443", "#8FB87A"],
    steps: [
      {
        phase: "Stage 1 - Discovery",
        title: "Understanding your world.",
        body: "We walk the space, read the light, discuss use, and identify what the room needs emotionally and practically before design begins.",
        details: [
          "Site visit and measurement survey",
          "Lifestyle and operational briefing",
          "Sun-path and atmosphere review",
          "Existing furniture audit",
        ],
        quote: "A good room feels like the person who lives in it.",
        accent: "#8FB87A",
        mood: "Discovery",
      },
      {
        phase: "Stage 2 - Concept",
        title: "The idea before the room.",
        body: "We gather material stories, palette direction, furniture intent, and spatial hierarchy into a concept that clients can feel before a single item is ordered.",
        details: [
          "Concept board creation",
          "Material and finish palettes",
          "Layout and furniture planning",
          "Presentation and review",
        ],
        quote: "We design in pencil until you feel it in your chest.",
        accent: "#9AC88B",
        mood: "Concept",
      },
      {
        phase: "Stage 3 - Sourcing",
        title: "The right material for every surface.",
        body: "We source locally when possible and further afield when needed, always testing how materials behave in real light and real use before specification is final.",
        details: [
          "Timber, fabric, and stone sourcing",
          "Sample curation and sign-off",
          "Hardware and lighting review",
          "Supplier coordination",
        ],
        quote: "Materials are the building blocks of atmosphere.",
        accent: "#B2D6A5",
        mood: "Sourcing",
      },
      {
        phase: "Stage 4 - Installation",
        title: "Bringing the concept to life.",
        body: "Flooring, joinery, furniture, and finishing layers are coordinated as one composition so the project feels resolved rather than assembled in pieces.",
        details: [
          "Phased site coordination",
          "Joinery and flooring install",
          "Furniture placement",
          "Snag list completion",
        ],
        quote: "One call. One team. Done right.",
        accent: "#CDE2BE",
        mood: "Installation",
      },
      {
        phase: "Stage 5 - Reveal",
        title: "The moment that matters.",
        body: "The reveal is the full stop at the end of a long sentence. Styling, atmosphere, and proportion all need to click at once - and we do not hand over until they do.",
        details: [
          "Final styling and object placement",
          "Client walk-through",
          "Care and maintenance handover",
          "Post-completion check-in",
        ],
        quote: "We are not done until you are speechless.",
        accent: "#E4F0D8",
        mood: "Reveal",
      },
    ],
  },
];
