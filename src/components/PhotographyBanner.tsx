import type React from "react"
import { useState, useEffect } from "react"

interface PricingPlan {
  name: string
  price: string
  desc: string
}

interface OrderForm {
  name: string
  phone: string
  email: string
}

interface JoinForm {
  name: string
  phone: string
  email: string
  role: string
  message: string
}

const PhotographyBanner: React.FC = () => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Модалка тарифа
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [orderForm, setOrderForm] = useState<OrderForm>({ name: "", phone: "", email: "" })
  const [orderSent, setOrderSent] = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)

  // Модалка команды
  const [joinOpen, setJoinOpen] = useState(false)
  const [joinForm, setJoinForm] = useState<JoinForm>({ name: "", phone: "", email: "", role: "", message: "" })
  const [joinSent, setJoinSent] = useState(false)
  const [joinLoading, setJoinLoading] = useState(false)

  const openPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    setOrderForm({ name: "", phone: "", email: "" })
    setOrderSent(false)
  }

  const closePlan = () => setSelectedPlan(null)

  const openJoin = (role = "") => {
    setJoinOpen(true)
    setJoinForm({ name: "", phone: "", email: "", role, message: "" })
    setJoinSent(false)
  }

  const closeJoin = () => setJoinOpen(false)

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOrderLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setOrderLoading(false)
    setOrderSent(true)
  }

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setJoinLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setJoinLoading(false)
    setJoinSent(true)
  }

  const texts = ["РЕКЛАМУ.", "САЙТЫ.", "СЕРВЕРЫ.", "РЕШЕНИЯ."]

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100
    const currentFullText = texts[currentIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Inter:wght@400&display=swap');

        .photography-banner,
        .photography-banner * {
          box-sizing: border-box;
        }

        .photography-banner {
          margin: 0;
          background-color: #002b36;
          background-image: url("https://www.yudiz.com/codepen/photography-banner/frame.png");
          background-size: cover;
          background-repeat: no-repeat;
          overflow-x: hidden;
          min-height: 100vh;
          width: 100%;
        }

        .photography-banner *::selection {
          background-color: rgba(241, 231, 40, 0.2);
          color: #ffffff;
        }

        .info-section {
          height: 100vh;
          min-height: 780px;
          padding: 0 0 0 30px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
          user-select: none;
          overflow: hidden;
        }

        .info-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.4;
          background: #d33682;
          filter: blur(162px);
          height: 35%;
          width: 55%;
          position: absolute;
          top: -40%;
          left: -66%;
          transform: translate(50%, 50%);
          z-index: -1;
        }

        .left-part {
          padding: 20px 0 0;
          overflow: hidden;
        }

        .left-part h1 {
          margin: 0;
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(48px, 12vw, 160px);
          line-height: 0.75;
          font-style: normal;
          text-transform: uppercase;
        }

        .left-part h1 .text {
          color: #d33682;
          display: block;
          height: clamp(100px, 15vw, 120px);
        }

        .left-part h1 .d-flex {
          display: flex;
          align-items: center;
        }

        .left-part h1 .char {
          transform: translateY(0);
          transition: transform 0.5s;
          animation: slideUp 0.3s ease-out forwards;
        }

        .typed-cursor {
          display: none !important;
        }

        @keyframes slideUp {
          from {
            transform: translateY(-515px);
          }
          to {
            transform: translateY(0);
          }
        }

        .left-part p {
          width: 72%;
          margin: 20px 0 0;
          color: #fff;
          font-size: 16px;
          font-style: normal;
          font-weight: normal;
          line-height: 2;
          font-family: "Montserrat";
          opacity: 0.8;
        }

        .book-link {
          margin: 40px 0 0;
          padding: 0;
          border: 0;
          font-size: 56px;
          line-height: 1;
          color: #f1f1f1;
          letter-spacing: 0.25px;
          text-transform: uppercase;
          font-family: "Montserrat";
          font-weight: 300;
          font-style: normal;
          display: inline-flex;
          align-items: center;
          gap: 28px;
          position: relative;
          text-decoration: none;
          cursor: pointer;
        }

        .book-link .linktext {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .book-link .linktext::before {
          position: absolute;
          content: "";
          left: 0;
          bottom: 6px;
          width: 100%;
          height: 3px;
          background-color: #ffffff;
          transform: scaleX(1);
          transition: transform 250ms ease-in-out;
          transform-origin: 0 0;
        }

        .book-link:hover .linktext:before {
          transform: scaleX(0);
          transform-origin: 100% 100%;
        }

        .book-link .arrow {
          height: 36px;
          width: 36px;
          top: -5px;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }

        .book-link .arrow::before,
        .book-link .arrow::after {
          position: absolute;
          content: "";
          background-color: #d33682;
          transition: all ease-in-out 0.35s;
          transform-origin: 0 0;
          border-radius: 30px;
        }

        .book-link .arrow::before {
          height: 2px;
          width: 100%;
          top: 0;
          right: 0;
        }

        .book-link .arrow::after {
          width: 2px;
          height: 100%;
          top: 0;
          right: 0;
        }

        .book-link:hover .arrow::before {
          width: 65%;
        }

        .book-link:hover .arrow::after {
          height: 65%;
        }

        .book-link .arrow span {
          background-color: #d33682;
          height: 2px;
          width: 100%;
          display: inline-block;
          transform: rotate(-45deg) translate(-3px, -1px);
          transform-origin: right top;
          border-radius: 30px;
          position: relative;
          transition: all ease-in-out 0.35s;
          position: absolute;
          top: 0;
          left: 0;
        }

        .book-link .arrow span::before {
          background-color: #d33682;
          content: "";
          height: 100%;
          width: 15px;
          left: -15px;
          top: 0;
          position: absolute;
        }

        .right-part {
          background-color: transparent;
          height: 588px;
          width: 588px;
          margin: 0 0 0 auto;
          margin-right: -14px;
          display: block;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .right-part::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.4;
          background: #d33682;
          filter: blur(112px);
          height: 35%;
          width: 55%;
          position: absolute;
          top: 50%;
          right: 33%;
          transform: translate(50%, -50%);
          z-index: -1;
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .particle {
          position: absolute;
          background: rgba(211, 54, 130, 0.6);
          border-radius: 50%;
          pointer-events: none;
          animation: float linear infinite;
        }

        .particle:nth-child(odd) {
          background: rgba(203, 75, 22, 0.4);
        }

        .particle:nth-child(3n) {
          background: rgba(255, 255, 255, 0.2);
        }

        @keyframes float {
          0% {
            transform: translateX(-100px) translateY(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .bg-line {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 85px;
          z-index: -1;
          overflow: hidden;
          display: flex;
          display: -webkit-flex;
          white-space: nowrap;
        }

        .bg-line img {
          position: relative;
          flex-shrink: 0;
          -webkit-flex-shrink: 0;
          animation: 26s linear infinite;
        }

        .bg-line img:nth-child(1) {
          animation-name: first-text;
        }

        .bg-line img:nth-child(2) {
          animation-name: second-text;
        }

        @keyframes first-text {
          50% {
            transform: translateX(-100%);
            opacity: 1;
          }
          50.05% {
            opacity: 0;
          }
          50.1% {
            transform: translateX(100%);
            opacity: 1;
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes second-text {
          50% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(-200%);
          }
          0% {
            transform: translateX(0%);
          }
        }

        .bg-dash-circle {
          position: absolute;
          bottom: -35px;
          right: -13px;
          z-index: -1;
          width: 180px;
          aspect-ratio: 1/1;
        }

        .bg-dash-circle img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center center;
          animation: circle-rotate 18s linear infinite;
        }

        @keyframes circle-rotate {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .hero-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: auto;
          z-index: 2;
          border-radius: 12px;
          opacity: 0.9;
        }

        @media screen and (min-width: 1500px) {
          .info-section {
            padding-left: 120px;
          }
        }

        @media screen and (min-width: 1400px) {
          .info-section {
            padding-left: 100px;
          }
        }

        @media screen and (max-width: 1199px) {
          .bg-line {
            height: 68px;
          }
          .right-part {
            height: 400px;
            width: 400px;
          }
          .right-part .d-flex {
            gap: 20px;
          }
          .bg-dash-circle {
            width: 130px;
          }
        }

        @media screen and (max-width: 767px) {
          .photography-banner {
            overflow-x: hidden;
          }

          .info-section {
            display: block;
            padding: 0;
            overflow: visible;
            min-height: auto;
            height: auto;
          }

          .bg-line {
            height: 52px;
          }

          .left-part {
            padding: 40px 16px 60px;
            overflow: visible;
          }

          .right-part {
            height: 334px;
            width: 334px;
            margin: 0 auto;
            margin-right: auto;
          }

          .left-part h1 .text {
            height: 88px;
          }

          .left-part p {
            font-size: 12px;
            width: 96%;
          }

          .bg-dash-circle {
            width: 80px;
          }
        }

        .features-section {
          padding: 100px 30px;
          background-color: #073642;
          position: relative;
          overflow: hidden;
        }

        .features-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.3;
          background: #d33682;
          filter: blur(140px);
          height: 40%;
          width: 40%;
          position: absolute;
          top: 20%;
          right: -20%;
          z-index: -1;
        }

        .features-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 60px;
          align-items: center;
        }

        .features-content h2 {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(60px, 8vw, 120px);
          line-height: 0.9;
          margin: 0 0 30px;
          text-transform: uppercase;
        }

        .features-content h2 .highlight {
          color: #d33682;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          padding: 25px 0;
          border-bottom: 1px solid #333;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: #d33682;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: #002b36;
          flex-shrink: 0;
        }

        .feature-text h3 {
          color: #fff;
          font-family: "Montserrat";
          font-size: 18px;
          margin: 0 0 8px;
          text-transform: uppercase;
        }

        .feature-text p {
          color: #aaa;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          margin: 0;
          line-height: 1.6;
        }

        .testimonials-section {
          padding: 100px 30px;
          background-color: #002b36;
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.4;
          background: #d33682;
          filter: blur(120px);
          height: 50%;
          width: 30%;
          position: absolute;
          top: 50%;
          left: -15%;
          transform: translateY(-50%);
          z-index: -1;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .testimonials-title {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(60px, 8vw, 100px);
          line-height: 0.9;
          margin: 0 0 80px;
          text-transform: uppercase;
        }

        .testimonials-marquee {
          display: flex;
          animation: scroll 30s linear infinite;
          gap: 40px;
          width: max-content;
        }

        .testimonials-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #333;
          border-radius: 20px;
          padding: 40px 30px;
          position: relative;
          backdrop-filter: blur(10px);
          width: 400px;
          flex-shrink: 0;
        }

        .testimonial-quote {
          color: #fff;
          font-family: "Inter", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.8;
          margin: 0 0 30px;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          font-family: "Inter", sans-serif;
          align-items: center;
          gap: 15px;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #d33682;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #002b36;
        }

        .author-info h4 {
          color: #cb4b16;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          margin: 0;
          text-transform: uppercase;
        }

        .author-info p {
          color: #aaa;
          font-family: "Inter", sans-serif;
          font-size: 12px;
          margin: 5px 0 0;
        }

        .cta-section {
          padding: 120px 30px;
          background-color: #073642;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.6;
          background: #d33682;
          filter: blur(180px);
          height: 60%;
          width: 80%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(80px, 12vw, 160px);
          line-height: 0.8;
          margin: 0 0 30px;
          text-transform: uppercase;
        }

        .cta-subtitle {
          color: #d33682;
          font-family: "Montserrat";
          font-size: 26px;
          line-height: 1.6;
          margin: 0 0 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 18px 40px;
          background: #d33682;
          color: #002b36;
          text-decoration: none;
          font-family: "Montserrat";
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          border-radius: 50px;
          transition: all 0.3s ease;
          border: 2px solid #d33682;
        }

        .cta-button:hover {
          background: transparent;
          color: #d33682;
        }

        .cta-button.secondary {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
        }

        .cta-button.secondary:hover {
          background: transparent;
          color: #d33682;
          border: 2px solid #d33682;
        }

        @media screen and (max-width: 1199px) {
          .features-section,
          .testimonials-section,
          .cta-section {
            padding: 80px 20px;
          }
          .features-container {
            gap: 40px;
          }
          .testimonials-marquee {
            gap: 30px;
          }
          .cta-buttons {
            gap: 20px;
          }
        }

        @media screen and (max-width: 767px) {
          .features-section,
          .testimonials-section,
          .cta-section {
            padding: 60px 16px;
          }
          .features-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .testimonials-marquee {
            gap: 25px;
          }
          .testimonial-card {
            padding: 30px 20px;
          }
          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }
          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }

        /* ===== ТАРИФЫ ===== */
        .pricing-section {
          padding: 100px 30px;
          background-color: #002b36;
          position: relative;
          overflow: hidden;
        }

        .pricing-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.25;
          background: #cb4b16;
          filter: blur(140px);
          height: 50%;
          width: 40%;
          position: absolute;
          top: 10%;
          right: -10%;
          z-index: 0;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 70px;
          position: relative;
          z-index: 1;
        }

        .pricing-header h2 {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(50px, 8vw, 100px);
          line-height: 0.9;
          text-transform: uppercase;
          margin: 0 0 20px;
        }

        .pricing-header h2 .highlight { color: #d33682; }

        .pricing-header p {
          color: #aaa;
          font-family: "Inter", sans-serif;
          font-size: 18px;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .pricing-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid #333;
          border-radius: 24px;
          padding: 45px 35px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          border-color: #d33682;
        }

        .pricing-card.popular {
          border-color: #d33682;
          background: rgba(211, 54, 130, 0.07);
        }

        .popular-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #d33682;
          color: #002b36;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 20px;
        }

        .pricing-plan-name {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #d33682;
          margin: 0 0 15px;
        }

        .pricing-price {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(42px, 5vw, 60px);
          color: #fff;
          line-height: 1;
          margin: 0 0 5px;
        }

        .pricing-price span {
          font-size: 20px;
          font-weight: 400;
          color: #aaa;
        }

        .pricing-desc {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: #aaa;
          margin: 15px 0 30px;
          line-height: 1.6;
        }

        .pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 40px;
          flex: 1;
        }

        .pricing-features li {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: #ccc;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pricing-features li::before {
          content: "✓";
          color: #d33682;
          font-weight: bold;
          flex-shrink: 0;
        }

        .pricing-features li.disabled {
          color: #555;
        }

        .pricing-features li.disabled::before {
          content: "—";
          color: #444;
        }

        .pricing-btn {
          display: block;
          text-align: center;
          padding: 15px;
          background: transparent;
          border: 2px solid #d33682;
          color: #d33682;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .pricing-btn:hover,
        .pricing-card.popular .pricing-btn {
          background: #d33682;
          color: #002b36;
        }

        .pricing-card.popular .pricing-btn:hover {
          background: transparent;
          color: #d33682;
        }

        @media screen and (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; }
        }

        /* ===== КОМАНДА ===== */
        .join-section {
          padding: 120px 30px;
          background-color: #073642;
          position: relative;
          overflow: hidden;
        }

        .join-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.35;
          background: #d33682;
          filter: blur(150px);
          height: 60%;
          width: 50%;
          position: absolute;
          bottom: -10%;
          left: -10%;
          z-index: 0;
        }

        .join-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .join-content h2 {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(48px, 7vw, 90px);
          line-height: 0.9;
          text-transform: uppercase;
          margin: 0 0 25px;
        }

        .join-content h2 .highlight { color: #d33682; }

        .join-content p {
          color: #aaa;
          font-family: "Inter", sans-serif;
          font-size: 17px;
          line-height: 1.8;
          margin: 0 0 40px;
          max-width: 450px;
        }

        .join-perks {
          list-style: none;
          padding: 0;
          margin: 0 0 45px;
        }

        .join-perks li {
          font-family: "Inter", sans-serif;
          font-size: 15px;
          color: #ccc;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .join-perks li .perk-icon {
          width: 34px;
          height: 34px;
          background: rgba(211,54,130,0.15);
          border: 1px solid #d33682;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .join-btn {
          display: inline-block;
          padding: 18px 48px;
          background: #d33682;
          color: #002b36;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .join-btn:hover {
          background: transparent;
          color: #d33682;
          border: 2px solid #d33682;
          padding: 16px 46px;
        }

        .join-roles {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .role-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid #333;
          border-radius: 18px;
          padding: 25px 30px;
          transition: all 0.3s ease;
        }

        .role-card:hover {
          border-color: #d33682;
          transform: translateX(8px);
        }

        .role-card h4 {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          margin: 0 0 8px;
        }

        .role-card p {
          color: #888;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          margin: 0;
          line-height: 1.5;
        }

        .role-tag {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 12px;
          background: rgba(211,54,130,0.15);
          color: #d33682;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 20px;
          letter-spacing: 1px;
        }

        @media screen and (max-width: 900px) {
          .join-inner {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .pricing-section, .join-section {
            padding: 70px 16px;
          }
        }

        /* ===== МОДАЛКИ ===== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-box {
          background: #073642;
          border: 1px solid #d33682;
          border-radius: 24px;
          padding: 50px 45px;
          max-width: 480px;
          width: 100%;
          position: relative;
          animation: slideUp2 0.3s ease;
        }

        @keyframes slideUp2 {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 18px;
          right: 22px;
          background: none;
          border: none;
          color: #aaa;
          font-size: 26px;
          cursor: pointer;
          line-height: 1;
          transition: color 0.2s;
        }

        .modal-close:hover { color: #fff; }

        .modal-badge {
          display: inline-block;
          padding: 5px 14px;
          background: rgba(211,54,130,0.15);
          color: #d33682;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        .modal-title {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 28px;
          text-transform: uppercase;
          margin: 0 0 6px;
        }

        .modal-price {
          color: #d33682;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 36px;
          margin: 0 0 20px;
        }

        .modal-price span {
          font-size: 16px;
          font-weight: 400;
          color: #aaa;
        }

        .modal-desc {
          color: #aaa;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 30px;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .modal-input, .modal-select, .modal-textarea {
          background: rgba(255,255,255,0.06);
          border: 1px solid #444;
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .modal-input::placeholder, .modal-textarea::placeholder { color: #666; }

        .modal-input:focus, .modal-select:focus, .modal-textarea:focus {
          border-color: #d33682;
        }

        .modal-select {
          appearance: none;
          cursor: pointer;
        }

        .modal-select option {
          background: #073642;
          color: #fff;
        }

        .modal-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .modal-submit {
          padding: 16px;
          background: #d33682;
          color: #002b36;
          border: none;
          border-radius: 50px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 6px;
        }

        .modal-submit:hover:not(:disabled) {
          background: transparent;
          color: #d33682;
          border: 2px solid #d33682;
          padding: 14px;
        }

        .modal-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .modal-success {
          text-align: center;
          padding: 20px 0;
        }

        .modal-success .success-icon {
          font-size: 56px;
          margin-bottom: 20px;
          display: block;
        }

        .modal-success h3 {
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 22px;
          margin: 0 0 12px;
          text-transform: uppercase;
        }

        .modal-success p {
          color: #aaa;
          font-family: "Inter", sans-serif;
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }

        @media screen and (max-width: 500px) {
          .modal-box { padding: 35px 22px; }
          .modal-title { font-size: 22px; }
        }
      `}</style>

      <div className="photography-banner">
        <main>
          <section className="info-section">
            <div className="left-part">
              <h1>
                <span className="d-flex">
                  {["Д", "Е", "Л", "А", "Е", "М"].map((char, index) => (
                    <span key={index} className="char tracking-tighter" style={{ animationDelay: `${index * 0.08}s` }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <span className="text tracking-tighter">{currentText}</span>
              </h1>
              <p className="tracking-widest">
                Реклама, сайты, серверы и всё для вашего бизнеса в сети — под ключ, быстро и с гарантией результата
              </p>
              <a href="#cta" className="book-link">
                <span className="linktext tracking-tighter text-3xl">Получить предложение</span>
                <span className="arrow">
                  <span></span>
                </span>
              </a>
            </div>
            <div className="right-part">
              <div className="particles-container">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 20 + 15}s`,
                      animationDelay: `${Math.random() * 10}s`,
                    }}
                  />
                ))}
              </div>
              <div className="bg-line">
                <img
                  src="https://www.yudiz.com/codepen/photography-banner/wave.svg"
                  alt="Line"
                  style={{ filter: "hue-rotate(280deg) saturate(1.5)" }}
                />
                <img
                  src="https://www.yudiz.com/codepen/photography-banner/wave.svg"
                  alt="Line"
                  style={{ filter: "hue-rotate(280deg) saturate(1.5)" }}
                />
              </div>
              <div className="bg-dash-circle">
                <img
                  src="https://www.yudiz.com/codepen/photography-banner/dash-circle.svg"
                  alt="dash-circle"
                  style={{ filter: "hue-rotate(280deg) saturate(1.5)" }}
                />
              </div>
            </div>
          </section>

          <section className="features-section">
            <div className="features-container">
              <div className="features-content">
                <h2>Наши <span className="highlight">услуги</span></h2>
              </div>
              <ul className="features-list">
                <li className="feature-item">
                  <div className="feature-icon">01</div>
                  <div className="feature-text">
                    <h3>Реклама в интернете</h3>
                    <p className="font-light tracking-wider">
                      Контекстная и таргетированная реклама в Яндексе, ВКонтакте и других площадках — приводим клиентов
                    </p>
                  </div>
                </li>
                <li className="feature-item">
                  <div className="feature-icon">02</div>
                  <div className="feature-text">
                    <h3>Разработка сайтов</h3>
                    <p className="tracking-wider">
                      Лендинги, корпоративные сайты, интернет-магазины — любой сложности, под ключ и в срок
                    </p>
                  </div>
                </li>
                <li className="feature-item">
                  <div className="feature-icon">03</div>
                  <div className="feature-text">
                    <h3>Серверные решения</h3>
                    <p className="tracking-wider">
                      Аренда и настройка серверов, хостинг, VPS/VDS — надёжная инфраструктура для вашего бизнеса
                    </p>
                  </div>
                </li>
                <li className="feature-item">
                  <div className="feature-icon">04</div>
                  <div className="feature-text">
                    <h3>Поддержка и сопровождение</h3>
                    <p className="tracking-wider">
                      Берём на себя обслуживание, обновления и техническую поддержку — вы занимаетесь бизнесом
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="testimonials-section">
            <div className="testimonials-container">
              <h2 className="testimonials-title">Нам доверяют</h2>
              <div className="testimonials-marquee">
                <div className="testimonial-card">
                  <p className="testimonial-quote">
                    "Запустили рекламу в Яндексе — за первый месяц получили в 3 раза больше заявок. Ребята знают своё дело!"
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">АС</div>
                    <div className="author-info">
                      <h4>Алексей Смирнов</h4>
                      <p>Владелец интернет-магазина</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-quote">
                    "Сделали нам сайт под ключ за 2 недели. Красиво, быстро, всё работает — клиенты оценили сразу."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">МК</div>
                    <div className="author-info">
                      <h4>Мария Козлова</h4>
                      <p>Руководитель салона красоты</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-quote">
                    "Подняли наш сервер, настроили всё под задачи компании. Ни одного сбоя за полгода — впечатляет."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">ДВ</div>
                    <div className="author-info">
                      <h4>Дмитрий Волков</h4>
                      <p>Технический директор</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-quote">
                    "Запустили рекламу в Яндексе — за первый месяц получили в 3 раза больше заявок. Ребята знают своё дело!"
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">АС</div>
                    <div className="author-info">
                      <h4>Алексей Смирнов</h4>
                      <p>Владелец интернет-магазина</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-quote">
                    "Сделали нам сайт под ключ за 2 недели. Красиво, быстро, всё работает — клиенты оценили сразу."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">МК</div>
                    <div className="author-info">
                      <h4>Мария Козлова</h4>
                      <p>Руководитель салона красоты</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-quote">
                    "Подняли наш сервер, настроили всё под задачи компании. Ни одного сбоя за полгода — впечатляет."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">ДВ</div>
                    <div className="author-info">
                      <h4>Дмитрий Волков</h4>
                      <p>Технический директор</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ТАРИФЫ */}
          <section className="pricing-section" id="pricing">
            <div className="pricing-header">
              <h2>Тарифы для <span className="highlight">каждого</span></h2>
              <p>От первого сайта до полноценной digital-инфраструктуры — выбери свой уровень</p>
            </div>
            <div className="pricing-grid">
              <div className="pricing-card">
                <p className="pricing-plan-name">Новичок</p>
                <div className="pricing-price">400 <span>₽/мес</span></div>
                <p className="pricing-desc">Идеально для старта — всё необходимое, чтобы заявить о себе в интернете</p>
                <ul className="pricing-features">
                  <li>Лендинг под ключ (1 стр.)</li>
                  <li>Базовая настройка рекламы</li>
                  <li>Хостинг + домен</li>
                  <li>SSL-сертификат</li>
                  <li className="disabled">Сервер VPS</li>
                  <li className="disabled">Приоритетная поддержка</li>
                  <li className="disabled">Аналитика и отчёты</li>
                </ul>
                <button className="pricing-btn" onClick={() => openPlan({ name: "Новичок", price: "400 ₽/мес", desc: "Идеально для старта — лендинг, реклама, хостинг и домен." })}>Выбрать план</button>
              </div>

              <div className="pricing-card popular">
                <span className="popular-badge">Хит продаж</span>
                <p className="pricing-plan-name">Бизнес</p>
                <div className="pricing-price">1 500 <span>₽/мес</span></div>
                <p className="pricing-desc">Полный digital-пакет для активного роста: реклама, сайт и надёжный сервер</p>
                <ul className="pricing-features">
                  <li>Многостраничный сайт</li>
                  <li>Реклама в Яндекс + ВКонтакте</li>
                  <li>VPS-сервер (2 CPU / 4 ГБ RAM)</li>
                  <li>SSL + CDN + резервные копии</li>
                  <li>Поддержка 5 дней в неделю</li>
                  <li>Ежемесячный отчёт по рекламе</li>
                  <li className="disabled">Выделенный менеджер</li>
                </ul>
                <button className="pricing-btn" onClick={() => openPlan({ name: "Бизнес", price: "1 500 ₽/мес", desc: "Полный digital-пакет: сайт, реклама, VPS-сервер и поддержка 5 дней в неделю." })}>Выбрать план</button>
              </div>

              <div className="pricing-card">
                <p className="pricing-plan-name">Профи</p>
                <div className="pricing-price">3 000 <span>₽/мес</span></div>
                <p className="pricing-desc">Максимальный уровень для компаний, которым важны скорость, масштаб и результат</p>
                <ul className="pricing-features">
                  <li>Неограниченное кол-во сайтов</li>
                  <li>Полное ведение рекламы (все площадки)</li>
                  <li>Выделенный сервер (8 CPU / 16 ГБ)</li>
                  <li>DevOps-сопровождение</li>
                  <li>Поддержка 24/7</li>
                  <li>Детальная аналитика и A/B тесты</li>
                  <li>Личный менеджер проекта</li>
                </ul>
                <button className="pricing-btn" onClick={() => openPlan({ name: "Профи", price: "3 000 ₽/мес", desc: "Максимальный уровень: выделенный сервер, все площадки рекламы и личный менеджер." })}>Выбрать план</button>
              </div>
            </div>
          </section>

          {/* ВСТУПИТЬ В КОМАНДУ */}
          <section className="join-section" id="join">
            <div className="join-inner">
              <div className="join-content">
                <h2>Вступи в <span className="highlight">команду</span></h2>
                <p>Мы постоянно растём и ищем талантливых людей — разработчиков, маркетологов, дизайнеров и менеджеров. Удалённо или в офисе.</p>
                <ul className="join-perks">
                  <li><span className="perk-icon">💸</span>Достойная зарплата и бонусы за результат</li>
                  <li><span className="perk-icon">🌍</span>Удалённая работа из любой точки мира</li>
                  <li><span className="perk-icon">🚀</span>Реальный карьерный рост внутри компании</li>
                  <li><span className="perk-icon">🎓</span>Обучение за счёт компании</li>
                </ul>
                <button className="join-btn" onClick={() => openJoin("")}>Откликнуться на вакансию</button>
              </div>
              <div className="join-roles">
                <div className="role-card" style={{cursor:"pointer"}} onClick={() => openJoin("Веб-разработчик")}>
                  <h4>Веб-разработчик</h4>
                  <p>Создаёшь сайты и веб-приложения. React, Vue или чистый HTML — нам важен результат.</p>
                  <span className="role-tag">Удалённо</span>
                </div>
                <div className="role-card" style={{cursor:"pointer"}} onClick={() => openJoin("Специалист по рекламе")}>
                  <h4>Специалист по рекламе</h4>
                  <p>Настраиваешь кампании в Яндекс Директ и ВКонтакте, умеешь работать с аналитикой.</p>
                  <span className="role-tag">Удалённо</span>
                </div>
                <div className="role-card" style={{cursor:"pointer"}} onClick={() => openJoin("DevOps / Системный администратор")}>
                  <h4>DevOps / Системный администратор</h4>
                  <p>Поднимаешь серверы, настраиваешь CI/CD, следишь за стабильностью инфраструктуры.</p>
                  <span className="role-tag">Полная занятость</span>
                </div>
                <div className="role-card" style={{cursor:"pointer"}} onClick={() => openJoin("Менеджер по продажам")}>
                  <h4>Менеджер по продажам</h4>
                  <p>Работаешь с входящими заявками, ведёшь клиентов и заключаешь сделки.</p>
                  <span className="role-tag">Удалённо</span>
                </div>
              </div>
            </div>
          </section>

          <section className="cta-section" id="cta">
            <div className="cta-container">
              <h2 className="cta-title text-center">Хватит ждать!</h2>
              <p className="cta-subtitle">
                Каждый день без рекламы и сильного сайта — это упущенные клиенты. Свяжитесь с нами и получите бесплатный аудит вашего онлайн-присутствия.
              </p>
              <div className="cta-buttons">
                <a href="https://t.me/digitalhub_support" target="_blank" rel="noopener noreferrer" className="cta-button">
                  Получить бесплатный аудит
                </a>
                <a href="#pricing" className="cta-button secondary">
                  Наши услуги и цены
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* МОДАЛКА ТАРИФА */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closePlan()}>
          <div className="modal-box">
            <button className="modal-close" onClick={closePlan}>×</button>
            {!orderSent ? (
              <>
                <span className="modal-badge">Тариф</span>
                <h3 className="modal-title">{selectedPlan.name}</h3>
                <div className="modal-price">{selectedPlan.price.split(" ").slice(0,2).join(" ")} <span>{selectedPlan.price.split(" ").slice(2).join(" ")}</span></div>
                <p className="modal-desc">{selectedPlan.desc}</p>
                <form className="modal-form" onSubmit={handleOrderSubmit}>
                  <input
                    className="modal-input"
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={orderForm.name}
                    onChange={e => setOrderForm(p => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    className="modal-input"
                    type="tel"
                    placeholder="Номер телефона"
                    required
                    value={orderForm.phone}
                    onChange={e => setOrderForm(p => ({ ...p, phone: e.target.value }))}
                  />
                  <input
                    className="modal-input"
                    type="email"
                    placeholder="Email (необязательно)"
                    value={orderForm.email}
                    onChange={e => setOrderForm(p => ({ ...p, email: e.target.value }))}
                  />
                  <button className="modal-submit" type="submit" disabled={orderLoading}>
                    {orderLoading ? "Отправляем..." : "Оформить заявку"}
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <span className="success-icon">🎉</span>
                <h3>Заявка принята!</h3>
                <p>Мы свяжемся с вами в ближайшее время и обсудим все детали подключения тарифа <strong style={{color:"#d33682"}}>{selectedPlan.name}</strong>.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* МОДАЛКА КОМАНДЫ */}
      {joinOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeJoin()}>
          <div className="modal-box">
            <button className="modal-close" onClick={closeJoin}>×</button>
            {!joinSent ? (
              <>
                <span className="modal-badge">Карьера</span>
                <h3 className="modal-title">Вступить в команду</h3>
                <p className="modal-desc">Заполни форму — мы рассмотрим твою кандидатуру и свяжемся с тобой.</p>
                <form className="modal-form" onSubmit={handleJoinSubmit}>
                  <input
                    className="modal-input"
                    type="text"
                    placeholder="Твоё имя"
                    required
                    value={joinForm.name}
                    onChange={e => setJoinForm(p => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    className="modal-input"
                    type="tel"
                    placeholder="Номер телефона"
                    required
                    value={joinForm.phone}
                    onChange={e => setJoinForm(p => ({ ...p, phone: e.target.value }))}
                  />
                  <input
                    className="modal-input"
                    type="email"
                    placeholder="Email"
                    required
                    value={joinForm.email}
                    onChange={e => setJoinForm(p => ({ ...p, email: e.target.value }))}
                  />
                  <select
                    className="modal-select"
                    required
                    value={joinForm.role}
                    onChange={e => setJoinForm(p => ({ ...p, role: e.target.value }))}
                  >
                    <option value="" disabled>Выбери вакансию</option>
                    <option>Веб-разработчик</option>
                    <option>Специалист по рекламе</option>
                    <option>DevOps / Системный администратор</option>
                    <option>Менеджер по продажам</option>
                    <option>Другое</option>
                  </select>
                  <textarea
                    className="modal-textarea"
                    placeholder="Расскажи о себе (опыт, стек, ссылки на работы)"
                    value={joinForm.message}
                    onChange={e => setJoinForm(p => ({ ...p, message: e.target.value }))}
                  />
                  <button className="modal-submit" type="submit" disabled={joinLoading}>
                    {joinLoading ? "Отправляем..." : "Отправить анкету"}
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <span className="success-icon">🚀</span>
                <h3>Анкета отправлена!</h3>
                <p>Мы изучим твою кандидатуру и напишем на почту в течение 2–3 рабочих дней. Удачи!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PhotographyBanner