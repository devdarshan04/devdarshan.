import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, CheckCircle2, ArrowRight, RefreshCw, Download } from 'lucide-react';
import { sleep } from '@/lib/utils';

const STEPS = [
  'Detecting product type',
  'Removing background',
  'Correcting lighting',
  'Enhancing image quality',
  'Cropping to marketplace format',
  'Creating professional image',
];

export default function AIImageStudio() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [doneSteps, setDoneSteps] = useState<number>(0);
  const [enhanced, setEnhanced] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
    setDoneSteps(0);
    setEnhanced(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleEnhance = async () => {
    if (!image) return;
    setProcessing(true);
    setDoneSteps(0);
    for (let i = 1; i <= STEPS.length; i++) {
      await sleep(700);
      setDoneSteps(i);
    }
    setProcessing(false);
    setEnhanced(true);
  };

  const reset = () => { setImage(null); setEnhanced(false); setDoneSteps(0); };

  // TIPS
  const TIPS = [
    { icon: '☀️', text: 'Use natural daylight or a white background' },
    { icon: '📐', text: 'Keep product centered in frame' },
    { icon: '🔍', text: 'Capture all details and textures' },
    { icon: '📱', text: 'Hold phone steady or use a stand' },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Camera className="w-7 h-7 text-purple-600" /> AI Image Studio
        </h1>
        <p className="text-gray-500 mt-1">Transform your product photos into marketplace-ready professional images</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Upload + Processing */}
        <div className="md:col-span-2 space-y-4">
          {!image ? (
            /* Upload Zone */
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-700 text-lg">Click to upload or drag & drop</h3>
              <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, WEBP — up to 10MB</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
          ) : !enhanced ? (
            /* Processing view */
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex gap-4">
                <img src={image} alt="uploaded" className="w-40 h-40 object-cover rounded-xl border" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-3">
                    {processing ? 'AI is analyzing your product...' : 'Ready to enhance'}
                  </h3>
                  <div className="space-y-2">
                    {STEPS.map((step, i) => (
                      <div key={step} className="flex items-center gap-2 text-sm">
                        <AnimatePresence mode="wait">
                          {doneSteps > i ? (
                            <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            </motion.div>
                          ) : processing && doneSteps === i ? (
                            <motion.div key="loading" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                              <RefreshCw className="w-4 h-4 text-purple-500 shrink-0" />
                            </motion.div>
                          ) : (
                            <div key="empty" className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0" />
                          )}
                        </AnimatePresence>
                        <span className={doneSteps > i ? 'text-green-700 font-medium' : doneSteps === i && processing ? 'text-purple-700 font-medium' : 'text-gray-400'}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleEnhance} disabled={processing}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  {processing ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing…</> : '✨ Enhance with AI'}
                </button>
                <button onClick={reset} className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm">Try Another</button>
              </div>
            </div>
          ) : (
            /* Before / After Comparison */
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                <CheckCircle2 className="w-5 h-5" /> AI Enhancement Complete!
              </div>
              {/* Slider comparison */}
              <div className="relative rounded-xl overflow-hidden border border-gray-200 select-none" style={{ height: 280 }}>
                {/* AFTER (background) */}
                <div className="absolute inset-0"
                  style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(1.15) contrast(1.08) saturate(1.2)' }} />
                {/* BEFORE (clipped) */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: `${10000 / sliderPos}%` }} />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</div>
                </div>
                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">AFTER ✨ AI Enhanced</div>
                {/* Divider */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-purple-400 text-purple-600 text-xs font-bold">↔</div>
                </div>
                <input type="range" min={5} max={95} value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full" />
              </div>
              <p className="text-xs text-gray-500 text-center">Drag the slider to compare before and after</p>

              {/* Detection result */}
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-sm">
                <div className="font-bold text-purple-900 mb-2">AI Detection Result</div>
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <span><strong>Detected:</strong> Bamboo Storage Basket</span>
                  <span><strong>Category:</strong> Bamboo Craft</span>
                  <span><strong>Confidence:</strong> 94%</span>
                  <span><strong>Background:</strong> Studio White</span>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate('/artisan/voice-catalog')}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  Create Catalog from Image <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button onClick={reset} className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm">
                  Try Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Tips */}
        <div className="space-y-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">📸 Photography Tips</h3>
            <div className="space-y-3">
              {TIPS.map((t) => (
                <div key={t.text} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-xl shrink-0">{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
            <h3 className="font-bold text-orange-800 text-sm mb-1">🤖 AI Capabilities</h3>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• Automatic background removal</li>
              <li>• Lighting correction</li>
              <li>• Product detection &amp; tagging</li>
              <li>• Marketplace-ready format</li>
              <li>• Category suggestion</li>
            </ul>
            <p className="text-xs text-orange-500 mt-2 italic">Demo: Enhancement is simulated with CSS filters</p>
          </div>
        </div>
      </div>
    </div>
  );
}
