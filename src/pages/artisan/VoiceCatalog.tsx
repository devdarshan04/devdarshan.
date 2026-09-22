import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, Globe, ArrowRight, Edit3, Check, Languages } from 'lucide-react';
import { sleep } from '@/lib/utils';

const PIPELINE_STEPS = ['VOICE', 'SPEECH TO TEXT', 'LANGUAGE DETECTION', 'TRANSLATION', 'PRODUCT EXTRACTION', 'AI CATALOG'];

const CATALOG_EN = {
  productName: 'Traditional Handwoven Cotton Saree',
  category: 'Handloom Textiles',
  material: '100% Cotton',
  craftType: 'Handloom Weaving',
  productionTime: '3 Days',
  origin: 'Tamil Nadu, India',
  description: 'A beautifully handwoven cotton saree crafted on a traditional pit loom. Each saree takes three days to complete, reflecting the artisan\'s deep skill and the heritage of Tamil Nadu\'s handloom tradition.',
  keywords: ['handloom', 'cotton', 'saree', 'traditional', 'Tamil Nadu', 'pit loom', 'woven'],
  craftStory: 'This saree carries the legacy of Tamil Nadu\'s rich handloom tradition, passed down through generations of skilled weavers. Each thread is chosen by hand, and the weaving process follows an ancient pattern that has been preserved for over 400 years.',
};

const CATALOG_HI = {
  productName: 'पारंपरिक हाथ से बुनी हुई कपास की साड़ी',
  category: 'हैंडलूम वस्त्र',
  material: '100% कपास',
  craftType: 'हैंडलूम बुनाई',
  description: 'पारंपरिक गड्ढे करघे पर बुनी गई सुंदर कपास की साड़ी। प्रत्येक साड़ी को पूरा करने में तीन दिन लगते हैं।',
};

