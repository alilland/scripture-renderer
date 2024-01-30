import Verse from '../components/Verse';

const Story = {
  title: 'Bible/Verse',
  component: Verse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const Component = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export default Story
