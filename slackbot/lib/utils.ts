import { App } from "@slack/bolt"
import commands from "../commands";

export function detectEnv() {
  let env: string
  let envFile: string = `.env`
  if (process.env.NODE_ENV == "production" ) {
    env = "production"
    envFile = `.env.production`
  } else if (process.env.NODE_ENV == "staging") {
    env = "staging"
    envFile = ".env.staging"
  } else {
    env = "development"
  }

  return { env, envFile }
}

export function registerSlackAppHandlers(app: App) {
  commands(app)
}