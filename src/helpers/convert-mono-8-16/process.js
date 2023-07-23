const { exec } = require('child_process');

const reply = (id) => (err) => {
  process.send({
    success: Boolean(err),
    id,
  });

  exec(`rm "/app/input/${inputName}"`, process.exit);
};

const convert = ({ inputName, outputName, id }) =>
  exec(
    `ffmpeg -i "/app/input/${inputName}" -y "/app/output/${outputName}" -ar 8000 -ac 1 -acodec pcm_s16le`,
    reply(id),
  );

process.on('message', (message) => convert(message));
