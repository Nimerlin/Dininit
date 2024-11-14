"use client";

import React, { useEffect, useState } from "react";
import { GiHandBag } from "react-icons/gi";
import { FaCircle } from "react-icons/fa";

const About = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/json/resumeData.json")
      .then((response) => response.json())
      .then((data) => {
        setResumeData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching Resume data:", error));
  }, []);

  if (isLoading) {
    return (
      <div className="flex text-lg flex-col px-8 justify-center text-white rounded-3xl">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold pt-7">Loading...</h1>
          <div className="my-2.5 h-1.5 w-16 rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"></div>
          <span className="text-base mt-2.5 text-[#aeb0b8]">
            {/* Placeholder text */}
            <div className="h-4 bg-gray-400 rounded mb-2"></div>
            <div className="h-4 bg-gray-400 rounded mb-2"></div>
            <div className="h-4 bg-gray-400 rounded mb-2"></div>
          </span>

          <h1 className="text-3xl font-bold text-left px-2 py-3">Loading...</h1>
          {/* Render skeleton for Aboutcard */}
          <div className="h-48 bg-gray-400 rounded"></div>
        </div>
      </div>
    );
  }

  const icons = {
    GiHandBag: GiHandBag,
  };

  const educationSection = resumeData.sections.find((section) => section.title === "Education");
  const personalProjectsSection = resumeData.sections.find((section) => section.title === "Personal Projects");
  const skillsSection = resumeData.sections.find((section) => section.title === "Skills");

  return (
    <div className="flex text-lg flex-col px-8 justify-center text-white rounded-3xl">
      <h1 className="text-3xl font-bold">{resumeData.title}</h1>
      <div className="my-2.5 h-1.5 w-16 rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"></div>

      {resumeData.sections.map((section, index) => {
        if (section.title === "Education" || section.title === "Personal Projects" || section.title === "Skills") {
          // Skip rendering here, handled later in the combined section
          return null;
        }

        return (
          <div key={index}>
            <div className="flex items-center mt-4">
              {section.icon && React.createElement(icons[section.icon], { className: "mr-2 text-2xl" })}
              <span className="text-2xl font-bold">{section.title}</span>
            </div>

            <div className="timeline mt-7 pl-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="article border-l pl-5 mt-4 relative">
                  <FaCircle className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[#545972]" />
                  <h5>{item.company} || {item.position}</h5>
                  <span>{item.dates}</span>
                  <div className="text-base mt-2.5 text-[#aeb0b8] pre-wrap" style={{ overflowWrap: 'anywhere' }}>
                    {item.description.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Education and Personal Projects in the same row */}
      <div className="flex flex-col md:flex-row mt-4">
        {educationSection && (
          <div className="md:w-1/2">
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold">{educationSection.title}</span>
            </div>
            <div className="timeline mt-7 pl-2">
              {educationSection.items.map((item, itemIndex) => (
                <div key={itemIndex} className="article border-l pl-5 mt-4 relative">
                  <FaCircle className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[#545972]" />
                  <h5>{item.institution}</h5>
                  <span>{item.dates}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {personalProjectsSection && (
          <div className="md:w-1/2">
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold">{personalProjectsSection.title}</span>
            </div>
            <div className="timeline mt-7 pl-2">
              {personalProjectsSection.items.map((item, itemIndex) => (
                <div key={itemIndex} className="article border-l pl-5 mt-4 relative">
                  <FaCircle className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[#545972]" />
                  <h5>{item.project}</h5>
                  <span>{item.dates}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {skillsSection && (
        <div>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold">{skillsSection.title}</span>
          </div>
          <div className="card mt-4 border border-gray-300 rounded-lg p-4">
            <div className="flex flex-col">
              {skillsSection.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center mb-2 relative text-sm md:text-base">
                  <span className="absolute left-0 ">{skill.name}</span>
                  <div className="w-full bg-gray-300 h-6 rounded-full relative">
                    <div
                      className={`bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-full rounded-full`}
                      style={{ width: skill.percentage }}
                    >
                      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-2">{skill.name}</span>
                      <span
                        className="absolute right-0 top-0 bottom-0 mr-2 hidden md:block"
                        style={{ right: `calc(${100 - parseFloat(skill.percentage)}% - 0.1rem)` }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
