const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const entriesDir = path.join(__dirname, '..', 'entries')
const outputPath = path.join(__dirname, '..', 'index.json')

const files = fs.readdirSync(entriesDir).filter(f => f.endsWith('.md'))

const entries = files.map(file => {
  const content = fs.readFileSync(path.join(entriesDir, file), 'utf-8')
  const { data } = matter(content)
  return {
    slug: data.slug,
    title: data.title,
    type: data.type,
    dateOfRelease: data.dateOfRelease,
    externalUrl: data.externalUrl || '',
    file: `entries/${file}`,
  }
})

// Sort by dateOfRelease descending
entries.sort((a, b) => new Date(b.dateOfRelease) - new Date(a.dateOfRelease))

const index = {
  entries,
  total: entries.length,
  generatedAt: new Date().toISOString(),
}

fs.writeFileSync(outputPath, JSON.stringify(index, null, 2) + '\n')
console.log(`Generated index.json with ${entries.length} entries`)
