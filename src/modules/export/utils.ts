export type ExportFormat = 'svg'

/**
 * 导出SVG格式
 * @param svgElement SVG元素
 * @param filename 文件名
 */
export const exportSVG = (svgElement: SVGElement, filename: string = 'regex-graph') => {
  try {
    console.log('=== 开始SVG导出处理 ===')
    console.log('原始SVG元素:', svgElement)
    
    // 克隆SVG元素以避免修改原始元素
    const clonedSvg = svgElement.cloneNode(true) as SVGElement
    
    // 设置SVG的xmlns属性以确保独立性
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    
    // 处理foreignObject元素，将其转换为原生SVG文本元素
    const foreignObjects = clonedSvg.querySelectorAll('foreignObject')
    console.log(`找到 ${foreignObjects.length} 个 foreignObject 元素`)
    foreignObjects.forEach((fo, index) => {
      console.log(`处理 foreignObject ${index + 1}:`, fo)
      const div = fo.querySelector('div')
      if (div) {
        // 智能提取文本内容，包括处理图标元素
        console.log('div内容:', div.innerHTML)
        const extractedContent = extractTextWithIcons(div)
        console.log('提取的内容:', extractedContent)
        const x = parseFloat(fo.getAttribute('x') || '0')
        const y = parseFloat(fo.getAttribute('y') || '0')
        const width = parseFloat(fo.getAttribute('width') || '0')
        const height = parseFloat(fo.getAttribute('height') || '0')
        
        // 创建SVG text元素替换foreignObject
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        textElement.setAttribute('x', (x + width / 2).toString())
        textElement.setAttribute('y', (y + height / 2 + 6).toString()) // 调整垂直居中
        textElement.setAttribute('text-anchor', 'middle')
        textElement.setAttribute('dominant-baseline', 'middle')
        textElement.setAttribute('font-family', 'ui-monospace, monospace')
        textElement.setAttribute('font-size', fo.getAttribute('font-size') || '16')
        textElement.setAttribute('fill', '#111827')
        // 确保特殊Unicode字符（如∞）能正确显示
        textElement.setAttribute('unicode-bidi', 'embed')
        textElement.setAttribute('direction', 'ltr')
        textElement.textContent = extractedContent
        
        // 替换foreignObject
        fo.parentNode?.replaceChild(textElement, fo)
      }
    })
    
    // 处理主SVG中的独立图标元素（如循环图标）
    const allSvgs = clonedSvg.querySelectorAll('svg')
    console.log(`导出处理：找到 ${allSvgs.length} 个SVG元素`)
    
    allSvgs.forEach((iconSvg, index) => {
      // 跳过主SVG容器本身
      if (iconSvg === clonedSvg) {
        console.log(`跳过主SVG容器 (索引 ${index})`)
        return
      }
      
      const paths = iconSvg.querySelectorAll('path')
      let isLoopIcon = false
      
      console.log(`检查SVG ${index}，包含 ${paths.length} 个path元素`)
      
      // 检测循环图标
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const d = path.getAttribute('d') || ''
        console.log(`Path ${i}: ${d.substring(0, 50)}...`)
        
        if ((d.includes('M17 1l4 4-4 4') || d.includes('M7 23l-4-4 4-4')) ||
            (d.includes('M3 11V9a4 4') && d.includes('M21 13v2a4 4')) ||
            (d.includes('l4 4-4 4') && d.includes('l-4-4 4-4'))) {
          isLoopIcon = true
          console.log(`检测到循环图标路径: ${d}`)
          break
        }
      }
      
      if (isLoopIcon) {
        console.log('在主SVG中检测到循环图标，正在转换为文本')
        
        // 获取图标的位置和尺寸信息
        const width = parseFloat(iconSvg.getAttribute('width') || '18')
        const height = parseFloat(iconSvg.getAttribute('height') || '18')
        const transform = iconSvg.getAttribute('transform') || ''
        
        console.log(`图标尺寸: ${width}x${height}, transform: ${transform}`)
        
        // 尝试从父元素的样式或属性获取位置
        let x = 0, y = 0
        
        // 检查transform属性
        const translateMatch = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/)
        if (translateMatch) {
          x = parseFloat(translateMatch[1])
          y = parseFloat(translateMatch[2])
          console.log(`从transform获取位置: (${x}, ${y})`)
        } else {
          // 尝试从父元素获取位置信息
          const parent = iconSvg.parentElement
          if (parent) {
            const style = window.getComputedStyle(parent)
            const left = parseFloat(style.left || '0')
            const top = parseFloat(style.top || '0')
            if (left || top) {
              x = left
              y = top
              console.log(`从父元素样式获取位置: (${x}, ${y})`)
            }
          }
        }
        
        // 创建文本元素替换图标
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        textElement.setAttribute('x', (x + width / 2).toString())
        textElement.setAttribute('y', (y + height / 2 + 4).toString())
        textElement.setAttribute('text-anchor', 'middle')
        textElement.setAttribute('dominant-baseline', 'middle')
        textElement.setAttribute('font-family', 'ui-monospace, monospace')
        textElement.setAttribute('font-size', Math.min(width * 0.8, 14).toString())
        textElement.setAttribute('fill', 'currentColor')
        textElement.textContent = '↻'
        
        console.log(`创建循环文本元素，位置: (${x + width / 2}, ${y + height / 2 + 4})`)
        
        // 替换图标SVG
        if (iconSvg.parentNode) {
          iconSvg.parentNode.replaceChild(textElement, iconSvg)
          console.log('成功替换循环图标为文本')
        }
      }
    })
    
    // 获取计算样式并内联到SVG中
    const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    const computedStyles = getComputedStylesForSVG(svgElement)
    styleElement.textContent = computedStyles
    clonedSvg.insertBefore(styleElement, clonedSvg.firstChild)
    
    // 序列化SVG
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(clonedSvg)
    
    // 创建Blob并下载
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    downloadBlob(blob, `${filename}.svg`)
  } catch (error) {
    console.error('SVG导出失败:', error)
    throw new Error('SVG导出失败')
  }
}





