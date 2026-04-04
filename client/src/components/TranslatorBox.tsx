import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
import { translateText, clearResults } from '../store/translateSlice';
import ResultCard from './ResultCard';

function TranslatorBox() {
  const dispatch = useAppDispatch();
  const { results, loading, error, currentMode } = useAppSelector(
    state => state.translate
  );

  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTranslate = () => {
    if (!text.trim()) return;
    dispatch(translateText({ text, mode: currentMode }));
  };

  const handleClear = () => {
    setText('');
    dispatch(clearResults());
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') handleTranslate();
  };

  const exampleTexts: Record<string, string> = {
    corporate: 'We are pursuing strategic workforce optimization to enhance operational efficiency across all verticals.',
    job: 'We are looking for a rockstar ninja developer who is passionate about wearing many hats in a fast-paced environment.',
    legal: 'The Company reserves the right to modify these terms at any time without prior notice to the user.',
    hr: 'Your performance this quarter has shown areas of opportunity that we would like to address going forward.',
    vc: 'We are disrupting the space with our AI-powered blockchain solution that leverages synergies across the ecosystem.',
  };

  const loadExample = () => {
    setText(exampleTexts[currentMode] || exampleTexts.corporate);
    dispatch(clearResults());
  };

  const isOver = text.length > 2000;
  const isEmpty = !text.trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Input */}
      <div style={{
        background: '#fff',
        border: '1px solid #E8E4DC',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid #F0EDE8',
          background: '#FDFBF8',
        }}>
          <span style={{
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            color: '#999',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>Paste text to decode</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={loadExample}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '11px',
                fontFamily: 'system-ui, sans-serif',
                color: '#999',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                textDecorationColor: '#ddd',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0F0F0F')}
              onMouseLeave={e => (e.currentTarget.style.color = '#999')}
            >
              Load example
            </button>
            {!isEmpty && (
              <button
                onClick={handleClear}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11px',
                  fontFamily: 'system-ui, sans-serif',
                  color: '#E8341A',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste the corporate speak, legal mumbo jumbo, or HR doublespeak here..."
          style={{
            width: '100%',
            height: '160px',
            resize: 'none',
            border: 'none',
            outline: 'none',
            padding: '16px',
            fontSize: '14px',
            fontFamily: 'Georgia, serif',
            color: '#1a1a1a',
            lineHeight: 1.7,
            background: 'transparent',
            boxSizing: 'border-box',
          }}
        />

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderTop: '1px solid #F0EDE8',
          background: '#FDFBF8',
        }}>
          <span style={{
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            color: isOver ? '#E8341A' : '#bbb',
          }}>
            {text.length} / 2000
            {isOver && ' — too long'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontSize: '11px',
              fontFamily: 'system-ui, sans-serif',
              color: '#ccc',
            }}>Ctrl+Enter</span>
            <button
              onClick={handleTranslate}
              disabled={loading || isEmpty || isOver}
              style={{
                background: loading || isEmpty || isOver ? '#ccc' : '#0F0F0F',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 20px',
                fontSize: '13px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                cursor: loading || isEmpty || isOver ? 'not-allowed' : 'pointer',
                letterSpacing: '0.03em',
                transition: 'background 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={e => {
                if (!loading && !isEmpty && !isOver)
                  (e.currentTarget as HTMLButtonElement).style.background = '#E8341A';
              }}
              onMouseLeave={e => {
                if (!loading && !isEmpty && !isOver)
                  (e.currentTarget as HTMLButtonElement).style.background = '#0F0F0F';
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    border: '2px solid #fff3', borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite', display: 'inline-block',
                  }} />
                  Decoding...
                </>
              ) : 'Decode →'}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          borderLeft: '3px solid #E8341A',
          borderRadius: '6px',
          padding: '10px 14px',
          fontSize: '13px',
          fontFamily: 'system-ui, sans-serif',
          color: '#991B1B',
        }}>
          {error}
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[0.8, 0.6, 0.75].map((w, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid #E8E4DC',
              borderRadius: '8px',
              padding: '16px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}>
              <div style={{ height: '10px', background: '#F0EDE8', borderRadius: '4px', width: `${w * 100}%`, marginBottom: '10px' }} />
              <div style={{ height: '10px', background: '#F7F4EF', borderRadius: '4px', width: `${(w - 0.2) * 100}%` }} />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <span style={{
              fontSize: '10px',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
              color: '#999',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>Decoded</span>
            <div style={{ flex: 1, height: '1px', background: '#E8E4DC' }} />
            <span style={{
              fontSize: '11px',
              fontFamily: 'system-ui, sans-serif',
              color: '#bbb',
            }}>{results.length} lines</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {results.map((result, index) => (
              <ResultCard key={index} result={result} index={index} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

export default TranslatorBox;

// import { useState, useRef } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/useTranslate';
// import { translateText, clearResults } from '../store/translateSlice';
// import ResultCard from './ResultCard';

// function TranslatorBox() {
//   const dispatch = useAppDispatch();
//   const { results, loading, error, currentMode } = useAppSelector(
//     state => state.translate
//   );

//   const [text, setText] = useState('');
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const handleTranslate = () => {
//     if (!text.trim()) return;
//     dispatch(translateText({ text, mode: currentMode }));
//   };

//   const handleClear = () => {
//     setText('');
//     dispatch(clearResults());
//     textareaRef.current?.focus();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.ctrlKey && e.key === 'Enter') handleTranslate();
//   };

//   const exampleTexts: Record<string, string> = {
//     corporate: 'We are pursuing strategic workforce optimization to enhance operational efficiency across all verticals.',
//     job: 'We are looking for a rockstar ninja developer who is passionate about wearing many hats in a fast-paced environment.',
//     legal: 'The Company reserves the right to modify these terms at any time without prior notice to the user.',
//     hr: 'Your performance this quarter has shown areas of opportunity that we would like to address going forward.',
//     vc: 'We are disrupting the space with our AI-powered blockchain solution that leverages synergies across the ecosystem.',
//   };

//   const loadExample = () => {
//     setText(exampleTexts[currentMode] || exampleTexts.corporate);
//     dispatch(clearResults());
//   };

//   const isOver = text.length > 2000;
//   const isEmpty = !text.trim();

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//       {/* Input */}
//       <div style={{
//         background: '#fff',
//         border: '1px solid #E8E4DC',
//         borderRadius: '8px',
//         overflow: 'hidden',
//       }}>
//         {/* Toolbar */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '10px 16px',
//           borderBottom: '1px solid #F0EDE8',
//           background: '#FDFBF8',
//         }}>
//           <span style={{
//             fontSize: '10px',
//             fontFamily: 'system-ui, sans-serif',
//             fontWeight: 600,
//             color: '#999',
//             letterSpacing: '0.1em',
//             textTransform: 'uppercase',
//           }}>Paste text to decode</span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <button
//               onClick={loadExample}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '11px',
//                 fontFamily: 'system-ui, sans-serif',
//                 color: '#999',
//                 cursor: 'pointer',
//                 padding: 0,
//                 textDecoration: 'underline',
//                 textDecorationColor: '#ddd',
//               }}
//               onMouseEnter={e => (e.currentTarget.style.color = '#0F0F0F')}
//               onMouseLeave={e => (e.currentTarget.style.color = '#999')}
//             >
//               Load example
//             </button>
//             {!isEmpty && (
//               <button
//                 onClick={handleClear}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '11px',
//                   fontFamily: 'system-ui, sans-serif',
//                   color: '#E8341A',
//                   cursor: 'pointer',
//                   padding: 0,
//                 }}
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Textarea */}
//         <textarea
//           ref={textareaRef}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Paste the corporate speak, legal mumbo jumbo, or HR doublespeak here..."
//           style={{
//             width: '100%',
//             height: '160px',
//             resize: 'none',
//             border: 'none',
//             outline: 'none',
//             padding: '16px',
//             fontSize: '14px',
//             fontFamily: 'Georgia, serif',
//             color: '#1a1a1a',
//             lineHeight: 1.7,
//             background: 'transparent',
//             boxSizing: 'border-box',
//           }}
//         />

//         {/* Footer */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '10px 16px',
//           borderTop: '1px solid #F0EDE8',
//           background: '#FDFBF8',
//         }}>
//           <span style={{
//             fontSize: '11px',
//             fontFamily: 'system-ui, sans-serif',
//             color: isOver ? '#E8341A' : '#bbb',
//           }}>
//             {text.length} / 2000
//             {isOver && ' — too long'}
//           </span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <span style={{
//               fontSize: '11px',
//               fontFamily: 'system-ui, sans-serif',
//               color: '#ccc',
//             }}>Ctrl+Enter</span>
//             <button
//               onClick={handleTranslate}
//               disabled={loading || isEmpty || isOver}
//               style={{
//                 background: loading || isEmpty || isOver ? '#ccc' : '#0F0F0F',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 padding: '8px 20px',
//                 fontSize: '13px',
//                 fontFamily: 'system-ui, sans-serif',
//                 fontWeight: 600,
//                 cursor: loading || isEmpty || isOver ? 'not-allowed' : 'pointer',
//                 letterSpacing: '0.03em',
//                 transition: 'background 0.15s',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '6px',
//               }}
//               onMouseEnter={e => {
//                 if (!loading && !isEmpty && !isOver)
//                   (e.currentTarget as HTMLButtonElement).style.background = '#E8341A';
//               }}
//               onMouseLeave={e => {
//                 if (!loading && !isEmpty && !isOver)
//                   (e.currentTarget as HTMLButtonElement).style.background = '#0F0F0F';
//               }}
//             >
//               {loading ? (
//                 <>
//                   <span style={{
//                     width: '10px', height: '10px', borderRadius: '50%',
//                     border: '2px solid #fff3', borderTopColor: '#fff',
//                     animation: 'spin 0.7s linear infinite', display: 'inline-block',
//                   }} />
//                   Decoding...
//                 </>
//               ) : 'Decode →'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div style={{
//           background: '#FEF2F2',
//           border: '1px solid #FECACA',
//           borderLeft: '3px solid #E8341A',
//           borderRadius: '6px',
//           padding: '10px 14px',
//           fontSize: '13px',
//           fontFamily: 'system-ui, sans-serif',
//           color: '#991B1B',
//         }}>
//           {error}
//         </div>
//       )}

//       {/* Skeleton */}
//       {loading && (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           {[0.8, 0.6, 0.75].map((w, i) => (
//             <div key={i} style={{
//               background: '#fff',
//               border: '1px solid #E8E4DC',
//               borderRadius: '8px',
//               padding: '16px',
//               animation: 'pulse 1.5s ease-in-out infinite',
//             }}>
//               <div style={{ height: '10px', background: '#F0EDE8', borderRadius: '4px', width: `${w * 100}%`, marginBottom: '10px' }} />
//               <div style={{ height: '10px', background: '#F7F4EF', borderRadius: '4px', width: `${(w - 0.2) * 100}%` }} />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Results */}
//       {!loading && results.length > 0 && (
//         <div>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             marginBottom: '12px',
//           }}>
//             <span style={{
//               fontSize: '10px',
//               fontFamily: 'system-ui, sans-serif',
//               fontWeight: 600,
//               color: '#999',
//               letterSpacing: '0.1em',
//               textTransform: 'uppercase',
//             }}>Decoded</span>
//             <div style={{ flex: 1, height: '1px', background: '#E8E4DC' }} />
//             <span style={{
//               fontSize: '11px',
//               fontFamily: 'system-ui, sans-serif',
//               color: '#bbb',
//             }}>{results.length} lines</span>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             {results.map((result, index) => (
//               <ResultCard key={index} result={result} index={index} />
//             ))}
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//       `}</style>
//     </div>
//   );
// }

// export default TranslatorBox;