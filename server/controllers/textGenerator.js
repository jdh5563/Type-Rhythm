const deepai = require('deepai');

deepai.setApiKey('ae1a7157-817d-4344-973c-260402dda431'); // get your free API key at https://deepai.org

const generateParagraph = async (req, res) => {
  let officialParagraph = '';
  do {
    const aiResponse = await deepai.callStandardApi('text-generator', {
      text: 'The',
    });

    const aiOutput = aiResponse.output;

    const potentialOutputs = aiOutput.split('\n');

    for (let i = 1; i < potentialOutputs.length; i++) {
      potentialOutputs.splice(i, 1);
    }

    for (const output of potentialOutputs) {
      if (output.length > 300 && output.length < 500 && output.length > officialParagraph.length) {
        officialParagraph = output;
      }
    }
  } while (officialParagraph === '');

  return res.json({ paragraph: officialParagraph });
};

module.exports = {
  generateParagraph,
};
