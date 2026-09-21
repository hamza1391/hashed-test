export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    message?: string;
  };

  if (!body.email || !body.message) {
    return Response.json({ error: "Email and message are required." }, { status: 400 });
  }

  return Response.json({ ok: true });
}
