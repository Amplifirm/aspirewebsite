import { useState, useEffect } from 'react';
import { 
  Users,  Award, Building, X, ChevronRight, CheckCircle
} from 'lucide-react';

// Type definitions
interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  company?: string;
  registeredSessions?: any[];
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  fullBio: string;
  expertise: string[];
  sessions: string[];
  achievements: string[];
  quote: string;
  image: string;
  track?: string;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

const SpeakersPage = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [user, setUser] = useState<UserType | null>(null);

  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser: UserType = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const keynoteSpeeakers: Speaker[] = [
    {
      id: 'jack-alexy',
      name: 'Jack Alexy',
      title: 'Olympic Gold Medalist & Student Athlete',
      company: 'Team USA / UC Berkeley',
      bio: 'Gold medal-winning swimmer for Team USA who swims collegiately for the University of California, Berkeley. Jack brings unique insights on excellence, performance, and achieving goals under pressure.',
      fullBio: 'Jack Alexy is a gold medal-winning swimmer for Team USA and current student athlete at the University of California, Berkeley. From Morristown, NJ, Jack comes from a long line of athletes - his mother played for Notre Dame and his grandfather was a professional basketball player with the Detroit Pistons. His experience in high-performance athletics provides valuable insights into goal setting, resilience, and achieving excellence in competitive environments.',
      expertise: ['High Performance', 'Goal Achievement', 'Resilience', 'Team Leadership'],
      sessions: ['Keynote: Excellence Under Pressure'],
      achievements: [
        'Olympic Gold Medalist for Team USA',
        'UC Berkeley collegiate swimmer',
        'From athletic family legacy',
        'Expert in performance optimization'
      ],
      quote: "Excellence isn't a destination—it's a daily commitment to being better than yesterday.",
      image: '/susan.jpg'
    },
    {
      id: 'jennifer-mazzanti',
      name: 'Jennifer S. Mazzanti',
      title: 'Co-Founder & CEO',
      company: 'eMazzanti Technologies',
      bio: 'Co-Founder and CEO of eMazzanti Technologies, a Hoboken IT consultancy and MSP recognized for cutting-edge solutions and client-centric innovation. Named a Leader in Digital Technology by NJBIZ in 2024.',
      fullBio: 'Jennifer S. Mazzanti is the Co-Founder and CEO of eMazzanti Technologies, a Hoboken IT consultancy and MSP recognized for cutting-edge solutions and client-centric innovation. Under her leadership, eMazzanti has grown into a nationally acclaimed firm, recognized for excellence in cybersecurity, cloud services, and digital transformation. A graduate of NYU, Jennifer\'s technical acumen combined with visionary leadership, steering her company to become a trusted advisor for businesses. In 2024, Jennifer was named a Leader in Digital Technology by NJBIZ, recognizing her contributions to innovation and excellence in client and employee service. She is a mentor and advocate for emerging entrepreneurs, sharing insights on scaling businesses, and building resilient teams.',
      expertise: ['Entrepreneurship', 'Digital Transformation', 'Cybersecurity', 'Business Leadership'],
      sessions: ['Keynote: Building & Scaling Technology Businesses'],
      achievements: [
        'Co-Founder and CEO of eMazzanti Technologies',
        'Named Leader in Digital Technology by NJBIZ (2024)',
        'NYU Graduate',
        'Nationally acclaimed IT consultancy leader'
      ],
      quote: "Innovation isn't just about technology—it's about transforming possibilities into realities for our clients.",
      image: '/Jennifer Mazzanti 2024_300dpiRGB1.jpg'
    }
  ];

  const trackSpeakers: Speaker[] = [
    {
      id: 'bryan-antepara',
      name: 'Bryan Antepara',
      title: 'Cloud Engineer',
      company: 'eMazzanti Technologies',
      bio: 'Seasoned Cloud Engineer with a proven history in the information technology and services industry. He brings deep expertise in Office 365 cloud solutions, business processes, and strong program and project management experience.',
      fullBio: 'Bryan Antepara is a seasoned Cloud Engineer with a proven history in the information technology and services industry. He brings deep expertise in Office 365 cloud solutions, business processes, Internet Information Services (IIS), Microsoft Office Suite, Exchange Online, SharePoint Online, and Customer Service, backed by strong program and project management experience. His insights help organizations simplify operations, reduce costs, and harness cloud technologies to drive smarter business growth.',
      expertise: ['Office 365', 'Cloud Solutions', 'Business Processes', 'Project Management'],
      sessions: [
        'AI Readiness Assessment',
        'Reduce your Telephone Operating Costs with Microsoft Teams',
        'The e365 Advantage: Streamlined Services for Small Business Growth'
      ],
      track: 'productivity',
      achievements: [
        'Expert in Office 365 cloud solutions',
        'Skilled in business process optimization',
        'Strong project management background',
        'Microsoft technologies specialist'
      ],
      quote: "The cloud isn't just a technology—it's a business transformation platform.",
      image: '/bryanantepara.jpg'
    },
    {
      id: 'scott-bennet',
      name: 'Scott Bennet',
      title: 'Senior Network Engineer',
      company: 'Information Security Team',
      bio: 'Senior Network Engineer and a member of the Information Security team, with extensive experience in designing, implementing, and maintaining secure network systems.',
      fullBio: 'Scott is a Senior Network Engineer and a member of the Information Security team, with extensive experience in designing, implementing, and maintaining secure network systems. He is proficient in a wide range of network security technologies, including firewalls, VPNs, IDS/IPS, and encryption. Scott holds a Bachelor of Science degree in Cybersecurity from a prestigious university recognized by the NSA and the Department of Homeland Security for excellence in cyber education. His expertise equips organizations with the tools and strategies needed to strengthen network defenses and stay ahead of evolving security threats.',
      expertise: ['Network Engineering', 'Information Security', 'Network Security Tools', 'Cybersecurity'],
      sessions: ['Advanced Network Security Implementation'],
      track: 'cybersecurity',
      achievements: [
        'Senior Network Engineer',
        'Information Security Team member',
        'NSA/DHS recognized cybersecurity degree',
        'Expert in security tools and technologies'
      ],
      quote: "The strongest networks are built with security as the foundation, not an afterthought.",
      image: '/223ab0c4-c530-4f66-9384-ad520d0da7d1.jpeg'
    },
    {
      id: 'emory-edwards',
      name: 'Emory Edwards',
      title: 'Economic Development Advocate',
      company: 'Hudson County, NJ',
      bio: 'Champion and advocate for Hudson County, committed to driving economic development and quality of life for Hudson County\'s great business community.',
      fullBio: 'Emory is a champion and advocate for Hudson County, NJ, committed to driving economic development and quality of life for Hudson County\'s great business community. He is a seasoned leader with expertise in advancement, strategy, and forming community partnerships. Emory brings a collaborative approach to fostering growth and unlocking new opportunities for local businesses.',
      expertise: ['Economic Development', 'Community Partnerships', 'Strategic Planning', 'Business Advocacy'],
      sessions: ['Building Strategic Community Partnerships for Business Growth'],
      track: 'revenue',
      achievements: [
        'Hudson County economic development advocate',
        'Community partnership specialist',
        'Strategic planning expert',
        'Business community champion'
      ],
      quote: "Economic development happens when business success and community growth align.",
      image: '/emoryedwards.jpg'
    },
    {
      id: 'george-karaolis',
      name: 'George Karaolis',
      title: 'Regional Sales Executive',
      company: 'i3 International',
      bio: 'Regional Sales Executive at i3 International, a leader in AI-powered video surveillance and analytics. With over a decade of experience in security technology, helping SMBs turn surveillance systems into strategic tools.',
      fullBio: 'George Karaolis is a Regional Sales Executive at i3 International, a leader in AI-powered video surveillance and analytics. With over a decade of experience in security technology, George specializes in helping small and medium-sized businesses turn their surveillance systems into strategic tools for safety, loss prevention, and operational efficiency. His insights bridge the gap between physical security and business intelligence, enabling organizations to make smarter, data-driven decisions.',
      expertise: ['AI-Powered Surveillance', 'Security Technology', 'Sales Strategy', 'Loss Prevention'],
      sessions: ['Transforming Security Systems into Business Intelligence Tools'],
      track: 'revenue',
      achievements: [
        'Regional Sales Executive at i3 International',
        'Over a decade in security technology',
        'AI-powered surveillance specialist',
        'SMB strategic security expert'
      ],
      quote: "Security technology should do more than protect—it should inform and optimize your business.",
      image: '/georgekaraolispic.jpg'
    },
    {
      id: 'dan-karosen',
      name: 'Dan Karosen',
      title: 'Co-Founder & CFO',
      company: 'FC Motown / Fields Development Group',
      bio: 'Co-founder of FC Motown and CFO of Fields Development Group. Certified Public Accountant with expertise in strategic planning, player recruitment, and financial management.',
      fullBio: 'Dan Karosen is the co-founder of FC Motown, involved with all aspects of the club including strategic planning, player recruitment, marketing and operations. He is a Certified Public Accountant and currently serves as the Chief Financial Officer of Fields Development Group based out of Hoboken. His experience demonstrates how strategic financial management and bold decision-making can help smaller organizations compete successfully.',
      expertise: ['Strategic Planning', 'Financial Management', 'Team Building', 'Sports Business'],
      sessions: ['FC Motown: How the little guy can succeed in business and sport'],
      track: 'revenue',
      achievements: [
        'Co-founded FC Motown',
        'CFO of Fields Development Group',
        'Certified Public Accountant',
        'Expert in competitive strategy'
      ],
      quote: "Success isn't about having the biggest budget—it's about having the biggest vision.",
      image: '/dankarosen.jpg'
    },
    {
      id: 'shiva-kumar',
      name: 'Shiva Kumar',
      title: 'Senior Technical Support Engineer',
      company: 'eMazzanti Technologies',
      bio: 'Senior Technical Support Engineer at eMazzanti Technologies, where he helps professional services organizations and financial professionals embrace AI and automation to enhance productivity.',
      fullBio: 'Shiva Kumar is a Senior Technical Support Engineer at eMazzanti Technologies, where he helps professional services organizations and financial professionals embrace AI and automation to enhance productivity and streamline operations. His expertise centers on practical implementation strategies that make emerging technologies accessible and effective for real-world business challenges, empowering teams to work smarter, faster, and more efficiently.',
      expertise: ['Technical Support', 'AI Implementation', 'Business Automation', 'Productivity Optimization'],
      sessions: ['AI and Automation for Professional Services'],
      track: 'productivity',
      achievements: [
        'Senior Technical Support Engineer',
        'AI and automation specialist',
        'Professional services expert',
        'Productivity optimization leader'
      ],
      quote: "AI isn't about replacing people—it's about empowering them to do their best work.",
      image: '/Shiva Kumar UN Pic.jpg'
    },
    {
      id: 'john-logan',
      name: 'John Logan',
      title: 'Senior Field Engineer & Manager-on-Duty',
      company: 'eMazzanti Technologies',
      bio: 'Senior Field Engineer and Manager-on-Duty at eMazzanti Technologies, as well as a member of the Information Security Team. Experienced network engineer with strong foundation in critical thinking.',
      fullBio: 'John is a Senior Field Engineer and Manager-on-Duty at eMazzanti Technologies, as well as a member of the Information Security Team. He is an experienced network engineer with a strong foundation in critical thinking and problem solving, bringing practical expertise to complex technical challenges. His approach helps organizations strengthen their security posture through hands-on best practices and real-world solutions that enhance system resilience and operational confidence.',
      expertise: ['Field Engineering', 'Network Engineering', 'Information Security', 'Technical Problem Solving'],
      sessions: ['Field Engineering Best Practices for Security'],
      track: 'cybersecurity',
      achievements: [
        'Senior Field Engineer at eMazzanti',
        'Information Security Team member',
        'Manager-on-Duty responsibilities',
        'Expert in critical thinking and problem solving'
      ],
      quote: "The best solutions come from understanding both the technology and the people who use it.",
      image: '/johnloganpic.jpg'
    },
    {
      id: 'carl-mazzanti',
      name: 'Carl Mazzanti',
      title: 'Co-Founder & President',
      company: 'eMazzanti Technologies',
      bio: 'Co-Founder and President of eMazzanti Technologies, Microsoft\'s four time Partner of the Year and premier IT consulting service managing over 400 active accounts.',
      fullBio: 'Carl Mazzanti is the Co-Founder and President of eMazzanti Technologies, Microsoft\'s four time Partner of the Year and one of the premier IT consulting services for businesses throughout the New York metropolitan area and internationally. He manages over 400 active accounts ranging from professional services firms to high-end global retailers, bringing deep expertise in technology strategy and business growth.',
      expertise: ['IT Consulting', 'Business Strategy', 'Technology Leadership', 'Microsoft Solutions'],
      sessions: ['Building Technology Infrastructure for Scale'],
      track: 'productivity',
      achievements: [
        'Co-Founded eMazzanti Technologies',
        'Microsoft Partner of the Year (4x)',
        'Manages 400+ active client accounts',
        'Leading IT consultant in NYC metro area'
      ],
      quote: "Technology should amplify your business vision, not complicate it.",
      image: '/carlmazzanti.jpg'
    },
    {
      id: 'paul-muir',
      name: 'Paul Muir',
      title: 'Mayor',
      company: 'Bethlehem Township',
      bio: 'Mayor Paul Muir has worked in private, nonprofit, and public sectors. Nine years as Mayor and thirteen years on Township Committee, bringing unique public-private sector insights.',
      fullBio: 'Mayor Paul Muir has worked in the private, nonprofit, and public sectors. Paul and his wife Dawn have lived in Bethlehem Township since 2000 and have two children. He has served nine years as Mayor and thirteen years on the Township Committee, providing unique insights into public-private partnerships and government relations.',
      expertise: ['Public Administration', 'Government Relations', 'Public-Private Partnerships', 'Municipal Leadership'],
      sessions: ['Doing Business with the Public Sector'],
      track: 'revenue',
      achievements: [
        '9 years serving as Mayor',
        '13 years on Township Committee',
        'Multi-sector experience',
        'Public-private partnership expert'
      ],
      quote: "Government and business succeed together when we build bridges, not barriers.",
      image: '/paulmuirpic.jpg'
    },
    {
      id: 'deepanshu-negi',
      name: 'Deepanshu Negi',
      title: 'Business Intelligence & Analytics Specialist',
      company: 'Technology Consultant',
      bio: 'Passionate about leveraging technology to drive business intelligence and analytics. With experience in IT roles, including as a Business Process Engineer, he has developed a strong foundation in tech stacks.',
      fullBio: 'Deepanshu is passionate about leveraging technology to drive business intelligence and analytics. With experience in IT roles, including as a Business Process Engineer, and through personal and academic projects, he has developed a strong foundation in tech stacks, finance, programming languages, and industry best practices. His approach helps organizations turn data into actionable insights that support smarter decision-making and operational efficiency.',
      expertise: ['Business Intelligence', 'Data Analytics', 'Business Process Engineering', 'Technology Strategy'],
      sessions: ['Business Intelligence for Decision Making'],
      track: 'productivity',
      achievements: [
        'Business Process Engineer background',
        'Business intelligence specialist',
        'IT industry expertise',
        'Technology-driven analytics expert'
      ],
      quote: "Data tells stories, but business intelligence turns those stories into action.",
      image: '/Deepanshu_822392ed-e272-4b17-913c-8d63a160551d.jpeg'
    },
    {
      id: 'deep-ranipa',
      name: 'Deep Ranipa',
      title: 'Project Manager & Sr. Technical Solutions Consultant',
      company: 'Analytics & Engineering Consultant',
      bio: 'Accomplished Project Manager and Senior Technical Solutions Consultant with a solid foundation in analytics and mechanical engineering. MBA in Analytics from Stevens Institute of Technology.',
      fullBio: 'Deep Ranipa is an accomplished Project Manager and Senior Technical Solutions Consultant with a solid foundation in analytics and mechanical engineering. He holds an MBA in Analytics from Stevens Institute of Technology, equipping him with expertise in business strategy, marketing analytics, and project management. His unique blend of technical and strategic insight empowers organizations to build scalable IT strategies and adopt AI solutions with confidence and clarity.',
      expertise: ['Project Management', 'Analytics', 'Business Strategy', 'Technical Solutions'],
      sessions: [
        'Creating an IT Strategy with Microsoft that Works for your Business',
        'How to Embrace AI without Growing Pains'
      ],
      track: 'productivity',
      achievements: [
        'MBA in Analytics from Stevens Institute',
        'Senior Technical Solutions Consultant',
        'Expert in business strategy',
        'Project management specialist'
      ],
      quote: "The right analytics strategy turns data into competitive advantage.",
      image: '/deepranipa.jpg'
    },
    {
      id: 'nirvan-ramoutar',
      name: 'Nirvan Ramoutar',
      title: 'IT Consultant & Business Development',
      company: 'eMazzanti Technologies / Liqui-Site',
      bio: 'IT Consultant focused on Business Development at eMazzanti Technologies and a member of the Liqui-Site team—a multi-award-winning web development and digital marketing firm.',
      fullBio: 'Nirvan Ramoutar is an IT Consultant focused on Business Development at eMazzanti Technologies and a member of the Liqui-Site team—a multi-award-winning web development and digital marketing firm dedicated to advancing nonprofit missions. His expertise spans IT consulting, business development, and digital marketing strategies, offering practical solutions that help organizations boost productivity, control costs, and scale with confidence.',
      expertise: ['IT Consulting', 'Business Development', 'Digital Marketing', 'Web Development'],
      sessions: [
        'Do More with Less - How Technology is the Best Anti-Inflation Tool',
        'Eliminating IT Bottlenecks: How 24/7 Monitoring Supercharges Productivity'
      ],
      track: 'productivity',
      achievements: [
        'Business Development at eMazzanti',
        'Liqui-Site team member',
        'Award-winning digital marketing',
        'Non-profit technology specialist'
      ],
      quote: "Technology should be your biggest cost-saver, not your biggest expense.",
      image: '/Image.jpg'
    },
    {
      id: 'maria-scarmardo',
      name: 'Maria Scarmardo',
      title: 'Owner',
      company: 'Praxis Data Security',
      bio: 'Owner of Praxis Data Security, a firm that provides practical solutions and risk-based Governance, Risk, Compliance (GRC), and Privacy for medium-sized companies.',
      fullBio: 'Maria is the owner of Praxis Data Security, a firm that provides practical solutions and risk-based Governance, Risk, Compliance (GRC), and Privacy. They help medium-sized companies mitigate losses and position themselves for success in a complex cybersecurity environment. Maria provides actionable strategies for maintaining compliance while controlling costs in today\'s evolving risk landscape.',
      expertise: ['Cybersecurity', 'GRC', 'Data Privacy', 'Risk Management'],
      sessions: ['How to create an effective supplier audit to Keep Your Costs Under control and Within Compliance'],
      track: 'expenses',
      achievements: [
        'Owner of Praxis Data Security',
        'GRC and Privacy specialist',
        'Medium-sized company expert',
        'Risk mitigation leader'
      ],
      quote: "Smart governance isn't about more rules—it's about the right protections.",
      image: '/mariascarmardopic.jpg'
    },
    {
      id: 'ryan-silvestre',
      name: 'Ryan Silvestre',
      title: 'Senior Business Consultant',
      company: 'NJ Small Business Development Center',
      bio: 'Senior Business Consultant at the NJ Small Business Development Center (NJSBDC) at New Jersey City University (NJCU) in Hudson County, specializing in corporate finance and turnaround management.',
      fullBio: 'Ryan is a Senior Business Consultant at the NJ Small Business Development Center (NJSBDC) at New Jersey City University (NJCU) in Hudson County, specializing in corporate finance and turnaround management. He has also assisted in developing and implementing outreach programs for Spanish speaking entrepreneurs. Ryan\'s expertise equips small businesses with the financial strategies and operational insights needed to navigate challenges, stabilize performance, and position for long-term success.',
      expertise: ['Corporate Finance', 'Turnaround Management', 'Small Business Development', 'Bilingual Business Services'],
      sessions: ['Financial Turnaround Strategies for Small Businesses'],
      track: 'revenue',
      achievements: [
        'Senior Business Consultant at NJSBDC',
        'Corporate finance specialist',
        'Turnaround management expert',
        'Bilingual entrepreneur program developer'
      ],
      quote: "Every business challenge is an opportunity for strategic financial repositioning.",
      image: '/ryansilvestrepic.jpg'
    },
    {
      id: 'dr-oya-tukel',
      name: 'Dr. Oya Tukel',
      title: 'Dean',
      company: 'Martin Tuchman School of Management, NJIT',
      bio: 'Dean of the Martin Tuchman School of Management at NJIT, a leader in tech-focused business education with more than three decades of higher education experience.',
      fullBio: 'Dr. Oya Tukel, Dean of the Martin Tuchman School of Management at NJIT, is a leader in tech-focused business education with more than three decades of higher education experience. A two-time Fulbright Specialist, she has been recognized by the New Jersey General Assembly and honored with awards such as Executive Women of New Jersey\'s Salute Award and NJBIZ\'s Leading Women in Business. Her expertise offers a forward-looking perspective on how technology is reshaping business education and preparing the next generation of leaders.',
      expertise: ['Academic Leadership', 'Business Education', 'Technology Management', 'Higher Education'],
      sessions: ['The Future of Technology-Focused Business Education'],
      track: 'mixed',
      achievements: [
        'Dean at NJIT Martin Tuchman School',
        'Two-time Fulbright Specialist',
        'NJ General Assembly recognition',
        'Multiple leadership awards'
      ],
      quote: "Education is the bridge between where business is today and where it needs to be tomorrow.",
      image: '/oyatukelpic.jpg'
    },
    {
      id: 'brinda-vani',
      name: 'Brinda Vani',
      title: 'Field Network Engineer',
      company: 'Network Security Specialist',
      bio: 'Field Network Engineer with a Master\'s in Computer Science from Pace University. She specializes in network security and cloud infrastructure, with deep expertise in WatchGuard Cloud.',
      fullBio: 'Brinda is a Field Network Engineer with a Master\'s in Computer Science from Pace University. She specializes in network security and cloud infrastructure, with deep expertise in WatchGuard Cloud, Active Directory, and advanced email security protocols such as DMARC and DKIM. Her work empowers organizations to strengthen their digital defenses and build resilient, secure environments through practical, scalable solutions.',
      expertise: ['Network Engineering', 'Cloud Infrastructure', 'Email Security', 'WatchGuard Technologies'],
      sessions: ['Advanced Email Security and Cloud Infrastructure'],
      track: 'cybersecurity',
      achievements: [
        'Master\'s in Computer Science from Pace University',
        'Field Network Engineer',
        'WatchGuard Cloud specialist',
        'Advanced email security expert'
      ],
      quote: "Network security is like a chain—it's only as strong as its most thoughtfully designed link.",
      image: '/brindavani.jpg'
    },
    {
      id: 'scott-williamson',
      name: 'Scott Williamson',
      title: 'Director of Managed Services',
      company: 'WatchGuard Technologies',
      bio: 'Director of Managed Services at WatchGuard Technologies with expertise in cloud computing, e-commerce, and network security. Passionate about educating SMBs about cybersecurity threats.',
      fullBio: 'Scott Williamson is the Director of Managed Services at WatchGuard Technologies. He is an expert in cloud computing, e-commerce, and network security with a passion for educating SMBs about cybersecurity threats. His frontline experience protecting thousands of organizations provides valuable insights into the evolving threat landscape and defense strategies.',
      expertise: ['Cybersecurity', 'Cloud Computing', 'Network Security', 'Threat Education'],
      sessions: ['What is the Cybersecurity Outlook for 2025/26'],
      track: 'cybersecurity',
      achievements: [
        'Director at WatchGuard Technologies',
        'Expert in cloud and network security',
        'SMB cybersecurity education advocate',
        'Managed services leadership'
      ],
      quote: "The best cybersecurity strategy is education paired with the right technology.",
      image: '/scottwilliamsonpic.jpg'
    }
  ];

  const allSpeakers: Speaker[] = [...keynoteSpeeakers, ...trackSpeakers];

  const categories: Category[] = [
    { id: 'all', label: 'All Speakers', count: allSpeakers.length },
    { id: 'keynote', label: 'Keynote Speakers', count: keynoteSpeeakers.length },
    { id: 'revenue', label: 'Drive Revenue', count: trackSpeakers.filter(s => s.track === 'revenue').length },
    { id: 'expenses', label: 'Reduce Expenses', count: trackSpeakers.filter(s => s.track === 'expenses').length },
    { id: 'productivity', label: 'Increase Productivity', count: trackSpeakers.filter(s => s.track === 'productivity').length },
    { id: 'cybersecurity', label: 'Enhance Cybersecurity', count: trackSpeakers.filter(s => s.track === 'cybersecurity').length }
  ];

  const getFilteredSpeakers = (): Speaker[] => {
    if (selectedCategory === 'all') return allSpeakers;
    if (selectedCategory === 'keynote') return keynoteSpeeakers;
    return trackSpeakers.filter(speaker => speaker.track === selectedCategory || speaker.track === 'mixed');
  };

  const handleNavigation = (path: string) => {
    // Mock navigation function - in real app would use router
    alert(`Would navigate to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Expert Speakers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn from industry leaders, successful entrepreneurs, and technology experts 
            who will share actionable insights you can implement immediately.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-light text-gray-900">{allSpeakers.length}+</div>
              <div className="text-gray-600 text-sm">Expert Speakers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-light text-gray-900">2</div>
              <div className="text-gray-600 text-sm">Keynote Speakers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <Building className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-light text-gray-900">167+</div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Speakers - Featured Section */}
      {(selectedCategory === 'all' || selectedCategory === 'keynote') && (
        <section className="pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium shadow-md">
                  KEYNOTE SPEAKERS
                </span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Keynote</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {keynoteSpeeakers.map((speaker) => (
                <div 
                  key={speaker.id} 
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-blue-200 shadow-lg flex-shrink-0">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{speaker.name}</h3>
                      <p className="text-blue-600 font-medium mb-1">{speaker.title}</p>
                      <p className="text-gray-600 text-sm mb-4">{speaker.company}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{speaker.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {speaker.expertise.slice(0, 4).map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">{speaker.sessions.length} Session</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Track Speakers */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {selectedCategory === 'all' && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Track Speakers</h2>
              <p className="text-gray-600">Industry experts leading sessions across our four strategic tracks</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredSpeakers().filter(speaker => !keynoteSpeeakers.includes(speaker)).map((speaker) => (
              <div 
                key={speaker.id} 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden border-4 border-gray-200 shadow-md">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{speaker.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{speaker.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{speaker.company}</p>
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{speaker.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {speaker.expertise.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <span className="text-gray-600 text-sm">{speaker.sessions.length} Session{speaker.sessions.length > 1 ? 's' : ''}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-auto mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Learn from the Best</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join these industry experts for a day of actionable insights, practical strategies, 
            and networking opportunities that will transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-md"
                >
                  View My Schedule
                </button>
                <button
                  onClick={() => handleNavigation('/agenda')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  View Full Agenda
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('/register')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
                >
                  Register for Conference
                </button>
                <button
                  onClick={() => handleNavigation('/agenda')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  View Full Agenda
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Speaker Detail Modal - Matching Homepage Style */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 shadow-xl border-blue-200 flex-shrink-0">
                  <img 
                    src={selectedSpeaker.image} 
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-light text-gray-900 mb-2">{selectedSpeaker.name}</h3>
                  <p className="text-xl font-medium mb-2 text-blue-600">{selectedSpeaker.title}</p>
                  <p className="text-gray-600 text-lg mb-4">{selectedSpeaker.company}</p>
                  <div className="bg-blue-50 rounded-2xl p-4 ">
                    <p className="text-gray-700 italic text-lg">"{selectedSpeaker.quote}"</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Biography</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedSpeaker.fullBio}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Conference Sessions</h4>
                  <div className="space-y-3">
                    {selectedSpeaker.sessions?.map((session, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-blue-50 rounded-2xl p-4 ">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-blue-600"></div>
                        <span className="text-gray-800 font-medium">{session}</span>
                      </div>
                    )) || <p className="text-gray-500">No sessions available</p>}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Areas of Expertise</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSpeaker.expertise?.map((skill, i) => (
                      <div key={i} className="bg-gray-100 rounded-xl p-3 text-center">
                        <span className="text-gray-700 font-medium text-sm">{skill}</span>
                      </div>
                    )) || <p className="text-gray-500">No expertise available</p>}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h4>
                  <div className="space-y-3">
                    {selectedSpeaker.achievements?.map((achievement, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    )) || <p className="text-gray-500">No achievements available</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-200">
              <button 
                onClick={() => {
                  setSelectedSpeaker(null);
                  handleNavigation('/agenda');
                }}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                View Sessions
              </button>
              <button 
                onClick={() => setSelectedSpeaker(null)}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
          .font-roboto { font-family: 'Roboto', sans-serif; }
          
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          .animate-modalSlideIn {
            animation: modalSlideIn 0.3s ease-out forwards;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default SpeakersPage;