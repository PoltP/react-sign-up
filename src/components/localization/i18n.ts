const en_locale = require('./en.json');

export const i18nCreator = (keyPrefix: string) => 
    (key: string) => en_locale[`${keyPrefix}.${key}`] || key;