function getEnvironmentName() {
  const environment = 'local'

  if (environment === 'production') return 'production'
  return 'local'
}

export default require(`./config.${getEnvironmentName()}`)


