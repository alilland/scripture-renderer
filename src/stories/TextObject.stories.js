import TextObject from '../components/TextObject';

const Story = {
  title: 'Bible/TextObject',
  component: TextObject,
  parameters: {
    layout: 'left-right',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export const Component = {
  args: {
    verseObject: {
      text: "In the beginning God created the heavens and the earth.\n",
      type: "text"
    },
    paragraphs: false
  }
}

export default Story
