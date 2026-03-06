import styles from "./page.module.css";
import NavEnhancer from "../components/NavEnhancer";

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
            <span className={styles.brandMark} aria-hidden="true">
              SO
            </span>
            <span className={styles.brandTitle}>Sumeet Omalur</span>
          </div>

          <nav className={`${styles.siteNav} ${styles.siteNavDesktop}`} aria-label="Primary">
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
          </nav>

          <details className={styles.navDetails}>
            <summary className={styles.navSummary}>Menu</summary>
            <nav className={styles.siteNav} aria-label="Primary">
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
            </nav>
          </details>
        </div>
      </header>

      <main id="main" className={styles.container}>
        <section className={styles.hero} aria-label="Introduction">
          <h1>Senior Software Engineer</h1>
          <p className={styles.heroSubtitle}>
            Full-stack Engineer focussed in leveraging web and machine learning technologies to help enhance automation and solve problems to provide better experiences to consumers, promote more efficiency in existing processes and subsequently making the world a better place.
          </p>
          <div className={styles.heroBadges} aria-label="Highlights">
            <span className={styles.badge}>Full Stack Development</span>
            <span className={styles.badge}>Model Training and Testing</span>
            <span className={styles.badge}>AWS</span>
            <span className={styles.badge}>CI/CD</span>
            <span className={styles.badge}>A/B Testing</span>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <div className={styles.skills}>
            <div className={styles.skillGroup}>
              <h3>Backend</h3>
              <div className={styles.tags}>
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
                <span className={styles.tag}>Postgres</span>
                <span className={styles.tag}>MongoDB</span>
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Cloud / DevOps</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Amazon Web Services</span>
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
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3>Development Processes</h3>
              <div className={styles.tags}>
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
                  <h3 className={styles.cardTitle}>Tribute Technology</h3>
                  <div className={styles.cardSubtitle}>
                    September 2020 - Present
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
                  <div className={styles.cardSubtitle}>June 2019 - June 2019</div>
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
                    December 2018 - December 2018
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
                    July 2018 - July 2018
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
                Prediction of Length of Stay in Hospitals is a machine learning program that is used to determine the patients length of stay in a hospital based on the symptoms of a patient and the existing patients in various hospitals. It uses various machine learning algorithms like regression and
                decision trees.
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
                Masters in Computer Science | Georgia Institute of Technology
                (September 2023)
              </li>
              <li>
                Bachelors of Technology | SRM Institute of Science and
                Technology (June 2016 - May 2020)
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
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.container}>
          <small>
            Last updated: <span id="last-updated">March 6th 2026</span>
          </small>
        </div>
      </footer>
    </div>
  );
}
