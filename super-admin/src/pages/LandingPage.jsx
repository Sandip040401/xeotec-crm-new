import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Elevate Your Business with{" "}
          <span className="text-blue-600">Our CRM</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Streamline customer interactions, boost sales, and manage your
          business like never before.
        </p>
        <Button
          onClick={() => navigate("/log-in")}
          className="mt-6 px-6 py-3 text-md"
        >
          Get Started
        </Button>
      </section>

      {/* Feature Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "Automated Customer Management",
          "Real-Time Analytics",
          "Seamless Integrations",
        ].map((feature, index) => (
          <Card key={index} className="p-6">
            <CardContent className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" />
              <p className="text-gray-800 font-medium">{feature}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ready to grow your business?
        </h2>
      </section>
    </div>
  );
};

export default LandingPage;
