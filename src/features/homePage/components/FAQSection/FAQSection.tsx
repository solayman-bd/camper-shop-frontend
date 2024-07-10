import { useState } from "react";
import SectionsWraper from "../../../../components/SectionsWraper";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, American Express, and PayPal for online orders.",
    },
    {
      id: 2,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary.",
    },
    {
      id: 3,
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you will receive a tracking number via email. You can use this number to track your order on our website or the carrier's website.",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Please visit our Returns & Exchanges page for more information.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <SectionsWraper heading="Frequent Asked Questions">
      <div id="accordion-collapse" data-accordion="collapse">
        {faqs.map((faq) => (
          <div key={faq.id} className="mb-4">
            <h2 id={`accordion-collapse-heading-${faq.id}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openFAQ === faq.id}
                aria-controls={`accordion-collapse-body-${faq.id}`}
              >
                <span>{faq.question}</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 transition-transform transform ${
                    openFAQ === faq.id ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${faq.id}`}
              className={`transition-all duration-300 ${
                openFAQ === faq.id ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
              aria-labelledby={`accordion-collapse-heading-${faq.id}`}
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 bg-white">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionsWraper>
  );
};

export default FAQSection;
