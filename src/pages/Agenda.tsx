import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, TrendingUp, DollarSign, Zap, Shield, Users, X, Calendar, MapPin, 
  Coffee, CheckCircle 
} from 'lucide-react';
import { authService } from '../lib/supabase';

// Type definitions
interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  registeredSessions?: RegisteredSession[];
}

interface RegisteredSession {
  sessionId: string;
  sessionTitle?: string;
  track?: string;
  time?: string;
}

interface Track {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
}

interface Session {
  id: string;
  track: string;
  title: string;
  speaker: string;
  description: string;
  fullDescription: string;
}

interface TimeSlot {
  time: string;
  type: 'special' | 'keynote' | 'break' | 'session';
  title?: string;
  speaker?: string;
  description?: string;
  sessions?: Session[];
}

// Extended AuthService interface
interface ExtendedAuthService {
  getUserRegistrations?: (userId: string) => Promise<{
    success: boolean;
    registeredSessions?: RegisteredSession[];
    error?: string;
  }>;
  registerSession?: (sessionData: {
    sessionId: string;
    sessionTitle: string;
    track: string;
    time: string;
  }) => Promise<{
    success: boolean;
    registeredSessions?: RegisteredSession[];
    error?: string;
  }>;
  unregisterSession?: (sessionId: string) => Promise<{
    success: boolean;
    registeredSessions?: RegisteredSession[];
    error?: string;
  }>;
}

