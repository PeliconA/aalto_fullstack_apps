function getCountryLanguages(country) {
    let languages = []
      for (const [key, value] of Object.entries(country.languages)) {
        let languageObject = {
          'key': key,
          'language': value
        }
        languages.push(languageObject)
      }

      return languages
}

export default getCountryLanguages;