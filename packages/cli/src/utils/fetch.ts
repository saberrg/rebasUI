const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/saberrg/rebasUI/master'

export async function fetchFile(path: string): Promise<string> {
  const url = `${GITHUB_RAW_BASE}/${path}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.statusText}`)
    }
    return await response.text()
  } catch (error) {
    throw new Error(`Failed to fetch file ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function getComponentPath(componentName: string, filePath: string): string {
  // Remove 'src/components/' prefix from file path
  const relativePath = filePath.replace(/^src\/components\//, '')
  return `src/components/${relativePath}`
}
