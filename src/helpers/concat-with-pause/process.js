const { exec } = require('child_process');
const { rmSync, existsSync } = require('fs');

const reply = (id) => (err) => {
  process.send({
    success: Boolean(err),
    id,
  });
};

const buildConcatSource = (inputSourceTimes, tag, silenceTag) =>
  Array(inputSourceTimes)
    .fill(tag)
    .reduce(
      (acc, cur, inx) =>
        acc + `${inx === 0 ? '' : ` [${silenceTag}${inx - 1}]`} ${cur} `,
      '',
    );

const buildSilence = (inputSourceTimes, repeatDelay, silenceTag) =>
  inputSourceTimes > 1
    ? Array(inputSourceTimes - 1)
        .fill(null)
        .map(
          (_, inx) =>
            `, aevalsrc=exprs=0:d=${repeatDelay / 1000}[${silenceTag}${inx}]`,
        )
        .join('')
    : '';

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

  const silenceSourceTag = buildSilence(
    inputSource1Times,
    repeatSourceDelay,
    'silenceSource',
  );

  const silenceTargetTag = buildSilence(
    inputSource2Times,
    repeatTargetDelay,
    'silenceTarget',
  );

  const concatSource = buildConcatSource(
    inputSource1Times,
    '[0:a]',
    'silenceSource',
  );

  const concatTarget = buildConcatSource(
    inputSource2Times,
    '[1:a]',
    'silenceTarget',
  );

  const concatCount = 2 * (inputSource1Times + inputSource2Times) - 1;

  exec(
    `ffmpeg -i ${inputSource1}  -i ${inputSource2} -filter_complex "aevalsrc=exprs=0:d=${
      pauseMs / 1000
    }[silence]${silenceSourceTag}${silenceTargetTag}, ${concatSource} [silence] ${concatTarget} concat=n=${concatCount}:v=0:a=1 [outa]" -map "[outa]" ${outputPath}`,
    reply(id),
  );
};

process.on('message', (message) => concat(message));
