import type { Meta, StoryObj } from '@storybook/react';

import { SimplePanel } from '../components/SimplePanel';
import { PanelDataErrorView } from '@grafana/runtime';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SimplePanel> = {
  title: 'Example/SimplePanel',
  component: SimplePanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof SimplePanel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    options: {
      text: 'Hello, world!',
      showSeriesCount: true,
      seriesCountSize: 'sm',
    },
    data: {
      series: [
        {
          refId: 'configuration',
          length: 1,
          fields: [
            { name: 'Value', type: 'string', values: ['{"process":[{"index":1,"work":1},{"index":2,"work":2},{"index":3,"work":3}]}'] },
          ],
        }
      ],
    },
    width: 320,
    height: 240,
  },
};
