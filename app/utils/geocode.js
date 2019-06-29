export const getCityFromGeocoder = results => {
  if (results && results.length) {
    if (results[0].address_components) {
      for (let i = 0; i < results[0].address_components.length; i += 1) {
        for (
          let j = 0;
          j < results[0].address_components[i].types.length;
          j += 1
        ) {
          if (
            results[0].address_components[i].types[j] === 'locality' ||
            results[0].address_components[i].types[j] ===
              'administrative_area_level_1'
          ) {
            return results[0].address_components[i].long_name;
          }
        }
      }
    } else {
      return results[0].name;
    }
  }
  return '';
};