/**
 * 智能提取文本内容，包括处理图标元素
 * @param element - 要提取文本的DOM元素
 * @returns 提取的文本内容
 */
function extractTextWithIcons(element: Element): string {
  console.log('=== extractTextWithIcons 开始处理 ===')
  console.log('处理元素:', element)
  console.log('子节点数量:', element.childNodes.length)
  
  let result = ''
  
  // 遍历所有子节点
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i]
    console.log(`处理子节点 ${i}:`, node.nodeType, node)
    
    if (node.nodeType === Node.TEXT_NODE) {
      // 文本节点直接添加
      const textContent = node.textContent || ''
      console.log('文本节点内容:', textContent)
      result += textContent
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element
      console.log('元素节点标签:', el.tagName)
      
      // 检查是否是SVG图标（无穷符号或循环图标）
      if (el.tagName.toLowerCase() === 'svg' && el.querySelector('path')) {
        // 检查SVG是否包含特定图标的路径特征
        const paths = el.querySelectorAll('path')
        let isInfinityIcon = false
        let isLoopIcon = false
        
        for (let j = 0; j < paths.length; j++) {
          const path = paths[j]
          const d = path.getAttribute('d') || ''
          
          // 检测无穷符号：检查特定的路径模式
          // 无穷符号通常包含弧形路径和特定的坐标模式
          if ((d.includes('M248,128') && d.includes('95.6,39.6')) || 
              (d.includes('C') && d.includes('a56,56') && d.length > 100) ||
              (d.includes('a40,40') && d.includes('56.9') && d.length > 50)) {
            isInfinityIcon = true
            break
          }
          
          // 检测循环图标：检查循环箭头的特定路径模式
          // 循环图标包含箭头路径和弧形连接线
          if ((d.includes('M17 1l4 4-4 4') || d.includes('M7 23l-4-4 4-4')) ||
              (d.includes('M3 11V9a4 4') && d.includes('M21 13v2a4 4')) ||
              (d.includes('l4 4-4 4') && d.includes('l-4-4 4-4'))) {
            isLoopIcon = true
            break
          }
        }
        
        if (isInfinityIcon) {
          console.log('检测到无穷符号图标')
          result += '∞'
        } else if (isLoopIcon) {
          console.log('检测到循环图标')
          result += '↻'  // 使用循环符号
        } else {
          console.log('未识别的SVG图标，路径:', paths.length > 0 ? paths[0].getAttribute('d') : 'no paths')
          // 其他SVG图标，尝试从aria-label或title获取文本
          const ariaLabel = el.getAttribute('aria-label')
          const title = el.querySelector('title')?.textContent
          if (ariaLabel) {
            result += ariaLabel
          } else if (title) {
            result += title
          }
        }
      } else {
        // 递归处理其他元素
        result += extractTextWithIcons(el)
      }
    }
  }
  
  return result
}

