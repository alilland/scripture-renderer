import WordObject from '../components/WordObject';

const Story = {
  title: 'Bible/WordObject',
  component: WordObject,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export const Component1 = {
  args: {
    verseObject: {
      type: "text",
      text: "In the beginning God created the heavens and the earth.\n"
    }
  }
}

export const Component2 = {
  args: {
    verseObject: {
      type: "text",
      content: "In the beginning God created the heavens and the earth.\n"
    }
  }
}

export default Story
