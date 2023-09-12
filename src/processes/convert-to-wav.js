const { exec } = require('child_process');

const reply = (id) => (err) => {
  if (err) process.exit(1);

  process.send({ id });
};

const convert = ({ input, output, id }) =>
  exec(
    `ffmpeg -i ${input} -y ${output} -ar 8000 -ac 1 -acodec pcm_s16le`,
    reply(id),
  );

process.on('message', (message) => convert(message));
