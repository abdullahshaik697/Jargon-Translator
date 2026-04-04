import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
import { deleteTranslation } from '../store/translateSlice';
import type { TranslationRecord, TranslationResult } from '../types/index';

function HistorySidebar() {
  const dispatch = useAppDispatch();
  const { history, loading } = useAppSelector(state => state.translate);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const modeLabels: Record<string, string> = {
    corporate: 'Corp',
    job: 'Job',
    legal: 'Legal',
    hr: 'HR',
    vc: 'VC',
  };

  const modeColors: Record<string, string> = {
    corporate: '#3B82F6',
    job: '#8B5CF6',
    legal: '#F59E0B',
    hr: '#10B981',
    vc: '#E8341A',
  };

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await dispatch(deleteTranslation(id));
    setDeletingId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);

    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    return `${days}d ago`;
  };

  const truncate = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit) + '…' : text;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E8E4DC',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #F0EDE8',
        background: '#FDFBF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '10px',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 700,
          color: '#999',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>History</span>
        {history.length > 0 && (
          <span style={{
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            color: '#bbb',
          }}>{history.length} decoded</span>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 && !loading && (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '1.5px dashed #ddd',
            borderRadius: '50%',
            margin: '0 auto 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#ddd',
          }}>○</div>
          <p style={{
            fontSize: '12px',
            fontFamily: 'system-ui, sans-serif',
            color: '#bbb',
            margin: 0,
          }}>No translations yet</p>
        </div>
      )}

      {/* List */}
      <div style={{
        maxHeight: 'calc(100vh - 280px)',
        overflowY: 'auto',
      }}>
        {history.map((record: TranslationRecord) => {
          const isExpanded = expandedId === record.id;
          const modeColor = modeColors[record.mode] || '#999';
          const modeLabel = modeLabels[record.mode] || record.mode;

          return (
            <div
              key={record.id}
              style={{
                borderBottom: '1px solid #F7F4EF',
              }}
            >
              {/* Row */}
              <div
                onClick={() => handleExpand(record.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                  background: isExpanded ? '#FDFBF8' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isExpanded) (e.currentTarget as HTMLDivElement).style.background = '#FDFBF8';
                }}
                onMouseLeave={e => {
                  if (!isExpanded) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              >
                {/* Mode badge */}
                <span style={{
                  fontSize: '9px',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: `${modeColor}15`,
                  color: modeColor,
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>{modeLabel}</span>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '12px',
                    fontFamily: 'Georgia, serif',
                    color: '#333',
                    margin: '0 0 2px',
                    lineHeight: 1.4,
                    fontStyle: 'italic',
                  }}>
                    {truncate(record.input_text, 55)}
                  </p>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'system-ui, sans-serif',
                    color: '#bbb',
                  }}>{formatDate(record.created_at)}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(record.id); }}
                    disabled={deletingId === record.id}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '11px',
                      color: '#ddd',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8341A')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#ddd')}
                  >
                    {deletingId === record.id ? '…' : '×'}
                  </button>
                  <span style={{
                    fontSize: '10px',
                    color: '#ccc',
                    transform: isExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    display: 'inline-block',
                  }}>▾</span>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div style={{
                  borderTop: '1px solid #F0EDE8',
                  padding: '12px 14px',
                  background: '#FDFBF8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  {(record.output_json as TranslationResult[]).map(
                    (result: TranslationResult, i: number) => (
                      <div key={i} style={{
                        paddingLeft: '10px',
                        borderLeft: `2px solid ${
                          result.severity === 'alarm' ? '#E8341A'
                          : result.severity === 'spicy' ? '#F59E0B'
                          : '#10B981'
                        }`,
                      }}>
                        <p style={{
                          fontSize: '11px',
                          fontFamily: 'Georgia, serif',
                          color: '#888',
                          fontStyle: 'italic',
                          margin: '0 0 3px',
                          lineHeight: 1.4,
                        }}>"{truncate(result.original, 70)}"</p>
                        <p style={{
                          fontSize: '12px',
                          fontFamily: 'system-ui, sans-serif',
                          color: result.red_flag ? '#1a1a1a' : '#555',
                          margin: 0,
                          fontWeight: result.red_flag ? 500 : 400,
                          lineHeight: 1.4,
                        }}>→ {truncate(result.translation, 80)}</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistorySidebar;

// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
// import { deleteTranslation } from '../store/translateSlice';
// import type { TranslationRecord, TranslationResult } from '../types/index';

// function HistorySidebar() {
//   const dispatch = useAppDispatch();
//   const { history, loading } = useAppSelector(state => state.translate);
//   const [expandedId, setExpandedId] = useState<number | null>(null);
//   const [deletingId, setDeletingId] = useState<number | null>(null);

//   const modeEmojis: Record<string, string> = {
//     corporate: '🏢',
//     job: '💼',
//     legal: '⚖️',
//     hr: '👥',
//     vc: '🚀',
//   };

//   const handleExpand = (id: number) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleDelete = async (id: number) => {
//     setDeletingId(id);
//     await dispatch(deleteTranslation(id));
//     setDeletingId(null);
//     if (expandedId === id) setExpandedId(null);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const truncate = (text: string, limit: number) => {
//     return text.length > limit ? text.slice(0, limit) + '...' : text;
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-4 h-fit sticky top-6">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//           History
//         </p>
//         <span className="text-xs text-gray-400">
//           {history.length} translations
//         </span>
//       </div>

//       {/* Empty state */}
//       {history.length === 0 && !loading && (
//         <div className="text-center py-8">
//           <p className="text-2xl mb-2">📋</p>
//           <p className="text-xs text-gray-400">
//             No translations yet
//           </p>
//         </div>
//       )}

//       {/* History list */}
//       <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
//         {history.map((record: TranslationRecord) => (
//           <div
//             key={record.id}
//             className="border border-gray-100 rounded-xl overflow-hidden"
//           >
//             {/* Record header */}
//             <div
//               className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 transition"
//               onClick={() => handleExpand(record.id)}
//             >
//               <span className="text-base">
//                 {modeEmojis[record.mode] || '📄'}
//               </span>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-gray-700 truncate font-medium">
//                   {truncate(record.input_text, 40)}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-0.5">
//                   {formatDate(record.created_at)}
//                 </p>
//               </div>
//               <div className="flex items-center gap-1 flex-shrink-0">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(record.id);
//                   }}
//                   disabled={deletingId === record.id}
//                   className="text-gray-300 hover:text-red-400 transition text-xs p-1"
//                 >
//                   {deletingId === record.id ? '...' : '✕'}
//                 </button>
//                 <span className="text-gray-300 text-xs">
//                   {expandedId === record.id ? '▲' : '▼'}
//                 </span>
//               </div>
//             </div>

//             {/* Expanded content */}
//             {expandedId === record.id && (
//               <div className="border-t border-gray-100 p-3 bg-gray-50 space-y-2">
//                 {(record.output_json as TranslationResult[]).map(
//                   (result: TranslationResult, i: number) => (
//                     <div key={i} className="text-xs">
//                       <p className="text-gray-400 italic mb-0.5">
//                         "{truncate(result.original, 60)}"
//                       </p>
//                       <p className={`font-medium ${
//                         result.red_flag
//                           ? 'text-red-600'
//                           : 'text-gray-700'
//                       }`}>
//                         → {truncate(result.translation, 80)}
//                       </p>
//                       {result.red_flag && (
//                         <span className={`inline-block mt-1 text-xs px-1.5 py-0.5 rounded-full ${
//                           result.severity === 'alarm'
//                             ? 'bg-red-100 text-red-600'
//                             : result.severity === 'spicy'
//                             ? 'bg-amber-100 text-amber-700'
//                             : 'bg-green-100 text-green-700'
//                         }`}>
//                           {result.severity}
//                         </span>
//                       )}
//                     </div>
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HistorySidebar;