import React, { ReactNode, useState } from 'react';
import { Dropdown, NavItem, Nav } from 'react-bootstrap';
import Icon, { IconProps } from '../../../Icon';
import newcoreApi from '../../../../bridge/newcoreApi';
import Action from '../../../Action';

interface IProps<T> {
  title: string;
  icon: string;

  refreshUrl: string;
  markAsReadUrl: string;

  current: T[];
  setCurrent: (list: T[]) => void;

  additionalControls?: ReactNode;
  children: (item: T) => ReactNode;
  
  emptyState: { 
    icon: string, 
    title: string, 
    description: string 
  };
}

// Used for both notifications and messages menus
export default function LazyAsyncDropdown<T extends { id: number }>(props: IProps<T>) {
  const [pagesLoaded, setPagesLoaded] = useState(1);
  
  async function getContentAnd({ paginate }: { paginate?: boolean } = {}): Promise<T[]> {
    try {
      const { data } = await newcoreApi({
        method: 'get',
        url: props.refreshUrl 
          + (paginate ? `/?page=${pagesLoaded + 1}` : ''),
      });

      return data;
    } catch(e) {
      console.error(e);
    }
  }

  function lazilyRefreshNotifs() {
    getContentAnd().then(props.setCurrent);
  }

  async function getNextPageOfNotifs() {
    getContentAnd({ paginate: true }).then(content => {
      props.setCurrent(props.current.concat(content));
      setPagesLoaded(pagesLoaded + 1);
    });
  }

  async function markAllAsRead() {
    console.log('marking as read');
  }

  const currentContent = !props.current || props.current.length === 0
    ? (
      <Dropdown.Header className="empty-state">
        <Icon name={props.emptyState.icon} group="fal" />

        <h2>
          {props.emptyState.title}
        </h2>

        <small>
          {props.emptyState.description}
        </small>
      </Dropdown.Header>
    ) : (
      <React.Fragment>
        <Dropdown.Header className="flex flex-v-center">
          <h5 className="flex-grows">
            {props.title}
          </h5>

          {props.additionalControls}

          <Action
            name="Mark All Read"
            icon="circle"
            activate={markAllAsRead}
          />
        </Dropdown.Header>

        {props.current.map(item => (
          <React.Fragment key={item.id}>
            {props.children(item)}
          </React.Fragment>
        ))}
      </React.Fragment>
    );

  return (
    <Dropdown
      alignRight
      as={NavItem}
      className={`LazyAsyncDropdown ${props.title}`}
      id={`${props.title.toLowerCase()}-menu`}
      onToggle={open => open && lazilyRefreshNotifs()}
    >
      <Dropdown.Toggle 
        id={`${props.title.toLowerCase()}-menu-toggle`} 
        as={Nav.Link}
      >
        <Icon name={props.icon} group="fal" size="lg" fw />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {currentContent}
      </Dropdown.Menu>
    </Dropdown>
  );
}