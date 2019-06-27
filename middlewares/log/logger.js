const log4js = require("log4js");

//默认参数配置
const defaultSettings = {
  env: "dev",
  dir: "logs",
  appLogLevel: "info"
};
const {env,dir,appLogLevel} = defaultSettings;

// 配置
const config = {
    appenders: {
      cheese: {
        type: "dateFile",
        filename: `${dir}/task`,
        pattern: "yyyy-MM-dd.log",
        alwaysIncludePattern: true
      }
    },
    categories: { default: { appenders: ["cheese"], level: appLogLevel } }
  };

log4js.configure(
    config
);

const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];

module.exports = () => {
  return async (ctx, next) => {

    // 建立一个log的命名空间
    let contextLogger = {};

    const stime = +new Date();
    const logger = log4js.getLogger("cheese");
    logger.trace("Entering cheese testing");
    logger.debug("Got cheese.");
    logger.info("Cheese is Gouda.");
    logger.warn("Cheese is quite smelly.");
    logger.error("Cheese is too ripe!");
    logger.fatal("Cheese was breeding ground for listeria.");
    methods.forEach(method => {
      contextLogger[method] = message => {
        logger[method](message);
      };
    });

    // 将 api 挂载到上下文上 全局使用
    ctx.log = contextLogger;

    await next();
    const etime = +new Date();
    const responseTime = etime - stime;
    logger.info(`响应时间为${responseTime / 1000}s`);
  };
};
