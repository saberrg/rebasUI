import { fetchRegistry } from '../utils/registry.js'
import { logger } from '../utils/logger.js'

export async function listComponents() {
  const spinner = logger.spinner('Fetching components...')
  
  try {
    const registry = await fetchRegistry()
    spinner.succeed('Components fetched')
    
    console.log('\nAvailable components:\n')
    
    if (registry.components.length === 0) {
      logger.warn('No components available')
      return
    }
    
    registry.components.forEach((component) => {
      console.log(`  • ${component.name}`)
      if (component.description) {
        console.log(`    ${component.description}`)
      }
      console.log()
    })
  } catch (error) {
    spinner.fail('Failed to fetch components')
    logger.error(error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}
