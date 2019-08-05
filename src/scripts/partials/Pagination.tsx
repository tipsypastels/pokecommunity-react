import React, { Component } from 'react';
import { Pagination as BSPagination, Button } from 'react-bootstrap';
import { When } from 'react-if';
import SmartLink from './SmartLink';
import Icon from './Icon';

/**
 * Generates a triplet of numbers around a single one, clamped to the min and max limits. For these examples, we assume min=1 max=10:
 *  1 => [1, 2, 3]
 *  2 => [1, 2, 3]
 *  3 => [2, 3, 4]
 *  ...
 *  8 => [7, 8, 9]
 *  9 => [8, 9, 10]
 *  10 => [8, 9, 10]
 * et cetera
 * 
 * @param num 
 * @param min 
 * @param max 
 */
function clusterAround(num: number, min: number, max: number) {
  // if only two pages
  if (max === 2) {
    if (num === 2) {
      return [num - 1, num];
    }
    return [num, num + 1];
  }
  
  let nums = [num - 1, num, num + 1];
  
  if (nums[0] < min) {
    nums = nums.map(n => n + 1);
  }
  
  if (nums[nums.length - 1] > max) {
    nums = nums.map(n => n - 1);
  }
  
  return nums;
}

interface IProps {
  threadid: number;
  currentPage: number;
  totalPages: number;
}

interface PaginationItem {
  value: string | number;
  page?: number;
  disabled?: boolean;
  if?: boolean;
  active?: boolean;
}

export default class Pagination extends Component<IProps> {
  render() {
    const { threadid, currentPage, totalPages } = this.props;
    if (currentPage <= 1 && totalPages <= 1) {
      return null;
    }

    const numsCluster = clusterAround(currentPage, 1, totalPages);
    return (
      <BSPagination className="Pagination">
        {this.item({
          value: 'fast-backward',
          page: 1,
          disabled: currentPage === 1,
        })}

        {this.item({
          value: 'backward',
          page: currentPage - 1,
          disabled: currentPage === 1,
        })}

        {this.item({
          value: 1,
          page: 1,
          if: !numsCluster.includes(1),
        })}

        {this.item({
          value: '...',
          disabled: true,
          if: !numsCluster.includes(1),
        })}

        {numsCluster.map(page => (
          <React.Fragment key={page}>
            {this.item({
              value: page,
              page,
              active: page === currentPage,
            })}
          </React.Fragment>
        ))}

        {this.item({
          value: '...',
          disabled: true,
          if: !numsCluster.includes(totalPages),
        })}

        {this.item({
          value: totalPages,
          page: totalPages,
          if: !numsCluster.includes(totalPages),
        })}

        {this.item({
          value: 'forward',
          page: currentPage + 1,
          disabled: currentPage === totalPages,
        })}

        {this.item({
          value: 'fast-forward',
          page: totalPages,
          disabled: currentPage === totalPages,
        })}
      </BSPagination>
    )
  }

  item = (opts: PaginationItem) => {
    // eslint-disable-next-line eqeqeq
    if (opts.if == false) {
      return null;
    }

    const { value, page, disabled, active } = opts;

    const label = typeof value === 'string' && value !== '...'
      ? <Icon name={value} />
      : value;

    const className = `page-link 
          btn 
          ${active && 'btn-primary active'} 
          ${disabled && 'disabled'}`;

    if (disabled) {
      return (
        <div className={className}>
          {label}
        </div>
      );
    } else {
      const link = `/threads/${this.props.threadid}?page=${page}`;

      return (
        <SmartLink to={link} className={className}>
          {label}
        </SmartLink>
      );
    }
  }
}