/** @jsx jsx */
import React from 'react'
import Page from '../Page'
import { PC3_VERSION_NAME, PC3_CREDITS } from '@pc3/shared';
import Table from '../../designs/Table';
import { css, jsx } from '@emotion/core';
import SmartLink from '../../partials/SmartLink';

export default function AcknowledgementsPage() {
  const verName = PC3_VERSION_NAME;
  const credits = [...PC3_CREDITS.entries()];

  function listNames(names) {
    const nameList = names.map((name) =>
        <li key={name}>{name}</li>
      );
    return nameList;
  }

  const listCredits = credits.map((row) =>
    <tr key={row[0]}>
      <td>
        <div className="font-weight-bold text-right">{row[0]}</div>
      </td>
      <td css={css`
            width: 50%;
            @media (min-width: 420px) {
              width: 80%;
            }
          `}>
        <ul className="list-unstyled">
          {listNames(row[1])}
        </ul>
      </td>
    </tr>
  ) 

  return (
    <Page name="Acknowledgements" loading={false} error={null}>
      <div css={css`
            width: 100%;
            @media (min-width: 420px) {
              width: 90%;
              margin: 0 auto;
            }
          `}>
        <h1 className="font-weight-bold">
          Acknowledgements
        </h1>
        <Table title="Development Staff" subtitle={verName} headerSpan={2} className="table-striped">        
          {listCredits}
        </Table>
        
        <p>Pokémon characters and images belong to The Pokémon Company International and Nintendo. This website is in no way affiliated with or endorsed by Nintendo, Creatures, GAMEFREAK, The Pokémon Company or The Pokémon Company International. We just love Pokémon.</p>
        <p>The PokéCommunity logo, all forum styles, their images (unless noted otherwise) and site designs are © 2002 - 2019 The PokéCommunity / PokéCommunity.com.</p>
        <p>User-generated content remains the property of its creator, and may be subject to copyright.</p>
        <p>Sponsor advertisements do not imply our endorsement of that product or service.</p>
        <p>The PokéCommunity provides webfont use of <SmartLink to="http://www.campivisivi.net/titillium/index.html">Titillium font</SmartLink>, licensed under the <SmartLink to="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL">SIL Open Font License</SmartLink>.</p>
        <p>The PokéCommunity uses thread icons adapted from Fugue Icons by <SmartLink to="http://p.yusukekamiyamane.com/">Yusuke Kamiyamane</SmartLink>, licensed <SmartLink to="http://creativecommons.org/licenses/by/3.0/">CC-BY-3.0</SmartLink>. Our use of Fugue Icons does not imply endorsement or affiliation with its owners.</p>
        <p>PokéCommunity™ and the PokéCommunity logo are trademarks of The PokéCommunity. All rights reserved.</p>
      </div>
    </Page>
  )
}