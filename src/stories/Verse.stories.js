import Verse from '../components/Verse';

const Story = {
  title: 'Bible/Verse',
  component: Verse,
  parameters: {
    layout: 'left-right',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const Component = {
  args: {
    verseKey: '9',
    verseObjects: [
      {
        "text": "It is better to live on a corner of the roof\n",
        "type": "text"
      },
      {
        "tag": "q",
        "type": "quote",
        "text": " than in a house shared with a quarrelsome wife.\n"
      },
      {
        "tag": "q",
        "type": "quote",
        "nextChar": "\n"
      }
    ],
    reference: {
      bookId: 'prov',
      chapter: 21,
    }
  }
};

export default Story
