// flexiWAN SD-WAN software - flexiEdge, flexiManage.
// For more information go to https://flexiwan.com
// Copyright (C) 2020  flexiWAN Ltd.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/****************************************************************************
 * This module specifies the server configuration for different environments
 * The server uses the default configuration
 * The default configuration is overridden by running with the environment
 * variable in npm:  npm start <environment>
 ****************************************************************************/
/* eslint-disable max-len */
const os = require('os');
const hostname = os.hostname();
const configEnv = {
  // This is the default configuration, override by the following sections
  default: {
    // URL of the rest server
    restServerUrl: 'https://local.flexiwan.com:3443',
    // URL of the UI server
    uiServerUrl: 'https://local.flexiwan.com:3000',
    // Key used for users tokens, override default with environment variable USER_SECRET_KEY
    userTokenSecretKey: 'abcdefg1234567',
    // Whether to validate open API response. True for testing and dev, False for production,
    // to remove unneeded fields from the response, use validateOpenAPIResponse = { removeAdditional: 'failing' }
    validateOpenAPIResponse: true,
    // Number of REST requests allowed in 5 min per IP address, more requests will be rate limited
    userIpReqRateLimit: 300,
    // Unread notification email period (in msec), a mail is sent once a period
    unreadNotificationPeriod: 86400000,
    // The duration of the user JWT token in seconds
    userTokenExpiration: 300,
    // The duration of the user refresh token in seconds
    userRefreshTokenExpiration: 604800,
    // Key used for device tokens, override default with environment variable DEVICE_SECRET_KEY
    deviceTokenSecretKey: 'abcdefg1234567',
    // Key used to validate google captcha token, generated at https://www.google.com/u/1/recaptcha/admin/create
    // Default value is not set, which only validate the client side captcha
    captchaKey: '',
    // Mongo main database
    mongoUrl: `mongodb://${hostname}:27017,${hostname}:27018,${hostname}:27019/flexiwan?replicaSet=rs`,
    // Mongo analytics database
    mongoAnalyticsUrl: `mongodb://${hostname}:27017,${hostname}:27018,${hostname}:27019/flexiwanAnalytics?replicaSet=rs`,
    // Mongo Billing database
    mongoBillingUrl: `mongodb://${hostname}:27017,${hostname}:27018,${hostname}:27019/flexibilling?replicaSet=rs`,
    // Billing Redirect OK page url
    billingRedirectOkUrl: 'https://local.flexiwan.com/ok.html',
    // Biling config site - this is used as the billing site name in ChargeBee
    billingConfigSite: 'flexiwan-test',
    // ChargeBee default plan for a new customer
    billingDefaultPlan: 'enterprise',
    // Wheter to enable billing
    useFlexiBilling: false,
    // API key for ChargeBee Billing config site. Not used when useFlexiBilling is false
    billingApiKey: '',
    // Use flexibilling charger scheduler to close invoices automatically
    // when set to "false", invoices should be closed manually
    useBillingCharger: false,
    // Use automatic charges collection
    autoCollectionCharges: 'off', // "on" or "off"
    // Redis host and port, override default with environment variable REDIS_URL
    redisUrl: 'redis://localhost:6379',
    // Redis connectivity options
    redisTotalRetryTime: 1000 * 60 * 60,
    redisTotalAttempts: 10,
    // Kue prefix
    kuePrefix: 'deviceq',
    // HTTP port of the node server. On production we usually forward port 80 to this port using:
    // sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    httpPort: 3000,
    // HTTPS port of the node server. On production weWe usually forward port 443 to this port using:
    // sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3443
    httpsPort: 3443,
    // This port is used when redirecting the client
    // In production it can be set
    redirectHttpsPort: 3443,
    // Should we redirect to https, should be set to false if running behind a secure proxy such as CloudFlare
    shouldRedirectHttps: true,
    // Certificate key location, under bin directory
    // On production if the key located in the Let's encrypt directory, it's possible to link to it using:
    // sudo ln -s /etc/letsencrypt/live/app.flexiwan.com/privkey.pem ~/FlexiWanSite/bin/cert.app.flexiwan.com/domain.key
    httpsCertKey: '/cert.local.flexiwan.com/domain.key',
    // Certificate location, under bin directory
    // On production if the key located in the Let's encrypt directory, it's possible to link to it using:
    // sudo ln -s /etc/letsencrypt/live/app.flexiwan.com/fullchain.pem ~/FlexiWanSite/bin/cert.app.flexiwan.com/certificate.pem
    httpsCert: '/cert.local.flexiwan.com/certificate.pem',
    // Default agent broker the device tries to create connection for
    // The agent is sent to the device when it registers
    agentBroker: 'local.flexiwan.com:3443',
    // Whitelist of allowed domains for CORS checks
    corsWhiteList: ['http://local.flexiwan.com:3000', 'https://local.flexiwan.com:3000', 'https://local.flexiwan.com:3443', 'https://127.0.0.1:3000'],
    // Client static root directory
    clientStaticDir: 'public',
    // Mgmt-Agent protocol version
    agentApiVersion: '1.0.0',
    // Mgmt log files
    logFilePath: './logs/app.log',
    reqLogFilePath: './logs/req.log',
    // Logging default level
    logLevel: 'verbose',
    // Hostname of SMTP server - for sending mails
    mailerHost: '127.0.0.1',
    // Port of SMTP server
    mailerPort: 25,
    // Bypass mailer certificate validation
    mailerBypassCert: false,
    // From address used when sending emails
    mailerFromAddress: 'noreply@flexiwan.com',
    // Name of the company, is used in email templates
    companyName: 'flexiWAN',
    // Software version query link
    SwRepositoryUrl: 'https://deb.flexiwan.com/info/flexiwan-router/latest',
    // Software version update email link. ${version} is replaced in run time
    // eslint-disable-next-line no-template-curly-in-string
    SwVersionUpdateUrl: 'https://sandbox.flexiwan.com/Templates/notification_email_${version}.json',
    // Web hooks add user URL, used to send for new uses, '' to bypass hook
    webHookAddUserUrl: '',
    // Web hooks add user secret, send in addition to the message for filtering
    webHookAddUserSecret: 'ABC',
    // Web hooks register device URL, used to send for new registered devices, '' to bypass hook
    webHookRegisterDeviceUrl: '',
    // Web hooks register device secret, send in addition to the message for filtering
    webHookRegisterDeviceSecret: 'ABC',
    // Global app identification rules file location
    appRulesUrl: 'https://sandbox.flexiwan.com/Protocols/app-rules.json'
  },
  // Override for development environment, default environment if not specified
  development: {
    clientStaticDir: 'client/build',
    mailerBypassCert: true,
    SwRepositoryUrl: 'https://deb.flexiwan.com/info/flexiwan-router/latest-testing',
    userTokenExpiration: 604800,
    logLevel: 'info',
    mailerPort: 1025
  },
  testing: {
    // Mgmt-Agent protocol version for testing purposes
    agentApiVersion: '2.0.0',
    // Kue prefix
    kuePrefix: 'testq'
  },
  // Override for production environment
  production: {
    restServerUrl: 'https://app.flexiwan.com:443',
    uiServerUrl: 'https://app.flexiwan.com:443',
    shouldRedirectHttps: false,
    redirectHttpsPort: 443,
    agentBroker: 'app.flexiwan.com:443',
    validateOpenAPIResponse: false,
    clientStaticDir: 'client/build',
    // 'billingConfigSite': 'flexiwan-test',
    // 'billingDefaultPlan': 'enterprise',
    // 'useFlexiBilling': true,
    logFilePath: '/var/log/flexiwan/flexiwan.log',
    reqLogFilePath: '/var/log/flexiwan/flexiwanReq.log',
    billingRedirectOkUrl: 'https://app.flexiwan.com/ok.html',
    logLevel: 'info',
    logUserName: true,
    corsWhiteList: ['https://app.flexiwan.com:443', 'http://app.flexiwan.com:80']
  },
  hosted: {
    // modify next params for hosted server
    restServerUrl: 'https://hosted.server.com:443',
    uiServerUrl: 'https://hosted.server.com:443',
    agentBroker: 'hosted.server.com:443',
    corsWhiteList: 'https://hosted.server.com:443, http://hosted.server.com:80',
    billingRedirectOkUrl: 'https://hosted.server.com/ok.html',
    shouldRedirectHttps: false,
    redirectHttpsPort: 443,
    validateOpenAPIResponse: false,
    clientStaticDir: 'client/build',
    billingConfigSite: 'flexiwan',
    billingDefaultPlan: 'enterprise',
    useFlexiBilling: true,
    logFilePath: '/var/log/flexiwan/flexiwan.log',
    reqLogFilePath: '/var/log/flexiwan/flexiwanReq.log',
    SwRepositoryUrl: 'https://deb.flexiwan.com/info/flexiwan-router/latest',
    logLevel: 'info',
    logUserName: true
  },
  // Override for manage environment for production
  manage: {
    restServerUrl: 'https://manage.flexiwan.com:443',
    uiServerUrl: 'https://manage.flexiwan.com:443',
    shouldRedirectHttps: false,
    redirectHttpsPort: 443,
    kuePrefix: 'mngdeviceq',
    agentBroker: 'manage.flexiwan.com:443',
    validateOpenAPIResponse: false,
    clientStaticDir: 'client/build',
    logFilePath: '/var/log/flexiwan/flexiwan.log',
    reqLogFilePath: '/var/log/flexiwan/flexiwanReq.log',
    billingConfigSite: 'flexiwan',
    billingDefaultPlan: 'enterprise',
    useFlexiBilling: true,
    billingRedirectOkUrl: 'https://manage.flexiwan.com/ok.html',
    SwRepositoryUrl: 'https://deb.flexiwan.com/info/flexiwan-router/latest',
    logLevel: 'info',
    logUserName: true,
    corsWhiteList: ['https://manage.flexiwan.com:443', 'http://manage.flexiwan.com:80']
  },
  // Override for appqa01 environment
  appqa01: {
    restServerUrl: 'https://appqa01.flexiwan.com:443',
    uiServerUrl: 'https://appqa01.flexiwan.com:443',
    shouldRedirectHttps: false,
    redirectHttpsPort: 443,
    userTokenExpiration: 300,
    userIpReqRateLimit: 3000,
    unreadNotificationPeriod: 300000,
    userRefreshTokenExpiration: 86400,
    agentBroker: 'appqa01.flexiwan.com:443',
    clientStaticDir: 'client/build',
    logFilePath: '/var/log/flexiwan/flexiwan.log',
    reqLogFilePath: '/var/log/flexiwan/flexiwanReq.log',
    billingConfigSite: 'flexiwan-test',
    billingDefaultPlan: 'enterprise',
    useFlexiBilling: true,
    billingRedirectOkUrl: 'https://appqa01.flexiwan.com/ok.html',
    SwRepositoryUrl: 'https://deb.flexiwan.com/info/flexiwan-router/latest-testing',
    logLevel: 'info',
    logUserName: true,
    corsWhiteList: ['https://appqa01.flexiwan.com:443', 'http://appqa01.flexiwan.com:80']
  },
  // Override for appqa02 environment
  appqa02: {
    restServerUrl: 'https://appqa02.flexiwan.com:443',
    uiServerUrl: 'https://appqa02.flexiwan.com:443',
    shouldRedirectHttps: false,
    redirectHttpsPort: 443,
    userTokenExpiration: 300,
    userIpReqRateLimit: 3000,
    unreadNotificationPeriod: 300000,
    userRefreshTokenExpiration: 86400,
    agentBroker: 'appqa01.flexiwan.com:443',
    clientStaticDir: 'client/build',
    logFilePath: '/var/log/flexiwan/flexiwan.log',
    reqLogFilePath: '/var/log/flexiwan/flexiwanReq.log',
    billingConfigSite: 'flexiwan-test',
    billingDefaultPlan: 'enterprise',
    useFlexiBilling: true,
    billingRedirectOkUrl: 'https://appqa02.flexiwan.com/ok.html',
    SwRepositoryUrl: 'https://deb.flexiwan.com/info/flexiwan-router/latest-testing',
    logLevel: 'info',
    logUserName: true,
    corsWhiteList: ['https://appqa02.flexiwan.com:443', 'http://appqa02.flexiwan.com:80']
  }
};

