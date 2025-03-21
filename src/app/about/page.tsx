'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillBar } from '@/components/ui/SkillBar';

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
      {/* Hero Section */}
      <SectionHeading
        title="About Me"
        description="Firmware engineer, hardware tinkerer, and electronic repair specialist with a passion for building robust embedded systems."
      />

      {/* Bio Section */}
      <section ref={bioRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={bioInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-white">My Journey</h2>
          <p className="text-zinc-400">
            I'm a passionate firmware engineer with over 5 years of experience in developing low-level software for embedded systems. My fascination with electronics began at an early age when I disassembled my first electronic toy to understand how it worked.
          </p>
          <p className="text-zinc-400">
            This curiosity evolved into a career where I specialize in creating robust firmware solutions, designing hardware, and repairing complex electronic systems. I take pride in building efficient, reliable embedded systems that bridge the gap between hardware and software.
          </p>
          <p className="text-zinc-400">
            When I'm not coding or soldering, you'll find me exploring the latest developments in microcontroller technology, contributing to open-source projects, or restoring vintage electronics.
          </p>
        </motion.div>
        
        <motion.div
          className="relative h-[400px] rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={bioInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 z-10 rounded-xl"></div>
          <div className="relative h-full w-full bg-zinc-900 rounded-xl">
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-zinc-700 text-lg font-mono p-4 text-center">
                &lt;/&gt; <br/>
                Circuit Board Image
              </div>
            </div>
          </div>
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
            <h3 className="text-xl font-semibold text-blue-400">Firmware & Hardware</h3>
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
            <h3 className="text-xl font-semibold text-cyan-400">Software & Tools</h3>
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
              title: "Senior Firmware Engineer",
              company: "TechInnovate Solutions",
              period: "2021 - Present",
              description: "Lead firmware development for IoT devices, optimize embedded software performance, and architect low-level solutions for resource-constrained environments."
            },
            {
              title: "Hardware Developer",
              company: "ElectroSystems Inc.",
              period: "2018 - 2021",
              description: "Designed PCBs, implemented sensor interfaces, and developed prototype hardware for industrial automation systems."
            },
            {
              title: "Embedded Software Engineer",
              company: "ConnectedDevices Ltd.",
              period: "2016 - 2018",
              description: "Developed firmware for wireless connectivity modules, implemented communication protocols, and created low-power embedded solutions."
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
                <div className="hidden md:block absolute left-[19px] top-8 w-0.5 h-full bg-zinc-800 z-0"></div>
              )}
              
              {/* Time period */}
              <div className="md:col-span-2 flex md:justify-start items-start">
                <div className="relative z-10">
                  <div className="h-10 w-10 rounded-full bg-zinc-900 border-2 border-blue-500 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="ml-4 md:ml-6 text-zinc-400">{item.period}</div>
              </div>
              
              {/* Experience details */}
              <div className="md:col-span-8 bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-blue-400 mb-2">{item.company}</p>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
} 