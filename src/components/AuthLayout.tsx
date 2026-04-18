import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  backgroundImage: string;
  title: string;
  subtitle?: string;
}

export function AuthLayout({
  children,
  backgroundImage,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Form Section */}
        <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md animate-fade-in space-y-8">
            {/* Logo/Branding */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                🎭
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>

        {/* RIGHT: Image Section (Hidden on Mobile) */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src={backgroundImage}
            alt="Cultural background"
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/40 to-primary/20" />

          {/* Decorative Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="max-w-md space-y-6 px-8">
              <div className="space-y-3">
                <h3 className="font-display text-4xl font-semibold leading-tight text-primary-foreground">
                  Join our cultural community
                </h3>
                <p className="text-lg text-primary-foreground/90">
                  Discover events, connect with artists, and explore the soul of Mediouna.
                </p>
              </div>

              {/* Decorative Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { label: "Events", value: "500+" },
                  { label: "Artists", value: "200+" },
                  { label: "Community", value: "10K+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-primary-foreground/10 backdrop-blur p-3 text-center"
                  >
                    <div className="text-2xl font-bold text-accent-soft">
                      {stat.value}
                    </div>
                    <div className="text-xs text-primary-foreground/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
