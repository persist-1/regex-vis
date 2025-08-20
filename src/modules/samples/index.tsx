import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import SimpleGraph from '@/modules/graph/simple-graph'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { regexCategories, getAllSamples, getSamplesByCategory } from './data'
import type { RegexSample } from './data'

function Samples() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // 获取当前选中分类的样例
  const currentSamples: RegexSample[] = selectedCategory === 'all' 
    ? getAllSamples() 
    : getSamplesByCategory(selectedCategory)

  return (
    <div className="flex h-full bg-graph-bg">
      {/* 左侧分类栏 */}
      <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('Samples')}
          </h2>
          <div className="space-y-2">
            {/* 全部分类按钮 */}
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              className={clsx(
                'w-full justify-start text-left h-auto p-3',
                selectedCategory === 'all' 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
              onClick={() => setSelectedCategory('all')}
            >
              <span className="mr-2">📋</span>
              <span>{t('All Categories')}</span>
            </Button>
            
            {/* 分类按钮 */}
            {regexCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                className={clsx(
                  'w-full justify-start text-left h-auto p-3',
                  selectedCategory === category.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{t(category.name)}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* 分类标题 */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCategory === 'all' 
                    ? t('All Categories')
                    : t(regexCategories.find(cat => cat.id === selectedCategory)?.name || '')
                  }
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCategory === 'all'
                    ? `共 ${currentSamples.length} 个正则表达式样例`
                    : `${currentSamples.length} 个样例`
                  }
                </p>
              </div>

              {/* 样例列表 */}
              <div className="space-y-8">
                {currentSamples.map((sample, index) => {
                  const linkTo = `/?r=${encodeURIComponent(`/${sample.regex}/`)}`
                  return (
                    <div key={`${sample.regex}-${index}`} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                      {/* 样例标题和描述 */}
                      <div className="mb-4">
                        <Link to={linkTo} className="group">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {t(sample.desc)}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {sample.explanation}
                          </p>
                        </Link>
                      </div>

                      {/* 正则表达式 */}
                      <div className="mb-4">
                        <Link to={linkTo}>
                          <code className="inline-block bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 font-mono text-sm px-3 py-2 rounded border hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {sample.label}
                          </code>
                        </Link>
                      </div>

                      {/* 可视化图形 */}
                      <div className="border border-gray-200 dark:border-gray-600 rounded overflow-hidden">
                        <ScrollArea>
                          <Link to={linkTo} className="block">
                            <div className="p-4 bg-graph-bg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
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

              {/* 空状态 */}
              {currentSamples.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📝</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    该分类暂无样例
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
