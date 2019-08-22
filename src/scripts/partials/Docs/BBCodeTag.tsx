import React, { Component, ReactNode } from 'react'
import TagModel from '../../parser/TagModel';
import Block from '../Block';
import { Table, Alert } from 'react-bootstrap';
import Parser from '../../parser/Parser';

interface IProps {
  tag: TagModel;
}

export default class BBCodeTag extends Component<IProps> {
  render() {
    const { tag } = this.props;

    return (
      <Block className="BBCodeTag">
        <Block.Header>
          <h4>
            {tag.name}
          </h4>
        </Block.Header>

        <Block.Content>
          The <strong>[{tag.label}]</strong> tag allows you to {tag.allowsYouTo}. {this.getAliases()}

          <Table className="my-2" striped bordered>
            <tbody>
              <tr>
                <td>
                  <strong>
                    Usage
                  </strong>
                </td>
                
                <td>
                  {tag.usage}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>
                    Example
                  </strong>
                </td>

                <td>
                  {tag.example}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>
                    Output
                  </strong>
                </td>

                <td>
                  <Parser bbcode={tag.example} />
                </td>
              </tr>
            </tbody>
          </Table>

          {this.getNote()}
        </Block.Content>

        {this.getPC3Only()}
      </Block>
    )
  }

  getAliases() {
    const { aliases } = this.props.tag;

    if (!aliases || aliases.length === 0) {
      return null;
    }

    return (
      <span>Also available as {
        this.aliasesToList(aliases.map(alias => <strong key={alias}>[{alias}]</strong>))
      }.</span>
    );
  }

  aliasesToList(aliases: ReactNode[]): ReactNode[] {
    const results: ReactNode[] = [];

    for (let i = 0; i < aliases.length; i++) {
      const alias = aliases[i];
      results.push(alias);

      if (i < aliases.length - 1) {
        results.push(', ');
      }
    }
    return results;
  }

  getNote() {
    const { note } = this.props.tag;
    if (!note) {
      return null;
    }

    return (
      <span>
        <strong>Note:</strong> {note}
      </span>
    );
  }

  getPC3Only() {
    if (this.props.tag.pc3Only) {
      return (
        <Alert variant="warning">
          This tag is <strong>currently</strong> only available when posting in threads. It cannot yet be used in messages, profile posts, or other content.
        </Alert>
      );
    }
    return null;
  }
}
