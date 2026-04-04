import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
import { setMode } from '../store/translateSlice';

const modes = [
  { id: 'corporate', label: 'Corporate', emoji: '🏢', desc: 'Office emails, business memos & management speak' },
  { id: 'job', label: 'Job Listing', emoji: '💼', desc: 'Recruitment posts & HR job descriptions' },
  { id: 'legal', label: 'Legal', emoji: '⚖️', desc: 'Contracts, terms & fine print' },
  { id: 'hr', label: 'HR', emoji: '👥', desc: 'Performance reviews & company policies' },
  { id: 'vc', label: 'Startup / VC', emoji: '🚀', desc: 'Pitch decks & investor speak' },
];

function ModeSelector() {
  const dispatch = useAppDispatch();
  const { currentMode } = useAppSelector(state => state.translate);

  const activeMode = modes.find(m => m.id === currentMode);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E8E4DC',
      borderRadius: '8px',
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{
          fontSize: '10px',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600,
          color: '#999',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>Decode mode</span>
        {activeMode && (
          <span style={{
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            color: '#999',
            fontStyle: 'italic',
          }}>{activeMode.desc}</span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {modes.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => dispatch(setMode(mode.id))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
                border: isActive ? '1.5px solid #0F0F0F' : '1.5px solid #E8E4DC',
                background: isActive ? '#0F0F0F' : '#F7F4EF',
                color: isActive ? '#F7F4EF' : '#666',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#0F0F0F';
                  (e.currentTarget as HTMLButtonElement).style.color = '#0F0F0F';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8E4DC';
                  (e.currentTarget as HTMLButtonElement).style.color = '#666';
                }
              }}
            >
              <span style={{ fontSize: '13px' }}>{mode.emoji}</span>
              <span>{mode.label}</span>
              {isActive && (
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#E8341A',
                  display: 'inline-block',
                  marginLeft: '2px',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ModeSelector;

// import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
// import { setMode } from '../store/translateSlice';

// const modes = [
//   { id: 'corporate', label: 'Corporate', emoji: '🏢', desc: 'Office emails & business speak' },
//   { id: 'job', label: 'Job Listing', emoji: '💼', desc: 'Recruitment & job posts' },
//   { id: 'legal', label: 'Legal', emoji: '⚖️', desc: 'Contracts & terms' },
//   { id: 'hr', label: 'HR', emoji: '👥', desc: 'Performance reviews & policies' },
//   { id: 'vc', label: 'Startup/VC', emoji: '🚀', desc: 'Pitch deck & investor speak' },
// ];

// function ModeSelector() {
//   const dispatch = useAppDispatch();
//   const { currentMode } = useAppSelector(state => state.translate);

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-4">
//       <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
//         Select Mode
//       </p>
//       <div className="flex flex-wrap gap-2">
//         {modes.map((mode) => (
//           <button
//             key={mode.id}
//             onClick={() => dispatch(setMode(mode.id))}
//             className={`
//               flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
//               ${currentMode === mode.id
//                 ? 'bg-gray-900 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }
//             `}
//           >
//             <span>{mode.emoji}</span>
//             <span>{mode.label}</span>
//           </button>
//         ))}
//       </div>
//       <p className="text-xs text-gray-400 mt-3">
//         {modes.find(m => m.id === currentMode)?.desc}
//       </p>
//     </div>
//   );
// }

// export default ModeSelector;