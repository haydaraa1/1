 "use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, templates } from "@/lib/templates";
import { TemplateCard } from "@/components/template-card";

export default function TemplatesPage() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => templates.filter(t => (category==="الكل" || t.category===category) && `${t.title} ${t.category} ${t.description}`.includes(query.trim())), [category, query]);
  return <section className="container section">
    <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">معرض INVITO</p><h1 className="serif mt-3 text-4xl md:text-5xl">اكتشف دعوتك المثالية</h1><p className="mt-4 leading-7 text-[#77716a]">قوالب أنيقة لمناسباتك المختلفة. اختر التصميم الذي تحبه وابدأ تخصيصه.</p></div>
    <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-xl border border-[#e8e0d6] bg-white px-4"><Search size={18} className="text-[#8e6b3e]"/><input className="w-full bg-transparent py-4 outline-none" value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن قالب أو مناسبة..."/></div>
    <div className="mt-6 flex flex-wrap justify-center gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full border px-4 py-2 text-sm transition ${category===c?"border-[#24221f] bg-[#24221f] text-white":"border-[#e8e0d6] bg-white hover:border-[#ad8755]"}`}>{c}</button>)}</div>
    <p className="mt-8 text-sm text-[#77716a]">عدد النتائج: {filtered.length}</p>
    {filtered.length ? <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(t=><TemplateCard key={t.id} template={t}/>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-[#d7c9b8] p-12 text-center text-[#77716a]">ما لقينا قالب بهذا الاسم. جرّب كلمة ثانية.</div>}
  </section>;
}
