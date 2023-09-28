const { exec } = require('child_process');

const reply = (id) => (err) => {
  if (err) process.exit(1);

  process.send({ id });
};

const convert = ({ input, output, id }) =>
  exec(`ffmpeg -i ${input} -ac 2 -b:a 192k ${output}`, reply(id));

process.on('message', (message) => convert(message));
