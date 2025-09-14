'use client';

import { useState } from 'react';
import { onboardingSlides } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Trophy, CheckCircle, FileText, Share, SkipBack as Skip } from 'lucide-react';

const iconMap = {
  Trophy,
  CheckCircle,
  FileText,
  Share
};

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    window.location.href = '/dashboard';
  };

  const slide = onboardingSlides[currentSlide];
  const IconComponent = iconMap[slide.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-center lg:text-left">
                  {/* Skip Button */}
                  <div className="flex justify-end mb-6 lg:hidden">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSkip}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Skip
                    </Button>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Progress Indicators */}
                  <div className="flex justify-center lg:justify-start space-x-2 mb-8">
                    {onboardingSlides.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide
                            ? 'bg-blue-600'
                            : index < currentSlide
                            ? 'bg-blue-300'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentSlide === 0}
                      className="flex items-center space-x-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </Button>

                    <div className="hidden lg:block">
                      <Button 
                        variant="ghost" 
                        onClick={handleSkip}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Skip Tour
                      </Button>
                    </div>

                    <Button
                      onClick={handleNext}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <span>
                        {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
                      </span>
                      {currentSlide < onboardingSlides.length - 1 && <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Step Counter */}
                  <div className="mt-6 text-center lg:text-left">
                    <span className="text-sm text-gray-500">
                      Step {currentSlide + 1} of {onboardingSlides.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}