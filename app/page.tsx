import Link from "next/link";
import { ArrowLeft, Check, Clock3, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import { templates } from "@/lib/templates";
import { TemplateCard } from "@/components/template-card";

export default function HomePage() {
  return (
    <>
      <section className="container grid items-center gap-10 py-14 md:grid-cols-[1.05fr_.95fr] md:py-20">
        <div className="py-4">
          <p className="eyebrow">لحظاتكم تستحق دعوة استثنائية</p>
          <h1 className="serif mt-5 max-w-xl text-5xl leading-[1.15] md:text-7xl">كل حكاية جميلة تبدأ <span className="italic text-[#ad8755]">بدعوة.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-[#77716a]">صمّم دعوة إلكترونية أنيقة لمناسبتك، خصّص تفاصيلها، وشاركها مع أحبّائك برابط واحد.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/templates" className="btn btn-primary">اكتشف القوالب <ArrowLeft size={16}/></Link><Link href="/#how-it-works" className="btn btn-light">كيف تعمل المنصة؟</Link></div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#77716a]"><span><Check size={14} className="ml-1 inline text-[#ad8755]"/> مناسبة لكل المناسبات</span><span><Check size={14} className="ml-1 inline text-[#ad8755]"/> رابط سهل المشاركة</span><span><Check size={14} className="ml-1 inline text-[#ad8755]"/> تصميم يناسب هاتفك</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-5 top-10 h-28 w-28 rounded-full bg-[#e9ddcb] blur-2xl"/>
          <div className="relative rotate-[2deg] rounded-[28px] border border-[#e2d5c5] bg-white p-3 shadow-[0_30px_80px_#4a39201c]">
            <div className="template-art min-h-[430px] rounded-[20px]">
              <div className="art-content"><div className="art-small">Together with their families</div><div className="art-line"/><div className="art-title !text-5xl">A & M</div><div className="art-line"/><p className="mt-5 text-sm tracking-[.2em] text-[#8e6b3e]">ARE GETTING MARRIED</p><p className="mt-6 text-xs tracking-[.12em] text-[#6b5a48]">SATURDAY · 6:30 PM</p><p className="mt-2 text-xs text-[#6b5a48]">BAGHDAD, IRAQ</p></div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-4 rounded-2xl border border-[#e8e0d6] bg-white p-4 shadow-lg"><div className="flex items-center gap-3"><span className="rounded-full bg-[#f3ece2] p-3 text-[#8e6b3e]"><HeartHandshake size={20}/></span><div><p className="text-sm font-bold">لحظات لا تُنسى</p><p className="mt-1 text-xs text-[#77716a]">بتفاصيل تشبهكم</p></div></div></div>
        </div>
      </section>

      <section className="border-y border-[#e8e0d6] bg-[#f5efe6] py-7">
        <div className="container grid grid-cols-2 gap-5 text-center md:grid-cols-4">
          {[["تصاميم أنيقة","قوالب لكل ذوق"],["رابط واحد","مشاركة سهلة"],["تخصيص مرن","الأسماء والتفاصيل"],["تجربة بسيطة","من الهاتف مباشرة"]].map(([a,b])=><div key={a}><p className="serif text-xl">{a}</p><p className="mt-1 text-xs text-[#77716a]">{b}</p></div>)}
        </div>
      </section>

      <section className="section container">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">اختياراتنا لكم</p><h2 className="serif mt-3 text-3xl md:text-4xl">قوالب تستحق لحظاتكم</h2><p className="mt-3 text-sm text-[#77716a]">ابدأ من تصميم تحبه، ثم أضف لمستك الخاصة.</p></div><Link href="/templates" className="hidden items-center gap-2 text-sm font-bold md:flex">كل القوالب <ArrowLeft size={16}/></Link></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{templates.slice(0,3).map(t=><TemplateCard key={t.id} template={t}/>)}</div>
        <div className="mt-6 text-center md:hidden"><Link href="/templates" className="btn btn-light">عرض كل القوالب</Link></div>
      </section>

      <section id="how-it-works" className="section bg-[#f5efe6]">
        <div className="container"><div className="mx-auto max-w-xl text-center"><p className="eyebrow">بخطوات بسيطة</p><h2 className="serif mt-3 text-3xl md:text-4xl">من الفكرة إلى رابط الدعوة</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{[{n:"01",icon:<Sparkles/>,title:"اختر تصميمك",desc:"تصفح القوالب واختر الأسلوب الأقرب لمناسبتك."},{n:"02",icon:<Clock3/>,title:"أضف التفاصيل",desc:"أدخل الأسماء والموعد والمكان وشاهد معاينة الدعوة."},{n:"03",icon:<MapPin/>,title:"شاركها مع الجميع",desc:"انشر رابط دعوتك وأرسلها للضيوف بسهولة."}].map(x=><div className="rounded-2xl border border-[#e5d9ca] bg-[#fffdf9] p-7" key={x.n}><div className="flex items-center justify-between"><span className="rounded-full bg-[#f3ece2] p-3 text-[#8e6b3e]">{x.icon}</span><span className="serif text-3xl text-[#cbb79b]">{x.n}</span></div><h3 className="mt-6 text-lg font-bold">{x.title}</h3><p className="mt-2 text-sm leading-7 text-[#77716a]">{x.desc}</p></div>)}</div>
        </div>
      </section>

      <section id="pricing" className="section container">
        <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">باقات واضحة</p><h2 className="serif mt-3 text-3xl md:text-4xl">دعوة جميلة، بسعر واضح</h2><p className="mt-3 text-sm leading-7 text-[#77716a]">أسعار تجريبية قابلة للتعديل من إعدادات المشروع قبل الإطلاق.</p></div>
        <div className="mx-auto mt-9 grid max-w-4xl gap-5 md:grid-cols-3">
          {[{title:"أساسية",price:"10,000",desc:"للمناسبات البسيطة",items:["قالب جاهز","تخصيص المعلومات","رابط مشاركة"]},{title:"مميزة",price:"15,000",desc:"لأجمل التفاصيل",items:["كل مزايا الأساسية","عدّ تنازلي","رابط موقع المناسبة"]},{title:"مع RSVP",price:"18,000",desc:"لتنظيم الضيوف",items:["كل مزايا المميزة","تأكيد الحضور","قائمة الضيوف"]}].map((p,i)=><div key={p.title} className={`card p-6 ${i===1?"!border-[#ad8755] shadow-xl md:-translate-y-2":""}`}><p className="text-sm font-bold text-[#8e6b3e]">{p.title}</p><h3 className="serif mt-3 text-3xl">{p.price} <span className="text-sm">د.ع</span></h3><p className="mt-2 text-sm text-[#77716a]">{p.desc}</p><div className="my-5 h-px bg-[#e8e0d6]"/><ul className="space-y-3 text-sm">{p.items.map(item=><li key={item}><Check size={15} className="ml-2 inline text-[#ad8755]"/>{item}</li>)}</ul><Link href="/templates" className={`btn mt-6 w-full ${i===1?"btn-primary":"btn-light"}`}>اختر باقتك</Link></div>)}
        </div>
      </section>
      <section className="container pb-20"><div className="rounded-[28px] bg-[#24221f] px-6 py-12 text-center text-white md:px-12"><p className="eyebrow !text-[#d6b98e]">لحظتكم القادمة تبدأ هنا</p><h2 className="serif mt-4 text-3xl md:text-5xl">اصنع دعوة تشبه حكايتكم</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">اختر التصميم، أضف التفاصيل، وخلّي INVITO يوصل فرحتك لأحبّائك.</p><Link href="/templates" className="btn mt-7 border-white bg-white text-[#24221f]">ابدأ الآن <ArrowLeft size={16}/></Link></div></section>
    </>
  );
}
