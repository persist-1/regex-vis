import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SimpleGraph from '@/modules/graph/simple-graph'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { regexCategories, getAllSamples, getSamplesByCategory } from './data'
import type { RegexSample } from './data'

function Samples() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // Get samples for currently selected category
  const currentSamples: RegexSample[] = selectedCategory === 'all' 
    ? getAllSamples() 
    : getSamplesByCategory(selectedCategory)

  return (
    <div className="flex h-full bg-graph-bg">
      {/* Left sidebar */}
      <div className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {t('Regex Samples')}
          </h2>
          <div className="space-y-2">
            {/* All categories button */}
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              className={`w-full justify-between text-left h-auto p-3 mb-1 rounded-md font-medium ${
                selectedCategory === 'all' 
                  ? 'dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white' 
                  : 'dark:hover:bg-gray-800'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              <div className="flex items-center">
                <span className="mr-3 text-base">📋</span>
                <span>{t('All Categories')}</span>
              </div>
              <span className="text-sm opacity-70">{getAllSamples().length}</span>
            </Button>
            
            {/* Category buttons */}
            {regexCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                className={`w-full justify-between text-left h-auto p-3 mb-1 rounded-md font-medium ${
                  selectedCategory === category.id 
                    ? 'dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white' 
                    : 'dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-base">{category.icon}</span>
                  <span>{t(category.name)}</span>
                </div>
                <span className="text-sm opacity-70">{category.samples.length}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Category header */}


              {/* Sample list */}
              <div className="space-y-8">
                {currentSamples.map((sample, index) => {
                  const linkTo = `/?r=${encodeURIComponent(`/${sample.regex}/`)}`
                  return (
                    <div key={`${sample.regex}-${index}`} className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
                      {/* Sample title and description */}
                      <div className="mb-4">
                        <Link to={linkTo} className="group">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {t(sample.desc)}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {sample.explanation ? t(sample.explanation) : ''}
                          </p>
                        </Link>
                      </div>

                      {/* Regular expression */}
                      <div className="mb-6">
                        <Link to={linkTo}>
                          <code className="inline-block bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 font-mono text-base px-4 py-3 rounded-md border hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {sample.label}
                          </code>
                        </Link>
                      </div>

                      {/* Visualization graph */}
                      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <ScrollArea>
                          <Link to={linkTo} className="block">
                            <div className="p-6 bg-graph-bg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <SimpleGraph regex={sample.regex} />
                            </div>
                          </Link>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Empty state */}
              {currentSamples.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📝</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('No regex samples available for this category')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default Samples
