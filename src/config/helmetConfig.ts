import helmet from "helmet";

export const getHelmetMiddleware = () => {
  const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

  const common = {
    contentSecurityPolicy: false, // for simple JSON APIs disable CSP here
    hidePoweredBy: true,
    noSniff: true,
  };

  if (isDev) {
    return helmet({ ...common, hsts: false });
  }

  return helmet({
    ...common,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "no-referrer" },
  });
};
