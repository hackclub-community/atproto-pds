import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt';

const help = `\

`

export default async(handler: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  const { ack, respond, logger } = handler;
  try {
    await ack()
  } catch (error) {
    logger.error(error)
  }
}