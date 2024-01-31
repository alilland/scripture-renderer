import OriginalWordObject from '../components/OriginalWordObject';

const Story = {
  title: 'Bible/OriginalWordObject',
  component: OriginalWordObject,
  parameters: {
    layout: 'left-right',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export const Component = {
  args: {
    verseObject: {
      "text": "ἰδὼν",
      "tag": "w",
      "type": "word",
      "lemma": "ὁράω",
      "strong": "G37080",
      "morph": "Gr,V,PAA,NMS,"
    }
  }
}

export default Story
