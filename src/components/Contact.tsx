import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import "./styles/Contact.css";
import { EarthCanvas, StarsCanvas } from "./canvas";
import { SectionWrapper } from "./HOC";
import { slideIn } from "./utils/motion";

const styles = {
  sectionHeadText: "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText: "sm:text-[18px] text-[14px] text-gray-400 uppercase tracking-wider",
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    let tempErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!form.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!form.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || "",
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
          setErrors({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="relative z-0 w-full pb-4 md:pb-8">
      <div className="xl:mt-4 flex xl:flex-row flex-col-reverse gap-6 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-6 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mt-4 flex flex-col gap-4"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-1.5">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                data-cursor="disable"
                required
                className={`bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border font-medium transition-all duration-300 hover:border-[rgba(194,164,255,0.4)] ${
                  errors.name
                    ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[rgba(194,164,255,0.15)] focus:border-[var(--accentColor)] focus:ring-1 focus:ring-[var(--accentColor)]"
                }`}
              />
              {errors.name && (
                <span 
                  className="text-[#ff5252] text-[12px] font-medium mt-1.5 flex items-center gap-1.5"
                  style={{ animation: "fadeIn 0.25s ease-out forwards" }}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.name}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-1.5">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                data-cursor="disable"
                required
                className={`bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border font-medium transition-all duration-300 hover:border-[rgba(194,164,255,0.4)] ${
                  errors.email
                    ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[rgba(194,164,255,0.15)] focus:border-[var(--accentColor)] focus:ring-1 focus:ring-[var(--accentColor)]"
                }`}
              />
              {errors.email && (
                <span 
                  className="text-[#ff5252] text-[12px] font-medium mt-1.5 flex items-center gap-1.5"
                  style={{ animation: "fadeIn 0.25s ease-out forwards" }}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.email}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-1.5">Your Message</span>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                data-cursor="disable"
                required
                className={`bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border font-medium transition-all duration-300 hover:border-[rgba(194,164,255,0.4)] ${
                  errors.message
                    ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[rgba(194,164,255,0.15)] focus:border-[var(--accentColor)] focus:ring-1 focus:ring-[var(--accentColor)]"
                }`}
              />
              {errors.message && (
                <span 
                  className="text-[#ff5252] text-[12px] font-medium mt-1.5 flex items-center gap-1.5"
                  style={{ animation: "fadeIn 0.25s ease-out forwards" }}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              data-cursor="disable"
              className="bg-tertiary py-2 px-6 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary cursor-pointer hover:bg-[var(--accentColor)] hover:text-black transition-all duration-300 border border-[rgba(194,164,255,0.2)] hover:border-[var(--accentColor)]"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-[480px] md:h-[400px] h-[300px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
      <StarsCanvas />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
