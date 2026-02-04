import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";

const FounderIntent = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/founder-apply");
  };

  const handleNo = () => {
    navigate("/dashboard");
  };

  return (
    <PageLayout showFooter={false}>
      <section className="min-h-screen flex items-center justify-center py-20 relative">
        <div className="absolute inset-0 radial-overlay pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 max-w-md text-center"
        >
          <h1 className="text-2xl font-display font-bold mb-4">
            Are you a founder of any company?
          </h1>

          <p className="text-muted-foreground mb-8">
            Founders can post projects and collaborate with developers and learners.
          </p>

          <div className="flex justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="btn-neon px-8"
            >
              Yes
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNo}
              className="btn-secondary px-8"
            >
              No
            </motion.button>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
};

export default FounderIntent;
