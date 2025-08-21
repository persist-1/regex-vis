export type ExportFormat = 'svg'

// Export configuration constants
const EXPORT_CONFIG = {
  DEFAULT_FILENAME: 'regex-graph',
  SVG_NAMESPACE: 'http://www.w3.org/2000/svg',
  XLINK_NAMESPACE: 'http://www.w3.org/1999/xlink',
  DEFAULT_FONT_SIZE: '15',
  DEFAULT_ICON_WIDTH: 12,
  DEFAULT_ICON_HEIGHT: 18,

  DEFAULT_COLORS: {
    BLACK: '#000000',
    WHITE: '#ffffff',
    DARK_TEXT: '#111827'
  },
  SVG_PATHS: {
    // Phosphor Icons Infinity path
    INFINITY: 'M248,128a56,56,0,0,1-96,39.6L83.33,96.17A40,40,0,1,0,83.33,159.83L152,231.6A56,56,0,1,1,152,24.4L83.33,96.17a40,40,0,1,1,0,63.66L152,231.6A56.09,56.09,0,0,1,248,128Z',
    // Quantifier repetition arrow paths
    QUANTIFIER_PATHS: [
      'M17 1l4 4-4 4',
      'M3 11V9a4 4 0 014-4h14M21 13v2a4 4 0 01-4 4H3',
      'M7 23l-4-4 4-4'
    ]
  }
} as const

/**
 * Export SVG format
 * @param svgElement SVG element
 * @param filename File name
 */
