import { motion } from 'framer-motion';
import { Shield, Heart, Lightbulb, Globe, GraduationCap, Users } from 'lucide-react';
import Section from '../components/common/Section';
import Button from '../components/common/Button';

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Partner logos
  const partners = [
    { id: 1, name: "Gertrude's Hospital", logo: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Kenya Paediatric Association", logo: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "British Paediatric Neurology Association", logo: "https://images.pexels.com/photos/5407214/pexels-photo-5407214.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Africa Child Neurology Association", logo: "https://images.pexels.com/photos/5407222/pexels-photo-5407222.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, name: "Global Health Partnerships", logo: "https://images.pexels.com/photos/5407214/pexels-photo-5407214.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "International League Against Epilepsy", logo: "https://images.pexels.com/photos/5407222/pexels-photo-5407222.jpeg?auto=compress&cs=tinysrgb&w=600" },
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Excellence",
      description: "We strive for the highest standards in pediatric neurology care."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Compassion",
      description: "We approach our work with empathy and understanding for children and families."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "We embrace new ideas and approaches to advance pediatric neurology."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Collaboration",
      description: "We work together across borders to achieve our shared mission."
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education",
      description: "We promote continuous learning and professional development."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Inclusivity",
      description: "We value diversity and ensure access to care for all children."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-700 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-right mix-blend-overlay"></div>
        </div>
        
        <div className="container-custom relative py-20 lg:py-32">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            About EACNA
          </motion.h1>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-3xl border border-white/20"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-white/90">
              The East African Child Neurology Association (EACNA) brings together child neurologists, 
              developmental paediatricians, physicians, psychiatrists and allied professionals involved 
              in child neurological care through education, advocacy and collaboration.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Organization Info Section */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-800">Our Organization</h2>
            <p className="text-gray-700 mb-4">
              The East African Child Neurology Association (EACNA) brings together child neurologists, 
              developmental paediatricians, physicians, psychiatrists and allied professionals involved 
              in child neurological care through education, advocacy and collaboration.
            </p>
            <p className="text-gray-700 mb-6">
              Established in 2022, EACNA serves as the primary professional organization for those dedicated 
              to pediatric neurology across Kenya, Uganda, Tanzania, Burundi, South Sudan, and Rwanda.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-primary-700">Our Mandate</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>Supporting capacity development in child neurology care in the East African region.</li>
              <li>Supporting research in paediatric neurology.</li>
              <li>Advocating better health policies for children with neurological conditions.</li>
              <li>Connecting professionals for shared learning and partnerships.</li>
              <li>Raising awareness on childhood neurological disorders in East Africa.</li>
            </ul>
            
            <Button variant="primary" to="/membership">
              Join Our Association
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/8460554/pexels-photo-8460554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="EACNA team members in discussion" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm md:text-base text-primary-700 font-medium">
                "Our goal is to build a network of skilled professionals across East Africa to address the unique 
                neurological needs of children in our region."
              </p>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Values Section */}
      <Section background="light">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide our work and define our commitment to improving neurological care for children across East Africa.
          </p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="bg-white rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-600">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-800">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>
      
      {/* History Timeline */}
      <Section background="white">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tracing the growth and development of the East African Child Neurology Association.
          </p>
        </div>
        
        <div className="relative border-l-2 border-primary-200 ml-4 md:ml-0 md:mx-auto md:max-w-3xl pl-8 md:pl-0">
          {/* Timeline items */}
          <div className="mb-12 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:text-right md:pr-8 relative">
              <div className="absolute left-[-41px] md:left-auto md:right-[-41px] top-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-primary-700">2022</h3>
              <h4 className="font-semibold text-primary-600 mb-2">Foundation</h4>
            </div>
            <div>
              <p className="text-gray-700">
                EACNA was established by a dedicated group of professionals committed to improving neurological
                care for children across East Africa.
              </p>
            </div>
          </div>
          
          <div className="mb-12 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:order-2 md:text-left md:pl-8 relative">
              <div className="absolute left-[-41px] md:left-[-41px] top-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-primary-700">2022</h3>
              <h4 className="font-semibold text-primary-600 mb-2">First Annual Conference</h4>
            </div>
            <div className="md:order-1 md:text-right">
              <p className="text-gray-700">
                The inaugural EACNA conference brought together experts from across East Africa to share knowledge
                and establish collaborative networks.
              </p>
            </div>
          </div>
          
          <div className="mb-12 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:text-right md:pr-8 relative">
              <div className="absolute left-[-41px] md:left-auto md:right-[-41px] top-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-primary-700">2023</h3>
              <h4 className="font-semibold text-primary-600 mb-2">PET Training Launch</h4>
            </div>
            <div>
              <p className="text-gray-700">
                EACNA launched the Paediatric Epilepsy Training (PET) program in collaboration with the British
                Paediatric Neurology Association.
              </p>
            </div>
          </div>
          
          <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:order-2 md:text-left md:pl-8 relative">
              <div className="absolute left-[-41px] md:left-[-41px] top-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-primary-700">2024</h3>
              <h4 className="font-semibold text-primary-600 mb-2">Expanding Reach</h4>
            </div>
            <div className="md:order-1 md:text-right">
              <p className="text-gray-700">
                EACNA continues to grow, expanding its impact through new partnerships, research initiatives, and
                training programs across East Africa.
              </p>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Partners Section */}
      <Section background="light">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading organizations to advance pediatric neurology care in East Africa.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map(partner => (
            <div key={partner.id} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="h-16 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section background="primary" className="text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Mission</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Together, we can transform pediatric neurological care in East Africa.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="accent" 
            size="lg" 
            to="/membership"
          >
            Become a Member
          </Button>
          <Button 
            variant="outline"
            size="lg"
            to="/contact"
            className="border-white text-white hover:bg-white hover:text-primary-700"
          >
            Contact Us
          </Button>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;