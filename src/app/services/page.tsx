'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  CpuChipIcon, 
  CodeBracketIcon, 
  WrenchScrewdriverIcon, 
  CommandLineIcon,
  BeakerIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

// Service information
const services = [
  {
    id: 1,
    title: 'Firmware Development',
    description: 'Custom firmware solutions for embedded systems, microcontrollers, and IoT devices. Specializing in efficient, reliable, and maintainable code for resource-constrained environments.',
    icon: CpuChipIcon,
    skills: ['Embedded C/C++', 'RTOS Integration', 'Memory Optimization', 'Power Management'],
  },
  {
    id: 2,
    title: 'Hardware Driver Development',
    description: 'Low-level drivers for custom hardware, peripherals, and interfaces. I bridge the gap between hardware and software with optimized, well-documented driver implementations.',
    icon: CodeBracketIcon,
    skills: ['Device Drivers', 'Peripheral Interfaces', 'Linux Kernel Modules', 'Hardware Abstraction'],
  },
  {
    id: 3,
    title: 'Electronic Repair & Diagnostics',
    description: 'Troubleshooting and repair services for electronic devices and circuit boards. From component-level diagnosis to complete system restoration.',
    icon: WrenchScrewdriverIcon,
    skills: ['Circuit Analysis', 'Signal Tracing', 'Component Replacement', 'PCB Rework'],
  },
  {
    id: 4,
    title: 'Embedded Systems Consulting',
    description: 'Technical guidance and architecture planning for embedded systems projects. I help teams make informed decisions about hardware selection, firmware architecture, and system design.',
    icon: CommandLineIcon,
    skills: ['System Architecture', 'Requirements Analysis', 'Technology Selection', 'Performance Optimization'],
  },
  {
    id: 5,
    title: 'Prototype Development',
    description: 'Rapid development of hardware and firmware prototypes for proof-of-concept and early-stage product development. Turn your ideas into functional demonstrations.',
    icon: BeakerIcon,
    skills: ['Rapid Prototyping', 'Hardware Selection', 'Firmware Implementation', 'Design Validation'],
  },
  {
    id: 6,
    title: 'Legacy System Modernization',
    description: 'Update and enhance legacy embedded systems with modern technologies while maintaining compatibility. Breathe new life into older systems with improved functionality and performance.',
    icon: CircleStackIcon,
    skills: ['Code Migration', 'Hardware Upgrades', 'Documentation', 'Performance Improvements'],
  },
];

export default function ServicesPage() {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  
  return (
    <div className="py-16 space-y-20">
      <SectionHeading 
        title="My Services" 
        description="Specialized technical services leveraging my expertise in firmware engineering, hardware development, and electronic systems."
      />
      
      <section ref={servicesRef} className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-lg">
                  <service.icon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-zinc-400 mb-4">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">Need a Custom Solution?</h3>
            <p className="text-zinc-400">
              I offer tailored services to meet your specific project requirements. From concept to implementation, 
              I can help bring your technical vision to life with professional expertise in firmware and hardware development.
            </p>
            <div className="pt-4">
              <a 
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 