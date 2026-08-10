import { NextResponse } from "next/server";

interface ContactRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  website_hp?: string; // Honeypot antispam field
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, phone, service, message, website_hp } = body;

    // 1. Honeypot check: If a bot fills out the hidden field, silently return success
    if (website_hp) {
      return NextResponse.json({ success: true, message: "Mensaje recibido" }, { status: 200 });
    }

    // 2. Strict Input Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Por favor ingresa un nombre válido (mínimo 2 caracteres)." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Por favor ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "El mensaje debe contener al menos 10 caracteres." },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { success: false, error: "El mensaje supera el límite máximo permitido de 3000 caracteres." },
        { status: 400 }
      );
    }

    // 3. Integration with Google API / Apps Script
    const googleEndpoint = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (googleEndpoint) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const googleRes = await fetch(googleEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || "No especificado",
            service: service || "Consulta General",
            message: message.trim(),
          }),
        });

        clearTimeout(timeoutId);

        if (!googleRes.ok) {
          console.error(`Google API responded with status: ${googleRes.status}`);
          return NextResponse.json(
            { success: false, error: "No se pudo registrar la consulta en nuestro servidor de mensajería." },
            { status: 502 }
          );
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.error("Timeout o error de red al comunicar con Google API:", err);
        return NextResponse.json(
          { success: false, error: "Tiempo de espera agotado al comunicar con el servidor." },
          { status: 504 }
        );
      }
    } else {
      // Local development simulation
      console.log("=== NUEVO CONTACTO RECIBIDO EN KRYLOSYS API ===");
      console.log({ name, email, phone, service, message, date: new Date() });
    }

    return NextResponse.json({
      success: true,
      message: "¡Mensaje recibido con éxito! En Krylosys te responderemos a la brevedad.",
    });
  } catch (error) {
    console.error("Error no controlado en /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error interno al procesar tu consulta." },
      { status: 500 }
    );
  }
}
