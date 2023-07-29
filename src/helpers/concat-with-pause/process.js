const { exec } = require('child_process');
const { rmSync, existsSync } = require('fs');

const reply = (id) => (err) => {
  process.send({
    success: Boolean(err),
    id,
  });
};

const concat = ({ inputSource1, inputSource2, outputPath, id, pauseMs }) => {
  if (existsSync(outputPath)) rmSync(outputPath);

  exec(
    `ffmpeg -i ${inputSource1} -i ${inputSource2} -filter_complex "aevalsrc=exprs=0:d=${
      pauseMs / 1000
    }[silence], [0:a] [silence] [1:a] concat=n=3:v=0:a=1 [outa]" -map "[outa]" ${outputPath}`,
    reply(id),
  );
};

process.on('message', (message) => concat(message));
