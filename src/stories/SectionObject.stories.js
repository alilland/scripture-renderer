import SectionObject from '../components/SectionObject';

const Story = {
  title: 'Bible/SectionObject',
  component: SectionObject,
  parameters: {
    layout: 'left-right',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export const Component = {
  args: {
    verseObject: {
      "content": "क्रेते मां तीतुसेरू कम्म",
      "nextChar": "\n",
      "tag": "s",
      "type": "section"
    }
  }
}

export default Story
