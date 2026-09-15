export const getCorsOptions = () => {
  const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
  if (isDev) {
    return { origin: true, credentials: true }; // allow all in dev for convenience
  }

  const raw = process.env.ALLOWED_ORIGINS || "";
  const allowed = raw.split(",").map(s => s.trim()).filter(Boolean);

  return {
    origin: (origin: string | undefined, callback: (err: Error | null, ok?: boolean) => void) => {
      // allow non-browser tools (curl, Postman) which send no origin
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked by policy"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  } as any;
};
