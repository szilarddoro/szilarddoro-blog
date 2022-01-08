import type {Entry} from 'contentful'

/**
 * Represents a configuration model.
 */
export type ConfigurationModel = {
  title: string
  description: string
  openGraphImage: string
  siteUrl: string
}

/**
 * Represents a converted configuration entry.
 */
export type ConvertedConfiguration = Entry<ConfigurationModel>