/**
 * 获取当前主题的颜色值
 * @returns 主题颜色对象
 */
function getCurrentThemeColors() {
  const rootStyles = getComputedStyle(document.documentElement)
  
  // 获取CSS变量值
  const graphColor = rootStyles.getPropertyValue('--graph').trim() || '#000000'
  const foregroundColor = rootStyles.getPropertyValue('--foreground').trim()
  const backgroundColor = rootStyles.getPropertyValue('--background').trim()
  
  // 转换HSL到十六进制（如果需要）
  const convertHslToHex = (hsl: string): string => {
    if (hsl.startsWith('#')) return hsl
    if (!hsl) return '#000000'
    
    // 简单的HSL到RGB转换（适用于常见的HSL格式）
    const hslMatch = hsl.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/)
    if (hslMatch) {
      const h = parseFloat(hslMatch[1]) / 360
      const s = parseFloat(hslMatch[2]) / 100
      const l = parseFloat(hslMatch[3]) / 100
      
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      const r = Math.round(hue2rgb(p, q, h + 1/3) * 255)
      const g = Math.round(hue2rgb(p, q, h) * 255)
      const b = Math.round(hue2rgb(p, q, h - 1/3) * 255)
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    }
    
    return '#000000'
  }
  
  return {
    graph: graphColor.startsWith('#') ? graphColor : convertHslToHex(foregroundColor) || '#000000',
    foreground: convertHslToHex(foregroundColor) || '#000000',
    background: convertHslToHex(backgroundColor) || '#ffffff'
  }
}

/**
 * 获取SVG的计算样式
 * @param svgElement SVG元素
 * @returns CSS样式字符串
 */
function getComputedStylesForSVG(svgElement: SVGElement): string {
  const colors = getCurrentThemeColors()
  const styles: string[] = []
  
  // 添加基础样式，使用黑色作为导出颜色
  styles.push(`
    .stroke-graph { stroke: #000000 !important; stroke-width: 1; }
    .fill-transparent { fill: transparent !important; }
    .text-foreground { fill: #000000 !important; }
    .rounded-lg { rx: 8; ry: 8; }
    .border { stroke: #000000 !important; stroke-width: 1; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; }
    .text-center { text-anchor: middle; }
    .whitespace-nowrap { white-space: nowrap; }
    .leading-normal { line-height: 1.5; }
    .pointer-events-none { pointer-events: none; }
    text { fill: #000000 !important; }
    path { stroke: #000000 !important; }
    rect { stroke: #000000 !important; }
    circle { stroke: #000000 !important; }
    line { stroke: #000000 !important; }
  `)
  
  return styles.join('\n')
}

/**
 * 下载Blob文件
 * @param blob Blob对象
 * @param filename 文件名
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 统一的导出函数
 * @param format 导出格式
 * @param element 要导出的元素
 * @param filename 文件名
 * @param options 导出选项
 */
export const exportGraph = async (
  format: ExportFormat,
  element: HTMLElement | SVGElement,
  filename: string = 'regex-graph',
  options: any = {}
) => {
  switch (format) {
    case 'svg':
      if (element instanceof SVGElement) {
        exportSVG(element, filename)
      } else {
        // 如果传入的不是SVG元素，尝试查找SVG子元素
        const svgElement = element.querySelector('svg')
        if (svgElement) {
          exportSVG(svgElement, filename)
        } else {
          throw new Error('未找到SVG元素')
        }
      }
      break
    default:
      throw new Error(`不支持的导出格式: ${format}`)
  }
}