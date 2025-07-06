"use client";

import React, { useState, useMemo } from 'react';
import { Search, Star, Filter, ChevronDown, ChevronUp, Zap, Shield, Code, Globe, Brain, DollarSign } from 'lucide-react';

export default function LLMComparison() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    rating: '',
    useCase: '',
    pricing: ''
  });
  const [expandedModels, setExpandedModels] = useState({});
  const [sortBy, setSortBy] = useState('rank');

  const llmData = [
    {
      rank: 1,
      name: "ChatGPT o3",
      company: "OpenAI",
      rating: 5,
      logo: "🤖",
      pricing: "Premium",
      pros: [
        "Feels like texting a super-smart friend but still crushes tough math & code",
        "Understands images, web posts and can run web-search + Python in one go"
      ],
      cons: [
        "Closed-source, so you can't self-host",
        "Free tier has daily limits"
      ],
      useCases: [
        "Everyday co-pilot ('explain this sheet, draft the email')",
        "Picture detective - snap a diagram and ask what it shows",
        "Rapid code prototyping from rough JSON"
      ],
      features: ["Web Search", "Code Execution", "Image Analysis", "Document Processing"],
      contextLength: "128K",
      specialties: ["General Purpose", "Coding", "Analysis"]
    },
    {
      rank: 2,
      name: "Claude 3.7 Sonnet",
      company: "Anthropic",
      rating: 5,
      logo: "🔥",
      pricing: "Premium",
      pros: [
        "Hybrid chat so deep 'think' mode that user gets to pivot or down",
        "Swallows 200-page docs without losing the thread",
        "New Claude Code CLI for scripted workflows"
      ],
      cons: [
        "Strict safety filter; may over-refuse edgy-but-benign asks",
        "Sees images but can't create them"
      ],
      useCases: [
        "Contract or policy deep-dives",
        "Splitting a huge PDF into a plain-English decision tree",
        "Refactor a sprawling repo in one go"
      ],
      features: ["Long Context", "Document Analysis", "Code Generation", "Safety Focused"],
      contextLength: "200K",
      specialties: ["Document Analysis", "Safety", "Long-form Content"]
    },
    {
      rank: 3,
      name: "Gemini 2.5 Pro",
      company: "Google",
      rating: 4,
      logo: "💎",
      pricing: "Freemium",
      pros: [
        "Up to 1 million-token context (whole novel or hour-long video)",
        "Works right inside Gmail, Docs & Android",
        "One chat can mix text, pictures and video"
      ],
      cons: [
        "1 M-token mode is still preview-only and slower",
        "Closed-source, API-only"
      ],
      useCases: [
        "Turn a lecture video + slides into a study guide",
        "Summarise messy 'Q2 OKR' email threads",
        "Brainstorm UI ideas from a phone photo of a napkin sketch"
      ],
      features: ["Multimodal", "Long Context", "Google Integration", "Video Analysis"],
      contextLength: "1M",
      specialties: ["Multimodal", "Integration", "Long Context"]
    },
    {
      rank: 4,
      name: "DeepSeek V3",
      company: "DeepSeek",
      rating: 4,
      logo: "🔮",
      pricing: "Budget",
      pros: [
        "Fully open MIT licence—tweak or self-host freely",
        "MoE design = strong reasoning for peanuts in GPU hours",
        "128 k-token context (Hugging Face)"
      ],
      cons: [
        "Text-only for now",
        "Needs savvy server setup for top speed"
      ],
      useCases: [
        "Cheap private RAG on company docs",
        "Academic research not you can fine-tune",
        "Edge deployment on a single GPU box"
      ],
      features: ["Open Source", "Self-Hostable", "Cost Effective", "Fine-tunable"],
      contextLength: "128K",
      specialties: ["Open Source", "Self-Hosting", "Cost Efficiency"]
    },
    {
      rank: 5,
      name: "Grok 3",
      company: "xAI",
      rating: 4,
      logo: "⚡",
      pricing: "Premium",
      pros: [
        "Puts live social buzz on demand",
        "Solid at diagram & spatial Q&A (MAI)"
      ],
      cons: [
        "Access tied to X Premium's proprietary",
        "Some benchmark claims still debated"
      ],
      useCases: [
        "Real-time 'what's trending?' dashboards",
        "Snappy brand-voice replies for social media",
        "Explain a wiring schematic in plain English"
      ],
      features: ["Real-time Data", "Social Integration", "Visual Analysis", "X Platform"],
      contextLength: "128K",
      specialties: ["Real-time", "Social Media", "Visual Analysis"]
    },
    {
      rank: 6,
      name: "Llama 3.1 (405 B)",
      company: "Meta",
      rating: 4,
      logo: "🦙",
      pricing: "Free",
      pros: [
        "Biggest truly open model—full weights & tuning scripts",
        "Multilingual (30 + languages) with 128 k context (Meta AI)"
      ],
      cons: [
        "Licence bars use in mega-scale compute; apps (> 700 M MAU)",
        "No built-in vision yet"
      ],
      useCases: [
        "On-prem medical or legal assistant you fine-tune yourself",
        "Privacy-first journaling bot that never leaves your server",
        "Offline translation in the field"
      ],
      features: ["Open Source", "Multilingual", "Large Scale", "Privacy Focused"],
      contextLength: "128K",
      specialties: ["Open Source", "Multilingual", "Privacy"]
    },
    {
      rank: 7,
      name: "Mistral Pixtral Large",
      company: "Mistral",
      rating: 4,
      logo: "🎯",
      pricing: "Freemium",
      pros: [
        "124 B multilingual model—reads screenshots, photos, docs",
        "Codestrsal cousin plugs straight into IDEs for code-gen",
        "Smaller Mistral models are free & light (mistral.ai)"
      ],
      cons: [
        "Flagship version is paid; vision still marked preview",
        "Closed weights for top tier"
      ],
      useCases: [
        "Screenshot debugging ('why is this config wrong?')",
        "Function-calling agents that return tidy JSON",
        "Bulk document image parsing"
      ],
      features: ["Multilingual", "Vision", "Code Generation", "Function Calling"],
      contextLength: "128K",
      specialties: ["Multilingual", "Vision", "Code Generation"]
    },
    {
      rank: 8,
      name: "Qwen 2.5 Max",
      company: "Alibaba",
      rating: 4,
      logo: "🌟",
      pricing: "Budget",
      pros: [
        "Excels at Chinese ↔ English and spits out clean JSON",
        "Both open weights and ultra-cheap cloud API (Qwen)"
      ],
      cons: [
        "Docs lean Chinese-first; vision lives in a separate model",
        "Some sizes under non-Apache licence"
      ],
      useCases: [
        "Bilingual customer-support chat",
        "Bulk form-to-JSON extraction for audits",
        "High-volume budget chat apps"
      ],
      features: ["Bilingual", "JSON Output", "Cost Effective", "Open Weights"],
      contextLength: "128K",
      specialties: ["Bilingual", "JSON Processing", "Cost Efficiency"]
    }
  ];

  const useCaseCategories = [
    "General Purpose", "Coding", "Analysis", "Document Processing", "Multimodal", 
    "Privacy", "Cost Efficiency", "Real-time", "Multilingual"
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = llmData.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.useCases.some(uc => uc.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = !selectedFilters.rating || model.rating >= parseInt(selectedFilters.rating);
      const matchesPricing = !selectedFilters.pricing || model.pricing === selectedFilters.pricing;
      const matchesUseCase = !selectedFilters.useCase || 
                           model.specialties.includes(selectedFilters.useCase) ||
                           model.useCases.some(uc => uc.toLowerCase().includes(selectedFilters.useCase.toLowerCase()));
      
      return matchesSearch && matchesRating && matchesPricing && matchesUseCase;
    });

    if (sortBy === 'rank') {
      filtered.sort((a, b) => a.rank - b.rank);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedFilters, sortBy]);

  const toggleExpand = (modelName) => {
    setExpandedModels(prev => ({
      ...prev,
      [modelName]: !prev[modelName]
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  const getPricingColor = (pricing) => {
    switch(pricing) {
      case 'Free': return 'bg-green-100 text-green-800';
      case 'Budget': return 'bg-blue-100 text-blue-800';
      case 'Freemium': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpecialtyIcon = (specialty) => {
    const icons = {
      'General Purpose': Brain,
      'Coding': Code,
      'Analysis': Filter,
      'Privacy': Shield,
      'Cost Efficiency': DollarSign,
      'Real-time': Zap,
      'Multilingual': Globe
    };
    return icons[specialty] || Brain;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🤖 LLM Comparison Tool
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect AI model for your needs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search models, companies, or use cases..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedFilters.rating}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedFilters.pricing}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, pricing: e.target.value }))}
            >
              <option value="">All Pricing</option>
              <option value="Free">Free</option>
              <option value="Budget">Budget</option>
              <option value="Freemium">Freemium</option>
              <option value="Premium">Premium</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rank">Sort by Rank</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Specialty:</label>
            <div className="flex flex-wrap gap-2">
              {useCaseCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedFilters(prev => ({ 
                    ...prev, 
                    useCase: prev.useCase === category ? '' : category 
                  }))}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedFilters.useCase === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredAndSortedData.map((model) => (
            <div key={model.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{model.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                      <p className="text-gray-600">{model.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">{renderStars(model.rating)}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPricingColor(model.pricing)}`}>
                          {model.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      #{model.rank}
                    </span>
                    <button
                      onClick={() => toggleExpand(model.name)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {expandedModels[model.name] ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {model.specialties.map(specialty => {
                    const IconComponent = getSpecialtyIcon(specialty);
                    return (
                      <div key={specialty} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                        <IconComponent className="w-3 h-3" />
                        <span className="text-xs font-medium text-gray-700">{specialty}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">✅ Key Strengths</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {model.pros.slice(0, 2).map((pro, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">⚠️ Limitations</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {model.cons.slice(0, 2).map((con, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">🎯 Best For</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {model.useCases.slice(0, 2).map((useCase, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-1">•</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {expandedModels[model.name] && (
                  <div className="border-t pt-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">📋 All Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {model.features.map(feature => (
                            <span key={feature} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">
                            <strong>Context Length:</strong> {model.contextLength}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">💡 All Use Cases</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {model.useCases.map((useCase, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2">▶</span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No models match your criteria</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">
            💡 <strong>Pro Tip:</strong> Click the expand button to see detailed features and use cases
          </p>
          <p className="text-sm">
            Data based on latest available information. Consider testing models for your specific use case.
          </p>
        </div>
      </div>
    </div>
  );
}
