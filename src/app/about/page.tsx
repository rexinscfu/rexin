'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillBar } from '@/components/ui/SkillBar';
import { CircuitSvg } from '@/components/ui/CircuitSvg';

// Skill type definition
type Skill = {
  name: string;
  level: number; // 0-100
  category: 'firmware' | 'hardware' | 'software' | 'tools';
};

// Skills data
const skills: Skill[] = [
  // Firmware skills
  { name: 'Embedded C/C++', level: 95, category: 'firmware' },
  { name: 'ARM Architecture', level: 90, category: 'firmware' },
  { name: 'RTOS', level: 85, category: 'firmware' },
  { name: 'Device Drivers', level: 92, category: 'firmware' },
  { name: 'Microcontrollers', level: 95, category: 'firmware' },
  
  // Hardware skills
  { name: 'PCB Design', level: 88, category: 'hardware' },
  { name: 'Circuit Analysis', level: 90, category: 'hardware' },
  { name: 'Soldering & Rework', level: 95, category: 'hardware' },
  { name: 'Test Equipment', level: 85, category: 'hardware' },
  { name: 'Schematic Capture', level: 92, category: 'hardware' },
  
  // Software skills
  { name: 'Python', level: 85, category: 'software' },
  { name: 'Git/Version Control', level: 80, category: 'software' },
  { name: 'Linux/Unix', level: 88, category: 'software' },
  { name: 'Shell Scripting', level: 75, category: 'software' },
  
  // Tools
  { name: 'Oscilloscopes', level: 90, category: 'tools' },
  { name: 'Logic Analyzers', level: 85, category: 'tools' },
  { name: 'SMD Rework', level: 88, category: 'tools' },
  { name: 'Altium Designer', level: 78, category: 'tools' },
  { name: 'KiCad', level: 82, category: 'tools' },
];

export default function AboutPage() {
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  
  const bioInView = useInView(bioRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const experienceInView = useInView(experienceRef, { once: true, margin: "-100px" });

  return (
    <div className="py-16 space-y-20">
      {/* Hero Section with Avatar */}
      <div className="flex flex-col items-center space-y-10">
        <motion.div
          className="w-32 h-32 md:w-40 md:h-40 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 z-0"></div>
          <div className="w-full h-full relative z-10">
            <CircuitSvg />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 z-20"></div>
        </motion.div>
        
        <SectionHeading
          title="About Me"
          description="Firmware engineer, hardware tinkerer, and electronic repair specialist with a passion for building robust embedded systems."
        />
      </div>

      {/* Bio Section */}
      <section ref={bioRef} className="md:max-w-3xl mx-auto">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={bioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">My Journey</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            I'm a passionate firmware developer and hardware enthusiast with experience in developing open source solutions. My journey began in web development, where I honed my programming skills before transitioning to the exciting world of firmware and hardware.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Over the years, I've evolved from a junior developer to specializing in firmware development and hardware driver implementation. I enjoy working with low-level interfaces and embedded systems, creating robust solutions that bridge the gap between hardware and software.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            As a hobby, I repair electronic devices ranging from smartphones to PCs, applying my technical knowledge to troubleshoot and fix hardware issues. This hands-on experience enhances my understanding of electronic systems and fuels my passion for creating reliable firmware solutions.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="space-y-10">
        <SectionHeading title="My Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Firmware & Hardware Skills */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400">Firmware & Hardware</h3>
            <div className="space-y-4">
              {skills
                .filter(skill => ['firmware', 'hardware'].includes(skill.category))
                .map((skill, index) => (
                  <SkillBar 
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                    inView={skillsInView}
                  />
                ))}
            </div>
          </motion.div>

          {/* Software & Tools Skills */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-cyan-500 dark:text-cyan-400">Software & Tools</h3>
            <div className="space-y-4">
              {skills
                .filter(skill => ['software', 'tools'].includes(skill.category))
                .map((skill, index) => (
                  <SkillBar 
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                    inView={skillsInView}
                    colorClass="bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="space-y-10">
        <SectionHeading title="Experience" />

        <div className="space-y-8">
          {/* Timeline items */}
          {[
            {
              title: "Open Source Firmware Developer",
              company: "Independent",
              period: "2024 - 2025",
              description: "Developed open source firmware solutions while pursuing hardware repair as a hobby, focusing on phones, PCs, and various electronic devices."
            },
            {
              title: "Open Source Firmware Developer / HW Driver Dev",
              company: "Open Source Projects",
              period: "2022 - 2023",
              description: "Specialized in firmware development and hardware driver implementation for open source projects, working with low-level system interfaces and embedded platforms."
            },
            {
              title: "Junior Open Source Developer",
              company: "Web Development",
              period: "2020 - 2022",
              description: "Contributed to open source web development projects, focusing on frontend and backend technologies while building a foundation in software development practices."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="grid grid-cols-1 md:grid-cols-10 gap-4 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              {/* Timeline line */}
              {index < 2 && (
                <div className="hidden md:block absolute left-[19px] top-8 w-0.5 h-full bg-gray-200 dark:bg-zinc-800 z-0"></div>
              )}
              
              {/* Time period */}
              <div className="md:col-span-2 flex md:justify-start items-start">
                <div className="relative z-10">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-500 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="ml-4 md:ml-6 text-zinc-600 dark:text-zinc-400">{item.period}</div>
              </div>
              
              {/* Experience details */}
              <div className="md:col-span-8 bg-white/90 dark:bg-zinc-900/50 shadow-md rounded-xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">{item.title}</h3>
                <p className="text-blue-500 dark:text-blue-400 mb-2">{item.company}</p>
                <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
} 