"use client";
import { useGSAP } from "@gsap/react";
import { setupMarqueeAnimation } from "./maquee";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  useGSAP(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 3000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray<HTMLElement>(".card");
    const introCard = cards[0];
    if (!introCard) return;

    const titles = gsap.utils.toArray<HTMLElement>(".card-title h1");
    titles.forEach((title) => {
      const split = new SplitText(title, {
        type: "chars",
        charsClass: "char",
      });
      
      // Wrap each char's content in a span
      split.chars.forEach((char) => {
        const text = char.textContent;
        char.textContent = ''; // Clear it first
        const span = document.createElement('span');
        span.textContent = text;
        char.appendChild(span);
      });
      
      // Set initial state
      gsap.set(title.querySelectorAll(".char span"), { 
        x: "100%"
      });
    });

    const cardImgWrapper = introCard.querySelector(".card-img");
    const cardImg = introCard.querySelector(".card-img img");

    if (cardImgWrapper) {
      gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
    }
    if (cardImg) {
      gsap.set(cardImg, { scale: 1.5 });
    }

    function animateContentIn(
      titleChars: gsap.DOMTarget,
      description: gsap.DOMTarget
    ) {
      if (titleChars) {
        gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
      }
      if (description) {
        gsap.to(description, {
          x: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.1,
          ease: "power4.out",
        });
      }
    }

    function animateContentOut(
      titleChars: gsap.DOMTarget,
      description: gsap.DOMTarget
    ) {
      if (titleChars) {
        gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
      }
      if (description) {
        gsap.to(description, {
          x: "40px",
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      }
    }

    const marquee = introCard.querySelector(".card-marquee .marquee");
    const titleChars = introCard.querySelectorAll(".char span");
    const description = introCard.querySelector(".card-description");
    let contentRevealed = false;

    //Animations for the first card/intro card
    ScrollTrigger.create({
      trigger: introCard,
      start: "top top",
      end: "+=300vh",
      onUpdate: (self) => {
        const progress = self.progress;
        const imgScale = 0.5 + progress * 0.5;
        const borderRadius = 400 - progress * 375;
        const innerImgScale = 1.5 - progress * 0.5;

        if (cardImgWrapper) {
          gsap.set(cardImgWrapper, {
            scale: imgScale,
            borderRadius: borderRadius + "px",
          });
        }
        if (cardImg) {
          gsap.set(cardImg, { scale: innerImgScale });
        }

        if (marquee) {
          if (imgScale >= 0.5 && imgScale <= 0.75) {
            const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
            gsap.set(marquee, { opacity: 1 - fadeProgress });
          } else if (imgScale <= 0.5) {
            gsap.set(marquee, { opacity: 1 });
          } else if (imgScale > 0.75) {
            gsap.set(marquee, { opacity: 0 });
          }
        }

        if (progress >= 1 && !contentRevealed) {
          contentRevealed = true;
          animateContentIn(titleChars, description);
        }

        if (progress < 1 && contentRevealed) {
          contentRevealed = false;
          animateContentOut(titleChars, description);
        }
      },
    });

    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector(".card-wrapper");
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress,
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index < 0) {
        const cardImg = card.querySelector(".card-img img");
        const imgContainer = card.querySelector(".card-img");
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardImg, { scale: 2 - progress });
            gsap.set(imgContainer, {
              borderRadius: 150 - progress * 125 + "px",
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      const cardDescription = card.querySelector(".card-description");
      const cardTitleChars = card.querySelectorAll(".char span");

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        onEnter: () => {
          // console.log(
          //   `Card ${index} entering, animating ${cardTitleChars.length} chars`
          // );
          animateContentIn(cardTitleChars, cardDescription);
        },
        onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
      });
    });

    setupMarqueeAnimation();
  }, {});

  return (
    <>
      <section className="intro">
        <h1>We design spaces that don&apos;t just exist.</h1>
      </section>
      <section className="cards">
        <div className="card">
          <div className="card-marquee">
            <div className="marquee">
              <h1>Design Beyond Boundaries</h1>
              <h1>Built for Tomorrow</h1>
              <h1>Real Impact</h1>
              <h1>Digital Visions</h1>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card-content">
              <div className="card-title">
                <h1>Curved Horizon</h1>
              </div>
              <div className="card-description">
                <p>
                  A futuristic residence that plays with curvature and flow,
                  blending bold geometry with natural topography.
                </p>
              </div>
            </div>
            <div className="card-img">
              <Image
                src="/curved-horizon.jpg"
                alt="Curved Horizon"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-wrapper">
            <div className="card-content">
              <div className="card-title">
                <h1>Glass Haven</h1>
              </div>
              <div className="card-description">
                <p>
                  A sleek pavilion of pure transparency, openess, and light,
                  designed to dissolve into it&apos;s environemnt.
                </p>
              </div>
            </div>
            <div className="card-img">
              <Image
                src="/glass-haven.jpg"
                alt="Glass Haven"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-wrapper">
            <div className="card-content">
              <div className="card-title">
                <h1>Moss Cube</h1>
              </div>
              <div className="card-description">
                <p>
                  A minimalist cube home crowned with a living moss dome,
                  merging micro-architecture with ecological design.
                </p>
              </div>
            </div>
            <div className="card-img">
              <Image
                src="/cube-house.jpg"
                alt="Moss Cube"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-wrapper">
            <div className="card-content">
              <div className="card-title">
                <h1>Floating Shelter</h1>
              </div>
              <div className="card-description">
                <p>
                  This design explores an ethereal structure perched on a grassy
                  islet, seemingly above water.
                </p>
              </div>
            </div>
            <div className="card-img">
              <Image
                src="/floating-shelter.jpg"
                alt="Floating Shelter"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="outro">
        <h1>Architecture reimagined for the modern era.</h1>
      </section>
    </>
  );
}
