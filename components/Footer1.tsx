"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t backdrop-blur-xl"
      style={{
        background: "var(--background)",
        borderColor: "var(--card-border)",
      }}
    >
      {/* CTA SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* CTA TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left flex-1 space-y-5"
        >
          <h4
            className="text-3xl font-bold leading-snug"
            style={{ color: "var(--text-dark)" }}
          >
            Ready to get{" "}
            <span style={{ color: "var(--primary-color)" }}>clarity</span> from
            your data?
          </h4>

          <p
            className="text-base leading-relaxed max-w-md mx-auto md:mx-0"
            style={{ color: "var(--text-light)" }}
          >
            Upload your files, visualize trends instantly, and get AI-powered
            insights — all in one dashboard. No setup. No code.
          </p>

          {/* CTA BUTTON */}
          <div className="flex justify-center md:justify-start mt-6">
            <Link href="/home">
              <button
                className="relative overflow-hidden font-medium px-8 py-3 rounded-xl shadow-md transition-all cursor-pointer hover:brightness-110"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-on-primary)",
                }}
              >
                Start Free
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:w-[50%] rounded-[28px]"
        >
          {/* Glass Card */}
          <div
            className="rounded-[26px] p-8 md:p-10"
            style={{
              background: "var(--card)",
              border: `1px solid var(--card-border)`,
              boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h5
              className="text-2xl font-semibold mb-8 text-center md:text-left"
              style={{ color: "var(--text-dark)" }}
            >
              Let’s Connect
            </h5>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent successfully!");
              }}
              className="flex flex-col gap-5"
            >
              {/* NAME */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
              >
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl text-sm border placeholder-transparent focus:outline-none peer"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-dark)",
                  }}
                />
                <label
                  className="absolute left-4 top-3.5 text-sm transition-all peer-focus:top-[-10px] peer-focus:text-xs bg-transparent px-1"
                  style={{ color: "var(--text-light)" }}
                >
                  Your Name
                </label>
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative"
              >
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl text-sm border placeholder-transparent focus:outline-none peer"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-dark)",
                  }}
                />
                <label
                  className="absolute left-4 top-3.5 text-sm transition-all peer-focus:top-[-10px] peer-focus:text-xs bg-transparent px-1"
                  style={{ color: "var(--text-light)" }}
                >
                  Your Email
                </label>
              </motion.div>

              {/* MESSAGE */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
              >
                <textarea
                  rows={4}
                  required
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl text-sm border placeholder-transparent focus:outline-none resize-none peer"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-dark)",
                  }}
                />
                <label
                  className="absolute left-4 top-3.5 text-sm transition-all peer-focus:top-[-10px] peer-focus:text-xs bg-transparent px-1"
                  style={{ color: "var(--text-light)" }}
                >
                  Your Message
                </label>
              </motion.div>

              {/* SUBMIT BUTTON */}
              <motion.button
                type="submit"
                className="flex items-center justify-center gap-2 font-medium mt-2 px-6 py-3 rounded-xl transition-all hover:brightness-110"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-on-primary)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.10)",
                }}
              >
                Send Message <Send size={18} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div
        className="h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--primary-color), transparent)",
          opacity: 0.3,
        }}
      />

      {/* BOTTOM BAR */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p style={{ color: "var(--text-light)" }}>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "var(--primary-color)" }}>InstaviZ</span> — All
          rights reserved.
        </p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <Link
            href="#"
            className="transition"
            style={{ color: "var(--text-light)" }}
          >
            Terms
          </Link>
          <Link
            href="#"
            className="transition"
            style={{ color: "var(--text-light)" }}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="transition"
            style={{ color: "var(--text-light)" }}
          >
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
}
