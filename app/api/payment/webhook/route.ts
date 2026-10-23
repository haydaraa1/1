import { NextResponse } from "next/server";

/**
 * This endpoint intentionally does not mark orders as paid.
 * Before production: verify the provider signature, verify the transaction server-to-server,
 * enforce idempotency, then update the order/payment records in your database.
 */
export async function POST() {
  return NextResponse.json({ error: "Webhook غير مهيأ. لا تستخدم هذا المسار لتأكيد المدفوعات." }, { status: 501 });
}
