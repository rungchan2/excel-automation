import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const buttonVariants = {
  main: {
    backgroundColor: "#217346",
    color: "#FFFFFF",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  },
  white: {
    backgroundColor: "#f8f8f8",
    color: "#185C37",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
};

interface CtaButtonProps {
  variant?: "main" | "white";
  href?: string;
}

export const CtaButton = ({ variant = "white", href = "/request" }: CtaButtonProps) => {
  const buttonStyle = buttonVariants[variant];
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <motion.div
            className={`absolute inset-0 rounded-md ${variant === "main" ? "bg-[#217346]/30" : "bg-white/30"} blur-sm`}
            whileHover={{ opacity: 0.8, scale: 1.05 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.button
            className={`relative z-10 px-6 py-3 text-lg font-medium rounded-md ${variant === "main" ? "bg-[#217346] text-white" : "bg-white text-[#217346]"} shadow-lg border ${variant === "main" ? "border-[#217346]/10" : "border-white/10"}`}
            whileHover={buttonStyle}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <div className="flex items-center gap-2">
              문의하기
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </Link>

      {/* <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/request">
                1:1 맞춤 상담 신청 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
    </div>
  );
};
