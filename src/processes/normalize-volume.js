const { exec } = require('child_process');
const { rm, rename } = require('fs/promises');

const TARGET_VOLUME = -15;

const reply = (id) => process.send({ id });

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

  console.log(0, volume, tempFile);

  exec(
    `ffmpeg -i ${input} -filter:a "volume=${volume}dB" ${tempFile}`,
    async (err) => {
      if (err) process.exit(1);

      await rm(input);

      await rename(tempFile, input);

      reply(id);
    },
  );
};

process.on('message', (message) => changeVolume(message));
