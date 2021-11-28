import React from 'react';
import { render, screen } from '@testing-library/react';
import { getRandomElement } from '../../utils/fake-data';
import { Cities } from '../../store/main-page-slice/constants';
import TabsItem from './tabs-item';
import userEvent from '@testing-library/user-event';


describe('Component: Tabs Item', () => {
  it('should render correctly', () => {
    const cityName = getRandomElement(Object.values(Cities));
    const tabClickHandler = jest.fn();

    const markup = (
      <TabsItem
        name={cityName}
        active={false}
        onClick={tabClickHandler}
      />
    );

    render(markup);

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(cityName)).toBeInTheDocument();
    expect(tabClickHandler).toBeCalled();
    expect(tabClickHandler).toBeCalledWith(cityName);
  });
});
