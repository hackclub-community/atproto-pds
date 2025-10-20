# Installing an AT Proto PDS server from source

Let's say you actually want to run your own PDS server but you can't use Docker/Podman containers in Uberspace (or even in the tilde you are using). Since it's just a wrapper around the `@atproto/pds` JavaScript library, you can use plain `node` + `pnpm` and write up some service unit files to get started.

## Prerequisities

* A recent Node.js LTS (v22.x at time of writing)
* `pnpm` package manager (install via `npm i -g pnpm` or enable Corepack)
* systemd service unit mandocs (or equivalent for those on non-systemd distros)

## Cloning the repo and installing deps

```shell
gh repo clone hackclub-community/atproto-pds pds # or use the upstream 'bluesky-social/pds' repo
cd pds && pnpm install
```

## Generate the required keys

> [!WARNING]
> The following generated values in this section are only used for documentation purposes. **DO NOT USE THEM IN PRODUCTION!**

To generate a JWT secret for the PDS, run `openssl rand --hex 16` and use the resulting output as the value of `PDS_JWT_SECRET` variable.

```shell
$ openssl rand --hex 16
d863472203b67f6d727b98a9f5956ccf
```

For the PLC rotation keys, run `openssl ecparam --name secp256k1 --genkey --noout --outform DER | tail --bytes=+8 | head --bytes=32 | xxd --plain --cols 32` and use the resulting output for `PDS_PLC_ROTATION_KEY_K256_PRIVATE_KEY_HEX` variable.

```shell
$ openssl ecparam --name secp256k1 --genkey --noout --outform DER | tail --bytes=+8 | head --bytes=32 | xxd --plain --cols 32
6b945857d35e7cd024a32a87ae88e2056204a917dc00013a9f422b6b34a9a081
```

## Setting up DNS records

In case of us at Hack Club Nest, a quick `CNAME` record to `recaptime-dev.hackclub.app` should do work.

```shell
recaptime-dev@nest:~/services/hackclub/atproto-pds$ nest caddy add pds.dino.icu
The domain `pds.dino.icu` is not verified.

There are two ways to verify your domain:

- Add a TXT record to your domain (pds.dino.icu) to "domain-verification=recaptime-dev". You can remove it after it is added.
- Set the CNAME record on your domain (pds.dino.icu) to `recaptime-dev.hackclub.app`.

If you have already done this, please wait a few minutes for DNS records to propagate.
```

In our case, we'll be firing up a merge request against `hackclub/dns` where the `dino.icu` DNS records are managed via octoDNS-backed YAML files.

If you are running your own PDS server on another tilde server (or perhaps running a VPS), check if they are accessible from the public internet and grab the needed A/AAAA addresses. (Check if you need to do some Caddy setup then!)

Otherwise, you might need to use Tailscale Funnel or Cloudflare Tunnels to make it publicly accessible or tweak firewall settings.

### Regarding wildcard records

For the wildcard records, we need a bit of help from the Nest admins to get it set up. Doing the manual setup is going to be a PITA.
