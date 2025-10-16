{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    gitFull
    shellcheck
    hadolint
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    pnpm = {
      enable = true;
      package = pkgs.pnpm;
    };
    npm.enable = false;
    directory = "./service";
    package = pkgs.nodejs-slim_24;
  };

  # https://devenv.sh/processes/
  # processes.dev.exec = "${lib.getExe pkgs.watchexec} -n -- ls -la";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  #scripts.hello.exec = ''
  #  echo hello from $GREET
  #'';

  # https://devenv.sh/basics/
  #enterShell = ''
  #  hello         # Run scripts directly
  #  git --version # Use packages
  #'';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Installing dependencies via pnpm"
    cd service && pnpm i
  '';

  # https://devenv.sh/git-hooks/
  # git-hooks.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
