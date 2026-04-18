import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HERO_IMAGE } from "@/data/events";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account - CulturePass" },
      {
        name: "description",
        content: "Join CulturePass to discover and book cultural events in Mediouna.",
      },
    ],
  }),
  component: RegisterPage,
});

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const strengths: PasswordStrength[] = [
      { score: 0, label: "Too weak", color: "text-destructive" },
      { score: 1, label: "Weak", color: "text-destructive" },
      { score: 2, label: "Fair", color: "text-orange-500" },
      { score: 3, label: "Good", color: "text-amber-600" },
      { score: 4, label: "Strong", color: "text-accent" },
    ];

    return strengths[score] || strengths[0];
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Call login with name to update auth context
      login(formData.email, formData.name);
      
      setSubmitSuccess(true);
      setIsLoading(false);

      // Redirect to /home after success
      setTimeout(() => {
        navigate({ to: "/home" });
      }, 1500);
    }, 1000);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <AuthLayout
      title="Join our community"
      subtitle="Create an account to discover and book cultural events"
      backgroundImage={HERO_IMAGE}
    >
      {submitSuccess ? (
        <div className="animate-fade-in space-y-4">
          <div className="rounded-lg border border-accent/20 bg-accent/10 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-accent animate-bounce" />
            </div>
            <h3 className="text-lg font-semibold text-accent">Welcome to our community!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account has been created successfully. Explore amazing cultural events now!
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Amina Bennani"
                value={formData.name}
                onChange={handleInputChange}
                className={`pl-10 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="animate-pulse text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="animate-pulse text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="flex items-center justify-between pt-1">
                <div className="h-1 flex-1 mr-2 rounded-full bg-border">
                  <div
                    className={`h-full rounded-full transition-all ${
                      passwordStrength.color === "text-destructive" ? "w-1/4 bg-destructive" :
                      passwordStrength.color === "text-orange-500" ? "w-1/2 bg-orange-500" :
                      passwordStrength.color === "text-amber-600" ? "w-3/4 bg-amber-600" :
                      "w-full bg-accent"
                    }`}
                  />
                </div>
                <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.password && (
              <p className="animate-pulse text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="animate-pulse text-xs text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              disabled={isLoading}
              className="mt-1"
            />
            <label htmlFor="terms" className="cursor-pointer text-sm text-foreground">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                privacy policy
              </a>
            </label>
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
            disabled={isLoading || !agreeTerms}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/90 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}

export default RegisterPage;
