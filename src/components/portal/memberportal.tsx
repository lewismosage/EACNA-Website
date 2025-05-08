import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, BookOpen, Calendar, Bell, Search,
  ThumbsUp, MessageCircle, Share2, MoreHorizontal, 
  FileText, UserPlus, Award, Settings, LogOut
} from 'lucide-react';

// Mock data for demonstration purposes
const MOCK_USER = {
  firstName: "Lewis",
  lastName: "Mosage",
  email: "lewis.mosage@example.com",
  profileImage: null,
  role: "Associate Member",
  joinDate: "May 2024",
  unreadNotifications: 3,
  country: "Kenya"
};

const MOCK_POSTS = [
  {
    id: 1,
    author: {
      name: "Dr. Samantha Njeri",
      role: "President, EACNA",
      avatar: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    content: "Excited to announce our upcoming PET1 training in Nairobi this July! This one-day course is perfect for doctors and nurses who contribute to the initial care of children with paroxysmal disorders. Limited spots available, register now via the Training section.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    isPinned: true,
    attachments: []
  },
  {
    id: 2,
    author: {
      name: "Dr. Benjamin Omondi",
      role: "Vice President, EACNA",
      avatar: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    content: "Looking for collaborators on a research project studying epilepsy management in rural East African settings. We're particularly interested in innovative approaches to medication adherence. If interested, please comment below or message me directly.",
    timestamp: "1 day ago",
    likes: 18,
    comments: 7,
    attachments: [
      { type: "pdf", name: "Research_Proposal.pdf", size: "1.2MB" }
    ]
  },
  {
    id: 3,
    author: {
      name: "Dr. Faith Mueni",
      role: "Secretary General, EACNA",
      avatar: "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    content: "New clinical guidelines for childhood epilepsy management have just been published. These guidelines specifically address the unique challenges we face in East Africa. Check out the attached summary and full document in the Resources section of our portal.",
    timestamp: "3 days ago",
    likes: 42,
    comments: 11,
    attachments: [
      { type: "pdf", name: "Epilepsy_Guidelines_Summary.pdf", size: "850KB" }
    ]
  },
  {
    id: 4,
    author: {
      name: "Dr. Lawrence Mwangi",
      role: "Treasurer, EACNA",
      avatar: "https://images.pexels.com/photos/5329163/pexels-photo-5329163.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    content: "Reminder: Annual membership renewals are due by the end of this month. Please log in to your account and navigate to the Membership section to complete your renewal. Early renewals get 10% discount on our upcoming annual conference registration!",
    timestamp: "1 week ago",
    likes: 15,
    comments: 3,
    attachments: []
  }
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: "PET1 Training Course",
    date: "July 15-16, 2025",
    location: "Nairobi, Kenya",
    registrationOpen: true
  },
  {
    id: 2,
    title: "Annual EACNA Conference",
    date: "September 5-7, 2025",
    location: "Kampala, Uganda",
    registrationOpen: true
  },
  {
    id: 3,
    title: "Pediatric Epilepsy Webinar",
    date: "June 12, 2025",
    location: "Online",
    registrationOpen: true
  }
];

// Custom components
const Avatar = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg"
  };
  
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  
  return (
    <div className={`rounded-full bg-primary-600 text-white font-semibold flex items-center justify-center ${sizeClasses[size]}`}>
      {user.profileImage ? (
        <img 
          src={user.profileImage} 
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

const NavItem = ({ icon: Icon, label, to, active, onClick, badge }) => {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? "bg-primary-100 text-primary-800 font-medium" 
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge && (
          <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span>{label}</span>
    </Link>
  );
};

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      {/* Post header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {post.author.avatar ? (
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-semibold">
              {post.author.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span>{post.author.role}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
              <span>{post.timestamp}</span>
            </p>
          </div>
        </div>
        
        {post.isPinned && (
          <div className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-md font-medium">
            Pinned
          </div>
        )}
      </div>
      
      {/* Post content */}
      <div className="mb-3">
        <p className="text-gray-700">{post.content}</p>
      </div>
      
      {/* Attachments if any */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4">
          {post.attachments.map((file, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-3 flex items-center gap-3"
            >
              <FileText className="w-5 h-5 text-primary-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
              <button className="text-primary-600 text-sm font-medium">
                View
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Post stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 py-2 border-t border-b border-gray-100">
        <span>{likesCount} likes</span>
        <span>{post.comments} comments</span>
      </div>
      
      {/* Post actions */}
      <div className="flex items-center justify-between pt-2">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            liked 
              ? "text-primary-600 font-medium" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={handleLike}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50">
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

const UpcomingEvent = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
      <h4 className="font-semibold text-primary-800">{event.title}</h4>
      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
        <Calendar className="w-4 h-4" />
        <span>{event.date}</span>
      </div>
      <div className="text-gray-600 text-sm mt-1">
        {event.location}
      </div>
      {event.registrationOpen && (
        <Link 
          to="/events" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-2 inline-block"
        >
          Register Now
        </Link>
      )}
    </div>
  );
};

const CreatePostCard = ({ user }) => {
  const [postText, setPostText] = useState('');
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Avatar user={user} />
        <div className="flex-1">
          <input
            type="text"
            placeholder="Start a discussion or share something with the community..."
            className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center border-t border-gray-100 pt-3">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Attach File</span>
          </button>
        </div>
        
        <button 
          className={`px-4 py-2 rounded-md text-white font-medium ${
            postText.trim() 
              ? "bg-primary-600 hover:bg-primary-700" 
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!postText.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

const MemberPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("home");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Set the current tab based on location
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'home';
    setCurrentTab(path);
  }, [location]);
  
  // Navigation items
  const navItems = [
    { icon: Users, label: "Home Feed", path: "home", badge: null },
    { icon: MessageSquare, label: "Forums", path: "forums", badge: null },
    { icon: BookOpen, label: "Resources", path: "resources", badge: null },
    { icon: Calendar, label: "Events", path: "events", badge: null },
    { icon: Bell, label: "Notifications", path: "notifications", badge: MOCK_USER.unreadNotifications }
  ];
  
  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle navigation
  const handleNavigation = (path) => {
    navigate(`/portal/${path}`);
    setIsMobileMenuOpen(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Implement actual logout logic here
    navigate('/login');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/portal/home" className="text-primary-800 font-bold text-xl">
                EACNA Portal
              </Link>
            </div>
            
            {/* Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search the community..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                />
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* User profile */}
            <div className="hidden md:flex items-center gap-3 relative">
              <div className="flex flex-col items-end mr-2">
                <span className="font-medium text-gray-800">{`${MOCK_USER.firstName} ${MOCK_USER.lastName}`}</span>
                <span className="text-xs text-gray-500">{MOCK_USER.email}</span>
              </div>
              
              <button 
                className="relative"
                onClick={toggleProfileDropdown}
              >
                <Avatar user={MOCK_USER} />
              </button>
              
              {/* Profile dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
                  <div className="p-3 border-b border-gray-100">
                    <div className="font-medium text-gray-800">{`${MOCK_USER.firstName} ${MOCK_USER.lastName}`}</div>
                    <div className="text-sm text-gray-500">{MOCK_USER.email}</div>
                    <div className="text-xs text-primary-600 mt-1">{MOCK_USER.role}</div>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      to="/portal/profile" 
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Profile Settings</span>
                    </Link>
                    
                    <Link 
                      to="/portal/membership" 
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Award className="w-5 h-5" />
                      <span>Membership Status</span>
                    </Link>
                    
                    <Link 
                      to="/portal/connections" 
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>My Connections</span>
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-100 py-1">
                    <button 
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left ${
                  currentTab === item.path 
                    ? "bg-primary-100 text-primary-800 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="relative">
                  <item.icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="flex items-center gap-3 px-4 py-2">
                <Avatar user={MOCK_USER} />
                <div>
                  <div className="font-medium text-gray-800">{`${MOCK_USER.firstName} ${MOCK_USER.lastName}`}</div>
                  <div className="text-xs text-gray-500">{MOCK_USER.email}</div>
                </div>
              </div>
              
              <button 
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 w-full text-left"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 space-y-1">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar user={MOCK_USER} size="lg" />
                <div>
                  <h3 className="font-semibold text-gray-800">{`${MOCK_USER.firstName} ${MOCK_USER.lastName}`}</h3>
                  <p className="text-sm text-primary-600">{MOCK_USER.role}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>Member since {MOCK_USER.joinDate}</p>
                <p>{MOCK_USER.country}</p>
              </div>
              <Link 
                to="/portal/profile" 
                className="mt-3 text-primary-600 text-sm font-medium hover:text-primary-700 block"
              >
                View Profile
              </Link>
            </div>
            
            <nav className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
              {navItems.map((item) => (
                <NavItem 
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  to={`/portal/${item.path}`}
                  active={currentTab === item.path}
                  badge={item.badge}
                />
              ))}
            </nav>
          </aside>
          
          {/* Main content area */}
          <div className="flex-1">
            {/* Tabs for mobile */}
            <div className="md:hidden flex overflow-x-auto gap-2 pb-3 scrollbar-hide">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                    currentTab === item.path 
                      ? "bg-primary-100 text-primary-800 font-medium" 
                      : "bg-white text-gray-600 border border-gray-100"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <div className="relative">
                    <item.icon className="w-5 h-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Dynamic Content based on current tab */}
            {currentTab === "home" && (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <CreatePostCard user={MOCK_USER} />
                  
                  {MOCK_POSTS.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
                
                <div className="lg:w-72">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Upcoming Events</h3>
                    {MOCK_EVENTS.map((event) => (
                      <UpcomingEvent key={event.id} event={event} />
                    ))}
                    <Link 
                      to="/portal/events" 
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 block text-center mt-2"
                    >
                      View All Events
                    </Link>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link 
                          to="/resources/guidelines" 
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Clinical Guidelines</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/training/pet-courses" 
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>PET Courses Schedule</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/membership/renew" 
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-2"
                        >
                          <Award className="w-4 h-4" />
                          <span>Renew Membership</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/resources/journal-access" 
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Journal Access</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {currentTab === "forums" && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Discussion Forums</h2>
                <p className="text-gray-600 mb-4">Connect with fellow EACNA members in our specialized discussion forums.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-primary-700 mb-1">Clinical Cases & Discussions</h3>
                    <p className="text-sm text-gray-600 mb-2">Share interesting cases and seek input from colleagues.</p>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>24 topics</span>
                      <span>Last post: 2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-primary-700 mb-1">Research Collaboration</h3>
                    <p className="text-sm text-gray-600 mb-2">Find research partners and discuss methodology.</p>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>16 topics</span>
                      <span>Last post: Yesterday</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-primary-700 mb-1">Treatment Guidelines</h3>
                    <p className="text-sm text-gray-600 mb-2">Discuss and share best practices for treatment protocols.</p>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>32 topics</span>
                      <span>Last post: 3 days ago</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-primary-700 mb-1">Conference Discussions</h3>
                    <p className="text-sm text-gray-600 mb-2">Share insights from recent conferences and events.</p>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>8 topics</span>
                      <span>Last post: 1 week ago</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-primary-700 mb-1">New Members Forum</h3>
                    <p className="text-sm text-gray-600 mb-2">Introduce yourself and get to know other members.</p>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>12 topics</span>
                      <span>Last post: 5 days ago</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-primary-700 mb-1">Ask the Experts</h3>
                    <p className="text-sm text-gray-600 mb-2">Get answers to your questions from senior specialists.</p>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>19 topics</span>
                      <span>Last post: Yesterday</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    Start New Discussion
                  </button>
                </div>
              </div>
            )}
            
            {currentTab === "resources" && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary-800">Resources Library</h2>
                  <div className="relative">
                    <select className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300">
                      <option>Filter by Category</option>
                      <option>Clinical Guidelines</option>
                      <option>Research Papers</option>
                      <option>Training Materials</option>
                      <option>Conference Presentations</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-primary-50 rounded-md p-3 mb-3 inline-flex">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Pediatric Epilepsy Guidelines 2025</h3>
                    <p className="text-sm text-gray-600 mb-3">Updated clinical guidelines for managing childhood epilepsy in East Africa</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>PDF • 1.4MB</span>
                      <button className="text-primary-600 hover:text-primary-700">Download</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-primary-50 rounded-md p-3 mb-3 inline-flex">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">PET1 Training Manual</h3>
                    <p className="text-sm text-gray-600 mb-3">Complete training manual for Pediatric Epilepsy Training Level 1</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>PDF • 2.8MB</span>
                      <button className="text-primary-600 hover:text-primary-700">Download</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-primary-50 rounded-md p-3 mb-3 inline-flex">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Neurodevelopmental Disorders Handbook</h3>
                    <p className="text-sm text-gray-600 mb-3">Comprehensive guide to assessment and management</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>PDF • 3.1MB</span>
                      <button className="text-primary-600 hover:text-primary-700">Download</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-primary-50 rounded-md p-3 mb-3 inline-flex">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Annual Conference 2024 Proceedings</h3>
                    <p className="text-sm text-gray-600 mb-3">Complete proceedings from our last annual conference</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>PDF • 4.2MB</span>
                      <button className="text-primary-600 hover:text-primary-700">Download</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-primary-50 rounded-md p-3 mb-3 inline-flex">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Medication Access Guide</h3>
                    <p className="text-sm text-gray-600 mb-3">Information on accessing epilepsy medications in East Africa</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>PDF • 0.8MB</span>
                      <button className="text-primary-600 hover:text-primary-700">Download</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-primary-50 rounded-md p-3 mb-3 inline-flex">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Parent Education Materials</h3>
                    <p className="text-sm text-gray-600 mb-3">Resources to help educate families about epilepsy</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>ZIP • 5.3MB</span>
                      <button className="text-primary-600 hover:text-primary-700">Download</button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50">
                    Load More Resources
                  </button>
                </div>
              </div>
            )}
            
            {currentTab === "events" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary-800">Upcoming Events</h2>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                      Create Event
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
                      All Events
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      Conferences
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      Webinars
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      Training
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="bg-primary-50 rounded-lg p-4 text-center w-32 flex-shrink-0">
                          <div className="text-primary-600 font-bold text-xl">15-16</div>
                          <div className="text-gray-600 text-sm">July 2025</div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">{event.title}</h3>
                          <div className="flex items-center gap-3 text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">
                            This one-day course is perfect for doctors and nurses who contribute to the initial care of children with paroxysmal disorders. The course covers diagnosis, initial management, and when to refer.
                          </p>
                          
                          <div className="flex items-center gap-3">
                            {event.registrationOpen ? (
                              <>
                                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                  Register Now
                                </button>
                                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50">
                                  Add to Calendar
                                </button>
                              </>
                            ) : (
                              <span className="text-gray-500">Registration closed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border-t border-gray-100">
                  <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 w-full">
                    View All Past Events
                  </button>
                </div>
              </div>
            )}
            
            {currentTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-primary-800">Notifications</h2>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Mark all as read
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  <div className="p-4 bg-blue-50">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <Bell className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">New message from Dr. Njeri</h4>
                        <p className="text-sm text-gray-600">"Thanks for your question about the PET1 training. We've extended the deadline..."</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <button className="text-xs text-primary-600 hover:text-primary-700">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <Users className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">New forum reply</h4>
                        <p className="text-sm text-gray-600">Dr. Mwangi has replied to your post in "Clinical Cases & Discussions"</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">5 hours ago</span>
                          <button className="text-xs text-primary-600 hover:text-primary-700">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Calendar className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">Event reminder</h4>
                        <p className="text-sm text-gray-600">PET1 Training Course starts in 2 weeks</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">1 day ago</span>
                          <button className="text-xs text-primary-600 hover:text-primary-700">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <BookOpen className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">New resource added</h4>
                        <p className="text-sm text-gray-600">"2025 Pediatric Epilepsy Guidelines" is now available</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          <button className="text-xs text-primary-600 hover:text-primary-700">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Award className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">Membership update</h4>
                        <p className="text-sm text-gray-600">Your membership status has been updated to "Active"</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">3 days ago</span>
                          <button className="text-xs text-primary-600 hover:text-primary-700">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium w-full text-center">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPortal;