const REGISTRY_URL = 'https://raw.githubusercontent.com/saberrg/rebasUI/main/registry/components.json'

export interface Component {
  name: string
  description: string
  files: string[]
  dependencies: string[]
  devDependencies: string[]
  peerDependencies: string[]
  tailwindConfig?: {
    theme?: {
      extend?: Record<string, any>
    }
  }
}

export interface Registry {
  components: Component[]
}

export async function fetchRegistry(): Promise<Registry> {
  try {
    const response = await fetch(REGISTRY_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.statusText}`)
    }
    return await response.json() as Registry
  } catch (error) {
    throw new Error(`Failed to fetch component registry: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function getComponent(registry: Registry, name: string): Component | undefined {
  return registry.components.find(comp => comp.name === name)
}
