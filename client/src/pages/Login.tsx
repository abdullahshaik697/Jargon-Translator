import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
import { loginUser, clearError } from '../store/authSlice';

const quotes = [
  { text: '"We are pursuing strategic workforce optimization."', translation: 'We are firing people.' },
  { text: '"This role requires wearing many hats."', translation: 'You will do 3 jobs for 1 salary.' },
  { text: '"Competitive compensation package."', translation: 'We won\'t tell you the salary.' },
  { text: '"Fast-paced, dynamic environment."', translation: 'We are understaffed and chaotic.' },
  { text: '"Areas of opportunity in your performance."', translation: 'Your work is not good enough.' },
];

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => { dispatch(clearError()); }, []);
  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuoteIndex(i => (i + 1) % quotes.length);
        setFadeIn(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/google`;
  };

  const currentQuote = quotes[quoteIndex];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      fontFamily: 'Roboto, system-ui, sans-serif',
    }}>

      {/* Left panel — branding */}
      <div style={{
        background: '#0F0F0F',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top grain texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          pointerEvents: 'none', opacity: 0.6,
        }} />

        {/* Red corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '120px', height: '120px',
          background: '#E8341A',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          opacity: 0.15,
        }} />

        {/* Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: '#E8341A',
              borderRadius: '5px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 700, color: '#fff',
              fontFamily: 'Georgia, serif',
            }}>J</div>
            <span style={{
              color: '#F7F4EF', fontSize: '16px',
              fontFamily: 'Georgia, serif', letterSpacing: '0.01em',
            }}>
              Jargon <span style={{ color: '#E8341A' }}>Translator</span>
            </span>
          </div>
          <p style={{
            color: '#444', fontSize: '12px',
            fontFamily: 'Roboto, sans-serif',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            margin: 0,
          }}>The corporate bullshit decoder</p>
        </div>

        {/* Middle quote */}
        <div style={{
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          <div style={{
            width: '32px', height: '3px',
            background: '#E8341A', marginBottom: '24px',
          }} />
          <p style={{
            color: '#555', fontSize: '13px',
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            lineHeight: 1.7, marginBottom: '16px',
          }}>
            {currentQuote.text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '16px', height: '1px', background: '#E8341A' }} />
            <p style={{
              color: '#E8341A', fontSize: '13px',
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              margin: 0,
            }}>
              {currentQuote.translation}
            </p>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { num: '5', label: 'Decode modes' },
            { num: '100%', label: 'Honest' },
            { num: '0%', label: 'Sugarcoating' },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{
                color: '#F7F4EF', fontSize: '20px',
                fontFamily: 'Georgia, serif', margin: '0 0 2px',
                fontWeight: 400,
              }}>{stat.num}</p>
              <p style={{
                color: '#444', fontSize: '11px',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '0.05em', margin: 0,
              }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        background: '#F7F4EF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 48px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '26px', fontWeight: 400,
              fontFamily: 'Georgia, serif', color: '#0F0F0F',
              margin: '0 0 8px', letterSpacing: '-0.02em',
            }}>Welcome back.</h1>
            <p style={{
              fontSize: '13px', color: '#888',
              fontFamily: 'Roboto, sans-serif', margin: 0,
            }}>
              Don't have an account?{' '}
              <Link to="/register" style={{
                color: '#E8341A', textDecoration: 'none', fontWeight: 500,
              }}>Sign up</Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderLeft: '3px solid #E8341A',
              borderRadius: '6px',
              padding: '10px 14px',
              fontSize: '13px', color: '#991B1B',
              fontFamily: 'Roboto, sans-serif',
              marginBottom: '20px',
            }}>{error}</div>
          )}

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              gap: '10px', padding: '11px',
              border: '1.5px solid #E0DCD4',
              borderRadius: '6px', background: '#fff',
              fontSize: '13px', fontFamily: 'Roboto, sans-serif',
              fontWeight: 500, color: '#333',
              cursor: 'pointer', marginBottom: '20px',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget).style.borderColor = '#0F0F0F';
            }}
            onMouseLeave={e => {
              (e.currentTarget).style.borderColor = '#E0DCD4';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E0DCD4' }} />
            <span style={{ fontSize: '11px', color: '#bbb', fontFamily: 'Roboto, sans-serif' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#E0DCD4' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{
                display: 'block', fontSize: '11px',
                fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                color: '#666', marginBottom: '6px',
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>Email</label>
              <input
                type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="abc@example.com"
                required
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1.5px solid #E0DCD4', borderRadius: '6px',
                  fontSize: '14px', fontFamily: 'Roboto, sans-serif',
                  color: '#1a1a1a', background: '#fff',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#0F0F0F')}
                onBlur={e => (e.target.style.borderColor = '#E0DCD4')}
              />
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: '11px',
                fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                color: '#666', marginBottom: '6px',
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '10px 40px 10px 14px',
                    border: '1.5px solid #E0DCD4', borderRadius: '6px',
                    fontSize: '14px', fontFamily: 'Roboto, sans-serif',
                    color: '#1a1a1a', background: '#fff',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0F0F0F')}
                  onBlur={e => (e.target.style.borderColor = '#E0DCD4')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px',
                    top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    cursor: 'pointer', color: '#bbb',
                    fontSize: '13px', padding: 0,
                  }}
                >{showPassword ? '🙈' : '👁️'}</button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px',
                background: loading ? '#ccc' : '#0F0F0F',
                color: '#fff', border: 'none',
                borderRadius: '6px', fontSize: '13px',
                fontFamily: 'Roboto, sans-serif', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.03em', marginTop: '4px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                if (!loading) (e.currentTarget).style.background = '#E8341A';
              }}
              onMouseLeave={e => {
                if (!loading) (e.currentTarget).style.background = '#0F0F0F';
              }}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
// import { loginUser, clearError } from '../store/authSlice';

// function Login() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     dispatch(clearError());
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(loginUser(form));
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = 'http://localhost:5000/auth/google';
//   };

//   const googleError = searchParams.get('error');

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
//           <p className="text-gray-500 mt-1 text-sm">Login to Jargon Translator</p>
//         </div>

//         {/* Errors */}
//         {error && (
//           <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}
//         {googleError && (
//           <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
//             Google login failed. Please try again.
//           </div>
//         )}

//         {/* Google Login */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-4"
//         >
//           <svg width="18" height="18" viewBox="0 0 18 18">
//             <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
//             <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
//             <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
//             <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
//           </svg>
//           Continue with Google
//         </button>

//         {/* Divider */}
//         <div className="flex items-center gap-3 mb-4">
//           <div className="flex-1 h-px bg-gray-200"></div>
//           <span className="text-xs text-gray-400">or</span>
//           <div className="flex-1 h-px bg-gray-200"></div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? '🙈' : '👁️'}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         {/* Register link */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-gray-900 font-medium hover:underline">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;