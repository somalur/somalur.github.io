import styles from "./page.module.css";
import Image from "next/image";
import NavEnhancer from "../components/NavEnhancer";
import CareerJourney from "../components/CareerJourney";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavEnhancer />
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.container}>
          <div className={styles.brand} aria-label="Site title">
            <Image className={styles.brandPortrait} src="/sumeet-omalur.png" alt="" width={36} height={36} unoptimized />
            <span className={styles.brandTitle}>Sumeet Omalur</span>
          </div>

          <nav className={`${styles.siteNav} ${styles.siteNavDesktop}`} aria-label="Primary">
            <a className={styles.navLink} href="#journey" data-nav="journey">Journey</a>
            <a className={styles.navLink} href="#skills" data-nav="skills">
              Skills
            </a>
            <a className={styles.navLink} href="#experience" data-nav="experience">
              Experience
            </a>
            <a className={styles.navLink} href="#projects" data-nav="projects">
              Projects
            </a>
            <a className={styles.navLink} href="#achievements" data-nav="achievements">
              Achievements
            </a>
            <a className={styles.navLink} href="#education" data-nav="education">
              Education
            </a>
          <a className={styles.navLink} href="#contact" data-nav="contact">Contact</a>
          </nav>

          <details className={styles.navDetails}>
            <summary className={styles.navSummary}>Menu</summary>
            <nav className={styles.siteNav} aria-label="Primary">
              <a className={styles.navLink} href="#journey" data-nav="journey">Journey</a>
              <a className={styles.navLink} href="#skills" data-nav="skills">
                Skills
              </a>
              <a className={styles.navLink} href="#experience" data-nav="experience">
                Experience
              </a>
              <a className={styles.navLink} href="#projects" data-nav="projects">
                Projects
              </a>
              <a className={styles.navLink} href="#achievements" data-nav="achievements">
                Achievements
              </a>
              <a className={styles.navLink} href="#education" data-nav="education">
                Education
              </a>
            <a className={styles.navLink} href="#contact" data-nav="contact">Contact</a>
          </nav>
          </details>
        </div>
      </header>

      <main id="main" className={styles.container}>
        <section className={styles.hero} aria-label="Introduction">
          <div>
          <p className={styles.heroTopline}>Senior Software Engineer</p>
          <h1>Sumeet Omalur</h1>
          <p className={styles.heroSubtitle}>
            I work on web applications, data migrations, and software delivery. My experience spans Laravel and AWS, e-commerce experimentation, and applied machine learning.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#journey">Work history</a>
            <a className={styles.textButton} href="#projects">Projects</a>
          </div>
          </div>
          <Image className={styles.heroPortrait} src="/sumeet-omalur.png" alt="Sumeet Omalur" width={400} height={400} priority unoptimized />
        </section>

        <CareerJourney />

        <section id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <div className={styles.skills}>
            <div className={styles.skillGroup}>
              <h3>Backend</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Django Rest</span>
                <span className={styles.tag}>LAMP Stack</span>
                <span className={styles.tag}>Laravel</span>
                <span className={styles.tag}>CodeIgniter</span>
                <span className={styles.tag}>Node.js</span>
                <span className={styles.tag}>Python</span>
                <span className={styles.tag}>PyTorch</span>
                <span className={styles.tag}>Vue.js</span>
                <span className={styles.tag}>Next.js</span>
                <span className={styles.tag}>Ruby on Rails</span>
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Languages</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>PHP</span>
                <span className={styles.tag}>Python</span>
                <span className={styles.tag}>JavaScript</span>
                <span className={styles.tag}>ReactJS</span>
                <span className={styles.tag}>C</span>
                <span className={styles.tag}>C++</span>
                <span className={styles.tag}>Java</span>
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Data / BI</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>MySQL</span>
                <span className={styles.tag}>Tableau</span>
                <span className={styles.tag}>PostgreSQL</span>
                <span className={styles.tag}>MongoDB</span>
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Cloud / DevOps</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Amazon Web Services</span>
                <span className={styles.tag}>Azure</span>
                <span className={styles.tag}>Ansible</span>
                 <span className={styles.tag}>Terraform</span>
                <span className={styles.tag}>GitHub</span>
                <span className={styles.tag}>SVN</span>
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Product / Observability</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>DataDog</span>
                <span className={styles.tag}>New Relic</span>
                <span className={styles.tag}>Optimizely</span>
                <span className={styles.tag}>A/B Testing</span>
                <span className={styles.tag}>Stripe API Integration</span>
                <span className={styles.tag}>Open AI API Integration</span>
                <span className={styles.tag}>Anaconda Navigator</span>
                <span className={styles.tag}>Jupyter Notebooks</span>
                <span className={styles.tag}>AWS CloudWatch</span>
                <span className={styles.tag}>Log Analytics</span>
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Development Processes</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>ClickUp</span>
                <span className={styles.tag}>Agile</span>
                <span className={styles.tag}>Jira</span>
                <span className={styles.tag}>SDLC</span>
                <span className={styles.tag}>Kanban</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Work Experience</h2>
          <div className={styles.timeline} role="list">
            <article className={styles.card} role="listitem">
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.cardTitle}>Block + Tackle</h3>
                  <div className={styles.cardSubtitle}>
                    July 2026 - Present · Atlanta, United States
                  </div>
                </div>
              </div>
              <ul className={styles.bullets}>
                <li>Helped maintain the backend and fix bugs in content authoring software for a Fortune 1000 hospitality company.</li>
                <li>Helped implement CI/CD processes for our platforms on Azure using Terraform and Docker.</li>
                <li>Worked on implementing and supporting Databricks pipelines to chunk, clean, and generate data for our large language model infrastructure.</li> 
              </ul>
            </article>

            <article className={styles.card} role="listitem">
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.cardTitle}>Tribute Technology</h3>
                  <div className={styles.cardSubtitle}>
                    September 2020 - June 2026 · Boston, United States
                  </div>
                </div>
              </div>
              <ul className={styles.bullets}>
                <li>
                  Co-Developed a web application using the Laravel Framework
                  that scrapes data from our clients old website to our systems
                  during the onboarding process.
                </li>
                <li>
                  Worked on integrating new services, API, and features to our
                  main web application to help enhance our customer&apos;s
                  experience.
                </li>
                <li>
                  Worked as a Sustaining Engineer in rotations to help maintain
                  and address customer-related issues.
                </li>
                <li>
                  Helped transition our development team to Agile and was
                  assigned the role of scrum master.
                </li>
                <li>
                  Worked and designed a tool to facilitate the migration of
                  data from our legacy environment to an environment on AWS.
                </li>
                <li>
                  Worked on AB Test Development on our e-commerce store to
                  determine features that could help increase revenue and value
                  for the organization.
                </li>
                <li>
                  Managed and worked on building a CI/CD pipeline using GitHub
                  Actions.
                </li>
                <li>
                  Built a front-end service to create and update routing
                  parameters for our website routing system.
                </li>
                <li>
                  Developed and launched a Shopify store in collaboration with
                  external partners to distribute edible sympathy gifts,
                  providing compassionate support to grieving families and
                  driving e-commerce growth.
                </li>
                <li>
                  Responsible for the end-to-end software release process for
                  the company&apos;s web platform, coordinating cross-functional
                  teams to ensure seamless and timely deployments
                </li>
                <li>
                  Accelerated development for two internal teams, ensuring
                  timely achievement of quarterly KPIs by implementing
                  streamlined processes and cross-functional collaboration.
                </li>
                <li>
                  Guided our offshore teams to help migrate data from our legacy platforms to our new consolidated obituary platform, 
                  ensuring a timely achievement in providing customers with a better experience on our platform while improving the sites performance 
                  and simplifying the process of adding new changes to the obituary platform.
                </li>
              </ul>
            </article>
            <article className={styles.card} role="listitem">
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.cardTitle}>CodePlex Technology Services</h3>
                  <div className={styles.cardSubtitle}>June 2019 · Bangalore, India</div>
                </div>
              </div>
              <ul className={styles.bullets}>
                <li>
                  Worked on writing importers to programmatically navigate
                  clients old websites and import obituary content-related data
                  using web scraping technology(HTML DOM parser) when customers
                  are boarded on to the CFS&apos;s platform.
                </li>
              </ul>
            </article>
            <article className={styles.card} role="listitem">
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.cardTitle}>Mindzen Inc</h3>
                  <div className={styles.cardSubtitle}>
                    December 2018 · Chennai, India
                  </div>
                </div>
              </div>
              <ul className={styles.bullets}>
                <li>
                  Helped develop an AI enabled chatbot for Mindzen for a Proof
                  of Concept idea. It was made using Google&apos;s Dialogflow
                  platform.
                </li>
              </ul>
            </article>
            
            <article className={styles.card} role="listitem">
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.cardTitle}>Rao&apos;s Infosoft Join</h3>
                  <div className={styles.cardSubtitle}>
                    July 2018 · Bangalore, India
                  </div>
                </div>
              </div>
              <ul className={styles.bullets}>
                <li>
                    Conducted comparative analysis and testing of machine learning algorithms to optimize recruitment workflows and improve communication efficiency between companies, recruiters, and job applicants.
                </li>
              </ul>
          </article>

          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <div className={styles.grid}>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                Melanoma Prediction Model Analysis Using DenseNet and CoATNet-3
              </h3>
              <div className={styles.cardSubtitle}>
                This project implements a deep-learning pipeline for automated melanoma detection on the SIIM-ISIC skin lesion dataset. It leverages a pretrained CoAtNet-3 and DenseNet backbone augmented with patient metadata (age, sex, and anatomical site) and employs focal loss to address class imbalance. This analysis helped determine which model was more suitable to process and identify key features for a positive case of melanoma
              </div>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                Automated Agent to Solve Ravens Progressive Matrices
              </h3>
                <div className={styles.cardSubtitle}>
                  The Automated Agent was developed using Pillow and OpenCV to process and perform operations on the images from the Ravens Progressive Matrices to identify the relationship between the input images to generate the output image that the agent should select from a given set of
                  potential answer.
                </div>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                Automated Stock Pricing Predictor
              </h3>
              <div className={styles.cardSubtitle}>
                The Automated Stock Pricing Predictor is a machine learning program that uses historical stock data to predict the future stock prices of a given stock. It uses various machine learning algorithms like regression and reinforcement learning techniques like Q-Learning to predict the future stock prices from a given stock ticker from a Nasdaq dataset.
              </div>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                Housing Market Analysis
              </h3>
              <div className={styles.cardSubtitle}>
                The Housing Market Analysis in the United States utilizes post-processed data from Zillow and Red Fin with an ARIMA model to predict the Affordability and Economic Conditions of the housing market for ZIP codes across the United States.
              </div>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                Advanced Traffic Management Using Machine Learning
              </h3>
              <div className={styles.cardSubtitle}>
                Advanced Traffic Management is a project that uses ARIMA and Linear Regression to predict a 7 Day Average Traffic Density on a Auckland Traffic Dataset.
              </div>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                Prediction Of Stay in Hospitals
              </h3>
              <div className={styles.cardSubtitle}>
                Prediction of Length of Stay in Hospitals is a machine learning program that is used to determine the patients length of stay in a hospital based on the symptoms of a patient and the existing patients in various hospitals. It uses various machine learning algorithms like regression and
                decision trees.
              </div>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>
                The Lone Traveller
              </h3>
              <div className={styles.cardSubtitle}>
                The Lone Traveller is a travel website that provides information about various cities in India in a dynamic and transitional manner. It also uses HTML and CSS for the structure and styling of the login page and PHP is incorporated for Database Connection and Login Validation.
              </div>
            </article>
          </div>
        </section>

        <section id="achievements" aria-labelledby="achievements-title">
          <h2 id="achievements-title">Achievements</h2>
          <div className={styles.card}>
            <ul className={styles.bullets}>
              <li>Tribute Technology Innovator Award</li>
            </ul>
          </div>
        </section>

        <section id="education" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div className={styles.card}>
            <ul className={styles.bullets}>
              <li>
                Masters in Computer Science Specializing in Artificial Intelligence | Georgia Institute of Technology
                (September 2023 - August 2026)
              </li>
              <li>
                Bachelors of Technology | SRM Institute of Science and
                Technology — Kattankulathur (June 2016 - May 2020)
              </li>
              <li>
                High School | Delhi Public School - Bangalore East (June 2015 -
                May 2016)
              </li>
              <li>
                Middle School | Delhi Public School - Bangalore East (June 2013
                - May 2014)
              </li>
            </ul>
          </div>
        </section>
        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <h2 id="contact-title">Contact me</h2>
          <p>What are you working on? Whether you have an idea to explore, a tricky problem to solve, or an opportunity to work together, I’d love to hear about it. Send me a message and let’s see what we can build.</p>
          <div className={styles.contactLinks}>
            <a href="tel:+15082333475" aria-label="Call Sumeet at +1-508-233-3475" title="Call +1-508-233-3475">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" /></svg>
            </a>
            <a href="mailto:sumeet.omalur@gmail.com" aria-label="Email Sumeet" title="Email Sumeet">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/sumeet-omalur/" target="_blank" rel="noopener noreferrer" aria-label="Sumeet on LinkedIn" title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.51v5.25Z" /></svg>
            </a>
            <a href="https://github.com/somalur" target="_blank" rel="noopener noreferrer" aria-label="Sumeet on GitHub" title="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.09c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.15a10.75 10.75 0 0 1 5.63 0c2.15-1.45 3.09-1.15 3.09-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.container}>
        </div>
      </footer>
    </div>
  );
}
