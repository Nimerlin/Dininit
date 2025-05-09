import { useEffect } from 'react';
import styles from './details.module.css'; 
import { gsap } from 'gsap';

const hexagonData = [
  "Change Tracking", "Security", "Logs", "Service Levels",
  "CodeStream", "Integrations", "Database Monitoring", "Serverless", "Host Monitoring",
  "Kubernetes", "Cloud Monitoring", "Network Monitoring", "Error Tracking", "Profiling",
  "Traces", "APM", "Browser", "Synthetics", "Mobile", "New Relic AI",
  "Alerts", "Anomalies", "Dashboards", "Remediation", "System Health"
];

const DetailsPage = () => {
  useEffect(() => {
    gsap.from('.animate', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    });
  }, []);

  return (
    <div  className="pb-20">
      {/* Details Section */}
      <div className="flex flex-wrap justify-between items-center">
        {/* Content Section */}
        <div className="relative mb-10 w-full md:w-1/2 animate">
          <h2 className="text-4xl font-bold text-white">Why do you need a monitoring platform?</h2>
          <p className="text-lg text-white mt-4">
            An all-in-one monitoring platform provides answers, not just data, about the performance of your applications, their underlying infrastructure, and the experience of your end users. Dynatrace is used to modernize and automate enterprise cloud operations, release higher-quality software faster, and deliver optimum digital experiences to your organization’s customers.
          </p>
        </div>
        {/* Image Section */}
        <div className="relative mb-10 w-full md:w-1/2 animate">
          <img 
            src="/details-2.webp" 
            alt="Monitoring Platform Visualization" 
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        {/* Image Section */}
        <div className="relative mb-10 w-full md:w-1/2 animate">
          <img
            src="/details-1.webp" 
            alt="Monitoring Platform Visualization" 
            className="w-full h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="relative mb-10 pl-4 w-full md:w-1/2 animate">
          <h2 className="text-4xl font-bold text-white">Observability and so much more</h2>
          <p className="text-lg text-white mt-4">
            Get a broader view of your environment. One that includes metrics, logs, and traces, as well as a full topological model with distributed tracing, code-level detail, entity relationships, and even user experience and behavioral data – all in context.
          </p>
        </div>
      </div>

      {/* New Hexagonal Section */}
      <div className={styles['hexagon-container']}>
        {/* First Row */}
        {hexagonData.slice(0, 5).map((item, index) => (
            <div
                key={index}
                className={`${styles.hexagon} animate`}
                onMouseEnter={() => gsap.to(`.hexagon-${index}`, { scale: 1.1, duration: 0.3 })}
                onMouseLeave={() => gsap.to(`.hexagon-${index}`, { scale: 1, duration: 0.3 })}
            >
                <div className={styles['hexagon-text']}>{item}</div>
            </div>
        ))}
        {/* Empty divs for spacing in the second row */}
        <div style={{ gridColumn: 'span 2' }}></div>
        {/* Second Row */}
        {hexagonData.slice(5, 10).map((item, index) => (
            <div
                key={index + 5} // Adjust index for the second row
                className={`${styles.hexagon} animate`}
                onMouseEnter={() => gsap.to(`.hexagon-${index + 5}`, { scale: 1.1, duration: 0.3 })}
                onMouseLeave={() => gsap.to(`.hexagon-${index + 5}`, { scale: 1, duration: 0.3 })}
            >
                <div className={styles['hexagon-text']}>{item}</div>
            </div>
        ))}
        {/* Empty divs for spacing in the third row */}
        <div style={{ gridColumn: 'span 1' }}></div>
        {/* Third Row */}
        {hexagonData.slice(10, 15).map((item, index) => (
            <div
                key={index + 10} // Adjust index for the third row
                className={`${styles.hexagon} animate`}
                onMouseEnter={() => gsap.to(`.hexagon-${index + 10}`, { scale: 1.1, duration: 0.3 })}
                onMouseLeave={() => gsap.to(`.hexagon-${index + 10}`, { scale: 1, duration: 0.3 })}
            >
                <div className={styles['hexagon-text']}>{item}</div>
            </div>
        ))}
      </div>

    </div>
  );
};

export default DetailsPage;
