import { useState } from 'react';
import type { TranslationResult } from '../types/index';

interface ResultCardProps {
  result: TranslationResult;
  index: number;
}

const severityConfig = {
  mild: {
    badge: { background: '#ECFDF5', color: '#065F46' },
    accent: '#10B981',
    label: 'Mild',
  },
  spicy: {
    badge: { background: '#FFFBEB', color: '#92400E' },
    accent: '#F59E0B',
    label: 'Spicy',
  },
  alarm: {
    badge: { background: '#FEF2F2', color: '#991B1B' },
    accent: '#E8341A',
    label: 'Alarm',
  },
};

function ResultCard({ result, index }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const config = severityConfig[result.severity] || severityConfig.mild;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${result.original}"\n→ ${result.translation}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Copy failed');
    }
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E8E4DC',
      borderLeft: `3px solid ${config.accent}`,
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 700,
            color: '#bbb',
            letterSpacing: '0.05em',
          }}>#{String(index + 1).padStart(2, '0')}</span>

          {result.red_flag && (
            <span style={{
              fontSize: '10px',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '3px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              ...config.badge,
            }}>
              {config.label}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            color: copied ? '#10B981' : '#bbb',
            cursor: 'pointer',
            padding: '0',
            transition: 'color 0.15s',
            fontWeight: copied ? 600 : 400,
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 14px 14px' }}>
        {/* Original */}
        <div style={{ marginBottom: '10px' }}>
          <span style={{
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            color: '#bbb',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px',
          }}>They said</span>
          <p style={{
            fontSize: '13px',
            fontFamily: 'Georgia, serif',
            color: '#666',
            fontStyle: 'italic',
            margin: 0,
            lineHeight: 1.6,
          }}>"{result.original}"</p>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: '10px 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#F0EDE8' }} />
          <span style={{
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            color: '#ccc',
            whiteSpace: 'nowrap',
          }}>they meant</span>
          <div style={{ flex: 1, height: '1px', background: '#F0EDE8' }} />
        </div>

        {/* Translation */}
        <div>
          <span style={{
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            color: config.accent,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px',
          }}>They meant</span>
          <p style={{
            fontSize: '14px',
            fontFamily: 'Georgia, serif',
            color: '#1a1a1a',
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.6,
          }}>
            {result.translation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;

// import { useState } from 'react';
// import type { TranslationResult } from '../types/index';

// interface ResultCardProps {
//   result: TranslationResult;
//   index: number;
// }

// const severityConfig = {
//   mild: {
//     badge: 'bg-green-100 text-green-700',
//     border: 'border-l-green-400',
//     label: 'Mild',
//   },
//   spicy: {
//     badge: 'bg-amber-100 text-amber-700',
//     border: 'border-l-amber-400',
//     label: 'Spicy 🌶️',
//   },
//   alarm: {
//     badge: 'bg-red-100 text-red-600',
//     border: 'border-l-red-500',
//     label: '🚨 Alarm',
//   },
// };

// function ResultCard({ result, index }: ResultCardProps) {
//   const [copied, setCopied] = useState(false);

//   const config = severityConfig[result.severity];

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(
//         `Original: ${result.original}\nTranslation: ${result.translation}`
//       );
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       console.error('Copy failed');
//     }
//   };

//   return (
//     <div
//       className={`
//         bg-white rounded-2xl border border-gray-200
//         border-l-4 ${config.border}
//         p-4 transition hover:shadow-sm
//       `}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <span className="text-xs font-medium text-gray-400">
//             #{index + 1}
//           </span>
//           {result.red_flag && (
//             <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
//               {config.label}
//             </span>
//           )}
//         </div>
//         <button
//           onClick={handleCopy}
//           className="text-xs text-gray-400 hover:text-gray-600 transition"
//         >
//           {copied ? '✓ Copied!' : 'Copy'}
//         </button>
//       </div>

//       {/* Original */}
//       <div className="mb-3">
//         <p className="text-xs font-medium text-gray-400 mb-1">They said:</p>
//         <p className="text-sm text-gray-600 italic">"{result.original}"</p>
//       </div>

//       {/* Arrow */}
//       <div className="flex items-center gap-2 mb-3">
//         <div className="flex-1 h-px bg-gray-100"></div>
//         <span className="text-gray-300 text-xs">↓ honest translation</span>
//         <div className="flex-1 h-px bg-gray-100"></div>
//       </div>

//       {/* Translation */}
//       <div>
//         <p className="text-xs font-medium text-gray-400 mb-1">They meant:</p>
//         <p className={`text-sm font-medium ${
//           result.red_flag ? 'text-gray-900' : 'text-gray-700'
//         }`}>
//           {result.translation}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ResultCard;