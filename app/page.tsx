import Image from "next/image";

export default function Home() {
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
                  blending bold geometry with natural topograpgy.
                </p>
              </div>
            </div>
            <div className="card-img">
              <img src="/card-img-1.jpg" alt="" />
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
              <img src="/card-img-2.jpg" alt="" />
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
              <img src="/card-img-3.jpg" alt="" />
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
              <img src="/card-img-4.jpg" alt="" />
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
