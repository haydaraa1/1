 "use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, FileText, ShoppingBag, Users } from "lucide-react";
import { templates } from "@/lib/templates";
type Invitation={id:string;slug:string;hostNames:string;price:number;createdAt:string;eventType:string;};
export default function AdminPage(){
 const [items,setItems]=useState<Invitation[]>([]);
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem("invito-invitations")||"[]"));}catch{}},[]);
 const revenue=items.reduce((sum,i)=>sum+(Number(i.price)||0),0);
 return <section className="container section"><p className="eyebrow">إدارة المنصة</p><h1 className="serif mt-3 text-4xl">لوحة إدارة INVITO</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[#77716a]">لوحة أولية لعرض مؤشرات البيانات التجريبية. هذه الصفحة ليست محمية بتسجيل دخول في النسخة الحالية؛ لا ترفعها كلوحة إدارة إنتاجية قبل إضافة المصادقة والصلاحيات.</p>
 <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{label:"القوالب المعرفة",value:templates.length,icon:<FileText/>},{label:"الدعوات التجريبية",value:items.length,icon:<ShoppingBag/>},{label:"إجمالي القيمة التجريبية",value:`${revenue.toLocaleString("en-US")} د.ع`,icon:<Activity/>},{label:"المستخدمون",value:"—",icon:<Users/>}].map(x=><div key={x.label} className="card p-5"><span className="inline-flex rounded-xl bg-[#f3ece2] p-3 text-[#8e6b3e]">{x.icon}</span><p className="mt-4 text-sm text-[#77716a]">{x.label}</p><p className="mt-2 text-2xl font-bold">{x.value}</p></div>)}</div>
 <div className="mt-8 card overflow-hidden"><div className="border-b border-[#e8e0d6] p-5"><h2 className="font-bold">أحدث الدعوات التجريبية</h2></div>{items.length?<div className="divide-y divide-[#e8e0d6]">{items.map(i=><div key={i.id} className="flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-bold">{i.hostNames}</p><p className="mt-1 text-xs text-[#77716a]">{i.eventType} · {new Date(i.createdAt).toLocaleDateString("ar-IQ")}</p></div><span className="text-sm">{Number(i.price).toLocaleString("en-US")} د.ع</span><Link className="text-sm underline" href={`/i/${i.slug}`}>معاينة</Link></div>)}</div>:<p className="p-8 text-sm text-[#77716a]">ماكو بيانات تجريبية بعد. أنشئ دعوة من المحرر.</p>}</div>
 <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-amber-900"><strong>قبل الإطلاق:</strong> أضف تسجيل دخول للمدير، تحققاً من الدور داخل الخادم، وقيوداً على قاعدة البيانات. إخفاء رابط هذه الصفحة وحده لا يحميها.</div></section>
}
