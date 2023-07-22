const reply = (id) => (err) => {
  process.send({
    success: Boolean(err),
    id,
  });
};

const concat = ({ inputSource1, inputSource2, outputPath, id, pauseMs }) =>
  exec(
    `ffmpeg -i ${inputSource1} -i ${inputSource2} -filter_complex "[0][1]acrossfade=d=${
      pauseMs / 1000
    }:c1=exp:c2=exp" ${outputPath}`,
    reply(id),
  );

process.on('message', (message) => concat(message));
