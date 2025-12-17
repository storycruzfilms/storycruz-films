import { client } from "@/sanity/client";
import { Check, Star } from "lucide-react";

// Force fresh data every load
export const revalidate = 0;

// Hide all these pages from Google
export const metadata = {
  title: 'Investment Guide | Story Cruz Films',
  robots: {
    index: false,
    follow: false,
  },
};

// 1. UPDATED FETCH FUNCTION
// We accept a "slug" variable to find the specific page you want
async function getData(slug: string) {
  return await client.fetch(`
    *[_type == "pricing" && slug.current == $slug][0]{
      ...,
      "videoUrl": heroVideo.asset->url
    }
  `, { slug });
}

// 2. UPDATED COMPONENT
// It now receives "params" (the link info)
export default async function InvestmentPage({ params }: { params: { slug: string } }) {
  // Await the params (Next.js 15 requirement)
  const { slug } = await params;
  
  // Fetch data for THIS specific link
  const data = await getData(slug);

  // Fallback video
  const videoSource = data?.videoUrl || "/inquire-bg.mp4";

  // 3. ERROR STATE (If client types a wrong link)
  if (!data) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4 px-6 text-center">
      <h1 className="text-3xl font-serif text-white">Page Not Found</h1>
      <p className="text-white/50 tracking-wide uppercase text-xs">
        This investment link is invalid or has expired.
      </p>
      <a href="/" className="border-b border-white/30 pb-1 text-sm hover:text-accent hover:border-accent transition-colors">
        Return Home
      </a>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Dynamic Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10 animate-in fade-in zoom-in duration-1000">
          <div className="flex justify-center mb-6 gap-2 text-yellow-500/80">
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
          </div>
          
          <p className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-white/60 mb-8">
            Official Investment Guide
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight drop-shadow-2xl">
            {data.title || "Your Legacy."}
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            We don't just capture events; we craft heirlooms. Below you will find the collections we have curated for your story.
          </p>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="relative z-20 px-6 pb-32 -mt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* VIDEO PACKAGES */}
          {data.videoPackages && data.videoPackages.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-center mb-8 flex items-center justify-center gap-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                Cinematography
                <span className="h-[1px] w-12 bg-white/20"></span>
              </h2>
              {data.videoPackages.map((pkg: any, i: number) => (
                <div key={i} className="group relative bg-white/5 backdrop-blur-md p-10 rounded-sm border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-6 gap-2">
                    <h3 className="text-2xl font-serif text-white group-hover:text-yellow-100 transition-colors">{pkg.name}</h3>
                    <span className="text-xl font-light text-white/90 tracking-wide">{pkg.price}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed border-l-2 border-white/10 pl-4">{pkg.description}</p>
                  <ul className="space-y-4">
                    {pkg.features?.map((feat: string, j: number) => (
                      <li key={j} className="flex gap-4 text-sm text-white/70 group-hover:text-white transition-colors">
                        <Check size={16} className="text-white/40 mt-0.5 shrink-0" />
                        <span className="tracking-wide">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* PHOTO PACKAGES */}
          {data.photoPackages && data.photoPackages.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-center mb-8 flex items-center justify-center gap-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                Photography
                <span className="h-[1px] w-12 bg-white/20"></span>
              </h2>
              {data.photoPackages.map((pkg: any, i: number) => (
                <div key={i} className="group relative bg-white/5 backdrop-blur-md p-10 rounded-sm border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-6 gap-2">
                    <h3 className="text-2xl font-serif text-white group-hover:text-yellow-100 transition-colors">{pkg.name}</h3>
                    <span className="text-xl font-light text-white/90 tracking-wide">{pkg.price}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed border-l-2 border-white/10 pl-4">{pkg.description}</p>
                  <ul className="space-y-4">
                    {pkg.features?.map((feat: string, j: number) => (
                      <li key={j} className="flex gap-4 text-sm text-white/70 group-hover:text-white transition-colors">
                        <Check size={16} className="text-white/40 mt-0.5 shrink-0" />
                        <span className="tracking-wide">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </div>
        
        <div className="text-center mt-20 max-w-2xl mx-auto">
            <p className="text-white/30 text-xs tracking-widest uppercase">
                Story Cruz Films • Investment Guide 2025
            </p>
        </div>
      </section>
    </main>
  );
}