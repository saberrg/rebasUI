import { fetchRegistry, getComponent } from '../utils/registry.js'
import { fetchFile, getComponentPath } from '../utils/fetch.js'
import { getConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { execSync } from 'child_process'

export async function addComponents(componentNames: string[]) {
  if (componentNames.length === 0) {
    logger.error('Please specify at least one component to add')
    logger.info('Run "npx @rebas/ui list" to see available components')
    process.exit(1)
  }
  
  const spinner = logger.spinner('Fetching component registry...')
  
  let registry
  try {
    registry = await fetchRegistry()
    spinner.succeed('Registry fetched')
  } catch (error) {
    spinner.fail('Failed to fetch registry')
    logger.error(error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
  
  const config = getConfig()
  const componentsDir = config.componentsDir || 'src/components/ui'
  
  for (const componentName of componentNames) {
    const component = getComponent(registry, componentName)
    
    if (!component) {
      logger.error(`Component "${componentName}" not found`)
      logger.info('Run "npx @rebas/ui list" to see available components')
      continue
    }
    
    const addSpinner = logger.spinner(`Adding component "${componentName}"...`)
    
    try {
      // Create component directory
      const componentDir = join(process.cwd(), componentsDir, componentName)
      if (!existsSync(componentDir)) {
        mkdirSync(componentDir, { recursive: true })
      }
      
      // Download and write each file
      for (const filePath of component.files) {
        const content = await fetchFile(filePath)
        const relativePath = filePath.replace(/^src\/components\//, '')
        const targetPath = join(componentDir, relativePath.split('/').slice(1).join('/'))
        const targetDir = dirname(targetPath)
        
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true })
        }
        
        writeFileSync(targetPath, content, 'utf-8')
      }
      
      addSpinner.succeed(`Component "${componentName}" added successfully`)
      
      // Install peer dependencies if any
      if (component.peerDependencies && component.peerDependencies.length > 0) {
        const installSpinner = logger.spinner('Installing peer dependencies...')
        try {
          const deps = component.peerDependencies.join(' ')
          execSync(`npm install ${deps}`, { stdio: 'inherit' })
          installSpinner.succeed('Peer dependencies installed')
        } catch (error) {
          installSpinner.fail('Failed to install peer dependencies')
          logger.warn('You may need to install peer dependencies manually')
        }
      }
      
      logger.info(`Component installed to: ${componentsDir}/${componentName}`)
      
    } catch (error) {
      addSpinner.fail(`Failed to add component "${componentName}"`)
      logger.error(error instanceof Error ? error.message : 'Unknown error')
    }
  }
  
  logger.success('Done!')
}
