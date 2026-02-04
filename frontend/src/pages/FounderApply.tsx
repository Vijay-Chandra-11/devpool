import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";

const FounderApply = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("http://127.0.0.1:5000/apply-founder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });

      // Update local user state
      user.founder_status = "pending";
      localStorage.setItem("user", JSON.stringify(user));

      alert("Founder application submitted. Please wait for approval.");
      navigate("/dashboard");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <section className="min-h-screen flex items-center justify-center py-20 relative">
        <div className="absolute inset-0 radial-overlay pointer-events-none" />

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card p-10 max-w-lg w-full"
        >
          <h1 className="text-2xl font-display font-bold mb-6 text-center">
            Founder Verification
          </h1>

          {/* Company Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Company / Startup Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input"
              required
            />
          </div>

          {/* Website */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Website / LinkedIn
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="input"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Company Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="input"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="btn-neon w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit for Approval"}
          </motion.button>
        </motion.form>
      </section>
    </PageLayout>
  );
};

export default FounderApply;
