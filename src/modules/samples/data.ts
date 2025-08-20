// 正则表达式样例数据
export interface RegexSample {
  desc: string
  label: string
  regex: string
  explanation?: string
}

export interface RegexCategory {
  id: string
  name: string
  icon: string
  samples: RegexSample[]
}

// 正则表达式分类数据
export const regexCategories: RegexCategory[] = [
  {
    id: 'numbers',
    name: 'Numbers',
    icon: '🔢',
    samples: [
      {
        desc: 'Whole Numbers',
        label: '/^\\d+$/',
        regex: '^\\d+$',
        explanation: '匹配整数'
      },
      {
        desc: 'Decimal Numbers',
        label: '/^\\d*\\.\\d+$/',
        regex: '^\\d*\\.\\d+$',
        explanation: '匹配小数'
      },
      {
        desc: 'Whole + Decimal Numbers',
        label: '/^\\d*(\\.\\d+)?$/',
        regex: '^\\d*(\\.\\d+)?$',
        explanation: '匹配整数和小数'
      },
      {
        desc: 'Negative, Positive Whole + Decimal Numbers',
        label: '/^-?\\d*(\\.\\d+)?$/',
        regex: '^-?\\d*(\\.\\d+)?$',
        explanation: '匹配正负整数和小数'
      },
      {
        desc: 'Currency Amount',
        label: '/^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$/',
        regex: '^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$',
        explanation: '匹配货币金额格式'
      },
      {
        desc: 'Percentage',
        label: '/^\\d{1,3}(\\.\\d{1,2})?%$/',
        regex: '^\\d{1,3}(\\.\\d{1,2})?%$',
        explanation: '匹配百分比'
      }
    ]
  },
  {
    id: 'urls',
    name: 'URLs',
    icon: '🌐',
    samples: [
      {
        desc: 'Basic URL',
        label: '/^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)$/',
        regex: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)$',
        explanation: '匹配基本的HTTP/HTTPS URL'
      },
      {
        desc: 'Domain Name',
        label: '/^[a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.[a-zA-Z]{2,}$/',
        regex: '^[a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.[a-zA-Z]{2,}$',
        explanation: '匹配域名'
      },
      {
        desc: 'FTP URL',
        label: '/^ftp:\\/\\/[\\w\\.-]+\\.[a-zA-Z]{2,}(:\\d+)?(\\/.*)?$/',
        regex: '^ftp:\\/\\/[\\w\\.-]+\\.[a-zA-Z]{2,}(:\\d+)?(\\/.*)?$',
        explanation: '匹配FTP URL'
      },
      {
        desc: 'URL with Port',
        label: '/^https?:\\/\\/[\\w\\.-]+(:\\d+)?(\\/.*)?$/',
        regex: '^https?:\\/\\/[\\w\\.-]+(:\\d+)?(\\/.*)?$',
        explanation: '匹配带端口号的URL'
      }
    ]
  },
  {
    id: 'dates',
    name: 'Dates',
    icon: '📅',
    samples: [
      {
        desc: 'Date Format YYYY-MM-DD',
        label: '/^[12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/',
        regex: '^[12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
        explanation: '匹配YYYY-MM-DD格式日期'
      },
      {
        desc: 'Date Format DD/MM/YYYY',
        label: '/^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/[12]\\d{3}$/',
        regex: '^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/[12]\\d{3}$',
        explanation: '匹配DD/MM/YYYY格式日期'
      },
      {
        desc: 'Date Format MM/DD/YYYY',
        label: '/^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/[12]\\d{3}$/',
        regex: '^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/[12]\\d{3}$',
        explanation: '匹配MM/DD/YYYY格式日期'
      },
      {
        desc: 'Time Format HH:MM',
        label: '/^([01]?\\d|2[0-3]):[0-5]\\d$/',
        regex: '^([01]?\\d|2[0-3]):[0-5]\\d$',
        explanation: '匹配24小时制时间格式'
      },
      {
        desc: 'DateTime ISO 8601',
        label: '/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$/',
        regex: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$',
        explanation: '匹配ISO 8601日期时间格式'
      }
    ]
  },
  {
    id: 'phones',
    name: 'Phone Numbers',
    icon: '📞',
    samples: [
      {
        desc: 'Chinese Mobile Phone',
        label: '/^1[3-9]\\d{9}$/',
        regex: '^1[3-9]\\d{9}$',
        explanation: '匹配中国大陆手机号码'
      },
      {
        desc: 'US Phone Number',
        label: '/^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/',
        regex: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
        explanation: '匹配美国电话号码格式'
      },
      {
        desc: 'International Phone',
        label: '/^\\+?[1-9]\\d{1,14}$/',
        regex: '^\\+?[1-9]\\d{1,14}$',
        explanation: '匹配国际电话号码格式'
      },
      {
        desc: 'Chinese Landline',
        label: '/^0\\d{2,3}-?\\d{7,8}$/',
        regex: '^0\\d{2,3}-?\\d{7,8}$',
        explanation: '匹配中国固定电话号码'
      }
    ]
  },
  {
    id: 'ips',
    name: 'IP Addresses',
    icon: '🌍',
    samples: [
      {
        desc: 'IPv4 Address',
        label: '/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/',
        regex: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
        explanation: '匹配IPv4地址'
      },
      {
        desc: 'IPv6 Address',
        label: '/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/',
        regex: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$',
        explanation: '匹配完整IPv6地址'
      },
      {
        desc: 'MAC Address',
        label: '/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
        regex: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        explanation: '匹配MAC地址'
      }
    ]
  },
  {
    id: 'html',
    name: 'HTML Tags',
    icon: '🏷️',
    samples: [
      {
        desc: 'HTML Tag',
        label: '/<\\/?[a-zA-Z][a-zA-Z0-9]*[^<>]*>/',
        regex: '<\\/?[a-zA-Z][a-zA-Z0-9]*[^<>]*>',
        explanation: '匹配HTML标签'
      },
      {
        desc: 'HTML Tag with Attributes',
        label: '/<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>/',
        regex: '<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>',
        explanation: '匹配带属性的HTML标签对'
      },
      {
        desc: 'HTML Comment',
        label: '/<!--[\\s\\S]*?-->/',
        regex: '<!--[\\s\\S]*?-->',
        explanation: '匹配HTML注释'
      },
      {
        desc: 'HTML Image Tag',
        label: '/<img\\s+[^>]*src\\s*=\\s*["\']([^"\'>]+)["\'][^>]*>/',
        regex: '<img\\s+[^>]*src\\s*=\\s*["\']([^"\'>]+)["\'][^>]*>',
        explanation: '匹配HTML图片标签并提取src属性'
      }
    ]
  },
  {
    id: 'emails',
    name: 'Email Addresses',
    icon: '📧',
    samples: [
      {
        desc: 'Basic Email',
        label: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/',
        regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        explanation: '匹配基本邮箱格式'
      },
      {
        desc: 'Strict Email RFC 5322',
        label: '/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/',
        regex: '^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$',
        explanation: '严格的RFC 5322邮箱格式'
      }
    ]
  },
  {
    id: 'passwords',
    name: 'Passwords',
    icon: '🔒',
    samples: [
      {
        desc: 'Strong Password',
        label: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/',
        regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        explanation: '强密码：至少8位，包含大小写字母、数字和特殊字符'
      },
      {
        desc: 'Medium Password',
        label: '/^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$/',
        regex: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$',
        explanation: '中等强度密码：至少6位，包含字母和数字'
      }
    ]
  },
  {
    id: 'identifiers',
    name: 'ID Numbers',
    icon: '🆔',
    samples: [
      {
        desc: 'Chinese ID Card',
        label: '/^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$/',
        regex: '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
        explanation: '匹配中国身份证号码'
      },
      {
        desc: 'Credit Card Number',
        label: '/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/',
        regex: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$',
        explanation: '匹配信用卡号码（Visa、MasterCard、AmEx等）'
      }
    ]
  }
]

// 获取所有样例的扁平化列表
export function getAllSamples(): RegexSample[] {
  return regexCategories.flatMap(category => category.samples)
}

// 根据分类ID获取样例
export function getSamplesByCategory(categoryId: string): RegexSample[] {
  const category = regexCategories.find(cat => cat.id === categoryId)
  return category ? category.samples : []
}

// 获取分类信息
export function getCategoryById(categoryId: string): RegexCategory | undefined {
  return regexCategories.find(cat => cat.id === categoryId)
}