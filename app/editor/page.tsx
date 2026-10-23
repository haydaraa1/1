 "use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, Music2, Save, Share2 } from "lucide-react";
import Link from "next/link";
import { getTemplate, templates } from "@/lib/templates";
import { TemplateArt } from "@/components/template-card";

type Invitation = { id:string; slug:string; templateSlug:string; eventType:string; hostNames:string; date:string; time:string; venue:string; address:string; message:string; price:number; createdAt:string; rsvp:boolean; };

function EditorInner() {
  const params = useSearchParams();
  const router = useRouter();
  const selectedSlug = params.get("template") || templates[0].slug;
  const template = useMemo(() => getTemplate(selectedSlug) || templates[0], [selectedSlug]);
  const [hostNames,setHostNames] = useState("سارة وأحمد");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("18:30");
  const [venue,setVenue] = useState("قاعة الياسمين");
  const [address,setAddress] = useState("بغداد، العراق");
  const [message,setMessage] = useState("يسعدنا حضوركم ومشاركتنا أجمل لحظاتنا");
  const [rsvp,setRsvp] = useState(true);
  const [saved,setSaved] = useState(false);
  const [shareSlug,setShareSlug] = useState("");

  useEffect(() => {
    const savedDraft = localStorage.getItem("invito-editor-draft");
    if (savedDraft) {
      try { const d = JSON.parse(savedDraft); setHostNames(d.hostNames || "سارة وأحمد"); setDate(d.date || ""); setTime(d.time || "18:30"); setVenue(d.venue || "قاعة الياسمين"); setAddress(d.address || "بغداد، العراق"); setMessage(d.message || "يسعدنا حضوركم ومشاركتنا أجمل لحظاتنا"); setRsvp(d.rsvp ?? true); } catch {}
    }
  }, []);

  function saveDraft() {
    const draft = { hostNames,date,time,venue,address,message,rsvp,templateSlug:template.slug };
    localStorage.setItem("invito-editor-draft", JSON.stringify(draft));
    setSaved(true);
    window.setTimeout(()=>setSaved(false), 2500);
  }
  function publish() {
    const slug = `demo-${Math.random().toString(36).slice(2,9)}`;
    const invitation: Invitation = { id: crypto.randomUUID(), slug, templateSlug:template.slug, eventType:template.category, hostNames,date,time,venue,address,message,price:template.price,createdAt:new Date().toISOString(),rsvp };
    const old = JSON.parse(localStorage.getItem("invito-invitations") || "[]");
    localStorage.setItem("invito-invitations", JSON.stringify([invitation,...old]));
    setShareSlug(slug);
  }
  return <section className="container section">
    <Link href="/templates" className="inline-flex items-center gap-2 text-sm text-[#77716a]"><ArrowRight size={16}/> العودة للقوالب</Link>
    <div className="mb-8 mt-5"><p className="eyebrow">محرر الدعوة</p><h1 className="serif mt-2 text-3xl md:text-4xl">خلّي الدعوة تشبه مناسبتك</h1><p className="mt-2 text-sm text-[#77716a]">غيّر البيانات وشاهد المعاينة. هذه نسخة تجريبية تحفظ المسودات على جهازك.</p></div>
    <div className="grid items-start gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="card p-5 md:p-7">
        <label className="mb-2 block text-sm font-bold">القالب</label>
        <select className="field mb-5" value={template.slug} onChange={e=>router.replace(`/editor?template=${e.target.value}`)}>{templates.map(t=><option key={t.id} value={t.slug}>{t.title} — {t.category}</option>)}</select>
        <label className="mb-2 block text-sm font-bold">الأسماء</label><input className="field mb-4" value={hostNames} onChange={e=>setHostNames(e.target.value)} placeholder="أسماء أصحاب المناسبة"/>
        <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-bold">التاريخ</label><input className="field mb-4" type="date" value={date} onChange={e=>setDate(e.target.value)}/></div><div><label className="mb-2 block text-sm font-bold">الوقت</label><input className="field mb-4" type="time" value={time} onChange={e=>setTime(e.target.value)}/></div></div>
        <label className="mb-2 block text-sm font-bold">اسم القاعة</label><input className="field mb-4" value={venue} onChange={e=>setVenue(e.target.value)} placeholder="اسم المكان"/>
        <label className="mb-2 block text-sm font-bold">العنوان أو رابط الخرائط</label><input className="field mb-4" value={address} onChange={e=>setAddress(e.target.value)} placeholder="المدينة أو رابط Google Maps"/>
        <label className="mb-2 block text-sm font-bold">رسالة الدعوة</label><textarea className="field mb-4 min-h-24" value={message} onChange={e=>setMessage(e.target.value)}/>
        <label className="mb-5 flex items-center gap-3 rounded-xl bg-[#f5efe6] p-4 text-sm"><input type="checkbox" checked={rsvp} onChange={e=>setRsvp(e.target.checked)}/> تفعيل تأكيد الحضور RSVP</label>
        <div className="flex flex-wrap gap-3"><button onClick={saveDraft} className="btn btn-light"><Save size={16}/>{saved?"تم حفظ المسودة":"حفظ المسودة"}</button><button onClick={publish} className="btn btn-primary"><Share2 size={16}/> إنشاء رابط تجريبي</button></div>
        {shareSlug && <div className="mt-5 rounded-xl border border-[#d8c7ae] bg-[#f5efe6] p-4"><p className="font-bold">تم إنشاء رابط تجريبي</p><Link className="mt-2 block break-all text-sm underline" href={`/i/${shareSlug}`}>{typeof window!=="undefined"?window.location.origin:""} /i/{shareSlug}</Link><p className="mt-2 text-xs leading-6 text-[#77716a]">تنبيه: الرابط محفوظ محلياً على هذا الجهاز فقط. لا تستخدمه كخدمة إنتاجية قبل ربط قاعدة بيانات.</p></div>}
      </div>
      <div className="lg:sticky lg:top-24"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-bold">معاينة مباشرة</span><span className="text-xs text-[#77716a]">عرض تقريبي للهاتف</span></div><div className="mx-auto max-w-[420px] rounded-[32px] border-[8px] border-[#24221f] bg-white p-2 shadow-xl"><div className="overflow-hidden rounded-[23px]"><TemplateArt template={template}/><div className="bg-white p-6 text-center"><p className="serif text-2xl">{hostNames || "أسماء أصحاب المناسبة"}</p><p className="mt-4 text-sm leading-7 text-[#77716a]">{message}</p><div className="mt-5 grid gap-3 rounded-xl bg-[#fbf8f3] p-4 text-sm"><p><CalendarDays size={15} className="ml-2 inline text-[#ad8755]"/>{date || "تاريخ المناسبة"} · {time}</p><p><MapPin size={15} className="ml-2 inline text-[#ad8755]"/>{venue || "اسم القاعة"}</p><p className="text-[#77716a]">{address || "عنوان المناسبة"}</p></div>{rsvp && <button className="btn btn-primary mt-5 w-full" type="button">تأكيد الحضور (معاينة)</button>}<p className="mt-6 text-[10px] tracking-[.2em] text-[#ad8755]">MADE WITH INVITO</p></div></div></div><p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#77716a]"><Music2 size={14}/> أضف الموسيقى بعد ربط ملفات الصوت المرخّصة.</p></div>
    </div>
  </section>;
}
export default function EditorPage(){ return <Suspense fallback={<div className="container section">جاري تحميل المحرر...</div>}><EditorInner/></Suspense>; }
