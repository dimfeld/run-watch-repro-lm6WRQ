# run worker protocol failure in Node watch mode

Tested with Node.js v24.22.0 and the published, unpatched `run@2.1.10` package.
This project has no application code or other dependencies.

## Install

```sh
npm ci --ignore-scripts
```

## Successful case

```sh
npm start
```

Expected output and observed output:

```text
{ status: 'completed', value: 1 }
```

## Failure

```sh
npm run repro
```

This sets `WATCH_REPORT_DEPENDENCIES=1`, which Node uses for dependency reporting
in watch mode. It reproduces the failure without starting a file watcher.
The command exits with code 1:

```text
RunProtocolError: Invalid worker-to-main worker protocol message.
```

See `failure.log` for the captured stack trace.

To start the actual Node watcher instead:

```sh
npm run watch
```

Use Ctrl+C to stop the watcher.

## Cause

The worker inherits `WATCH_REPORT_DEPENDENCIES`. Node sends `watch:import`
messages through the worker's parent message channel. The `run` package expects
only its own protocol messages on that channel and rejects the import report.
The program being evaluated is only `return 1;`.
