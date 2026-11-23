const { localizePage } = require('../../common/localize-page')
const settings = require('../../settings')
Page(localizePage({ data: { supportEmail: settings.supportEmail } }))