export const exportSVG = (svgElement: SVGElement, filename: string = EXPORT_CONFIG.DEFAULT_FILENAME) => {
  try {
    // Clone SVG element to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true) as SVGElement
    
    // Set SVG xmlns attributes to ensure independence
    clonedSvg.setAttribute('xmlns', EXPORT_CONFIG.SVG_NAMESPACE)
    clonedSvg.setAttribute('xmlns:xlink', EXPORT_CONFIG.XLINK_NAMESPACE)
    
    // Modify icon dimensions before serialization
    const quantifierIcons = clonedSvg.querySelectorAll('svg[viewBox="0 0 24 24"]')
    quantifierIcons.forEach(icon => {
      icon.setAttribute('width', '18')
      icon.setAttribute('height', '10')
    })
    
    const infinityIcons = clonedSvg.querySelectorAll('svg[viewBox="0 0 256 256"]')
    infinityIcons.forEach(icon => {
      icon.setAttribute('width', '18')
      icon.setAttribute('height', '10')
    })

    // Get computed styles and inline them into SVG
    const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    const computedStyles = getComputedStylesForSVG(svgElement)
    styleElement.textContent = computedStyles
    clonedSvg.insertBefore(styleElement, clonedSvg.firstChild)
    
    // Serialize SVG
    const serializer = new XMLSerializer()
    let svgString = serializer.serializeToString(clonedSvg)
    
    // Replace icon placeholders with actual SVG elements
    svgString = svgString.replace(/{{INFINITY_ICON}}/g, 
      `<svg viewBox="0 0 256 256" fill="currentColor" xmlns="${EXPORT_CONFIG.SVG_NAMESPACE}" style="display: inline; vertical-align: middle;">`+
      `<path d="${EXPORT_CONFIG.SVG_PATHS.INFINITY}"/>`+
      `</svg>`
    )
    
    svgString = svgString.replace(/{{QUANTIFIER_ICON}}/g,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="${EXPORT_CONFIG.SVG_NAMESPACE}" style="display: inline; vertical-align: middle;">`+
      EXPORT_CONFIG.SVG_PATHS.QUANTIFIER_PATHS.map(path => `<path d="${path}"/>`).join('') +
      `</svg>`
    )
    
    // Create Blob and download
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    downloadBlob(blob, `${filename}.svg`)
  } catch (error) {
    console.error('SVG export failed:', error)
    throw new Error('SVG export failed')
  }
}

/**
 * Extract text content from element and replace icons with placeholders
 * @param element - DOM element to extract text from
 * @returns Extracted text content with icon placeholders
 */
function extractTextWithIcons(element: Element): string {
  let content = ''
  
  // Process child nodes to identify icons and text
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element
      if (el.tagName.toLowerCase() === 'svg') {
        const viewBox = el.getAttribute('viewBox')
        if (viewBox === '0 0 256 256') {
          content += '{{INFINITY_ICON}}'
        } else if (viewBox === '0 0 24 24') {
          content += '{{QUANTIFIER_ICON}}'
        }
      } else {
        content += el.textContent || ''
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      content += node.textContent || ''
    }
  })
  
  return content
}

/**
 * Get current theme color values
 * @returns Theme color object
 */
function getCurrentThemeColors() {
  const rootStyles = getComputedStyle(document.documentElement)
  
  // Get CSS variable values
  const graphColor = rootStyles.getPropertyValue('--graph').trim() || EXPORT_CONFIG.DEFAULT_COLORS.BLACK
  const foregroundColor = rootStyles.getPropertyValue('--foreground').trim()
  const backgroundColor = rootStyles.getPropertyValue('--background').trim()
  
  // Convert HSL to hex (if needed)
  const convertHslToHex = (hsl: string): string => {
    if (hsl.startsWith('#')) return hsl
    if (!hsl) return EXPORT_CONFIG.DEFAULT_COLORS.BLACK
    
    // Simple HSL to RGB conversion (for common HSL formats)
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
    
    return EXPORT_CONFIG.DEFAULT_COLORS.BLACK
  }
  
  return {
    graph: graphColor.startsWith('#') ? graphColor : convertHslToHex(foregroundColor) || EXPORT_CONFIG.DEFAULT_COLORS.BLACK,
    foreground: convertHslToHex(foregroundColor) || EXPORT_CONFIG.DEFAULT_COLORS.BLACK,
    background: convertHslToHex(backgroundColor) || EXPORT_CONFIG.DEFAULT_COLORS.WHITE
  }
}

/**
 * Get computed styles for SVG
 * @param svgElement SVG element
 * @returns CSS style string
 */
function getComputedStylesForSVG(svgElement: SVGElement): string {
  const colors = getCurrentThemeColors()
  const styles: string[] = []
  
  // Add basic styles, use black as export color
  styles.push(`
    .stroke-graph { stroke: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; stroke-width: 1; }
    .fill-transparent { fill: transparent !important; }
    .text-foreground { fill: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; }
    .rounded-lg { rx: 8; ry: 8; }
    .border { stroke: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; stroke-width: 1; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; }
    .text-center { text-anchor: middle; }
    .whitespace-nowrap { white-space: nowrap; }
    .leading-normal { line-height: 1.5; }
    .pointer-events-none { pointer-events: none; }
    text { fill: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; dominant-baseline: central; alignment-baseline: middle; }
    path { stroke: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; }
    rect { stroke: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; }
    circle { stroke: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; }
    line { stroke: ${EXPORT_CONFIG.DEFAULT_COLORS.BLACK} !important; }
  `)
  
  return styles.join('\n')
}

/**
 * Download Blob file
 * @param blob Blob object
 * @param filename File name
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
 * Unified export function
 * @param format Export format
 * @param element Element to export
 * @param filename File name
 * @param options Export options
 */
export const exportGraph = async (
  format: ExportFormat,
  element: HTMLElement | SVGElement,
  filename: string = EXPORT_CONFIG.DEFAULT_FILENAME,
  options: any = {}
) => {
  switch (format) {
    case 'svg':
      if (element instanceof SVGElement) {
        exportSVG(element, filename)
      } else {
        // If the passed element is not an SVG element, try to find SVG child element
        const svgElement = element.querySelector('svg')
        if (svgElement) {
          exportSVG(svgElement, filename)
        } else {
          throw new Error('SVG element not found')
        }
      }
      break
    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
}