import React from 'react'
import Page from '../Page'
import { PC3_VERSION_NAME, PC3_CREDITS } from '@pc3/shared';
import Table from '../../designs/Table';

/**
 * AcknowledgementsPage
 * https://www.pokecommunity.com/about/acknowledgements/
 * 
 * All the data is stored in the imports above. You can see the structure of the data here:
 * https://github.com/thepokecommunity/pc3-shared/blob/master/src/credits.ts
 * 
 * Note that credits is a Map object.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * 
 * We're trying to reduce our use of repeated CSS by instead creating a library of reusable display components - do your best to use them to create a pretty acknowledgements page. It doesn't necessarily have to look like the original one.
 * 
 * You may want to use the <Table> component, which is a wrapper around HTML's <table>. You use it like this:
 * 
 * <Table title="title" subtitle="subtitle">
 *   <tr>
 *     <th>Name</th>
 *     <td>Value</td>
 *   </tr>
 * </Table>
 * 
 * et cetera.
 */

export default function AcknowledgementsPage() {
  return (
    <Page name="Acknowledgements" loading={false} error={null}>
      <h1>
        Acknowledgements
      </h1>
    </Page>
  )
}
