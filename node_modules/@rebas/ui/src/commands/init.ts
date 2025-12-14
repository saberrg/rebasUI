import prompts from 'prompts'
import { saveConfig, getConfig, type RebasConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'
import { existsSync } from 'fs'
import { join } from 'path'

export async function initConfig() {
  const configPath = join(process.cwd(), 'rebas.json')
  
  if (existsSync(configPath)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'rebas.json already exists. Overwrite?',
      initial: false
    })
    
    if (!overwrite) {
      logger.info('Cancelled')
      return
    }
  }
  
  const currentConfig = getConfig()
  
  const response = await prompts([
    {
      type: 'text',
      name: 'componentsDir',
      message: 'Where should components be installed?',
      initial: currentConfig.componentsDir || 'src/components/ui'
    },
    {
      type: 'text',
      name: 'tailwindConfig',
      message: 'Path to Tailwind config file:',
      initial: currentConfig.tailwind?.config || 'tailwind.config.js'
    },
    {
      type: 'text',
      name: 'tailwindCss',
      message: 'Path to Tailwind CSS file:',
      initial: currentConfig.tailwind?.css || 'src/index.css'
    }
  ])
  
  if (!response.componentsDir || !response.tailwindConfig || !response.tailwindCss) {
    logger.error('Configuration cancelled')
    return
  }
  
  const config: RebasConfig = {
    componentsDir: response.componentsDir,
    tailwind: {
      config: response.tailwindConfig,
      css: response.tailwindCss
    }
  }
  
  saveConfig(config)
  logger.success('Configuration saved to rebas.json')
}