class Configs {
  constructor (env) {
    const environment = env || this.getEnv();
    console.log('environment=' + environment);
    const combinedConfig = { ...configEnv.default, ...configEnv[environment], environment: environment };

    // Allow to override any configuration value from environment
    Object.keys(combinedConfig).forEach(k => {
      // get upper case snake case variable
      const uSnakeCase = k.split(/(?=[A-Z])/).join('_').toUpperCase();
      combinedConfig[k] = process.env[uSnakeCase] || combinedConfig[k];
    });

    // Override with predefined special environment variables
    combinedConfig.userTokenSecretKey = process.env.USER_SECRET_KEY || combinedConfig.userTokenSecretKey;
    combinedConfig.deviceTokenSecretKey = process.env.DEVICE_SECRET_KEY || combinedConfig.deviceTokenSecretKey;
    combinedConfig.captchaKey = process.env.CAPTCHA_KEY || combinedConfig.captchaKey;
    combinedConfig.mongoUrl = process.env.MONGO_URL || combinedConfig.mongoUrl;
    combinedConfig.mongoBillingUrl = process.env.MONGO_BILLING_URL || combinedConfig.mongoBillingUrl;
    combinedConfig.mongoAnalyticsUrl = process.env.MONGO_ANALYTICS_URL || combinedConfig.mongoAnalyticsUrl;
    combinedConfig.billingApiKey = process.env.FLEXIBILLING_API_KEY || combinedConfig.billingApiKey;
    combinedConfig.redisUrl = process.env.REDIS_URL || combinedConfig.redisUrl;
    combinedConfig.webHookAddUserUrl = process.env.WEBHOOK_ADD_USER_URL || combinedConfig.webHookAddUserUrl;
    combinedConfig.webHookAddUserSecret = process.env.WEBHOOK_ADD_USER_KEY || combinedConfig.webHookAddUserSecret;
    combinedConfig.webHookRegisterDeviceUrl = process.env.WEBHOOK_REGISTER_DEVICE_URL ||
      combinedConfig.webHookRegisterDeviceUrl;
    combinedConfig.webHookRegisterDeviceSecret = process.env.WEBHOOK_REGISTER_DEVICE_KEY ||
      combinedConfig.webHookRegisterDeviceSecret;

    this.config_values = combinedConfig;
    console.log('Configuration used:\n' + JSON.stringify(this.config_values, null, 2));
  }

  getEnv () {
    if (process.argv[1].indexOf('jest') !== -1) return 'testing';
    return process.argv[2] || 'development';
  }

  get (key) {
    return this.config_values[key];
  }

  getAll () {
    return this.config_values;
  }
}

var configs = null;
module.exports = function (env = null) {
  if (configs) return configs;
  else {
    configs = new Configs(env);
    return configs;
  }
};
