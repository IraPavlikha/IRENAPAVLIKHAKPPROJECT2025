import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import {
  MdOutlineCreate,
  MdOutlineDashboard,
  MdMailOutline,
  MdAttachMoney,
  MdMenuOpen,
  MdOutlineAccountCircle,
  MdOutlineHome,
  MdOutlinePrivacyTip,
  MdAdminPanelSettings,
  MdOutlineSettings,
  MdOutlineNotifications,
  MdOutlineFavorite,
  MdOutlineHistory,
  MdOutlineLogout,
  MdOutlineHelpOutline,
  MdOutlineCreditCard,
  MdOutlineStar,
  MdOutlineCalendarToday,
} from "react-icons/md";
import {
  IoCloseSharp,
  IoDocumentTextOutline,
  IoLogOutOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    if (isMenuOpen || isProfileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isProfileOpen]);

  return (
      <>
        <header
            className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-500 ease-out
          ${isScrolled
                ? "bg-white/95 backdrop-blur-xl py-3 shadow-sm border-b border-[#F5F0E8]/30"
                : "bg-transparent py-5"
            }
        `}
        >
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <Link
                  to="/"
                  className="flex items-center space-x-3 group relative"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#FFE5D9]/40 to-[#8B5CF6]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <RiAuctionLine className="h-7 w-7 text-[#0A0A0A] relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="relative">
                <span className="text-2xl font-black tracking-tighter text-[#0A0A0A]">
                  GoldenLot
                </span>
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#FFE5D9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center space-x-10">
                {(user ? getNavLinks(user.user.role) : navMenu).map((item, index) => (
                    <div
                        key={item.link}
                        className="relative"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <NavLink
                          to={item.link}
                          className={({ isActive }) =>
                              `relative text-[15px] font-medium tracking-wide 
                      transition-all duration-300 transform hover:translate-y-[-2px]
                      ${isActive
                                  ? "text-[#0A0A0A]"
                                  : "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
                              }`
                          }
                      >
                        {item.name}
                        {({ isActive }) => isActive && (
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#8B5CF6] rounded-full"></div>
                        )}
                      </NavLink>
                    </div>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                {!user ? (
                    <LoginSignup />
                ) : (
                    <>
                      <button className="
                    relative w-10 h-10
                    flex items-center justify-center
                    rounded-full
                    bg-transparent hover:bg-[#F5F0E8]/50
                    transition-all duration-300
                    cursor-dot
                  ">
                        <FiBell className="h-5 w-5 text-[#0A0A0A]" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse"></span>
                      </button>

                      <button
                          onClick={toggleProfile}
                          className="
                      relative
                      flex items-center space-x-3
                      p-1.5 rounded-full
                      hover:bg-[#F5F0E8]/50
                      transition-all duration-300
                      cursor-dot
                    "
                      >
                        <div className="relative">
                          <div className="
                        w-9 h-9
                        rounded-full
                        overflow-hidden
                        ring-2 ring-white
                      ">
                            {user.user.avatar ? (
                                <img
                                    src={user.user.avatar}
                                    alt={user.user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-[#F5F0E8] to-[#FFE5D9] flex items-center justify-center">
                                  <HiOutlineUserCircle className="h-6 w-6 text-[#0A0A0A]/50" />
                                </div>
                            )}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#8B5CF6] rounded-full border-2 border-white"></div>
                        </div>
                        <div className="hidden lg:block text-left">
                          <p className="text-sm font-medium text-[#0A0A0A]">{user.user.name}</p>
                          <p className="text-xs text-[#0A0A0A]/60">View Profile</p>
                        </div>
                        <div className={`
                      transition-transform duration-300
                      ${isProfileOpen ? "rotate-180" : ""}
                    `}>
                          <svg className="w-4 h-4 text-[#0A0A0A]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                    </>
                )}

                <button
                    onClick={toggleMenu}
                    className="
                  relative w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-transparent hover:bg-[#F5F0E8]/50
                  transition-all duration-300
                  cursor-dot
                  lg:hidden
                "
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                >
                  <div className="relative">
                    <MdMenuOpen className="h-6 w-6 text-[#0A0A0A] transform transition-all duration-500" />
                    <div className="absolute inset-0 border border-[#0A0A0A]/10 rounded-full animate-ping opacity-0 hover:opacity-30"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div
            className={`
          fixed inset-0 z-[60] 
          transition-all duration-700 ease-in-out
          ${isMenuOpen
                ? "opacity-100 backdrop-blur-md"
                : "opacity-0 pointer-events-none backdrop-blur-none"
            }
        `}
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: isMenuOpen
                  ? 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.08), transparent 50%)'
                  : 'transparent'
            }}
        />

        <div
            className={`
          fixed top-0 right-0 h-full w-[85%] max-w-sm 
          bg-white/95 backdrop-blur-xl 
          border-l border-[#F5F0E8]
          shadow-2xl
          z-[70] 
          transform transition-all duration-700 ease-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
            style={{
              boxShadow: 'inset 8px 0 32px rgba(255, 229, 217, 0.3)'
            }}
        >
          <div className="flex justify-between items-center p-6 border-b border-[#F5F0E8]/50">
            <div className="flex items-center space-x-3">
              <RiAuctionLine className="h-7 w-7 text-[#0A0A0A]" />
              <span className="text-xl font-black text-[#0A0A0A] tracking-tight">
              GoldenLot
            </span>
            </div>
            <button
                onClick={() => setIsMenuOpen(false)}
                className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              hover:bg-[#F5F0E8]
              transition-all duration-300
              cursor-dot
            "
                aria-label="Close menu"
            >
              <IoCloseSharp className="h-5 w-5 text-[#0A0A0A]" />
            </button>
          </div>

          {user && (
              <div className="p-6 border-b border-[#F5F0E8]/50">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="
                  w-14 h-14
                  rounded-full
                  overflow-hidden
                  ring-2 ring-white ring-offset-2
                  shadow-lg
                ">
                      {user.user.avatar ? (
                          <img
                              src={user.user.avatar}
                              alt={user.user.name}
                              className="h-full w-full object-cover"
                          />
                      ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[#F5F0E8] to-[#FFE5D9] flex items-center justify-center">
                            <HiOutlineUserCircle className="h-8 w-8 text-[#0A0A0A]/50" />
                          </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#8B5CF6] rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0A0A0A] truncate">
                      {user.user.name}
                    </p>
                    <p className="text-sm text-[#0A0A0A]/60 truncate">
                      {user.user.email}
                    </p>
                    <div className="flex items-center mt-1">
                  <span className="text-xs px-2 py-0.5 bg-[#F5F0E8] text-[#0A0A0A] rounded-full">
                    {user.user.role || 'Member'}
                  </span>
                    </div>
                  </div>
                </div>
              </div>
          )}

          <nav className="p-6">
            <ul className="space-y-2">
              {(user ? getNavLinks(user.user.role) : navMenu).map((item, index) => (
                  <li
                      key={item.link}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="animate-fadeIn"
                  >
                    <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                            `
                      flex items-center 
                      px-4 py-3 
                      rounded-xl 
                      transition-all duration-400
                      hover:bg-[#F5F0E8]/50 
                      hover:pl-6
                      cursor-dot
                      ${isActive
                                ? "bg-[#F5F0E8] text-[#0A0A0A] font-medium"
                                : "text-[#0A0A0A]/70"
                            }
                    `
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-4 text-lg">{item.icon}</span>
                      <span className="text-[15px] tracking-wide">{item.name}</span>
                      {({ isActive }) => isActive && (
                          <div className="ml-auto w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse"></div>
                      )}
                    </NavLink>
                  </li>
              ))}
            </ul>

            {user ? (
                <div className="mt-8 pt-8 border-t border-[#F5F0E8]/50">
                  <ul className="space-y-2">
                    {protectedNavLink.slice(4, 7).map((item, index) => (
                        <li
                            key={item.link}
                            style={{ animationDelay: `${index * 100 + 400}ms` }}
                            className="animate-fadeIn"
                        >
                          <NavLink
                              to={item.link}
                              className={({ isActive }) =>
                                  `
                          flex items-center 
                          px-4 py-3 
                          rounded-xl 
                          transition-all duration-400
                          hover:bg-[#F5F0E8]/50 
                          hover:pl-6
                          cursor-dot
                          ${isActive
                                      ? "bg-[#F5F0E8] text-[#0A0A0A] font-medium"
                                      : "text-[#0A0A0A]/70"
                                  }
                        `
                              }
                              onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="mr-4 text-lg">{item.icon}</span>
                            <span className="text-[15px] tracking-wide">{item.name}</span>
                          </NavLink>
                        </li>
                    ))}
                    <li className="animate-fadeIn" style={{ animationDelay: '700ms' }}>
                      <button
                          className="
                      flex items-center w-full
                      px-4 py-3
                      rounded-xl
                      text-[#0A0A0A]/70
                      hover:bg-[#FFE5D9]/30
                      hover:text-[#0A0A0A]
                      hover:pl-6
                      transition-all duration-400
                      text-left cursor-dot
                    "
                          onClick={() => {
                            setIsMenuOpen(false);
                            setTimeout(handleLogout, 300);
                          }}
                      >
                        <IoLogOutOutline className="mr-4 text-lg" />
                        <span className="text-[15px] tracking-wide">Sign out</span>
                      </button>
                    </li>
                  </ul>
                </div>
            ) : (
                <div className="mt-8 pt-8 border-t border-[#F5F0E8]/50 space-y-3 animate-fadeIn">
                  <Link
                      to="/login"
                      className="
                  block w-full py-3 px-4
                  text-center
                  border border-[#0A0A0A]/10
                  rounded-xl
                  text-[#0A0A0A]/70
                  hover:bg-[#F5F0E8]/50
                  hover:text-[#0A0A0A]
                  hover:border-[#0A0A0A]/20
                  transition-all duration-300
                "
                      onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                      to="/signup"
                      className="
                  block w-full py-3 px-4
                  text-center
                  bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80
                  text-white
                  rounded-xl
                  hover:shadow-lg
                  hover:from-[#8B5CF6]/90
                  hover:to-[#8B5CF6]/70
                  transform hover:-translate-y-0.5
                  transition-all duration-300
                "
                      onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
            )}
          </nav>
        </div>

        <div
            className={`
          fixed inset-0 z-[60] 
          transition-all duration-700 ease-in-out
          ${isProfileOpen
                ? "opacity-100 backdrop-blur-md"
                : "opacity-0 pointer-events-none backdrop-blur-none"
            }
        `}
            onClick={() => setIsProfileOpen(false)}
            style={{
              background: isProfileOpen
                  ? 'radial-gradient(ellipse at right, rgba(139, 92, 246, 0.05), transparent 50%)'
                  : 'transparent'
            }}
        />

        <div
            className={`
          fixed top-0 right-0 h-full w-[90%] max-w-md 
          bg-white/95 backdrop-blur-xl 
          border-l border-[#F5F0E8]
          shadow-2xl
          z-[70] 
          transform transition-all duration-700 ease-out
          ${isProfileOpen ? "translate-x-0" : "translate-x-full"}
        `}
            style={{
              boxShadow: '-20px 0 60px rgba(139, 92, 246, 0.08)'
            }}
        >
          <div className="p-8 border-b border-[#F5F0E8]/50">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="
                  w-16 h-16
                  rounded-full
                  overflow-hidden
                  ring-4 ring-white
                  shadow-xl
                ">
                    {user?.user.avatar ? (
                        <img
                            src={user.user.avatar}
                            alt={user.user.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#8B5CF6]/10 via-[#F5F0E8] to-[#FFE5D9] flex items-center justify-center">
                          <HiOutlineUserCircle className="h-10 w-10 text-[#0A0A0A]/60" />
                        </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#8B5CF6] rounded-full border-4 border-white flex items-center justify-center">
                    <MdOutlineStar className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#0A0A0A]">{user?.user.name}</h2>
                  <p className="text-sm text-[#0A0A0A]/60">{user?.user.email}</p>
                  <div className="flex items-center mt-2 space-x-2">
                  <span className="px-3 py-1 bg-[#F5F0E8] text-[#0A0A0A] text-xs font-medium rounded-full">
                    {user?.user.role || 'Member'}
                  </span>
                    <span className="px-3 py-1 bg-[#FFE5D9] text-[#0A0A0A] text-xs font-medium rounded-full">
                    Premium
                  </span>
                  </div>
                </div>
              </div>
              <button
                  onClick={() => setIsProfileOpen(false)}
                  className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                hover:bg-[#F5F0E8]
                transition-all duration-300
                cursor-dot
              "
                  aria-label="Close profile"
              >
                <IoCloseSharp className="h-5 w-5 text-[#0A0A0A]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-[#F5F0E8]/30 rounded-2xl">
                <div className="text-2xl font-black text-[#0A0A0A]">24</div>
                <div className="text-xs text-[#0A0A0A]/60 mt-1">Active Bids</div>
              </div>
              <div className="text-center p-4 bg-[#F5F0E8]/30 rounded-2xl">
                <div className="text-2xl font-black text-[#0A0A0A]">$12,850</div>
                <div className="text-xs text-[#0A0A0A]/60 mt-1">Total Won</div>
              </div>
              <div className="text-center p-4 bg-[#F5F0E8]/30 rounded-2xl">
                <div className="text-2xl font-black text-[#0A0A0A]">98%</div>
                <div className="text-xs text-[#0A0A0A]/60 mt-1">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-bold text-[#0A0A0A]/40 uppercase tracking-wider mb-4">Account</h3>
            <nav className="space-y-2">
              {profileMenu.map((item, index) => (
                  <button
                      key={item.name}
                      className="
                  w-full
                  flex items-center justify-between
                  px-4 py-3
                  rounded-xl
                  text-left
                  hover:bg-[#F5F0E8]/50
                  transition-all duration-300
                  cursor-dot
                  group
                "
                      style={{ animationDelay: `${index * 80}ms` }}
                      onClick={() => {
                        if (item.action === 'logout') {
                          setIsProfileOpen(false);
                          setTimeout(handleLogout, 300);
                        } else if (item.link) {
                          navigate(item.link);
                          setIsProfileOpen(false);
                        }
                      }}
                  >
                    <div className="flex items-center">
                      <div className="
                    w-10 h-10
                    rounded-lg
                    flex items-center justify-center
                    bg-gradient-to-br from-[#F5F0E8] to-white
                    mr-3
                    group-hover:scale-110
                    transition-transform duration-300
                  ">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-[#0A0A0A]">{item.name}</p>
                        <p className="text-xs text-[#0A0A0A]/60">{item.description}</p>
                      </div>
                    </div>
                    <div className="
                  opacity-0 group-hover:opacity-100
                  transform translate-x-2 group-hover:translate-x-0
                  transition-all duration-300
                ">
                      <svg className="w-5 h-5 text-[#0A0A0A]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-[#F5F0E8]/50">
              <h3 className="text-sm font-bold text-[#0A0A0A]/40 uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="
                p-3
                bg-gradient-to-br from-[#F5F0E8] to-white
                rounded-xl
                hover:shadow-md
                transition-all duration-300
                cursor-dot
                group
              ">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <MdOutlineCreate className="h-5 w-5 text-[#8B5CF6]" />
                    </div>
                    <p className="text-sm font-medium text-[#0A0A0A]">Create Bid</p>
                  </div>
                </button>
                <button className="
                p-3
                bg-gradient-to-br from-[#F5F0E8] to-white
                rounded-xl
                hover:shadow-md
                transition-all duration-300
                cursor-dot
                group
              ">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-[#FFE5D9] rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <MdOutlineFavorite className="h-5 w-5 text-[#0A0A0A]" />
                    </div>
                    <p className="text-sm font-medium text-[#0A0A0A]">Watchlist</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#F5F0E8]/50">
              <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setTimeout(handleLogout, 300);
                  }}
                  className="
                w-full
                flex items-center justify-center
                px-4 py-3
                border border-[#0A0A0A]/10
                rounded-xl
                text-[#0A0A0A]/70
                hover:bg-[#FFE5D9]/30
                hover:text-[#0A0A0A]
                hover:border-[#0A0A0A]/20
                transition-all duration-300
                cursor-dot
                group
              "
              >
                <MdOutlineLogout className="mr-2 h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#FFE5D9] to-transparent opacity-30"></div>
        </div>
      </>
  );
};

export const LoginSignup = () => {
  return (
      <div className="hidden lg:flex items-center space-x-3">
        <Link
            to="/login"
            className="
          px-5 py-2.5
          text-[15px] font-medium
          border border-[#0A0A0A]/10
          rounded-full
          text-[#0A0A0A]/70
          hover:bg-[#F5F0E8]/50
          hover:text-[#0A0A0A]
          hover:border-[#0A0A0A]/20
          transition-all duration-300
          cursor-dot
        "
        >
          Log in
        </Link>
        <Link
            to="/signup"
            className="
          px-5 py-2.5
          text-[15px] font-medium
          bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80
          text-white
          rounded-full
          hover:shadow-lg
          hover:from-[#8B5CF6]/90
          hover:to-[#8B5CF6]/70
          transform hover:-translate-y-0.5
          transition-all duration-300
          cursor-dot
        "
        >
          Sign up
        </Link>
      </div>
  );
};

const navMenu = [
  {
    name: "Home",
    link: "/",
    icon: <MdOutlineHome className="text-[#0A0A0A]/70" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <MdOutlineAccountCircle className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MdMailOutline className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Legal",
    link: "/legal",
    icon: <IoDocumentTextOutline className="text-[#0A0A0A]/70" />,
  },
];

const protectedNavLink = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Create Auction",
    link: "/create",
    icon: <MdOutlineCreate className="text-[#0A0A0A]/70" />,
  },
  {
    name: "View Auction",
    link: "/auction",
    icon: <RiAuctionLine className="text-[#0A0A0A]/70" />,
  },
  {
    name: "My Auction",
    link: "/myauction",
    icon: <MdAttachMoney className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MdMailOutline className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <MdOutlineAccountCircle className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Privacy",
    link: "/privacy",
    icon: <MdOutlinePrivacyTip className="text-[#0A0A0A]/70" />,
  },
];

const adminNavLink = [
  {
    name: "Admin Panel",
    link: "/admin",
    icon: <MdAdminPanelSettings className="text-[#8B5CF6]" />,
  },
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard className="text-[#0A0A0A]/70" />,
  },
  {
    name: "Create Auction",
    link: "/create",
    icon: <MdOutlineCreate className="text-[#0A0A0A]/70" />,
  },
  {
    name: "View Auction",
    link: "/auction",
    icon: <RiAuctionLine className="text-[#0A0A0A]/70" />,
  },
];

const profileMenu = [
  {
    name: "My Profile",
    description: "Personal information",
    icon: <HiOutlineUserCircle className="h-5 w-5 text-[#0A0A0A]" />,
    link: "/profile"
  },
  {
    name: "My Bids",
    description: "Active & completed auctions",
    icon: <RiAuctionLine className="h-5 w-5 text-[#0A0A0A]" />,
    link: "/auction"
  },
  {
    name: "Notifications",
    description: "Manage your alerts",
    icon: <MdOutlineNotifications className="h-5 w-5 text-[#0A0A0A]" />,
    link: "/notifications"
  },
  {
    name: "Sign Out",
    description: "Log out from your account",
    icon: <MdOutlineLogout className="h-5 w-5 text-[#0A0A0A]" />,
    action: 'logout'
  }
];

const getNavLinks = (userRole) => {
  if (userRole === 'admin') {
    return adminNavLink;
  }
  return protectedNavLink.slice(0, 4);
};

const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
  }
  
  .cursor-dot {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="%230A0A0A" opacity="0.6"/></svg>') 12 12, auto;
  }
  
  .cursor-dot:hover {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="%238B5CF6"/></svg>') 12 12, auto;
  }
`;