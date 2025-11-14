'use client';

import { useState } from 'react';
import { Film, Sparkles, Copy, Check } from 'lucide-react';

interface Scene {
  number: number;
  setting: string;
  cameraAngle: string;
  cameraMovement: string;
  actions: string;
  lighting: string;
  colors: string;
  atmosphere: string;
  objects: string;
}

interface VideoPrompt {
  title: string;
  oneLine: string;
  mood: string;
  style: string;
  scenes: Scene[];
  fullPrompt: string;
  voiceover?: string;
  dialogue?: string;
  thumbnail?: string;
  tags?: string;
  musicStyle?: string;
}

export default function Home() {
  const [idea, setIdea] = useState('');
  const [includeOptionals, setIncludeOptionals] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoPrompt | null>(null);
  const [copied, setCopied] = useState(false);

  const generatePrompt = async () => {
    if (!idea.trim()) return;

    setLoading(true);

    // Simulate AI generation with detailed cinematic prompts
    setTimeout(() => {
      const generatedPrompt = createCinematicPrompt(idea, includeOptionals);
      setResult(generatedPrompt);
      setLoading(false);
    }, 1500);
  };

  const createCinematicPrompt = (userIdea: string, withOptionals: boolean): VideoPrompt => {
    // Parse the idea and create cinematic content
    const ideaLower = userIdea.toLowerCase();

    // Determine mood and style based on keywords
    let mood = 'inspirational';
    let style = 'cinematic';

    if (ideaLower.includes('sad') || ideaLower.includes('lonely') || ideaLower.includes('loss')) {
      mood = 'melancholic and emotional';
      style = 'soft, muted cinematic';
    } else if (ideaLower.includes('action') || ideaLower.includes('fight') || ideaLower.includes('chase')) {
      mood = 'intense and thrilling';
      style = 'dynamic, high-contrast cinematic';
    } else if (ideaLower.includes('love') || ideaLower.includes('romance')) {
      mood = 'warm and tender';
      style = 'soft, romantic cinematic';
    } else if (ideaLower.includes('horror') || ideaLower.includes('scary')) {
      mood = 'tense and unsettling';
      style = 'dark, atmospheric cinematic';
    }

    const scenes: Scene[] = [
      {
        number: 1,
        setting: 'Wide establishing shot of the main environment',
        cameraAngle: 'Wide angle, eye level',
        cameraMovement: 'Slow push forward',
        actions: 'Scene sets the tone and introduces the world',
        lighting: 'Natural, balanced lighting with subtle contrast',
        colors: 'Rich, saturated palette with dominant blues and golds',
        atmosphere: 'Calm, immersive, inviting',
        objects: 'Environmental details that establish context'
      },
      {
        number: 2,
        setting: 'Medium shot focusing on main subject',
        cameraAngle: 'Slightly low angle',
        cameraMovement: 'Steady, subtle orbit',
        actions: 'Subject performs key action or reveals emotion',
        lighting: 'Dramatic side lighting with soft shadows',
        colors: 'Warm tones highlighting the subject',
        atmosphere: 'Focused, intimate, emotional',
        objects: 'Props that support the narrative'
      },
      {
        number: 3,
        setting: 'Close-up emotional moment',
        cameraAngle: 'Close-up, slightly off-center',
        cameraMovement: 'Slow dolly in',
        actions: 'Peak emotional or dramatic moment',
        lighting: 'Soft key light with gentle rim lighting',
        colors: 'Enhanced contrast with deep blacks and bright highlights',
        atmosphere: 'Intense, powerful, climactic',
        objects: 'Key symbolic element in sharp focus'
      },
      {
        number: 4,
        setting: 'Final wide resolution shot',
        cameraAngle: 'Wide, elevated perspective',
        cameraMovement: 'Slow crane up or pull back',
        actions: 'Resolution or contemplative ending',
        lighting: 'Golden hour or twilight lighting',
        colors: 'Cohesive palette tying all scenes together',
        atmosphere: 'Reflective, satisfying, complete',
        objects: 'Full scene with all elements visible'
      }
    ];

    const fullPrompt = `A cinematic ${style} video about ${userIdea}.

Scene 1: Wide establishing shot. The camera slowly pushes forward through the environment, revealing rich details. Natural balanced lighting bathes the scene in warm golds and cool blues. The atmosphere is calm and inviting, drawing the viewer into this world.

Scene 2: The camera shifts to a medium shot, orbiting subtly around the main subject. Dramatic side lighting creates depth and dimension. Warm tones highlight the subject as they perform the key action. The mood becomes focused and intimate.

Scene 3: Close-up on the emotional peak. The camera slowly dollies in, capturing every detail. Soft key light with gentle rim lighting creates a luminous quality. Deep blacks contrast with bright highlights. This is the most powerful moment - ${mood} and intense.

Scene 4: The camera cranes up to a wide elevated shot, pulling back to reveal the full scene. Golden hour lighting wraps everything in a warm glow. The atmosphere is reflective and complete, leaving the viewer with a sense of resolution.

Style notes: ${style}, professional color grading, 24fps cinematic motion blur, shallow depth of field on close-ups, wider depth on establishing shots. Smooth camera movements throughout. Emotional and visually stunning.`;

    const prompt: VideoPrompt = {
      title: `Cinematic: ${userIdea.substring(0, 50)}${userIdea.length > 50 ? '...' : ''}`,
      oneLine: `A ${mood} ${style} exploration of ${userIdea}`,
      mood,
      style,
      scenes,
      fullPrompt
    };

    if (withOptionals) {
      prompt.voiceover = `In every moment, we find meaning. This is a story about ${userIdea}. Watch as the journey unfolds, revealing beauty in every frame.`;
      prompt.dialogue = ideaLower.includes('dialogue') || ideaLower.includes('conversation')
        ? 'Character 1: "This changes everything."\nCharacter 2: "It always does."'
        : undefined;
      prompt.thumbnail = `Cinematic poster style image: main subject centered, dramatic lighting, bold typography overlaid with title, ${style} color grading, professional composition`;
      prompt.tags = `#cinematic #${mood.split(' ')[0]} #videography #shortfilm #storytelling #visualart #${userIdea.split(' ')[0].toLowerCase()}`;
      prompt.musicStyle = ideaLower.includes('action')
        ? 'Epic orchestral with driving percussion and powerful brass'
        : ideaLower.includes('sad') || ideaLower.includes('emotional')
        ? 'Minimalist piano with soft strings, melancholic and tender'
        : 'Atmospheric ambient with gentle swells, inspiring and hopeful';
    }

    return prompt;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cinematic Prompt Generator
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Transform simple ideas into professional text-to-video prompts
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20 mb-8">
          <div className="mb-6">
            <label htmlFor="idea" className="block text-lg font-semibold mb-3 text-purple-300">
              Your Video Idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A lone astronaut discovers a mysterious signal on Mars..."
              className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOptionals}
                onChange={(e) => setIncludeOptionals(e.target.checked)}
                className="w-5 h-5 rounded border-purple-500/30 bg-slate-900/50 text-purple-500 focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-gray-300">Include optional add-ons (voiceover, music style, tags, etc.)</span>
            </label>
          </div>

          <button
            onClick={generatePrompt}
            disabled={loading || !idea.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Cinematic Prompt
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Video Concept */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-4 text-purple-300 flex items-center gap-2">
                <Film className="w-6 h-6" />
                Video Concept
              </h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <span className="font-semibold text-purple-400">Title:</span> {result.title}
                </div>
                <div>
                  <span className="font-semibold text-purple-400">One-line:</span> {result.oneLine}
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Mood & Emotion:</span> {result.mood}
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Style:</span> {result.style}
                </div>
              </div>
            </div>

            {/* Scene Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Scene Breakdown</h2>
              <div className="space-y-6">
                {result.scenes.map((scene) => (
                  <div key={scene.number} className="bg-slate-900/50 rounded-lg p-6 border border-purple-500/10">
                    <h3 className="text-xl font-semibold mb-4 text-pink-400">Scene {scene.number}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <span className="font-semibold text-purple-400">Setting:</span> {scene.setting}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Camera Angle:</span> {scene.cameraAngle}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Camera Movement:</span> {scene.cameraMovement}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Actions:</span> {scene.actions}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Lighting:</span> {scene.lighting}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Colors:</span> {scene.colors}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Atmosphere:</span> {scene.atmosphere}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-400">Objects:</span> {scene.objects}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Prompt */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-300">Full Text-to-Video Prompt</h2>
                <button
                  onClick={() => copyToClipboard(result.fullPrompt)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-500/10">
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.fullPrompt}</p>
              </div>
            </div>

            {/* Optional Add-ons */}
            {includeOptionals && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6 text-purple-300">Optional Add-ons</h2>
                <div className="space-y-6">
                  {result.voiceover && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-pink-400">Voiceover Script</h3>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                        <p className="text-gray-300 italic">{result.voiceover}</p>
                      </div>
                    </div>
                  )}
                  {result.dialogue && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-pink-400">Dialogue</h3>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                        <p className="text-gray-300 whitespace-pre-line">{result.dialogue}</p>
                      </div>
                    </div>
                  )}
                  {result.thumbnail && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-pink-400">Thumbnail/Poster Prompt</h3>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                        <p className="text-gray-300">{result.thumbnail}</p>
                      </div>
                    </div>
                  )}
                  {result.tags && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-pink-400">Captions & Tags</h3>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                        <p className="text-gray-300">{result.tags}</p>
                      </div>
                    </div>
                  )}
                  {result.musicStyle && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-pink-400">Music Style & Sound Mood</h3>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                        <p className="text-gray-300">{result.musicStyle}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
