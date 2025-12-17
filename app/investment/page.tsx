import { client } from "@/sanity/client";
import { Check } from "lucide-react";

export const revalidate = 0; // <--- ADD THIS LINE
// 1. THIS HIDES THE PAGE FROM GOOGLE SEARCH
export const metadata = {
  title: 'Investment Guide | Story Cruz Films',
  robots: {
    index: false,
    follow: false,
  },
};

async function getData() {
  // Fetches the pricing document (we use [0] to get the first one)
  return await client.fetch(`*[_type == "pricing"][0]`);
}

export default async function InvestmentPage() {
  const data = await getData();

  if (!data) return <div className="text-white pt-40 text-center">Loading or No Data Found...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
          {data.title}
        </h1>
        <p className="text-white/60 tracking-widest uppercase text-sm">
          Exclusive Access
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* VIDEO COLUMN */}
        <div>
          <h2 className="text-3xl font-serif text-center mb-10 border-b border-white/10 pb-4">
            Cinematography
          </h2>
          <div className="space-y-8">
            {data.videoPackages?.map((pkg: any, i: number) => (
              <div key={i} className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl font-serif">{pkg.name}</h3>
                  <span className="text-xl font-light text-white/80">{pkg.price}</span>
                </div>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features?.map((feat: string, j: number) => (
                    <li key={j} className="flex gap-3 text-sm text-white/70">
                      <Check size={16} className="text-white/40 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* PHOTO COLUMN */}
        <div>
          <h2 className="text-3xl font-serif text-center mb-10 border-b border-white/10 pb-4">
            Photography
          </h2>
          <div className="space-y-8">
            {data.photoPackages?.map((pkg: any, i: number) => (
              <div key={i} className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl font-serif">{pkg.name}</h3>
                  <span className="text-xl font-light text-white/80">{pkg.price}</span>
                </div>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features?.map((feat: string, j: number) => (
                    <li key={j} className="flex gap-3 text-sm text-white/70">
                      <Check size={16} className="text-white/40 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}