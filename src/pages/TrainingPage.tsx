import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, FileText, Download } from 'lucide-react';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import Card, { CardContent } from '../components/common/Card';

const TrainingPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // PET Course descriptions for accordion
  const petCourses = [
    { 
      id: 'pet1',
      title: 'PET1',
      content: (
        <div>
          <p className="mb-4">
            A 1-day course recommended for all doctors and nurses who contribute to the initial or ongoing 
            care of a child experiencing paroxysmal disorders in the acute and community setting.
          </p>
          <p>
            This foundational course covers the basics of pediatric epilepsy diagnosis and management, 
            focusing on common presentations and first-line approaches.
          </p>
        </div>
      )
    },
    { 
      id: 'pet2',
      title: 'PET2',
      content: (
        <div>
          <p className="mb-4">
            A 2-day course that covers general aspects of epilepsy (history taking, differential diagnosis, 
            investigation etc) and concentrates on epilepsies in infants and young children.
          </p>
          <p>
            Recommended for all doctors and nurses who care for young children with epilepsies. This course 
            expands on PET1 with in-depth exploration of early childhood epilepsy syndromes.
          </p>
        </div>
      )
    },
    { 
      id: 'pet3',
      title: 'PET3',
      content: (
        <div>
          <p className="mb-4">
            A 2-day course concentrating on the epilepsies presenting in older children and adolescents and 
            transition to adult services.
          </p>
          <p>
            Recommended for all doctors and nurses who care for older children, adolescents and young adults with epilepsy. 
            This course addresses unique challenges in adolescent epilepsy and transition care.
          </p>
        </div>
      )
    },
    { 
      id: 'pet4ward',
      title: 'PET4ward',
      content: (
        <div>
          <p className="mb-4">
            The newly developed PET4ward course has been introduced to follow on from PET123 for those wishing to be kept 
            up to date with new and breaking topics in paediatric epilepsy.
          </p>
          <p>
            Anyone wishing to attend the PET4ward course must have attended the PET123 courses. This advanced course 
            covers cutting-edge developments and complex case management.
          </p>
        </div>
      )
    }
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      title: "PET1 Training in Nairobi",
      date: "September 15-16, 2024",
      location: "Gertrude's Children's Hospital, Nairobi",
      image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      title: "Annual EACNA Conference",
      date: "October 10-12, 2024",
      location: "Serena Hotel, Kampala, Uganda",
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      title: "Pediatric Epilepsy Webinar",
      date: "November 5, 2024",
      location: "Virtual Event",
      image: "https://images.pexels.com/photos/8199190/pexels-photo-8199190.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-secondary-700 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        <div className="container-custom relative py-20 lg:py-28">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Training & Conferences
          </motion.h1>
          
          <motion.p 
            className="text-lg max-w-2xl mb-8 text-white/90"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            EACNA offers comprehensive training programs and educational events to enhance pediatric neurology 
            expertise across East Africa.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="accent" 
              size="lg" 
              href="#upcoming-events"
            >
              View Upcoming Events
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* PET Courses Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-800">Paediatric Epilepsy Training (PET)</h2>
            <p className="text-gray-700 mb-4">
              Paediatric Epilepsy Training (PET) is a series of 1 and 2-day courses developed by the British Paediatric 
              Neurology Association (BPNA) in response to concerns about standards of care for children with epilepsy 
              in the UK.
            </p>
            <p className="text-gray-700 mb-4">
              PET has been running in the UK since 2005 and is now being established worldwide. It aims to improve the 
              diagnosis of epileptic and non-epileptic events; improve the standard of care; and raise awareness of 
              when to liaise with a Paediatric Neurologist, a children's epilepsy expert.
            </p>
            <p className="text-gray-700 mb-6">
              The International League Against Epilepsy (ILAE) endorses PET. The ILAE identified PET as an effective, 
              sustainable format to teach safe standard epilepsy practice to clinicians across all levels of healthcare.
            </p>
            
            <Button variant="primary" href="#pet-courses">
              Explore PET Courses
            </Button>
          </div>
          
          <div>
            <img 
              src="https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Healthcare professionals in training" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </Section>
      
      {/* PET Courses Details */}
      <Section background="light" id="pet-courses">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">PET Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each PET course is designed to build upon the previous one, providing a comprehensive education in 
            pediatric epilepsy management.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion items={petCourses} />
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-primary-800">Course Format</h3>
          <p className="text-gray-700 mb-4">
            Each PET course has interactive large and small group sessions. There are many opportunities within 
            each course to consider difficult cases, share 'experience in the real world', and debate 'the evidence'. 
            The size of small groups is limited to 8 attendees, to ensure everyone is able to contribute and gain the 
            most from the learning experience.
          </p>
          <p className="text-gray-700">
            Each course has standardised course materials that are taught to the same high standard worldwide by a 
            trained local faculty of experienced paediatric neurologists and paediatricians with an expertise in 
            epilepsy. A course handbook is provided to attendees.
          </p>
        </div>
      </Section>
      
      {/* Upcoming Events */}
      <Section id="upcoming-events">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">Upcoming Training Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for these upcoming training opportunities and conferences in child neurology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent>
                <div className="flex items-start mb-3">
                  <Calendar className="h-5 w-5 text-primary-600 mt-1 mr-2" />
                  <div>
                    <span className="text-primary-600 font-semibold">{event.date}</span>
                    <p className="text-gray-600 text-sm">{event.location}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-800">{event.title}</h3>
                <Button variant="text" className="mt-2">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline">
            View All Events
          </Button>
        </div>
      </Section>
      
      {/* Webinars & Annual Meetings */}
      <Section background="light">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">Annual Meetings & Webinars</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access our archive of past events and register for upcoming webinars and annual conferences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-card p-6">
            <h3 className="text-xl font-bold mb-4 text-primary-800 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Annual Conferences
            </h3>
            <p className="text-gray-700 mb-4">
              Our annual conferences bring together experts from across East Africa and beyond to share the 
              latest research and best practices in pediatric neurology.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="bg-secondary-100 text-secondary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">2023</span>
                <div>
                  <h4 className="font-semibold">3rd Annual EACNA Conference</h4>
                  <p className="text-gray-600 text-sm">Kigali, Rwanda | December 5-7, 2023</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-secondary-100 text-secondary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">2022</span>
                <div>
                  <h4 className="font-semibold">2nd Annual EACNA Conference</h4>
                  <p className="text-gray-600 text-sm">Dar es Salaam, Tanzania | November 10-12, 2022</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-secondary-100 text-secondary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">2021</span>
                <div>
                  <h4 className="font-semibold">Inaugural EACNA Conference</h4>
                  <p className="text-gray-600 text-sm">Nairobi, Kenya | October 15-17, 2021</p>
                </div>
              </li>
            </ul>
            <Button variant="outline">
              View All Conference Archives
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-6">
            <h3 className="text-xl font-bold mb-4 text-primary-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> Webinars & Online Events
            </h3>
            <p className="text-gray-700 mb-4">
              Our monthly webinars feature presentations on various topics in pediatric neurology from 
              leading experts in the field.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">Upcoming</span>
                <div>
                  <h4 className="font-semibold">Management of Status Epilepticus in Children</h4>
                  <p className="text-gray-600 text-sm">July 15, 2024 | 2:00 PM EAT</p>
                  <Button variant="text" size="sm" className="mt-1 p-0">
                    Register Now
                  </Button>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">Upcoming</span>
                <div>
                  <h4 className="font-semibold">Neurodevelopmental Outcomes in Children with Epilepsy</h4>
                  <p className="text-gray-600 text-sm">August 12, 2024 | 3:00 PM EAT</p>
                  <Button variant="text" size="sm" className="mt-1 p-0">
                    Register Now
                  </Button>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">Past</span>
                <div>
                  <h4 className="font-semibold">Advances in Pediatric Epilepsy Surgery</h4>
                  <p className="text-gray-600 text-sm">June 20, 2024 | Recording Available</p>
                  <Button variant="text" size="sm" className="mt-1 p-0">
                    Watch Recording
                  </Button>
                </div>
              </li>
            </ul>
            <Button variant="outline">
              View All Webinars
            </Button>
          </div>
        </div>
      </Section>
      
      {/* Call for Abstracts */}
      <Section background="primary" className="bg-gradient-to-br from-primary-700 to-primary-800 text-white">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Call for Abstracts & Research Presentations</h2>
            <p className="text-lg mb-6 text-white/90">
              EACNA invites abstract submissions for the upcoming 4th Annual Conference in Nairobi, Kenya. 
              This is an excellent opportunity to showcase your research and connect with colleagues in the field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="accent" 
                size="lg" 
                className="text-primary-900" 
                href="#"
              >
                Submit Your Abstract
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-700"
                href="#"
              >
                Download Guidelines <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Key Dates</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="bg-accent-500 text-primary-900 rounded-full p-1.5">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Abstract Submission Deadline</p>
                  <p className="text-white/80 text-sm">August 15, 2024</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-accent-500 text-primary-900 rounded-full p-1.5">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Notification of Acceptance</p>
                  <p className="text-white/80 text-sm">September 1, 2024</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-accent-500 text-primary-900 rounded-full p-1.5">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Early Registration Deadline</p>
                  <p className="text-white/80 text-sm">September 15, 2024</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
};

export default TrainingPage;