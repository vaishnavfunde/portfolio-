import React from 'react';
import { PROJECTS } from '../../../data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCheckCircle, FiCode, FiLayers } from 'react-icons/fi';
import ThemeSwitcher from '../../../components/ThemeSwitcher';

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = PROJECTS.find(p => p.id.toString() === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-inter selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      
      {/* Floating Theme Switcher */}
      <div className="fixed top-8 right-8 z-50">
        <ThemeSwitcher />
      </div>

      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-full glass bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/5 dark:border-white/10 text-slate-800 dark:text-white hover:scale-110 transition-transform shadow-lg group">
          <FiArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 px-6 lg:px-24 bg-gradient-to-br ${project.color} min-h-[50vh] flex flex-col items-center justify-center text-center`}>
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto mt-10">
          <span className={`text-sm md:text-base font-bold uppercase tracking-widest mb-6 block ${project.accent}`}>
            {project.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            {project.title}
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 lg:px-24 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Problem Statement */}
            <div className="glass bg-white dark:bg-black rounded-[2.5rem] p-10 md:p-12 border border-black/5 dark:border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiLayers size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">The Challenge</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-loose relative z-10">
                {project.problemStatement}
              </p>
            </div>

            {/* Working Process */}
            <div className="glass bg-white dark:bg-black rounded-[2.5rem] p-10 md:p-12 border border-black/5 dark:border-white/10 shadow-xl relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FiCode size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How it Works</h2>
              </div>
              <div className="space-y-6 relative z-10">
                {project.workingProcess.split('\n').map((step, idx) => {
                  const parts = step.split('.');
                  if(parts.length < 2) return null;
                  return (
                    <div key={idx} className="flex gap-4">
                      <span className="text-secondary font-bold text-lg mt-1">{parts[0]}.</span>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        {parts.slice(1).join('.').trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (Meta & Features) */}
          <div className="space-y-8">
            
            <div className="glass bg-white dark:bg-black rounded-[2.5rem] p-8 border border-black/5 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-black/5 dark:border-white/10 pb-4">Key Features</h3>
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FiCheckCircle className="text-success mt-1 shrink-0" size={20} />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass bg-white dark:bg-black rounded-[2.5rem] p-8 border border-black/5 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-black/5 dark:border-white/10 pb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Large Mockup View */}
        <div className="mt-24 rounded-[3rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl relative aspect-[16/9] w-full max-w-5xl mx-auto bg-slate-900">
           <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
            />
        </div>

      </section>
    </div>
  );
}
