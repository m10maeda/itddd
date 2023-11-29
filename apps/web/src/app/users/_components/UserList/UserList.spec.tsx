import { composeStories } from '@storybook/react';
import { render, within, screen } from '@testing-library/react';
import { type ComponentPropsWithoutRef } from 'react';

import { UserList } from './UserList';
import * as stories from './UserList.stories';

describe('UserList', () => {
  const { Filled, Empty } = composeStories(stories);

  describe('Filled', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<Filled />);

      expect(baseElement).toBeTruthy();
    });

    it('should render user list table', () => {
      render(<Filled />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should not render "No Users" text', () => {
      render(<Filled />);

      expect(screen.queryByRole('No Users')).not.toBeInTheDocument();
    });
  });

  describe('Empty', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<Empty />);

      expect(baseElement).toBeTruthy();
    });

    it('should not render user list table', () => {
      render(<Empty />);

      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('should render "No Users" text', () => {
      render(<Empty />);

      expect(screen.getByText('No Users')).toBeInTheDocument();
    });
  });

  it('should render specified user data', () => {
    const users: ComponentPropsWithoutRef<typeof UserList>['users'] = [
      { id: '0', name: 'Alice', type: 'Normal' },
      { id: '1', name: 'Bob', type: 'Premium' },
    ];

    render(<UserList users={users} />);
    const [, tbody] = screen.getAllByRole('rowgroup');
    const rows = within(tbody).getAllByRole('row');

    expect(rows).toHaveLength(users.length);

    expect(
      within(rows[0]).getByRole('rowheader', { name: users[0].id }),
    ).toBeInTheDocument();
    expect(
      within(rows[0]).getByRole('cell', { name: users[0].name }),
    ).toBeInTheDocument();
    expect(
      within(rows[0]).getByRole('cell', { name: users[0].type }),
    ).toBeInTheDocument();
    expect(
      within(rows[0]).getByRole('link', { name: users[0].name }),
    ).toHaveAttribute('href', `/users/${users[0].id}`);

    expect(
      within(rows[1]).getByRole('rowheader', { name: users[1].id }),
    ).toBeInTheDocument();
    expect(
      within(rows[1]).getByRole('cell', { name: users[1].name }),
    ).toBeInTheDocument();
    expect(
      within(rows[1]).getByRole('cell', { name: users[1].type }),
    ).toBeInTheDocument();
    expect(
      within(rows[1]).getByRole('link', { name: users[1].name }),
    ).toHaveAttribute('href', `/users/${users[1].id}`);
  });
});
