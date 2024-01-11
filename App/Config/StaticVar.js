const MAIN_PORT = '1337'
const PAGE_VIEWER_PORT = '4000'

// const BASE = 'http://192.168.10.11'  
// const BASE = 'http://esales.enesis.com'
//const BASE = 'https://esalesdev.enesis.com/api/'
//BASE DENGAN DOMAIN
//const BASE = 'https://esalesdev.enesis.com/apigateway/api/'
//=====================================================================
//const BASE = 'https://esalesdev.enesis.com/api/'
const BASE = 'https://esales.enesis.com/apigateway/api/'
//192.168.10.11

export default {
  // HostUrl: `${BASE}:${MAIN_PORT}/`,
  HostUrl: `${BASE}`,
  PageViewerUrl: `${BASE}:${PAGE_VIEWER_PORT}/`,
  DB_KEY_SESSION: '@asynStorageEsalesEnesisMobile:EsalesEnesisMobileSessIon#',
  FCM_TOKEN: '@asynStorageEsalesEnesisMobile:EsalesEnesisMobileFcmToken',
  FCM_SENDER_ID: '522160011490', 
}