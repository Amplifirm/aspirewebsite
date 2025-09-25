import { 
  Phone, Mail, MapPin, Linkedin, Youtube,
  Calendar, Users, ArrowRight, 
 CheckCircle, Globe, Instagram
} from 'lucide-react';

const ProfessionalFooter = () => {

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Video Section - White Background */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900 mb-8 font-roboto">
  Historical Conference <span 
    className="font-light bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
    style={{
      background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}
  >
    Highlights
  </span>
</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
               
                
              
                <p className="text-xl text-gray-700 leading-relaxed">
                  In 2024, the conference was named 23 Years of Learning. It has now been rebranded as 
                  <strong> ASPIRE 2025</strong> with the same commitment to SMB leaders.
                </p>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  Learn here, gain actionable insights now, put them to use tomorrow.
                </p>
              </div>
            </div>

            {/* Right - Video */}
            <div className="relative">
              <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                <iframe 
                  src="https://www.youtube.com/embed/4lrA4owaTKE"
                  title="ASPIRE 2025 Conference Highlights"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Dark Background */}
      <div className="bg-slate-900" style={{backgroundColor: '#0E172A'}}>
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            
            {/* Company Section */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <img 
                  src="/aspirehorizontal.png" 
                  alt="ASPIRE 2025" 
                  className="h-12 w-auto "
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const textLogo = e.currentTarget.nextElementSibling as HTMLElement;
                    if (textLogo) textLogo.style.display = 'block';
                  }}
                />
                <div className="text-3xl font-light text-white hidden">ASPIRE 2025</div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                eMazzanti's Annual Learning Conference brings together 150+ SMB leaders 
                where actionable insights on enhancing business performance through 
                technology are delivered.
              </p>

              <button 
                onClick={() => handleNavigation('/register')}
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Event Details */}
            <div className="space-y-8">
              <h4 className="text-xl font-semibold text-white">Event Details</h4>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 hover:bg-white/15 transition-all duration-300">
                    <Calendar className="w-6 h-6 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">October 15, 2025</div>
                      <div className="text-gray-300 text-sm">9:00AM - 5:00PM EST</div>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-purple-400/50 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Microsoft Technology Center</div>
                      <div className="text-gray-300 text-sm">11 Times Square, 6th Floor</div>
                      <div className="text-gray-400 text-xs mt-1">New York, NY 10036</div>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-green-400/50 hover:bg-white/15 transition-all duration-300">
                    <Users className="w-6 h-6 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">150+ Business Leaders</div>
                      <div className="text-gray-300 text-sm">SMB Executive & Entrepreneurs</div>
                      <div className="text-gray-400 text-xs mt-1">Exclusive Networking Environment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Support */}
            <div className="space-y-8">
              <h4 className="text-xl font-semibold text-white">Contact & Support</h4>
              <div className="space-y-4">
                <a href="mailto:aspire@emazzanti.net" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">aspire@emazzanti.net</div>
                    <div className="text-sm text-gray-400">For inquiries only</div>
                  </div>
                </a>
                
                <a href="tel:+18443604400" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center group-hover:bg-purple-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">+1 (844) 360-4400</div>
                    <div className="text-sm text-gray-400"></div>
                  </div>
                </a>
                
                <div className="group flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-green-500/30 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium">eMazzanti Technologies</div>
                    <div className="text-sm text-gray-400">Hoboken, NJ</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="text-white font-semibold mb-4">Follow ASPIRE</h5>
                <div className="flex space-x-3">
                  <a 
                    href="https://www.linkedin.com/company/emazzanti-technologies" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center hover:bg-blue-500/50 transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://x.com/emazzanti" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-400/30 rounded-xl flex items-center justify-center hover:bg-blue-400/50 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/user/emazzantimarketing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center hover:bg-red-500/50 transition-all duration-300 transform hover:scale-110"
                  >
                    <Youtube className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://www.facebook.com/emazzantitechnologies/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center hover:bg-blue-600/50 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/emazzanti_technologies/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-500/30 rounded-xl flex items-center justify-center hover:bg-pink-500/50 transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-xl font-semibold text-white">Conference</h4>
              <nav className="space-y-3">
                {[
                  { name: 'Conference Agenda', path: '/agenda' },
                  { name: 'Speaker Bios', path: '/speakers' },
                  { name: 'Session Tracks', path: '/tracks' },
                  { name: 'Venue', path: '/venue' },
          
                ].map((link) => (
                  <button 
                    key={link.name}
                    onClick={() => handleNavigation(link.path)}
                    className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/10 w-full text-left"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/20">
                <h5 className="text-white font-semibold mb-4">Why Attend?</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>24 expert-led sessions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Premium networking opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Actionable business strategies</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Complimentary admission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-gray-300">
                <p>© 2025 eMazzanti Technologies. All rights reserved.</p>
                <p className="text-sm mt-1">Celebrating 24 years of technology innovation and business leadership.</p>
              </div>
              <div className="flex items-center space-x-8 text-sm">
                <a 
                  href="https://www.emazzanti.net/privacy-statement/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="https://www.emazzanti.net/terms-of-use/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;