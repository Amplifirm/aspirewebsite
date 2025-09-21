import { useState, useEffect } from 'react';
import { 
  MapPin, Building, Car, Train, 
  Calendar, Clock, ArrowRight, CheckCircle,  
  User
} from 'lucide-react';
const VenuePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const transportationOptions = [
    {
      icon: <Train className="w-5 h-5" />,
      title: "Subway",
      description: "Times Square-42nd Street station (Multiple lines: 1,2,3,7,N,Q,R,W,S)",
      walkTime: "2 min walk"
    },
    {
      icon: <Car className="w-5 h-5" />,
      title: "Driving",
      description: "Multiple parking garages available in Times Square area",
      walkTime: "5 min walk"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight font-roboto">
                  Microsoft Technology Center
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-roboto">
                  Join us in the heart of <strong>Times Square, NYC</strong> at Microsoft's flagship 
                  technology center. A world-class venue designed for innovation, collaboration, 
                  and transformative business experiences.
                </p>
              </div>

              {/* Address & Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 font-roboto">Venue Address</h3>
                    <p className="text-gray-700 mb-2 font-roboto">
                      Microsoft Technology Center<br/>
                      11 Times Square, 6th Floor<br/>
                      New York, NY 10036
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Train className="w-4 h-4" />
                        <span className="font-roboto">2 min to subway</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Car className="w-4 h-4" />
                        <span className="font-roboto">5 min to parking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>View My Schedule</span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigation('/register')}
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Reserve Your Seat</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                )}
                
                <button 
                  onClick={() => window.open('https://maps.google.com/maps?q=Microsoft+Technology+Center+11+Times+Square+New+York', '_blank')}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-roboto"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Get Directions</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right - Map */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.3630150251715!2d-73.99232072400233!3d40.75670203487791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25856e81cdc7d%3A0xcb6b70d1bb597301!2sMicrosoft!5e1!3m2!1sen!2suk!4v1758043449062!5m2!1sen!2suk" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen 
                    title="Microsoft Technology Center Location"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-roboto">11 Times Square, 6th Floor</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-roboto">October 15, 2025 • 9:00 AM - 5:00 PM</span>
                  </div>
                  
                  <button 
                    onClick={() => window.open('https://maps.google.com/maps?q=Microsoft+Technology+Center+11+Times+Square+New+York', '_blank')}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-roboto"
                  >
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-6 font-roboto">
              Transportation Options
            </h2>
            <p className="text-xl text-gray-600 font-roboto">
              Multiple convenient ways to reach Microsoft Technology Center in Times Square
            </p>
          </div>

          {/* Transportation Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {transportationOptions.map((option, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
                <div className="text-center space-y-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600 inline-block">
                    {option.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 font-roboto">{option.title}</h4>
                    <span className="text-sm text-blue-600 font-medium font-roboto block mb-2">{option.walkTime}</span>
                    <p className="text-gray-600 text-sm leading-relaxed font-roboto">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-100 to-white rounded-3xl p-16 shadow-xl border border-gray-100">
            <h2 className="text-5xl font-light text-gray-900 mb-8 font-roboto">
              Ready to Experience Innovation?
            </h2>
            <p className="text-xl text-gray-700 mb-12 font-roboto">
              Join us at Microsoft Technology Center for a day of learning, networking, 
              and transformation in the heart of New York City.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                '✓ Premium Venue',
                '✓ Full Catering',
                '✓ Latest Technology', 
                '✓ Times Square Location'
              ].map((feature, i) => (
                <div key={i} className="bg-green-50 rounded-2xl p-4 border border-green-200">
                  <span className="text-emerald-700 font-medium text-sm font-roboto">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="px-12 py-4 bg-blue-600 text-white text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <User className="w-6 h-6" />
                      <span>View My Schedule</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavigation('/agenda')}
                    className="px-12 py-4 border-2 border-gray-300 text-gray-700 text-xl font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-roboto"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Calendar className="w-6 h-6" />
                      <span>View Agenda</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation('/register')}
                    className="px-12 py-4 bg-blue-600 text-white text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span>Register Now - It's Free</span>
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.open('https://maps.google.com/maps?q=Microsoft+Technology+Center+11+Times+Square+New+York', '_blank')}
                    className="px-12 py-4 border-2 border-gray-300 text-gray-700 text-xl font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-roboto"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <MapPin className="w-6 h-6" />
                      <span>Get Directions</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

     

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
          .font-roboto { font-family: 'Roboto', sans-serif; }
        `}
      </style>
    </div>
  );
};

export default VenuePage;