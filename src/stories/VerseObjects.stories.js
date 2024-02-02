import VerseObjects from '../components/VerseObjects';

const Story = {
  title: 'Bible/VerseObjects',
  component: VerseObjects,
  parameters: {
    layout: 'left-right',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const Component = {
  args: {
    verseObjects: [
      {
        "type": "text",
        "text": "\nBut I expect to see you soon, and we will speak face to face. "
      },
      {
        "type": "text",
        "text": "\nMay peace be with you.\nThe friends greet you.\n\nGreet the friends by name.\n"
      }
    ]
  }
};

export default Story
