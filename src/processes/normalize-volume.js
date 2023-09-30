const { exec } = require('child_process');
const { rm, rename } = require('fs/promises');

const TARGET_VOLUME = -15;

const reply = (id) => (err) => {
  if (err) process.exit(1);

  process.send({ id });
};

const measureVolume = (input) =>
  new Promise((resolve) =>
    exec(
      `ffmpeg -i ${input} -filter:a volumedetect -f null - 2>&1 | grep mean_volume | grep -Eo '[-.0-9]+ dB' | grep -Eo [-.0-9]+`,
      (_, stdOut) => resolve(stdOut),
    ),
  );

const changeVolume = async ({ input, id }) => {
  const volume = TARGET_VOLUME - (await measureVolume(input));
  const tempFile = input.replace(/\.(.+)$/g, '.temp-volume.$1');

  exec(
    `ffmpeg -i ${input} -filter:a "volume=${volume}dB" ${tempFile}`,
    async () => {
      await rm(input);
      await rename(tempFile, input);

      reply(id);
    },
  );
};

process.on('message', (message) => changeVolume(message));
