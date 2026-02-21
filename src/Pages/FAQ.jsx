import React, { useState } from "react";

export default function FAQ() {
  const [activeSection, setActiveSection] = useState("ORDERS & PAYMENT");
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggle = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const faqData = {
    "ORDERS & PAYMENT": [
      {
        q: "How do I place an order?",
        a: "Select the product, add it to cart, go to checkout, enter your details and complete the payment."
      },
      {
        q: "What payment methods are available?",
        a: "We accept debit cards, credit cards, UPI, net banking and Cash on Delivery."
      },
      {
        q: "Can I order without an account?",
        a: "Yes, guest checkout is available, but an account helps with tracking and returns."
      },
      {
        q: "Why is my order not showing?",
        a: "Orders may take a few minutes to appear. Please check your confirmation email."
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled before shipment only."
      }
    ],

    "GIFT CARD FAQ": [
      {
        q: "What is a gift card?",
        a: "A gift card is a prepaid card that can be used to purchase products from our store."
      },
      {
        q: "How do I buy a gift card?",
        a: "You can purchase a gift card directly from our website."
      },
      {
        q: "How do I redeem a gift card?",
        a: "Enter the gift card code during checkout to apply the balance."
      },
      {
        q: "Do gift cards expire?",
        a: "Yes, gift cards have an expiry date mentioned at purchase."
      },
      {
        q: "Can I use gift cards with offers?",
        a: "Yes, unless stated otherwise in the offer terms."
      }
    ],

    "SHIPPING & TRACKING": [
      {
        q: "How long does delivery take?",
        a: "Delivery usually takes 3 to 7 business days."
      },
      {
        q: "How can I track my order?",
        a: "Tracking details are shared via SMS or email after shipment."
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, international shipping is not available."
      },
      {
        q: "What if my order is delayed?",
        a: "Please contact customer support for assistance."
      },
      {
        q: "Can I change my delivery address?",
        a: "Address changes are possible before shipment only."
      }
    ],

    "RETURNS & REFUND": [
      {
        q: "What is the return policy?",
        a: "Products can be returned within the return window if unused."
      },
      {
        q: "How do I initiate a return?",
        a: "Go to your account and select return for the order."
      },
      {
        q: "When will I get my refund?",
        a: "Refunds are processed within 5–7 working days."
      },
      {
        q: "Can I exchange a product?",
        a: "Yes, exchanges are subject to availability."
      },
      {
        q: "What if I receive a damaged product?",
        a: "Please contact support with product images."
      }
    ],

    "MISCELLANEOUS": [
      {
        q: "How can I contact customer support?",
        a: "You can reach us via email, chat or contact form."
      },
      {
        q: "Do you offer discounts?",
        a: "Yes, we run seasonal sales and promotions."
      },
      {
        q: "How do I apply a coupon?",
        a: "Apply the coupon code at checkout."
      },
      {
        q: "Is my data safe?",
        a: "Yes, we use secure systems to protect your data."
      },
      {
        q: "Can I delete my account?",
        a: "Please contact support to request account deletion."
      }
    ]
  };

  return (
    <div className="container my-5">
      <div className="row">

        {/* LEFT SECTIONS */}
        <div className="col-md-4">
          {Object.keys(faqData).map((section) => (
            <p
              key={section}
              role="button"
              className={`mb-3 ${
                activeSection === section
                  ? "fw-semibold text-danger"
                  : "fw-medium"
              }`}
              onClick={() => {
                setActiveSection(section);
                setOpenQuestion(null);
              }}
            >
              {section}
            </p>
          ))}
        </div>

        {/* RIGHT QUESTIONS */}
        <div className="col-md-8">
          {faqData[activeSection].map((item, index) => (
            <div key={index} className="border-bottom py-3">
              <div
                className="d-flex justify-content-between fw-medium"
                role="button"
                onClick={() => toggle(index)}
              >
                {item.q}
                <span>{openQuestion === index ? "−" : "+"}</span>
              </div>

              {openQuestion === index && (
                <div className="pt-2 text-secondary">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
