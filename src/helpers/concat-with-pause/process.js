const { exec } = require('child_process');
const { rmSync, existsSync } = require('fs');

const reply = (id) => (err) => {
  process.send({
    success: Boolean(err),
    id,
  });
};

const concat = ({
  inputSource1,
  inputSource2,
  outputPath,
  id,
  pauseMs,
  inputSource1Times,
  inputSource2Times,
  repeatSourceDelay,
  repeatTargetDelay,
}) => {
  if (existsSync(outputPath)) rmSync(outputPath);

  const silenceSourceTag =
    inputSource1Times > 1
      ? `, aevalsrc=exprs=0:d=${repeatSourceDelay / 1000}[silenceSource]`
      : '';

  const silenceTargetTag =
    inputSource1Times > 1
      ? `, aevalsrc=exprs=0:d=${repeatTargetDelay / 1000}[silenceTarget]`
      : '';

  const concatSource = Array(inputSource1Times)
    .fill('[0:a]')
    .join('[silenceSource]');

  const concatTarget = Array(inputSource2Times)
    .fill('[1:a]')
    .join('[silenceTarget]');

  const concatCount = 2 * (inputSource1Times + inputSource2Times) - 1;

  exec(
    `ffmpeg -i ${inputSource1}  -i ${inputSource2} -filter_complex "aevalsrc=exprs=0:d=${
      pauseMs / 1000
    }[silence]${silenceSourceTag}${silenceTargetTag}, ${concatSource}  [silence] ${concatTarget} concat=n=${concatCount}:v=0:a=1 [outa]" -map "[outa]" ${outputPath}`,
    reply(id),
  );
};

process.on('message', (message) => concat(message));
