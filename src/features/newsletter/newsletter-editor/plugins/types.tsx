interface TraitConfig {
  id: string
  attribute: string // ONLY LOWERCASE BECAUSE OF HTML ATTRIBUTES!
  label: string
  options: Array<{ id: string; name: string }>
}

export interface MergeTagPluginConfig {
  dataKey?: string
  blockIconClass?: string
  mergeTagInitialName?: string
  noSelection?: string
  tagSelectOptions?: Array<any> // this is the api call result which set as traitConfig.tagSelect.options on plugin init()
  traitConfig?: {
    typeSelect: TraitConfig
    tagSelect: TraitConfig
  }
}
