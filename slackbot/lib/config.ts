import * as dotenvx from "@dotenvx/dotenvx";
import { detectEnv } from "./utils";
import { env } from "node:process";

dotenvx.config({
  path: `../${detectEnv().envFile}`,
  override: Boolean(env.DOTENV_OVERRIDE) || false
})

export const botConfig = {
  slack: {
    port: Number(env.SLACK_BOT_PORT),
    baseUrl: env.BASE_URL,
    bot: {
      //appId: env.SLACK_BOT_APP_ID,
      token: env.SLACK_BOT_TOKEN,
      signingToken: env.SLACK_SIGNING_SECRET,
      socketMode: Boolean(env.SLACK_SOCKET_MODE) || false,
      appToken: env.SLACK_APP_TOKEN
    }
  },
  pds: {
    host: env.PDS_HOSTNAME,
    admin: {
      jwt: env.PDS_ADMIN_PASSWORD
    }
  },
  hca: {
    clientId: env.HCA_CLIENT_ID || "LEFT_BLANK_PLZ_SET_ONE",
    clientSecret: env.HCA_CLIENT_SECRET || "LEFT_BLANK_PLZ_SET_ONE_1"
  }
}