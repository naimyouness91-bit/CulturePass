import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HERO_IMAGE } from "@/data/events";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In - CulturePass" },
      {
        name: "description",
        content: "Sign in to your CulturePass account to discover cultural events in Mediouna.",
      },
    ],
  }),
  component: LoginPage,
});

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = t("auth.email") + " " + t("common.error").toLowerCase();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("auth.email") + " " + t("common.error").toLowerCase();
    }

    if (!password) {
      newErrors.password = t("auth.password") + " " + t("common.error").toLowerCase();
    } else if (password.length < 6) {
      newErrors.password = t("auth.password") + " " + t("common.error").toLowerCase();
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Call login to update auth context
      login(email);

      setSubmitSuccess(true);
      setIsLoading(false);

      // Redirect to /home after success
      setTimeout(() => {
        navigate({ to: "/home" });
      }, 1500);
    }, 1000);
  };

  return (
    <AuthLayout
        title={t("auth.signIn")}
        subtitle={`${t("auth.dontHaveAccount")} ${t("auth.signInInstead").toLowerCase()}`}
        backgroundImage={HERO_IMAGE}
      >
      {submitSuccess ? (
        <div className="animate-fade-in rounded-lg border border-accent/20 bg-accent/10 p-4 text-center">
          <div className="mb-3 text-2xl">✓</div>
          <h3 className="font-semibold text-accent">{t("auth.success")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("common.loading")}...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              {t("auth.email")}
            </label>
            <div className="relative">
              <Mail className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-5 w-5 text-muted-foreground`} />
              <Input
                id="email"
                type="email"
                placeholder={t("auth.emailPlaceholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                className={`${isRTL ? "pl-10 pr-3" : "pl-10 pr-10"} ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="animate-pulse text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : "justify-between"}`}>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                {t("auth.password")}
              </label>
              <Link
                to="/"
                className="text-xs text-primary hover:underline transition-colors"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <div className="relative">
              <Lock className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-5 w-5 text-muted-foreground`} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.passwordPlaceholder")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                className={`${isRTL ? "pr-10 pl-3" : "pl-10 pr-10"} ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-3 text-muted-foreground hover:text-foreground transition-colors`}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="animate-pulse text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className={`flex items-center ${isRTL ? "flex-row-reverse" : "space-x-2"}`}>
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setRememberMe(checked as boolean)
              }
              disabled={isLoading}
            />
            <label
              htmlFor="remember"
              className={`cursor-pointer text-sm text-foreground hover:text-primary transition-colors ${isRTL ? "mr-2" : "ml-2"}`}
            >
              {t("auth.rememberMe")}
            </label>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? t("common.loading") + "..." : t("auth.signIn")}
          </Button>

          {/* Register Link */}
          <div className="text-center text-sm text-muted-foreground">
            {t("auth.noAccount")} {" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:text-primary/90 transition-colors"
            >
              {t("auth.createOne")}
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}

export default LoginPage;
