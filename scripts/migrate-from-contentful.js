/**
 * One-time migration script: Export Contentful changelog entries to markdown files.
 *
 * Usage:
 *   CONTENTFUL_SPACE=xxx CONTENTFUL_ACCESS_TOKEN=xxx node scripts/migrate-from-contentful.js
 *
 * This fetches all "news" entries from Contentful and writes them as markdown
 * files into entries/ with frontmatter metadata. Images are downloaded into images/.
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const SPACE = process.env.CONTENTFUL_SPACE
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN

if (!SPACE || !TOKEN) {
  console.error('Set CONTENTFUL_SPACE and CONTENTFUL_ACCESS_TOKEN env vars')
  process.exit(1)
}

const entriesDir = path.join(__dirname, '..', 'entries')
const imagesDir = path.join(__dirname, '..', 'images')

// ── Contentful Rich Text to Markdown converter ──

function richTextToMarkdown(node, links) {
  if (!node) return ''

  const assetMap = new Map()
  const entryMap = new Map()

  if (links?.assets?.block) {
    for (const asset of links.assets.block) {
      assetMap.set(asset.sys.id, asset)
    }
  }
  if (links?.assets?.hyperlink) {
    for (const asset of links.assets.hyperlink) {
      assetMap.set(asset.sys.id, asset)
    }
  }
  if (links?.entries?.block) {
    for (const entry of links.entries.block) {
      entryMap.set(entry.sys.id, entry)
    }
  }

  function convertNode(n) {
    if (!n) return ''

    switch (n.nodeType) {
      case 'document':
        return (n.content || []).map(convertNode).join('\n\n')

      case 'paragraph': {
        const text = (n.content || []).map(convertInline).join('')
        return text
      }

      case 'heading-1':
        return `# ${(n.content || []).map(convertInline).join('')}`
      case 'heading-2':
        return `## ${(n.content || []).map(convertInline).join('')}`
      case 'heading-3':
        return `### ${(n.content || []).map(convertInline).join('')}`
      case 'heading-4':
        return `#### ${(n.content || []).map(convertInline).join('')}`
      case 'heading-5':
        return `##### ${(n.content || []).map(convertInline).join('')}`
      case 'heading-6':
        return `###### ${(n.content || []).map(convertInline).join('')}`

      case 'unordered-list':
        return (n.content || [])
          .map(item => `- ${convertListItem(item)}`)
          .join('\n')

      case 'ordered-list':
        return (n.content || [])
          .map((item, i) => `${i + 1}. ${convertListItem(item)}`)
          .join('\n')

      case 'list-item':
        return convertListItem(n)

      case 'blockquote':
        return (n.content || [])
          .map(convertNode)
          .map(line => `> ${line}`)
          .join('\n')

      case 'hr':
        return '---'

      case 'embedded-asset-block': {
        const asset = assetMap.get(n.data?.target?.sys?.id)
        if (asset) {
          const alt = asset.title || asset.description || ''
          return `![${alt}](${asset.url})`
        }
        return ''
      }

      case 'embedded-entry-block': {
        const entry = entryMap.get(n.data?.target?.sys?.id)
        if (entry?.__typename === 'VideoEmbed' && entry?.url) {
          return `<iframe src="${entry.url}" width="640" height="360" frameborder="0" allowfullscreen></iframe>`
        }
        return ''
      }

      case 'table': {
        const rows = (n.content || []).map(row => {
          const cells = (row.content || []).map(cell => {
            return (cell.content || []).map(convertNode).join(' ').trim()
          })
          return `| ${cells.join(' | ')} |`
        })
        if (rows.length > 0) {
          const headerSep = `| ${rows[0].split('|').slice(1, -1).map(() => '---').join(' | ')} |`
          return [rows[0], headerSep, ...rows.slice(1)].join('\n')
        }
        return rows.join('\n')
      }

      default:
        if (n.content) {
          return (n.content || []).map(convertNode).join('\n\n')
        }
        return ''
    }
  }

  function convertListItem(n) {
    return (n.content || []).map(convertNode).join('\n  ').trim()
  }

  function convertInline(n) {
    if (!n) return ''

    if (n.nodeType === 'text') {
      let text = n.value || ''
      const marks = n.marks || []
      for (const mark of marks) {
        switch (mark.type) {
          case 'bold':
            text = `**${text}**`
            break
          case 'italic':
            text = `*${text}*`
            break
          case 'code':
            text = `\`${text}\``
            break
          case 'underline':
            text = `<u>${text}</u>`
            break
        }
      }
      return text
    }

    if (n.nodeType === 'hyperlink') {
      const children = (n.content || []).map(convertInline).join('')
      return `[${children}](${n.data?.uri || ''})`
    }

    if (n.nodeType === 'asset-hyperlink') {
      const asset = assetMap.get(n.data?.target?.sys?.id)
      const children = (n.content || []).map(convertInline).join('')
      if (asset) {
        return `[${children}](${asset.url})`
      }
      return children
    }

    if (n.nodeType === 'entry-hyperlink') {
      const children = (n.content || []).map(convertInline).join('')
      return children
    }

    if (n.content) {
      return (n.content || []).map(convertInline).join('')
    }

    return ''
  }

  return convertNode(node).trim()
}

// ── Fetch all changelog entries from Contentful ──

async function fetchAllEntries() {
  const allItems = []
  let skip = 0
  const limit = 5

  while (true) {
    const query = `query {
      newsCollection(limit: ${limit}, skip: ${skip}, order: dateOfRelease_DESC, preview: false) {
        items {
          sys { id, publishedAt }
          title
          slug
          type
          externalUrl
          dateOfRelease
          useImageForOpenGraph
          description {
            json
            links {
              entries {
                hyperlink { sys { id } }
                block {
                  __typename
                  ... on VideoEmbed { sys { id } url }
                }
              }
              assets {
                block { sys { id } url title width height description }
                hyperlink { sys { id } url title width height }
              }
            }
          }
          attachmentCollection {
            total
            items {
              sys { id }
              title
              description
              fileName
              url
              width
              height
              contentType
              size
            }
          }
        }
        total
      }
    }`

    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    )
    const json = await res.json()
    
    if (json.errors) {
      console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2))
      process.exit(1)
    }

    const collection = json.data.newsCollection
    allItems.push(...collection.items)
    console.log(`Fetched ${allItems.length} / ${collection.total}`)

    if (allItems.length >= collection.total) break
    skip += limit
  }

  return allItems
}

// ── Download an image ──

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest)
    fs.mkdirSync(dir, { recursive: true })

    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
      }
      const stream = fs.createWriteStream(dest)
      res.pipe(stream)
      stream.on('finish', () => { stream.close(); resolve() })
      stream.on('error', reject)
    }).on('error', reject)
  })
}

// ── Main ──

async function main() {
  const entries = await fetchAllEntries()
  console.log(`\nMigrating ${entries.length} entries...\n`)

  for (const entry of entries) {
    const slug = entry.slug
    if (!slug) {
      console.warn(`Skipping entry without slug: ${entry.title}`)
      continue
    }

    // Download attachment images
    const images = []
    const attachments = entry.attachmentCollection?.items || []
    for (const att of attachments) {
      if (!att.url) continue
      const ext = path.extname(att.fileName || att.url.split('/').pop() || '.png') || '.png'
      const localName = `${att.sys.id}${ext}`
      const localPath = `images/${slug}/${localName}`
      const fullPath = path.join(imagesDir, slug, localName)

      try {
        const url = att.url.startsWith('//') ? `https:${att.url}` : att.url
        await downloadFile(url, fullPath)
        console.log(`  Downloaded: ${localPath}`)
      } catch (err) {
        console.warn(`  Failed to download ${att.url}: ${err.message}`)
      }

      images.push({
        url: localPath,
        alt: att.title || att.description || entry.title,
        width: att.width,
        height: att.height,
      })
    }

    // Convert rich text to markdown
    const markdown = richTextToMarkdown(
      entry.description?.json,
      entry.description?.links
    )

    // Build frontmatter
    const frontmatter = [
      '---',
      `title: ${JSON.stringify(entry.title)}`,
      `slug: ${JSON.stringify(slug)}`,
      `type: ${JSON.stringify(entry.type || '')}`,
      `dateOfRelease: ${JSON.stringify(entry.dateOfRelease || '')}`,
    ]

    if (entry.externalUrl) {
      frontmatter.push(`externalUrl: ${JSON.stringify(entry.externalUrl)}`)
    }

    if (images.length > 0) {
      frontmatter.push('images:')
      for (const img of images) {
        frontmatter.push(`  - url: ${JSON.stringify(img.url)}`)
        frontmatter.push(`    alt: ${JSON.stringify(img.alt)}`)
        if (img.width) frontmatter.push(`    width: ${img.width}`)
        if (img.height) frontmatter.push(`    height: ${img.height}`)
      }
    }

    frontmatter.push('---')

    const fileContent = frontmatter.join('\n') + '\n\n' + markdown + '\n'
    const filePath = path.join(entriesDir, `${slug}.md`)
    fs.writeFileSync(filePath, fileContent)
    console.log(`Wrote: entries/${slug}.md`)
  }

  console.log('\nMigration complete!')
  console.log('Run "node scripts/build-index.js" to generate index.json')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
