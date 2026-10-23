import { NextResponse } from "next/server";

/**
 * Payment integration placeholder.
 * Implement a provider-specific server-side request here only after a merchant account is approved.
 * Never trust client-submitted "paid" status. Verify the provider signature/server status.
 */
export async function POST() {
  if (!process.env.PAYMENT_PROVIDER || !process.env.PAYMENT_API_URL || !process.env.PAYMENT_SECRET_KEY) {
    return NextResponse.json({
      error: "بوابة الدفع غير مهيأة بعد. أضف بيانات مزود الدفع المعتمد في متغيرات البيئة."
    }, { status: 501 });
  }

  return NextResponse.json({
    error: "تم إعداد متغيرات الدفع، لكن موصل المزود غير مبرمج. يجب تنفيذ API الخاص بالمزود والتحقق من Webhook قبل استقبال أموال حقيقية."
  }, { status: 501 });
}
