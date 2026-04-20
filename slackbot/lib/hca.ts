/**
 * @module
 * 
 * Utility functions relating to HC Account auth flow
 */

import { botConfig } from "./config"
import { fetch } from "undici";

export function getAuthUrl(state: string) {
  // https://account.hackclub.com/oauth/authorize?client_id=a525b67692da3ee7ca5b3bde5f656071&redirect_uri=https%3A%2F%2Fslackbot.pds.hackclub.community%2Fauth%2Fcallback&response_type=code&scope=slack_id+verification_status
  const oauthAuthUrl = new URL("https://account.hackclub.com/oauth/authorize")

  // append search params
  oauthAuthUrl.searchParams.append("redirect_url", `${botConfig.slack.baseUrl}/auth/callback`)
  oauthAuthUrl.searchParams.append("client_id", botConfig.hca.clientId)
  oauthAuthUrl.searchParams.append("response_type", "code")
  oauthAuthUrl.searchParams.append("scope", "slack_id email verification_status")
  oauthAuthUrl.searchParams.append("state", state)

  return oauthAuthUrl.toString()
}