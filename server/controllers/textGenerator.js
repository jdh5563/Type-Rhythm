const deepai = require('deepai');

deepai.setApiKey('ae1a7157-817d-4344-973c-260402dda431'); // get your free API key at https://deepai.org

const generateParagraph = async (req, res) => {
  let officialParagraph = '';

  const aiResponse = await deepai.callStandardApi('text-generator', {
    text: 'The',
  });

  const aiOutput = aiResponse.output;

  const potentialOutputs = aiOutput.split('\n');

  for (let i = 1; i < potentialOutputs.length; i++) {
    potentialOutputs.splice(i, 1);
  }

  for (let i = 0; i < potentialOutputs.length; i++) {
    if (potentialOutputs[i].length > 300
        && potentialOutputs[i].length < 500
        && potentialOutputs[i].length > officialParagraph.length) {
      officialParagraph = potentialOutputs[i];
    }
  }

  if (officialParagraph === '') {
    officialParagraph = 'Cyril says no, just walks past the empty table and into his bedroom. "I don\'t know so I just come here so you can see what\'s happening. What is it about being this big that I don\'t like anymore?" The little fox hesitates for a moment but looks away. "I\'m just looking at you too." He looks back and smiles.';
  }

  return res.json({ paragraph: officialParagraph });
};

module.exports = {
  generateParagraph,
};
