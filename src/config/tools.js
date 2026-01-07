/**
 * 工具配置文件
 * 添加新工具只需在此添加配置，路由会自动注册
 */

export const toolCategories = [
  {
    id: 'text',
    name: '文本处理',
    icon: 'FileText',
    tools: [
      {
        id: 'json',
        name: 'JSON 格式化',
        description: 'JSON 格式化、压缩、校验',
        component: 'ToolJson',
        keywords: ['json', 'format', '格式化', '压缩', '校验']
      },
      {
        id: 'base64',
        name: 'Base64 编解码',
        description: 'Base64 编码和解码',
        component: 'ToolBase64',
        keywords: ['base64', 'encode', 'decode', '编码', '解码']
      },
      {
        id: 'url',
        name: 'URL 编解码',
        description: 'URL 编码和解码',
        component: 'ToolUrl',
        keywords: ['url', 'encode', 'decode', '编码', '解码']
      },
      {
        id: 'word-count',
        name: '字数统计',
        description: '统计文本字数、字符数、行数',
        component: 'ToolWordCount',
        keywords: ['word', 'count', '字数', '统计']
      }
    ]
  },
  {
    id: 'convert',
    name: '编码转换',
    icon: 'RefreshCw',
    tools: [
      {
        id: 'timestamp',
        name: '时间戳转换',
        description: '时间戳与日期时间互转',
        component: 'ToolTimestamp',
        keywords: ['timestamp', 'time', '时间戳', '日期']
      },
      {
        id: 'radix',
        name: '进制转换',
        description: '2/8/10/16进制互转',
        component: 'ToolRadix',
        keywords: ['radix', 'binary', 'hex', '进制', '二进制', '十六进制']
      },
      {
        id: 'color',
        name: '颜色转换',
        description: 'HEX/RGB/HSL 颜色格式互转',
        component: 'ToolColor',
        keywords: ['color', 'hex', 'rgb', 'hsl', '颜色']
      }
    ]
  },
  {
    id: 'generator',
    name: '生成器',
    icon: 'Sparkles',
    tools: [
      {
        id: 'uuid',
        name: 'UUID 生成',
        description: '生成 UUID/GUID',
        component: 'ToolUuid',
        keywords: ['uuid', 'guid', 'generate', '生成']
      },
      {
        id: 'password',
        name: '密码生成',
        description: '生成随机密码',
        component: 'ToolPassword',
        keywords: ['password', 'random', '密码', '随机']
      },
      {
        id: 'qrcode',
        name: '二维码生成',
        description: '生成二维码',
        component: 'ToolQrcode',
        keywords: ['qrcode', 'qr', '二维码']
      }
    ]
  },
  {
    id: 'dev',
    name: '开发工具',
    icon: 'Code',
    tools: [
      {
        id: 'regex',
        name: '正则测试',
        description: '正则表达式测试和匹配',
        component: 'ToolRegex',
        keywords: ['regex', 'regexp', '正则', '表达式']
      },
      {
        id: 'hash',
        name: 'Hash 计算',
        description: 'MD5/SHA-1/SHA-256 计算',
        component: 'ToolHash',
        keywords: ['hash', 'md5', 'sha', '哈希']
      }
    ]
  }
]

/**
 * 获取所有工具列表（扁平化）
 */
export function getAllTools() {
  return toolCategories.flatMap(category =>
    category.tools.map(tool => ({
      ...tool,
      categoryId: category.id,
      categoryName: category.name
    }))
  )
}

/**
 * 根据 ID 获取工具
 */
export function getToolById(id) {
  return getAllTools().find(tool => tool.id === id)
}

/**
 * 搜索工具
 */
export function searchTools(query) {
  if (!query) return getAllTools()

  const lowerQuery = query.toLowerCase()
  return getAllTools().filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  )
}
