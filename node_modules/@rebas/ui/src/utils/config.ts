import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

export interface RebasConfig {
  componentsDir?: string
  tailwind?: {
    config?: string
    css?: string
  }
}

const CONFIG_FILE = 'rebas.json'

export function getConfig(projectRoot: string = process.cwd()): RebasConfig {
  const configPath = join(projectRoot, CONFIG_FILE)
  
  if (!existsSync(configPath)) {
    return {
      componentsDir: 'src/components/ui',
      tailwind: {
        config: 'tailwind.config.js',
        css: 'src/index.css'
      }
    }
  }
  
  try {
    const content = readFileSync(configPath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`Failed to read config file: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function saveConfig(config: RebasConfig, projectRoot: string = process.cwd()): void {
  const configPath = join(projectRoot, CONFIG_FILE)
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8')
}