export default function VoiceCatalog() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'ta' | 'en' | 'hi'>('ta');
  const [recording, setRecording] = useState(false);
  const [pipeline, setPipeline] = useState(-1);
  const [catalogReady, setCatalogReady] = useState(false);
  const [showHindi, setShowHindi] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [catalog, setCatalog] = useState(CATALOG_EN);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMic = async () => {
    if (recording) return;
    setRecording(true);
    setCatalogReady(false);
    setPipeline(-1);
    await sleep(3000);
    setRecording(false);
    // Run pipeline
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setPipeline(i);
      await sleep(600);
    }
    setCatalogReady(true);
  };

  const TRANSCRIPT_TEXT: Record<typeof lang, { original: string; translated: string }> = {
    ta: {
      original: 'இது கைத்தறியில் செய்யப்பட்ட பருத்தி புடவை. இதை தயாரிக்க மூன்று நாட்கள் ஆகும். இது தமிழ்நாட்டின் பாரம்பரிய நெசவு கலையில் செய்யப்பட்டது.',
      translated: '"This is a handloom-woven cotton saree. It takes three days to make. It is crafted in the traditional weaving art of Tamil Nadu."',
    },
    hi: {
      original: 'यह हथकरघा पर बुनी गई कपास की साड़ी है। इसे बनाने में तीन दिन लगते हैं।',
      translated: '"This is a handloom-woven cotton saree. It takes three days to make."',
    },
    en: {
      original: 'This is a handloom cotton saree from Tamil Nadu, woven on a pit loom. It takes about three days to complete.',
      translated: '(English input — no translation needed)',
    },
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Mic className="w-7 h-7 text-green-600" /> Describe Your Product
        </h1>
        <p className="text-lg text-gray-500 mt-1">Speak naturally in your own language</p>
      </div>

      {/* Language Selector */}
      <div className="flex gap-3 flex-wrap">
        {([['ta', '🇮🇳 Tamil'], ['hi', '🇮🇳 Hindi'], ['en', '🇬🇧 English']] as const).map(([code, label]) => (
          <button key={code} onClick={() => { setLang(code); setCatalogReady(false); setPipeline(-1); }}
            className={`px-5 py-2.5 rounded-full font-semibold border-2 transition-all text-sm ${lang === code ? 'border-green-500 bg-green-500 text-white' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Microphone Button */}
      <div className="flex flex-col items-center gap-4">
        <motion.button
          onClick={handleMic}
          disabled={recording}
          whileTap={{ scale: 0.95 }}
          className={`relative w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${recording ? 'bg-red-500' : 'bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600'} disabled:cursor-not-allowed`}
        >
          {recording ? (
            <>
              <motion.div className="absolute inset-0 rounded-full bg-red-400 opacity-60" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} />
              <MicOff className="w-12 h-12 text-white relative z-10" />
            </>
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
        </motion.button>

        <p className="text-gray-600 font-medium text-sm">
          {recording ? '🔴 Recording… speak now' : 'Tap to Speak'}
        </p>

        {/* Waveform */}
        {recording && (
          <div className="flex items-end gap-1 h-12">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div key={i} className="w-1.5 bg-green-500 rounded-full"
                animate={{ height: [`${20 + Math.random() * 30}px`, `${10 + Math.random() * 40}px`, `${25 + Math.random() * 25}px`] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }} />
            ))}
          </div>
        )}
      </div>

      {/* Transcript */}
      {pipeline >= 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
            <Volume2 className="w-4 h-4" /> Transcribed Text ({lang.toUpperCase()})
          </h3>
          <p className="text-gray-800 font-medium leading-relaxed">{TRANSCRIPT_TEXT[lang].original}</p>
          {lang !== 'en' && (
            <p className="text-green-700 text-sm italic">{TRANSCRIPT_TEXT[lang].translated}</p>
          )}
          <p className="text-xs text-blue-600 font-medium">Detected language: {lang === 'ta' ? 'Tamil' : lang === 'hi' ? 'Hindi' : 'English'} — 98% confidence</p>
        </div>
      )}

      {/* Pipeline Visualization */}
      {pipeline >= 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.3 }}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${i <= pipeline ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step}
              </motion.span>
              {i < PIPELINE_STEPS.length - 1 && <span className="text-gray-300 text-xs">→</span>}
            </div>
          ))}
        </div>
      )}

      {/* Generated Catalog */}
      <AnimatePresence>
        {catalogReady && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇮🇳</span>
              <span className="font-bold text-green-700">AI Catalog Generated from {lang === 'ta' ? 'Tamil' : lang === 'hi' ? 'Hindi' : 'English'} Voice</span>
              <button onClick={() => setEditMode(!editMode)} className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 px-2 py-1 rounded-lg">
                {editMode ? <Check className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                {editMode ? 'Save' : 'Edit'}
              </button>
            </div>

            {showHindi ? (
              <div className="bg-orange-50 rounded-xl p-4 text-sm space-y-1">
                <div><strong>उत्पाद:</strong> {CATALOG_HI.productName}</div>
                <div><strong>श्रेणी:</strong> {CATALOG_HI.category}</div>
                <div><strong>सामग्री:</strong> {CATALOG_HI.material}</div>
                <div><strong>विवरण:</strong> {CATALOG_HI.description}</div>
                <button onClick={() => setShowHindi(false)} className="text-xs text-orange-600 font-medium mt-1">← Back to English</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {[
                  ['Product Name', 'productName'],
                  ['Category', 'category'],
                  ['Material', 'material'],
                  ['Craft Type', 'craftType'],
                  ['Production Time', 'productionTime'],
                  ['Origin', 'origin'],
                ].map(([label, key]) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
                    {editMode ? (
                      <input value={(catalog as unknown as Record<string, string>)[key]} onChange={(e) => setCatalog({ ...catalog, [key]: e.target.value })}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-orange-400" />
                    ) : (
                      <span className="font-semibold text-gray-900">{(catalog as unknown as Record<string, string>)[key]}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!showHindi && (
              <>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Description</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{catalog.description}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Keywords</span>
                  <div className="flex flex-wrap gap-1">
                    {catalog.keywords.map((k) => (
                      <span key={k} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Craft Story</span>
                  <p className="text-sm text-gray-600 italic leading-relaxed">{catalog.craftStory}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe className="w-3 h-3" />
                  <span>Available in:</span>
                  {['English', 'Tamil', 'Hindi'].map((l) => (
                    <span key={l} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{l}</span>
                  ))}
                </div>
              </>
            )}

            <div className="flex gap-2 flex-wrap pt-2 border-t border-gray-100">
              <button onClick={() => setShowHindi(!showHindi)}
                className="flex items-center gap-1 px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-xl text-sm hover:bg-orange-200 transition-colors">
                <Languages className="w-4 h-4" /> {showHindi ? 'English' : 'Translate to Hindi'}
              </button>
              <button onClick={() => navigate('/artisan/pricing')}
                className="flex items-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors">
                Save & Price <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/artisan/find-buyers')}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors">
                Find Buyers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Input fallback */}
      {!catalogReady && (
        <details className="bg-gray-50 rounded-xl border border-gray-200">
          <summary className="p-4 text-sm text-gray-500 cursor-pointer select-none">Or type your product description manually</summary>
          <div className="px-4 pb-4">
            <textarea rows={3} placeholder="Describe your product in any language…"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-400 resize-none" />
            <button onClick={handleMic} className="mt-2 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">Generate Catalog</button>
          </div>
        </details>
      )}
    </div>
  );
}
