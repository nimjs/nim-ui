export function log(message: string) {
  process.stdout.write(`${message}\n`);
}

export function error(message: string) {
  process.stderr.write(`${message}\n`);
}
