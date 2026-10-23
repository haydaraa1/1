 "use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, Plus, Trash2 } from "lucide-react";
import { templates, getTemplate } from "@/lib/templates";

type Invitation = { id:string; slug:string; templateSlug:string; eventType:string; hostNames:string; date:string; time:string; venue:string; address:string; message:string; price:number; createdAt:string; rsvp:boolean; };
export default function DashboardPage(){
 const [items,setItems]=useState<Invitation[]>([]);
 const [origin,setOrigin]=useState("");
 function refresh(){try{setItems(JSON.parse(localStorage.getItem("invito-invitations")||"[]"));}catch{}}
 useEffect(()=>{setOrigin(window.location.origin);refresh();},[]);
 function remove(slug:string){const next=items.filter(i=>i.slug!==slug);localStorage.setItem("invito-invitations",JSON.stringify(next));setItems(next);}
 function copy(slug:string){navigator.clipboard?.writeText(`${origin}/i/${slug}`);}
 return <section className="container section"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">مساحة الزبون</p><h1 className="serif mt-3 text-4xl">دعواتي</h1><p className="mt-3 text-sm text-[#77716a]">إدارة الدعوات التجريبية التي أنشأتها من هذا المتصفح.</p></div><Link href="/templates" className="btn btn-primary"><Plus size={16}/> إنشاء دعوة</Link></div>
 <div className="mt-8 grid gap-4">{items.length?items.map(item=>{const t=getTemplate(item.templateSlug)||templates[0];return <article key={item.id} className="card flex flex-col gap-4 p-5 md:flex-row md:items-center"><div className={`template-art ${t.theme} min-h-32 rounded-xl md:w-48`}><div className="art-content"><div className="art-title !text-2xl">{t.title}</div></div></div><div className="flex-1"><p className="text-xs text-[#8e6b3e]">{item.eventType}</p><h2 className="mt-1 text-lg font-bold">{item.hostNames}</h2><p className="mt-2 text-sm text-[#77716a]">{item.date||"التاريخ غير محدد"} · {item.venue}</p><p className="mt-2 break-all text-xs text-[#77716a]">{origin}/i/{item.slug}</p></div><div className="flex flex-wrap gap-2"><button className="btn btn-light !px-3" onClick={()=>copy(item.slug)}><Copy size={15}/> نسخ الرابط</button><Link className="btn btn-light !px-3" href={`/i/${item.slug}`}><ExternalLink size={15}/> فتح</Link><button className="btn btn-light !px-3" onClick={()=>remove(item.slug)} aria-label="حذف الدعوة"><Trash2 size={15}/></button></div></article>}) : <div className="rounded-2xl border border-dashed border-[#d7c9b8] p-12 text-center"><h2 className="serif text-2xl">لسّه ما عندك دعوات</h2><p className="mt-3 text-sm text-[#77716a]">اختَر قالبك الأول وأنشئ دعوة تجريبية.</p><Link className="btn btn-primary mt-5" href="/templates">تصفّح القوالب</Link></div>}</div>
 <div className="mt-8 rounded-xl bg-[#f5efe6] p-4 text-sm leading-7 text-[#77716a]">مهم: هذه لوحة تجريبية محلية. كل دعوة تُحفظ في متصفحك ولا تظهر لمستخدم آخر. قبل الإطلاق العام، اربط الحسابات والدعوات بقاعدة بيانات مثل Supabase مع صلاحيات آمنة.</div></section>
}
