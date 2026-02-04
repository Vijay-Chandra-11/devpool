import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";

const RoleSwitcher = () => {
  const [open, setOpen] = useState(false);

  const activeRole = localStorage.getItem("activeRole") || "learner";
  const founderUnlocked = localStorage.getItem("founderUnlocked") === "true";

  const switchRole = (role: string) => {
    if (role === "founder" && !founderUnlocked) {
      alert("Please verify your startup to unlock Founder role.");
      return;
    }
    localStorage.setItem("activeRole", role);
    window.location.reload(); // simple refresh
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
      >
        Role: {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-black border border-white/10 shadow-lg z-50">
          <button
            onClick={() => switchRole("learner")}
            className="w-full text-left px-4 py-2 hover:bg-white/5"
          >
            Learner
          </button>

          <button
            onClick={() => switchRole("developer")}
            className="w-full text-left px-4 py-2 hover:bg-white/5"
          >
            Developer
          </button>

          <button
            onClick={() => switchRole("founder")}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 text-muted-foreground"
          >
            Founder
            {!founderUnlocked && <Lock className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
