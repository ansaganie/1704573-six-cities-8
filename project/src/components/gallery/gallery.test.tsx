import { render, screen } from '@testing-library/react';
import { getFakeImages } from '../../utils/fake-data';
import Gallery from './gallery';

const MAX_IMAGE_COUNT = 6;

describe('Component: Gallery', () => {
  it('should render correctly', async () => {
    const TITLE = 'This is fake title';
    const FAKE_IMAGES = getFakeImages();
    const expectedLength = Object.keys(FAKE_IMAGES).length > 6
      ? MAX_IMAGE_COUNT
      : Object.keys(FAKE_IMAGES).length;

    render(
      <Gallery title={TITLE} images={FAKE_IMAGES}/>,
    );

    const elements = await screen.findAllByAltText(TITLE);

    expect(elements[0]).toBeInTheDocument();
    expect(elements.length).toBe(expectedLength);
  });
});
