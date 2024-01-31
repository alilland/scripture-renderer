import AlignedWordsObject from '../components/AlignedWordsObject';

const Story = {
  title: 'Bible/AlignedWordsObject',
  component: AlignedWordsObject,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export const Component = {
  args: {
    children: [
      {
        "text": "saw",
        "tag": "w",
        "type": "word",
        "occurrence": "1",
        "occurrences": "1"
      }
    ],
    originalWords: [
      {
        "text": "ἰδὼν",
        "tag": "w",
        "type": "word",
        "lemma": "ὁράω",
        "strong": "G37080",
        "morph": "Gr,V,PAA,NMS,"
      }
    ]
  }
}

export default Story