const AgendaPage = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<RegisteredSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Extended auth service with session management methods
  const extendedAuthService = authService as ExtendedAuthService;

  useEffect(() => {
    const loadUserAndRegistrations = async () => {
      // Check if user is logged in
      const userData = localStorage.getItem('user');
      
      if (userData) {
        try {
          const parsedUser: UserType = JSON.parse(userData);
          setUser(parsedUser);

          // Load existing registrations from localStorage first
          if (parsedUser.registeredSessions) {
            setRegisteredSessions(parsedUser.registeredSessions);
          }

          // Try to load from Supabase if method exists
          if (extendedAuthService.getUserRegistrations) {
            try {
              const result = await extendedAuthService.getUserRegistrations(parsedUser.id);
              if (result.success) {
                setRegisteredSessions(result.registeredSessions || []);
                
                // Update user object in localStorage with latest registrations
                const updatedUser = { ...parsedUser, registeredSessions: result.registeredSessions || [] };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
              }
            } catch (err) {
              console.error('Error loading registrations:', err);
              // Fallback to localStorage data
            }
          }

          console.log('AgendaPage loaded user:', parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
    };

    loadUserAndRegistrations();
  }, []);

  const tracks: Track[] = [
    { 
      id: 'revenue', 
      name: 'Drive Revenue', 
      icon: <TrendingUp className="w-4 h-4" />, 
      color: '#D514FF',
      bgColor: '#2EA1ED15'
    },
    { 
      id: 'expenses', 
      name: 'Reduce Expenses', 
      icon: <DollarSign className="w-4 h-4" />, 
      color: '#00C6AC',
      bgColor: '#2EA1ED15'
    },
    { 
      id: 'productivity', 
      name: 'Increase Productivity', 
      icon: <Zap className="w-4 h-4" />, 
      color: '#00A1EF',
      bgColor: '#2EA1ED15'
    },
    { 
      id: 'cybersecurity', 
      name: 'Enhance Cybersecurity', 
      icon: <Shield className="w-4 h-4" />, 
      color: '#4113FD',
      bgColor: '#2EA1ED15'
    }
  ];

  const timeSlots: TimeSlot[] = [
    {
      time: '9:00 AM - 9:30 AM',
      type: 'special',
      title: 'Registration & Welcome Coffee',
      description: 'Check-in, networking, and light refreshments'
    },
    {
      time: '9:30 AM - 10:15 AM',
      type: 'keynote',
      title: 'KEYNOTE: Business Leadership Conversation',
      speaker: 'Jack Alexy & Jennifer S. Mazzanti',
      description: 'Industry leaders discuss resilience, decision-making, and leveraging technology for rapid business growth'
    },
    {
      time: '10:15 AM - 10:25 AM',
      type: 'break',
      title: 'Networking Break',
      description: 'Coffee and networking opportunity'
    },
    {
      time: '10:25 AM - 10:50 AM',
      type: 'session',
      sessions: [
        {
          id: 'fc-motown',
          track: 'revenue',
          title: 'FC Motown: How the little guy can succeed in business and sport',
          speaker: 'Dan Karosen',
          description: 'Discover how FC Motown rose from local play to NPSL National Championship through bold leadership and vision.',
          fullDescription: 'Discover how FC Motown, a semi-professional soccer club founded in 2012, rose from local play in Morristown, New Jersey, to winning the 2022 NPSL National Championship through bold leadership and vision. Owner Dan Karosen will highlight the decisions, culture, and strategies that allowed a small organization to outperform bigger, better-funded rivals. Attendees will gain practical leadership insights they can apply to business—proving that the right mindset and direction can turn underdogs into champions.'
        },
        {
          id: 'anti-inflation-tech',
          track: 'expenses',
          title: 'Do More with Less - How Technology is the Best Anti-Inflation Tool',
          speaker: 'Nirvan Ramoutar',
          description: 'Technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and stay competitive.',
          fullDescription: 'Rising costs from supply chains and staffing are squeezing SMBs harder every day, making profitability increasingly difficult to sustain. Waiting to act only widens the gap. This presentation zeroes in on the technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and keep your business competitive in an unforgiving economy.'
        },
        {
          id: 'cloud-migration',
          track: 'productivity',
          title: 'Navigating a Cloud Migration',
          speaker: 'John Logan',
          description: 'Break down the cloud migration process into clear, actionable steps for small businesses.',
          fullDescription: 'For many small businesses, the cloud offers a smarter, more cost-effective way to operate—but the transition can feel daunting. This presentation will break down the process into clear, actionable steps, helping you understand what to expect and how to prepare. You\'ll walk away with practical guidance to avoid costly missteps and ensure your move to the cloud supports growth, efficiency, and long-term success.'
        },
        {
          id: 'ai-security-threats',
          track: 'cybersecurity',
          title: 'Latest AI Security Threats',
          speaker: 'Scott Williamson',
          description: 'Latest update on evolving AI-based threats and how to protect SMBs successfully.',
          fullDescription: 'The threats to SMBs and the cybersecurity landscape change constantly, month by month. WatchGuard sees it all. Come and get the very latest update on the evolving AI-based threats we\'re seeing in our SOC and learn how we\'re successfully protecting SMBs with our comprehensive security solutions.'
        }
      ]
    },
    {
      time: '11:00 AM - 11:25 AM',
      type: 'session',
      sessions: [
        {
          id: 'ai-readiness',
          track: 'revenue',
          title: 'AI Readiness Assessment',
          speaker: 'Bryan Antepara',
          description: 'Essential concepts and processes to implement AI successfully in your organization.',
          fullDescription: 'Bringing AI into your organization requires that you add thought and process to what you are trying to accomplish. Like any new system implementation, it needs goals and engagement by the stakeholders to explore the benefits of the new system. This session shows you how you can make your organization AI ready. It is not as simple as bringing in ChatGPT. There are nuances in securing your environment to global crawling, making sure your systems are ready to scale and many more. Like any new system implementation, it is important to establish goals and stakeholder engagement to achieve the benefits that AI can bring.'
        },
        {
          id: 'microsoft-strategy',
          track: 'expenses',
          title: 'Creating an IT Strategy with Microsoft that Works for your Business',
          speaker: 'Deep Ranipa',
          description: 'How Microsoft Dynamics 365 can streamline operations while keeping Excel integration seamless.',
          fullDescription: 'Tired of juggling spreadsheets and manual processes that slow your business down? Discover how Microsoft Dynamics 365 can streamline finance, supply chain, and project operations while keeping Excel integration seamless. Walk away with practical tips to improve accuracy, simplify reporting, and boost efficiency—so you can make smarter decisions and drive growth from day one.'
        },
        {
          id: 'ebitda-growth',
          track: 'productivity',
          title: 'Unlocking Exceptional Profitability: How Firms Are Achieving Higher EBITDA Growth',
          speaker: 'Shiva Kumar',
          description: 'Dynamics 365 solutions for Finance, Accounting, and Supply Chain Management challenges.',
          fullDescription: 'Spreadsheets can be incredibly powerful tools, but they do come with their own set of challenges and limitations. Dynamics 365 apps with tight integration with Excel offer efficient and user-friendly solutions to handle your Finance and Accounting, Supply Chain Management and project-based services automation processes more efficiently. If you are worried about the data integrity, security, compliance, and reporting, then this session is for you to attend and learn more about Dynamics 365 apps.'
        },
        {
          id: 'ecare-network',
          track: 'cybersecurity',
          title: 'eCare Network Management',
          speaker: 'Carl Mazzanti',
          description: 'Proactive monitoring, rapid response, and expert support to reduce downtime and tighten security.',
          fullDescription: 'Automating the care and feeding of your internal network can save time, money and staffing. eCare Network Management takes the stress out of IT with proactive monitoring, rapid response, and expert support. Reduce downtime, tighten security, and keep your operations running smoothly—so you can spend less time troubleshooting and more time growing your business.'
        }
      ]
    },
    {
      time: '11:30 AM - 11:55 AM',
      type: 'session',
      sessions: [
        {
          id: 'customer-success',
          track: 'revenue',
          title: 'How Customer Success Can Supercharge Your Revenue',
          speaker: 'Brinda Vani',
          description: 'How building stronger customer relationships directly fuels growth and retention.',
          fullDescription: 'Explore how building stronger customer relationships directly fuels growth and retention. Drawing on real-world lessons from the field, the speaker highlights how proactive support and technical guidance translate into measurable revenue impact. Attendees will walk away with practical strategies to align customer success with business goals and unlock new streams of value.'
        },
        {
          id: 'teams-telephone',
          track: 'expenses',
          title: 'Reduce your Telephone Operating Costs with Microsoft Teams',
          speaker: 'Bryan Antepara',
          description: 'Cut phone system expenses by moving to Microsoft Teams with smooth migration strategies.',
          fullDescription: 'Discover how small and midsize businesses can reduce phone system expenses by moving to Microsoft Teams. This session will walk you through the key steps for a smooth migration, from setup to user adoption. You\'ll see how Teams can simplify communication, improve flexibility, and generate real savings for your business. Join us to learn how to turn your phone system into a cost-cutting advantage.'
        },
        {
          id: 'digital-labor',
          track: 'productivity',
          title: 'Digital Labor and Process Automation',
          speaker: 'Deepanshu Negi',
          description: 'How automation technologies reshape workflows and boost efficiency across industries.',
          fullDescription: 'This presentation examines how automation technologies are reshaping workflows, reducing manual effort, and boosting efficiency across industries. The session highlights practical examples of where digital labor can free up employees for higher-value work while driving consistency and cost savings. Attendees will gain insights into implementing automation strategies that scale with business needs.'
        },
        {
          id: 'company-safety',
          track: 'cybersecurity',
          title: 'How to Keep Your Company Safe',
          speaker: 'John Logan & Scott Bennet',
          description: 'Comprehensive disaster recovery planning including all departments and customer communications.',
          fullDescription: 'Whether it is climate change, terrorism, or a breach, it is important to have a disaster recovery plan that includes all departments, customer communications, and recovery methods. This session will provide an overview and touchpoints of the key elements required to get your business back on track, maintain customer and supplier confidence, and run quickly.'
        }
      ]
    },
    {
      time: '12:00 PM - 12:45 PM',
      type: 'special',
      title: 'Lunch Panel Discussion',
      description: 'Networking lunch with industry panel discussion'
    },
    {
      time: '1:00 PM - 1:50 PM',
      type: 'session',
      sessions: [
        {
          id: 'public-sector',
          track: 'revenue',
          title: 'Doing Business with the Public Sector',
          speaker: 'Paul Muir',
          description: 'Navigate government procurement processes and build relationships with municipalities.',
          fullDescription: 'As a seasoned public servant, Paul Muir, Mayor will show you how your business can tap into public sector opportunities. This session focuses on shared insights with navigating government procurement processes, understanding bid requirements, and building relationships with municipalities. Whether you offer tech services, products, or consulting, this session will help you position your business for success in the public sector.'
        },
        {
          id: 'supplier-audit',
          track: 'expenses',
          title: 'How to create an effective supplier audit to Keep Your Costs Under control',
          speaker: 'Maria Scarmardo',
          description: 'Structured audits to uncover inefficiencies, mitigate risks, and strengthen supplier relationships.',
          fullDescription: 'This talk outlines the key steps to evaluating suppliers with both cost management and regulatory standards in mind. The presentation covers how structured audits can uncover inefficiencies, mitigate risks, and strengthen supplier relationships. Attendees will learn practical techniques to ensure compliance while protecting their bottom line. There is no business too small that should be looking at their suppliers for cost savings and enhanced efficiencies.'
        },
        {
          id: 'productivity-paradox',
          track: 'productivity',
          title: 'The Productivity Paradox: When Technology Helps—and When It Doesn\'t',
          speaker: 'Dr. Oya Tukel',
          description: 'Why new tools don\'t always translate into efficiency and when tech truly drives performance.',
          fullDescription: 'This presentation explores why new tools don\'t always translate into greater efficiency. The talk dives into the hidden pitfalls of over-automation and digital overload while spotlighting the conditions where technology truly drives performance. Attendees will leave with a clearer framework for deciding when tech investments enhance productivity—and when they may hold it back.'
        },
        {
          id: 'cyber-outlook',
          track: 'cybersecurity',
          title: 'What is the Cybersecurity Outlook for 2025/26',
          speaker: 'Scott Williamson',
          description: 'Emerging threats, regulatory shifts, and defense strategies shaping the next two years.',
          fullDescription: 'This presentation offers an inside look at the emerging threats, regulatory shifts, and defense strategies shaping the next two years. Delivered by the Head of Managed Services at WatchGuard, the session blends frontline insights with strategic guidance on how businesses can stay ahead of evolving risks. Attendees will gain a clear picture of the cybersecurity landscape and actionable steps to strengthen resilience.'
        }
      ]
    },
    {
      time: '2:00 PM - 2:50 PM',
      type: 'session',
      sessions: [
        {
          id: 'e365-advantage',
          track: 'revenue',
          title: 'The e365 Advantage: Streamlined Services for Small Business Growth',
          speaker: 'Bryan Antepara',
          description: 'How e365 simplifies technology management and creates room for businesses to thrive.',
          fullDescription: 'This discussion highlights how e365 simplifies technology management and creates room for businesses to thrive. Learn how small businesses can boost collaboration, strengthen security, and cut costs through an integrated platform. Attendees will discover how e365 helps teams stay focused on growth instead of IT challenges.'
        },
        {
          id: 'smart-savings',
          track: 'expenses',
          title: 'Smart Savings: A Practical Framework for Cutting Costs Without Cutting Corners',
          speaker: 'Emory Edwards',
          description: 'Practical strategies for reducing expenses while maintaining quality and performance.',
          fullDescription: 'In this briefing, reveals practical strategies for reducing expenses while maintaining quality and performance. The session introduces a structured approach to identifying efficiencies, streamlining operations, and avoiding the pitfalls of short-sighted cost-cutting. Attendees will leave with actionable tools to protect margins without sacrificing long-term growth.'
        },
        {
          id: 'capital-productivity',
          track: 'productivity',
          title: 'How Capital Can Improve Productivity',
          speaker: 'Ryan Silvestre',
          description: 'Strategic investment in resources, technology, and people to drive measurable efficiency gains.',
          fullDescription: 'This presentation explores how strategic investment in resources, technology, and people can drive measurable efficiency gains. The session provides practical guidance on allocating capital to optimize workflows, empower teams, and maximize return on investment. Attendees will learn actionable methods to turn financial resources into tangible productivity improvements.'
        },
        {
          id: 'cyber-recommendations',
          track: 'cybersecurity',
          title: 'Top 10 Cyber Security recommendations for Businesses Large and Small',
          speaker: 'Carl Mazzanti',
          description: 'Essential guidance for protecting organizations against today\'s evolving digital threats.',
          fullDescription: 'This talk delivers essential guidance for protecting organizations against today\'s evolving digital threats. The talk outlines practical, high-impact strategies that can be applied by companies of any size to strengthen security and reduce risk. Attendees will learn actionable steps to safeguard their operations and build a more resilient cyber posture.'
        }
      ]
    },
    {
      time: '3:00 PM - 3:50 PM',
      type: 'session',
      sessions: [
        {
          id: 'ai-without-pains',
          track: 'revenue',
          title: 'How to Embrace AI without Growing Pains',
          speaker: 'Deep Ranipa',
          description: 'Leverage AI to accelerate business growth while avoiding operational disruptions.',
          fullDescription: 'Be part of the wave. AI is coming and it moving quickly to help businesses accelerate business growth while avoiding operational disruptions. The session highlights practical strategies for adopting AI tools that enhance sales, optimize processes, and unlock new revenue opportunities. Attendees will gain actionable insights to use AI as a growth engine without the typical implementation challenges.'
        },
        {
          id: 'scalability-playbook',
          track: 'expenses',
          title: 'The Scalability Playbook: Maximize Growth, Minimize Overhead',
          speaker: 'Carl Mazzanti',
          description: 'Proven strategies for expanding operations efficiently while keeping costs under control.',
          fullDescription: 'In this exploration, you\'ll learn proven strategies for expanding business operations efficiently while keeping costs under control. The talk highlights practical approaches to streamlining processes, leveraging technology, and optimizing resources for sustainable growth. Attendees will leave with a clear framework for scaling their business without unnecessary complexity or expense.'
        },
        {
          id: 'it-bottlenecks',
          track: 'productivity',
          title: 'Eliminating IT Bottlenecks: How 24/7 Monitoring Supercharges Productivity',
          speaker: 'Nirvan Ramoutar',
          description: 'Round-the-clock network monitoring to eliminate IT slowdowns and reduce downtime.',
          fullDescription: 'Learn how round-the-clock network monitoring can eliminate common IT slowdowns, reduce downtime, and free your team to focus on what matters most. This session will explore practical tools and strategies that small businesses can implement to boost efficiency, enhance security, and keep operations running smoothly, day and night.'
        },
        {
          id: 'video-ai',
          track: 'cybersecurity',
          title: 'From Surveillance to Strategy: Unlocking Hidden Profits with Intelligent Video AI',
          speaker: 'George Karaolis',
          description: 'How modern surveillance technologies transform loss prevention and incident recovery.',
          fullDescription: 'Explore how modern surveillance technologies are transforming loss prevention and incident recovery for small businesses. This session will cover smart camera systems, AI-powered monitoring, and integrated alerts that help protect your assets, reduce shrinkage, and respond faster when incidents occur. Learn practical strategies and affordable tools that keep your eyes on your business 24/7.'
        }
      ]
    },
    {
      time: '4:00 PM - 4:30 PM',
      type: 'special',
      title: 'Closing Remarks & Next Steps',
      description: 'Conference wrap-up and action planning'
    },
    {
      time: '5:30 PM - 7:30 PM',
      type: 'special',
      title: 'Networking Reception',
      description: 'Cocktails, appetizers, and continued networking'
    }
  ];

  // Local storage session management functions
  const updateLocalStorageSessions = (sessions: RegisteredSession[]) => {
    if (user) {
      const updatedUser = { ...user, registeredSessions: sessions };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setRegisteredSessions(sessions);
    }
  };

  const getTrackInfo = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    return track || { color: '#6B7280', bgColor: '#6B728015' };
  };

  const isSessionRegistered = (sessionId: string): boolean => {
    return registeredSessions.some(session => session.sessionId === sessionId);
  };

  const handleSessionRegister = async (session: Session, timeSlot: string): Promise<void> => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isRegistered = isSessionRegistered(session.id);
      
      if (isRegistered) {
        // Unregister session
        if (extendedAuthService.unregisterSession) {
          try {
            const result = await extendedAuthService.unregisterSession(session.id);
            if (result.success) {
              updateLocalStorageSessions(result.registeredSessions || []);
              console.log('Session unregistered successfully:', session.id);
            } else {
              setError(result.error || 'Failed to unregister session');
            }
          } catch (err) {
            console.error('Error unregistering session:', err);
            // Fallback to local storage management
            const updatedSessions = registeredSessions.filter(s => s.sessionId !== session.id);
            updateLocalStorageSessions(updatedSessions);
          }
        } else {
          // Fallback to local storage management
          const updatedSessions = registeredSessions.filter(s => s.sessionId !== session.id);
          updateLocalStorageSessions(updatedSessions);
        }
      } else {
        // Register session
        const trackName = tracks.find(t => t.id === session.track)?.name || 'General';
        const sessionData = {
          sessionId: session.id,
          sessionTitle: session.title,
          track: trackName,
          time: timeSlot
        };
        
        if (extendedAuthService.registerSession) {
          try {
            const result = await extendedAuthService.registerSession(sessionData);
            if (result.success) {
              updateLocalStorageSessions(result.registeredSessions || []);
              console.log('Session registered successfully:', session.id);
            } else {
              setError(result.error || 'Registration failed');
            }
          } catch (err) {
            console.error('Error registering session:', err);
            // Fallback to local storage management
            const updatedSessions = [...registeredSessions, sessionData];
            updateLocalStorageSessions(updatedSessions);
          }
        } else {
          // Fallback to local storage management
          const updatedSessions = [...registeredSessions, sessionData];
          updateLocalStorageSessions(updatedSessions);
        }
      }
    } catch (err: any) {
      setError('Session operation failed');
      console.error('Session registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTimeSlots = timeSlots.map(slot => {
    if (slot.type === 'session' && selectedTrack !== 'all' && slot.sessions) {
      return {
        ...slot,
        sessions: slot.sessions.filter(session => session.track === selectedTrack)
      };
    }
    return slot;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Conference Agenda
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              24 expert sessions across 4 strategic tracks. Build your personalized agenda 
              by selecting sessions that align with your business goals.
            </p>
            
            {/* Session Registration Status */}
            {user && (
              <div className="inline-flex items-center space-x-4 px-6 py-3 bg-blue-50 rounded-lg border border-blue-200 mb-8">
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
            
            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">October 15, 2025</div>
                <div className="text-gray-600 text-sm">9:00 AM - 5:00 PM EST</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Microsoft Technology Center</div>
                <div className="text-gray-600 text-sm">Times Square, NYC</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">200+ Attendees</div>
                <div className="text-gray-600 text-sm">SMB Leaders & Executives</div>
              </div>
            </div>
          </div>

          {/* Track Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                  selectedTrack === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                All Tracks
              </button>
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                    selectedTrack === track.id
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: selectedTrack === track.id ? track.color : 'transparent'
                  }}
                >
                  {track.icon}
                  <span className="font-bold">{track.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              onClick={() => setError('')}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Schedule */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {filteredTimeSlots.map((slot, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Time Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-900">{slot.time}</span>
                    {slot.type === 'keynote' && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xs font-medium">
                        KEYNOTE
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                {slot.type === 'special' || slot.type === 'keynote' || slot.type === 'break' ? (
                 <div className="p-6 flex justify-center">
                    <div className="flex flex-col items-center text-center space-y-3 max-w-2xl">
                      {slot.type === 'break' ? (
                        <Coffee className="w-6 h-6 text-green-500 mt-1" />
                      ) : slot.type === 'keynote' ? (
                        <Users className="w-6 h-6 text-purple-500 mt-1" />
                      ) : (
                        <Calendar className="w-6 h-6 text-blue-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{slot.title}</h3>
                        {slot.speaker && (
                          <p className="text-blue-600 font-medium mb-2">{slot.speaker}</p>
                        )}
                        <p className="text-gray-600">{slot.description}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-6 ${
                    selectedTrack === 'all' 
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' 
                      : 'grid grid-cols-1 gap-4'
                  }`}>
                    {slot.sessions?.map((session, sessionIndex) => {
                      const isRegistered = isSessionRegistered(session.id);
                      const trackInfo = getTrackInfo(session.track);
                      
                      return (
                        <div 
                          key={sessionIndex} 
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                        >
                          <div 
                            className="text-xs font-bold mb-3 px-3 py-1 rounded-full inline-block border"
                            style={{
                              backgroundColor: trackInfo.bgColor,
                              color: trackInfo.color,
                              borderColor: trackInfo.color + '40'
                            }}
                          >
                            {tracks.find(t => t.id === session.track)?.name}
                          </div>
                          
                          <h4 
                            className="font-bold text-gray-900 mb-2 text-sm leading-tight hover:text-blue-600 transition-colors"
                            onClick={() => setSelectedSession(session)}
                          >
                            {session.title}
                          </h4>
                          
                          <p className="text-blue-600 text-xs mb-2 font-bold">{session.speaker}</p>
                          <p className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-3">{session.description}</p>
                          
                          <button
                            onClick={() => handleSessionRegister(session, slot.time)}
                            disabled={loading}
                            className={`text-xs px-3 py-2 rounded-lg transition-all duration-200 w-full font-medium disabled:opacity-50 hover:scale-105 ${
                              isRegistered
                                ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                                : user
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {loading ? (
                              'Processing...'
                            ) : isRegistered ? (
                              'Registered ✓'
                            ) : user ? (
                              'Add to Schedule'
                            ) : (
                              'Login to Register'
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1 pr-6">
                <h3 className="text-3xl font-light text-gray-900 mb-2 leading-tight">{selectedSession.title}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium text-blue-600">{selectedSession.speaker}</span>
                  </div>
                </div>
                <div 
                  className="text-xs font-medium px-3 py-1 rounded-full inline-block border mb-4"
                  style={{
                    backgroundColor: getTrackInfo(selectedSession.track).bgColor,
                    color: getTrackInfo(selectedSession.track).color,
                    borderColor: getTrackInfo(selectedSession.track).color + '40'
                  }}
                >
                  {tracks.find(t => t.id === selectedSession.track)?.name}
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
                onClick={() => {
                  handleSessionRegister(selectedSession, '');
                  setSelectedSession(null);
                }}
              >
                {isSessionRegistered(selectedSession.id) ? 'Remove from Schedule' : 'Add to Schedule'}
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

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Ready to Build Your Schedule?</h2>
          <p className="text-xl text-gray-600 mb-8">
            {user ? (
              `You have ${registeredSessions.length} sessions in your schedule. Add more or view your complete agenda.`
            ) : (
              'Register for ASPIRE 2025 to start building your personalized conference agenda.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  View My Schedule
                </button>
                <button
                  onClick={() => navigate('/tracks')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Explore Tracks
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  Register for Conference
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

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

export default AgendaPage;