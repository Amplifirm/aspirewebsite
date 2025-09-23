import { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, Zap, Shield, ArrowRight, 
  CheckCircle, Clock,  Star, ChevronRight, X
} from 'lucide-react';

// Mock navigate function
const navigate = (path: string) => console.log(`Navigate to: ${path}`);

// Type definitions
interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  company?: string;
  registeredSessions?: RegisteredSession[];
}

interface RegisteredSession {
  sessionId: string;
  sessionTitle?: string;
  track?: string;
  time?: string;
}

interface Session {
  id: string;
  title: string;
  speaker: string;
  time: string;
  description: string;
  fullDescription: string;
}

interface Track {
  id: number;
  title: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
  description: string;
  fullDescription: string;
  keyTopics: string[];
  sessions: Session[];
  outcomes: string[];
}

const TracksPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<RegisteredSession[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser: UserType = JSON.parse(userData);
      setUser(parsedUser);
      setRegisteredSessions(parsedUser.registeredSessions || []);
    }
  }, []);

  const tracks: Track[] = [
    {
      id: 1,
      title: "Drive Revenue",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "#D514FF",
      bgColor: "bg-purple-50",
      description: "AI integration, customer success strategies, and growth optimization",
      fullDescription: "Discover innovative strategies to accelerate business growth through cutting-edge technology and customer-centric approaches. Learn how AI can transform your sales processes, how to build exceptional customer success programs, and implement growth optimization techniques that deliver measurable results.",
      keyTopics: ["AI Integration", "Customer Success", "E365 Implementation", "Growth Optimization"],
      sessions: [
        {
          id: 'fc-motown',
          title: "How the little guy can succeed in business and sports: FC Motown",
          speaker: "Dan Karosen",
          time: "10:25 AM - 10:50 AM",
          description: "Discover how FC Motown rose from local play to NPSL National Championship through bold leadership and vision.",
          fullDescription: "Discover how FC Motown, a semi-professional soccer club founded in 2012, rose from local play in Morristown, New Jersey, to winning the 2022 NPSL National Championship through bold leadership and vision. Owner Dan Karosen will highlight the decisions, culture, and strategies that allowed a small organization to outperform bigger, better-funded rivals. Attendees will gain practical leadership insights they can apply to business—proving that the right mindset and direction can turn underdogs into champions."
        },
        {
          id: 'ai-readiness',
          title: "AI Readiness Assessment",
          speaker: "Bryan Antepara", 
          time: "11:00 AM - 11:25 AM",
          description: "Essential concepts and processes to implement AI successfully in your organization.",
          fullDescription: "Bringing AI into your organization requires that you add thought and process to what you are trying to accomplish. Like any new system implementation, it needs goals and engagement by the stakeholders to explore the benefits of the new system. This session shows you how you can make your organization AI ready. It is not as simple as bringing in ChatGPT. There are nuances in securing your environment to global crawling, making sure your systems are ready to scale and many more. Like any new system implementation, it is important to establish goals and stakeholder engagement to achieve the benefits that AI can bring."
        },
        {
          id: 'customer-success',
          title: "How Customer Success Can Supercharge Your Revenue",
          speaker: "Brindavani Pathuri",
          time: "11:30 AM - 11:55 AM",
          description: "How building stronger customer relationships directly fuels growth and retention.",
          fullDescription: "Explore how building stronger customer relationships directly fuels growth and retention. Drawing on real-world lessons from the field, the speaker highlights how proactive support and technical guidance translate into measurable revenue impact. Attendees will walk away with practical strategies to align customer success with business goals and unlock new streams of value."
        },
        {
          id: 'public-sector',
          title: "Doing Business with the Public Sector",
          speaker: "Paul Muir",
          time: "1:00 PM - 1:50 PM", 
          description: "Navigate government procurement processes and build relationships with municipalities.",
          fullDescription: "As a seasoned public servant, Paul Muir, Mayor will show you how your business can tap into public sector opportunities. This session focuses on shared insights with navigating government procurement processes, understanding bid requirements, and building relationships with municipalities. Whether you offer tech services, products, or consulting, this session will help you position your business for success in the public sector."
        },
        {
          id: 'e365-advantage',
          title: "The e365 Advantage: Streamlined Services for Small Business Growth",
          speaker: "Bryan Antepara",
          time: "2:00 PM - 2:50 PM",
          description: "How e365 simplifies technology management and creates room for businesses to thrive.",
          fullDescription: "This discussion highlights how e365 simplifies technology management and creates room for businesses to thrive. Learn how small businesses can boost collaboration, strengthen security, and cut costs through an integrated platform. Attendees will discover how e365 helps teams stay focused on growth instead of IT challenges."
        },
        {
          id: 'ai-without-pains',
          title: "How to Embrace AI without Growing Pains",
          speaker: "Deep Ranipa", 
          time: "3:00 PM - 3:50 PM",
          description: "Leverage AI to accelerate business growth while avoiding operational disruptions.",
          fullDescription: "Be part of the wave. AI is coming and it moving quickly to help businesses accelerate business growth while avoiding operational disruptions. The session highlights practical strategies for adopting AI tools that enhance sales, optimize processes, and unlock new revenue opportunities. Attendees will gain actionable insights to use AI as a growth engine without the typical implementation challenges."
        }
      ],
      outcomes: [
        "Implement AI-driven sales strategies",
        "Build customer success programs that retain and grow accounts", 
        "Identify new revenue opportunities",
        "Leverage data analytics for growth decisions"
      ]
    },
    {
      id: 2,
      title: "Reduce Expenses",
      icon: <DollarSign className="w-8 h-8" />,
      color: "#00C6AC",
      bgColor: "bg-teal-50",
      description: "Cost optimization through modern cloud platforms and AI tools",
      fullDescription: "Master intelligent cost reduction without sacrificing quality or growth potential. Explore how modern cloud technologies and AI-powered tools can streamline operations, reduce overhead, and optimize resource allocation for maximum efficiency.",
      keyTopics: ["Cloud Migration", "AI Cost Reduction", "Compliance Optimization", "Vendor Management"],
      sessions: [
        {
          id: 'anti-inflation-tech',
          title: "Do More with Less - How Technology is the Best Anti-Inflation Tool",
          speaker: "Nirvan Ramoutar",
          time: "10:25 AM - 10:50 AM", 
          description: "Technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and stay competitive.",
          fullDescription: "Rising costs from supply chains and staffing are squeezing SMBs harder every day, making profitability increasingly difficult to sustain. Waiting to act only widens the gap. This presentation zeroes in on the technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and keep your business competitive in an unforgiving economy."
        },
        {
          id: 'microsoft-strategy',
          title: "Creating an IT Strategy with Microsoft that Works for your Business",
          speaker: "Deep Ranipa",
          time: "11:00 AM - 11:25 AM",
          description: "How Microsoft Dynamics 365 can streamline operations while keeping Excel integration seamless.",
          fullDescription: "Tired of juggling spreadsheets and manual processes that slow your business down? Discover how Microsoft Dynamics 365 can streamline finance, supply chain, and project operations while keeping Excel integration seamless. Walk away with practical tips to improve accuracy, simplify reporting, and boost efficiency—so you can make smarter decisions and drive growth from day one."
        },
        {
          id: 'teams-telephone',
          title: "Reduce your Telephone Operating Costs with Microsoft Teams", 
          speaker: "Bryan Antepara",
          time: "11:30 AM - 11:55 AM",
          description: "Cut phone system expenses by moving to Microsoft Teams with smooth migration strategies.",
          fullDescription: "Discover how small and midsize businesses can reduce phone system expenses by moving to Microsoft Teams. This session will walk you through the key steps for a smooth migration, from setup to user adoption. You'll see how Teams can simplify communication, improve flexibility, and generate real savings for your business. Join us to learn how to turn your phone system into a cost-cutting advantage."
        },
        {
          id: 'supplier-audit',
          title: "How to create an effective supplier audit to Keep Your Costs Under control",
          speaker: "Maria Scarmardo",
          time: "1:00 PM - 1:50 PM",
          description: "Structured audits to uncover inefficiencies, mitigate risks, and strengthen supplier relationships.",
          fullDescription: "This talk outlines the key steps to evaluating suppliers with both cost management and regulatory standards in mind. The presentation covers how structured audits can uncover inefficiencies, mitigate risks, and strengthen supplier relationships. Attendees will learn practical techniques to ensure compliance while protecting their bottom line. There is no business too small that should be looking at their suppliers for cost savings and enhanced efficiencies."
        },
        {
          id: 'smart-savings',
          title: "Smart Savings: A Practical Framework for Cutting Costs Without Cutting Corners",
          speaker: "Emory Edwards",
          time: "2:00 PM - 2:50 PM",
          description: "Practical strategies for reducing expenses while maintaining quality and performance.",
          fullDescription: "In this briefing, reveals practical strategies for reducing expenses while maintaining quality and performance. The session introduces a structured approach to identifying efficiencies, streamlining operations, and avoiding the pitfalls of short-sighted cost-cutting. Attendees will leave with actionable tools to protect margins without sacrificing long-term growth."
        },
        {
          id: 'scalability-playbook',
          title: "The Scalability Playbook: Maximize Growth, Minimize Overhead",
          speaker: "Carl Mazzanti",
          time: "3:00 PM - 3:50 PM",
          description: "Proven strategies for expanding operations efficiently while keeping costs under control.",
          fullDescription: "In this exploration, you'll learn proven strategies for expanding business operations efficiently while keeping costs under control. The talk highlights practical approaches to streamlining processes, leveraging technology, and optimizing resources for sustainable growth. Attendees will leave with a clear framework for scaling their business without unnecessary complexity or expense."
        }
      ],
      outcomes: [
        "Reduce operational costs by 15-30%",
        "Optimize cloud spending and resources", 
        "Streamline vendor relationships",
        "Implement cost-effective automation solutions"
      ]
    },
    {
      id: 3,
      title: "Increase Productivity",
      icon: <Zap className="w-8 h-8" />,
      color: "#00A1EF", 
      bgColor: "bg-blue-50",
      description: "Workflow automation and operational efficiency solutions",
      fullDescription: "Transform your business operations with advanced automation technologies and productivity optimization strategies. Learn how to eliminate bottlenecks, streamline workflows, and empower your team to focus on high-value activities that drive business growth.",
      keyTopics: ["Task Automation", "Remote Workflows", "Team Efficiency", "Digital Transformation"],
      sessions: [
        {
          id: 'cloud-migration',
          title: "Navigating a Cloud Migration",
          speaker: "John Logan",
          time: "10:25 AM - 10:50 AM",
          description: "Break down the cloud migration process into clear, actionable steps for small businesses.",
          fullDescription: "For many small businesses, the cloud offers a smarter, more cost-effective way to operate—but the transition can feel daunting. This presentation will break down the process into clear, actionable steps, helping you understand what to expect and how to prepare. You'll walk away with practical guidance to avoid costly missteps and ensure your move to the cloud supports growth, efficiency, and long-term success."
        },
        {
          id: 'ebitda-growth',
          title: "Unlocking Exceptional Profitability: How Firms Are Achieving Higher EBITDA Growth",
          speaker: "Shiva Kumar",
          time: "11:00 AM - 11:25 AM", 
          description: "Dynamics 365 solutions for Finance, Accounting, and Supply Chain Management challenges.",
          fullDescription: "Spreadsheets can be incredibly powerful tools, but they do come with their own set of challenges and limitations. Dynamics 365 apps with tight integration with Excel offer efficient and user-friendly solutions to handle your Finance and Accounting, Supply Chain Management and project-based services automation processes more efficiently. If you are worried about the data integrity, security, compliance, and reporting, then this session is for you to attend and learn more about Dynamics 365 apps."
        },
        {
          id: 'digital-labor',
          title: "Digital Labor and Process Automation",
          speaker: "Deepanshu Negi",
          time: "11:30 AM - 11:55 AM",
          description: "How automation technologies reshape workflows and boost efficiency across industries.",
          fullDescription: "This presentation examines how automation technologies are reshaping workflows, reducing manual effort, and boosting efficiency across industries. The session highlights practical examples of where digital labor can free up employees for higher-value work while driving consistency and cost savings. Attendees will gain insights into implementing automation strategies that scale with business needs."
        },
        {
          id: 'productivity-paradox',
          title: "The Productivity Paradox: When Technology Helps—and When It Doesn't",
          speaker: "Dr. Oya Tukel", 
          time: "1:00 PM - 1:50 PM",
          description: "Why new tools don't always translate into efficiency and when tech truly drives performance.",
          fullDescription: "This presentation explores why new tools don't always translate into greater efficiency. The talk dives into the hidden pitfalls of over-automation and digital overload while spotlighting the conditions where technology truly drives performance. Attendees will leave with a clearer framework for deciding when tech investments enhance productivity—and when they may hold it back."
        },
        {
          id: 'capital-productivity',
          title: "How Capital Can Improve Productivity",
          speaker: "Dominick Valdes",
          time: "2:00 PM - 2:50 PM",
          description: "Strategic investment in resources, technology, and people to drive measurable efficiency gains.",
          fullDescription: "This presentation explores how strategic investment in resources, technology, and people can drive measurable efficiency gains. The session provides practical guidance on allocating capital to optimize workflows, empower teams, and maximize return on investment. Attendees will learn actionable methods to turn financial resources into tangible productivity improvements."
        },
        {
          id: 'moving-to-cloud',
          title: "Moving to the Cloud",
          speaker: "The Crancer Group",
          time: "3:00 PM - 3:50 PM",
          description: "Strategic approach to cloud migration with practical guidance for small and medium businesses.",
          fullDescription: "Discover the strategic benefits and practical considerations of moving your business operations to the cloud. The Crancer Group will guide you through the essential steps, from planning and assessment to implementation and optimization. Learn how cloud migration can reduce costs, improve scalability, enhance security, and provide your team with greater flexibility. This session offers actionable insights to help you make informed decisions about your cloud journey and avoid common pitfalls."
        }
      ],
      outcomes: [
        "Automate repetitive tasks and workflows",
        "Increase team productivity by 25-40%",
        "Optimize remote and hybrid work environments", 
        "Implement data-driven performance improvements"
      ]
    },
    {
      id: 4,
      title: "Enhance Cybersecurity",
      icon: <Shield className="w-8 h-8" />,
      color: "#4113FD",
      bgColor: "bg-red-50", 
      description: "Advanced threat protection and data security strategies",
      fullDescription: "Build a robust cybersecurity framework that protects your business from evolving threats while enabling growth and innovation. Learn cutting-edge security strategies, threat intelligence, and risk management approaches tailored for small and medium businesses.",
      keyTopics: ["Ransomware Prevention", "Data Protection", "Security Innovation", "Threat Intelligence"],
      sessions: [
        {
          id: 'ai-threat-defense',
          title: "From Alerts to Action: AI-Powered Threat Defense",
          speaker: "Scott Williamson",
          time: "10:25 AM - 10:50 AM",
          description: "Latest update on evolving AI-based threats and how to protect SMBs successfully.",
          fullDescription: "The threats to SMBs and the cybersecurity landscape change constantly, month by month. WatchGuard sees it all. Come and get the very latest update on the evolving AI-based threats we're seeing in our SOC and learn how we're successfully protecting SMBs with our comprehensive security solutions."
        },
        {
          id: 'ecare-network',
          title: "eCare Network Management",
          speaker: "Carl Mazzanti",
          time: "11:00 AM - 11:25 AM",
          description: "Proactive monitoring, rapid response, and expert support to reduce downtime and tighten security.",
          fullDescription: "Automating the care and feeding of your internal network can save time, money and staffing. eCare Network Management takes the stress out of IT with proactive monitoring, rapid response, and expert support. Reduce downtime, tighten security, and keep your operations running smoothly—so you can spend less time troubleshooting and more time growing your business."
        },
        {
          id: 'company-safety',
          title: "How to Keep Your Company Safe",
          speaker: "John Logan & Scott Bennet", 
          time: "11:30 AM - 11:55 AM",
          description: "Comprehensive disaster recovery planning including all departments and customer communications.",
          fullDescription: "Whether it is climate change, terrorism, or a breach, it is important to have a disaster recovery plan that includes all departments, customer communications, and recovery methods. This session will provide an overview and touchpoints of the key elements required to get your business back on track, maintain customer and supplier confidence, and run quickly."
        },
        {
          id: 'cyber-outlook',
          title: "What is the Cybersecurity Outlook for 2025/26",
          speaker: "Scott Williamson",
          time: "1:00 PM - 1:50 PM",
          description: "Emerging threats, regulatory shifts, and defense strategies shaping the next two years.",
          fullDescription: "This presentation offers an inside look at the emerging threats, regulatory shifts, and defense strategies shaping the next two years. Delivered by the Head of Managed Services at WatchGuard, the session blends frontline insights with strategic guidance on how businesses can stay ahead of evolving risks. Attendees will gain a clear picture of the cybersecurity landscape and actionable steps to strengthen resilience."
        },
        {
          id: 'cyber-recommendations',
          title: "Top 10 Cybersecurity recommendations for Businesses Large and Small",
          speaker: "Carl Mazzanti",
          time: "2:00 PM - 2:50 PM",
          description: "Essential guidance for protecting organizations against today's evolving digital threats.",
          fullDescription: "This talk delivers essential guidance for protecting organizations against today's evolving digital threats. The talk outlines practical, high-impact strategies that can be applied by companies of any size to strengthen security and reduce risk. Attendees will learn actionable steps to safeguard their operations and build a more resilient cyber posture."
        },
        {
          id: 'video-ai',
          title: "From Surveillance to Strategy: Unlocking Hidden Profits with Intelligent Video AI",
          speaker: "George Karaolis", 
          time: "3:00 PM - 3:50 PM",
          description: "How modern surveillance technologies transform loss prevention and incident recovery.",
          fullDescription: "Explore how modern surveillance technologies are transforming loss prevention and incident recovery for small businesses. This session will cover smart camera systems, AI-powered monitoring, and integrated alerts that help protect your assets, reduce shrinkage, and respond faster when incidents occur. Learn practical strategies and affordable tools that keep your eyes on your business 24/7."
        }
      ],
      outcomes: [
        "Implement comprehensive security frameworks",
        "Reduce security incidents by 80%",
        "Ensure regulatory compliance",
        "Build incident response capabilities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Presented in Honor of Our 24th Anniversary
              </span>
            </div>

            
            
            <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Four Strategic Tracks
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Choose your learning path with 24 expert-led sessions designed for immediate business impact. 
              Each track offers 6 focused sessions led by industry experts and practitioners.
            </p>
            
            
            {/* Session Registration Status */}
            {user && (
              <div className="inline-flex items-center space-x-4 px-6 py-3 bg-blue-50 rounded-full border border-blue-200 mb-8">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  {registeredSessions.length} sessions in your schedule
                </span>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Dashboard →
                </button>
              </div>
            )}

            {/* Track Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {tracks.map((track) => (
                <div 
                  key={track.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                  onClick={() => setSelectedTrack(track)}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{backgroundColor: track.color}}
                    >
                      {track.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{track.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{track.description}</p>
                    <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{track.sessions.length} Sessions</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 mx-auto mt-3 group-hover:translate-x-1 group-hover:text-gray-600 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Track Sections */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Deep Dive Into Each Track
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every session is strategically designed to deliver immediate business value. 
              Mix and match across tracks to build your perfect learning experience.
            </p>
          </div>

          <div className="space-y-20">
            {tracks.map((track, index) => (
              <div key={track.id} className="relative">
                
                {/* Track Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center space-x-4 mb-6">
                    <div 
                      className="w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl"
                      style={{backgroundColor: track.color}}
                    >
                      {track.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-3xl font-light text-gray-900">{track.title}</h3>
                      <p className="text-gray-600">{track.sessions.length} Expert Sessions</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                    {track.fullDescription}
                  </p>

                  {/* Key Topics */}
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {track.keyTopics.map((topic, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-md border"
                        style={{borderColor: track.color, color: track.color}}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {track.sessions.map((session, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg leading-tight mb-2 group-hover:text-gray-600 transition-colors">
                            {session.title}
                          </h4>
                          <div className="flex items-center space-x-2 mb-3">
                            <Star className="w-4 h-4" style={{color: track.color}} />
                            <span className="text-sm font-medium" style={{color: track.color}}>
                              {session.speaker}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {session.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {session.time}
                          </span>
                        </div>
                        <button 
                          className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
                          style={{
                            backgroundColor: track.color + '20',
                            color: track.color
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSession(session);
                          }}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Track Outcomes */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h4 className="text-2xl font-light text-gray-900 mb-6">What You'll Achieve</h4>
                      <div className="space-y-4">
                        {track.outcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{color: track.color}} />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <div className="inline-block">
                        <button
                          onClick={() => navigate('/agenda')}
                          className="px-8 py-4 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                          style={{background: `linear-gradient(135deg, ${track.color}, ${track.color}dd)`}}
                        >
                          <span>View All Sessions</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator Line */}
                {index < tracks.length - 1 && (
                  <div className="mt-20 mb-0">
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-100 mx-auto rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Ready to Build Your Learning Path?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {user ? (
              `You have ${registeredSessions.length} sessions in your schedule. Explore the full agenda to add more sessions.`
            ) : (
              'Mix and match sessions across multiple tracks that align with your business priorities. Register now to start building your personalized agenda.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
                >
                  View My Schedule
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Full Agenda
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
                >
                  Register Now - It's Free
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  View Full Agenda
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Track Detail Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-6">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl"
                  style={{backgroundColor: selectedTrack.color}}
                >
                  {selectedTrack.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-light text-gray-900">{selectedTrack.title}</h3>
                  <p className="text-gray-600">{selectedTrack.sessions?.length || 0} Expert Sessions</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-4">Track Overview</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{selectedTrack.fullDescription}</p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-4">What You'll Achieve</h4>
                  <div className="space-y-3">
                    {selectedTrack.outcomes?.map((outcome, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-green-50 rounded-2xl p-4 border border-green-200">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-4">Key Topics Covered</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedTrack.keyTopics?.map((topic, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sessions */}
              <div>
                <h4 className="text-2xl font-light text-gray-900 mb-4">Session Schedule</h4>
                <div className="space-y-4">
                  {selectedTrack.sessions?.map((session, i) => (
                    <div 
                      key={i} 
                      className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 text-lg leading-tight">{session.title}</h5>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {session.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2" style={{color: selectedTrack.color}}>
                        Speaker: {session.speaker}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  )) || <p className="text-gray-500">No sessions available</p>}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button 
                className="flex-1 py-4 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                style={{background: `linear-gradient(135deg, ${selectedTrack.color}, ${selectedTrack.color}dd)`}}
                onClick={() => navigate('/register')}
              >
                Register for This Track
              </button>
              <button 
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                onClick={() => setSelectedTrack(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1 pr-6">
                <h3 className="text-3xl font-light text-gray-900 mb-2 leading-tight">{selectedSession.title}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium text-blue-600">{selectedSession.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">{selectedSession.time}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-2xl transition-colors flex-shrink-0"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-4">Session Overview</h4>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedSession.fullDescription}</p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-lg font-medium text-blue-900 mb-3">Key Takeaways</h4>
                <p className="text-blue-800 leading-relaxed">
                  This session provides practical, actionable insights that you can immediately apply to your business. 
                  You'll leave with specific strategies, tools, and frameworks to drive measurable results.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6 border-t border-gray-200 mt-8">
              <button 
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                onClick={() => navigate('/register')}
              >
                Register for This Session
              </button>
              <button 
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                onClick={() => setSelectedSession(null)}
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
        `}
      </style>
    </div>
  );
};

export default TracksPage;