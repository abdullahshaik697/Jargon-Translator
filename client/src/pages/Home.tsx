import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
import { logout } from '../store/authSlice';
import { fetchHistory } from '../store/translateSlice';
import ModeSelector from '../components/ModeSelector';
import TranslatorBox from '../components/TranslatorBox';
import HistorySidebar from '../components/HistorySidebar';

function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <div className="min-h-screen" style={{ background: '#F7F4EF', fontFamily: "'Roboto Slab', serif" }}>

      {/* Navbar */}
      <nav style={{
        background: '#0F0F0F',
        borderBottom: '1px solid #1a1a1a',
        padding: '0 2rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: '#E8341A',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-1px',
            }}>J</div>
            <span style={{
              color: '#F7F4EF',
              fontSize: '15px',
              fontWeight: 400,
              letterSpacing: '0.01em',
              fontFamily: 'Georgia, serif',
            }}>
              Jargon <span style={{ color: '#E8341A' }}>Translator</span>
            </span>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #333' }}
                />
              ) : (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#E8341A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'system-ui, sans-serif',
                }}>{initials}</div>
              )}
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontFamily: 'system-ui, sans-serif',
              }}>{user?.name}</span>
            </div>

            <div style={{ width: '1px', height: '16px', background: '#2a2a2a' }} />

            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid #2a2a2a',
                color: '#888',
                fontSize: '12px',
                padding: '5px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: '0.03em',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.borderColor = '#E8341A';
                (e.target as HTMLButtonElement).style.color = '#E8341A';
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.borderColor = '#2a2a2a';
                (e.target as HTMLButtonElement).style.color = '#888';
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Hero strip */}
      <div style={{
        background: '#0F0F0F',
        borderBottom: '3px solid #E8341A',
        padding: '20px 2rem 18px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            color: '#555',
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}>The Corporate Bullshit Decoder</p>
          <h1 style={{
            color: '#F7F4EF',
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 400,
            margin: 0,
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            What they <span style={{ fontStyle: 'italic', color: '#E8341A' }}>said</span> vs what they <span style={{ fontStyle: 'italic', color: '#E8341A' }}>meant</span>
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ModeSelector />
            <TranslatorBox />
          </div>

          {/* Right */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <HistorySidebar />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
// import { logout } from '../store/authSlice';
// import { fetchHistory } from '../store/translateSlice';
// import ModeSelector from '../components/ModeSelector';
// import TranslatorBox from '../components/TranslatorBox';
// import HistorySidebar from '../components/HistorySidebar';

// function Home() {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector(state => state.auth);
//   const { history } = useAppSelector(state => state.translate);

//   useEffect(() => {
//     dispatch(fetchHistory());
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* Navbar */}
//       <nav className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-lg font-semibold text-gray-900">
//               Jargon Translator
//             </span>
//           </div>
//           <div className="flex items-center gap-4">
//             {user?.avatar && (
//               <img
//                 src={user.avatar}
//                 alt={user.name}
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             )}
//             <span className="text-sm text-gray-600">{user?.name}</span>
//             <button
//               onClick={handleLogout}
//               className="text-sm text-gray-500 hover:text-gray-900 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
//           {/* Left — Translator */}
//           <div className="lg:col-span-3 space-y-4">
//             <ModeSelector />
//             <TranslatorBox />
//           </div>

//           {/* Right — History */}
//           <div className="lg:col-span-1">
//             <HistorySidebar />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;