// Regex sample data
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

// Regex category data
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
        explanation: 'Matches one or more consecutive digits from start to end of string'
      },
      {
        desc: 'Decimal Numbers',
        label: '/^\\d*\\.\\d+$/',
        regex: '^\\d*\\.\\d+$',
        explanation: 'Matches numbers with decimal point, allowing optional digits before decimal'
      },
      {
        desc: 'Whole + Decimal Numbers',
        label: '/^\\d*(\\.\\d+)?$/',
        regex: '^\\d*(\\.\\d+)?$',
        explanation: 'Matches both integers and decimals using optional decimal group'
      },
      {
        desc: 'Negative, Positive Whole + Decimal Numbers',
        label: '/^-?\\d*(\\.\\d+)?$/',
        regex: '^-?\\d*(\\.\\d+)?$',
        explanation: 'Includes optional minus sign for negative numbers with decimal support'
      },
      {
        desc: 'Currency Amount',
        label: '/^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$/',
        regex: '^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$',
        explanation: 'Validates currency format with optional dollar sign, comma separators, and cents'
      },
      {
        desc: 'Percentage',
        label: '/^\\d{1,3}(\\.\\d{1,2})?%$/',
        regex: '^\\d{1,3}(\\.\\d{1,2})?%$',
        explanation: 'Matches percentage values from 0-999% with up to 2 decimal places'
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
        explanation: 'Validates HTTP/HTTPS URLs with optional www prefix and query parameters'
      },
      {
        desc: 'Domain Name',
        label: '/^[a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.[a-zA-Z]{2,}$/',
        regex: '^[a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.[a-zA-Z]{2,}$',
        explanation: 'Matches valid domain names following RFC standards with length limits'
      },
      {
        desc: 'FTP URL',
        label: '/^ftp:\\/\\/[\\w\\.-]+\\.[a-zA-Z]{2,}(:\\d+)?(\\/.*)?$/',
        regex: '^ftp:\\/\\/[\\w\\.-]+\\.[a-zA-Z]{2,}(:\\d+)?(\\/.*)?$',
        explanation: 'Validates FTP protocol URLs with optional port and path components'
      },
      {
        desc: 'URL with Port',
        label: '/^https?:\\/\\/[\\w\\.-]+(:\\d+)?(\\/.*)?$/',
        regex: '^https?:\\/\\/[\\w\\.-]+(:\\d+)?(\\/.*)?$',
        explanation: 'Matches URLs with optional port numbers and path segments'
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
        explanation: 'Validates ISO date format with proper month and day ranges'
      },
      {
        desc: 'Date Format DD/MM/YYYY',
        label: '/^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/[12]\\d{3}$/',
        regex: '^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/[12]\\d{3}$',
        explanation: 'European date format with day-first ordering and slash separators'
      },
      {
        desc: 'Date Format MM/DD/YYYY',
        label: '/^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/[12]\\d{3}$/',
        regex: '^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/[12]\\d{3}$',
        explanation: 'American date format with month-first ordering and validation'
      },
      {
        desc: 'Time Format HH:MM',
        label: '/^([01]?\\d|2[0-3]):[0-5]\\d$/',
        regex: '^([01]?\\d|2[0-3]):[0-5]\\d$',
        explanation: 'Validates 24-hour time format with proper hour and minute ranges'
      },
      {
        desc: 'DateTime ISO 8601',
        label: '/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$/',
        regex: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$',
        explanation: 'Matches ISO 8601 datetime with optional milliseconds and timezone'
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
        explanation: 'Validates 11-digit Chinese mobile numbers starting with 13-19'
      },
      {
        desc: 'US Phone Number',
        label: '/^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/',
        regex: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
        explanation: 'Matches US phone format with optional parentheses and separators'
      },
      {
        desc: 'International Phone',
        label: '/^\\+?[1-9]\\d{1,14}$/',
        regex: '^\\+?[1-9]\\d{1,14}$',
        explanation: 'Validates international phone numbers following E.164 standard'
      },
      {
        desc: 'Chinese Landline',
        label: '/^0\\d{2,3}-?\\d{7,8}$/',
        regex: '^0\\d{2,3}-?\\d{7,8}$',
        explanation: 'Matches Chinese landline format with area code and optional dash'
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
        explanation: 'Validates IPv4 addresses with proper octet range validation (0-255)'
      },
      {
        desc: 'IPv6 Address',
        label: '/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/',
        regex: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$',
        explanation: 'Matches full IPv6 addresses with 8 hexadecimal groups separated by colons'
      },
      {
        desc: 'MAC Address',
        label: '/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
        regex: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        explanation: 'Validates MAC addresses with colon or hyphen separators between hex pairs'
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
        explanation: 'Matches opening and closing HTML tags with optional attributes'
      },
      {
        desc: 'HTML Tag with Attributes',
        label: '/<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>/',
        regex: '<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>',
        explanation: 'Captures complete HTML tag pairs with content using backreferences'
      },
      {
        desc: 'HTML Comment',
        label: '/<!--[\\s\\S]*?-->/',
        regex: '<!--[\\s\\S]*?-->',
        explanation: 'Matches HTML comments including multiline content with non-greedy matching'
      },
      {
        desc: 'HTML Image Tag',
        label: '/<img\\s+[^>]*src\\s*=\\s*["\']([^"\'>]+)["\'][^>]*>/',
        regex: '<img\\s+[^>]*src\\s*=\\s*["\']([^"\'>]+)["\'][^>]*>',
        explanation: 'Extracts src attribute value from img tags with flexible attribute ordering'
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
        explanation: 'Validates common email format with alphanumeric characters and standard symbols'
      },
      {
        desc: 'Strict Email RFC 5322',
        label: '/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/',
        regex: '^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$',
        explanation: 'Comprehensive RFC 5322 compliant email validation with full character set support'
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
        explanation: 'Strong password validation using positive lookaheads for complexity requirements'
      },
      {
        desc: 'Medium Password',
        label: '/^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$/',
        regex: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$',
        explanation: 'Medium strength password requiring letters and numbers with minimum length'
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
        explanation: 'Validates Chinese national ID format with birth date and checksum validation'
      },
      {
        desc: 'Credit Card Number',
        label: '/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/',
        regex: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$',
        explanation: 'Matches major credit card formats including Visa, MasterCard, AmEx, and Discover'
      }
    ]
  }
]

// Get flattened list of all samples
export function getAllSamples(): RegexSample[] {
  return regexCategories.flatMap(category => category.samples)
}

// Get samples by category ID
export function getSamplesByCategory(categoryId: string): RegexSample[] {
  const category = regexCategories.find(cat => cat.id === categoryId)
  return category ? category.samples : []
}

// Get category information
export function getCategoryById(categoryId: string): RegexCategory | undefined {
  return regexCategories.find(cat => cat.id === categoryId)
}