import FootnoteObject from '../components/FootnoteObject';

const Story = {
  title: 'Bible/FootnoteObject',
  component: FootnoteObject,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export const Component = {
  args: {
    verseObject: {
      "content": "+ \\ft Some modern versions have \\fqa and in the ruins of the rich, lambs will graze \\fqb . ",
      "endTag": "f*",
      "nextChar": "\n",
      "tag": "f",
      "type": "footnote"
    }
  }
}

export default Story
