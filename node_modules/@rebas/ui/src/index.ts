#!/usr/bin/env node

import { Command } from 'commander'
import { addComponents } from './commands/add.js'
import { listComponents } from './commands/list.js'
import { initConfig } from './commands/init.js'

const program = new Command()

program
  .name('rebas-ui')
  .description('CLI tool for adding Rebas UI components to your project')
  .version('0.1.0')

program
  .command('add')
  .description('Add one or more components to your project')
  .argument('<components...>', 'Component names to add')
  .action(async (components: string[]) => {
    await addComponents(components)
  })

program
  .command('list')
  .description('List all available components')
  .action(async () => {
    await listComponents()
  })

program
  .command('init')
  .description('Initialize configuration file')
  .action(async () => {
    await initConfig()
  })

program.parse()
