import { App } from '@slack/bolt';
import { botConfig } from './lib/config';
import { registerSlackAppHandlers } from './lib/utils';

// Initializes your app with your Slack app and bot token
const app = new App({
  token: botConfig.slack.bot.token,
  socketMode: botConfig.slack.bot.socketMode,
  appToken: botConfig.slack.bot.appToken,
  signingSecret: botConfig.slack.bot.signingToken,
  port: botConfig.slack.port
});

registerSlackAppHandlers(app);

(async () => {
  // Start your app
  await app.start();

  app.logger.info('⚡️ Bolt app is running!');
})();