import { TagDefinition, TAGS, TagRenderProps } from "./tags";
import { resolveTag, resolveLabel, Taglike } from "./tagFunctions";

/**
 * A simple utility class that encapsulates some of the common functions surrounding tags (like resolving, finding aliases, etc) into a class as methods. This provides an easy interface for the BBCode list to use. Note that TagModel is *not* used in the Parser itself, which needs only bare attributes.
 */
export default class TagModel {
  /**
   * Provides a nice interface for looping over tag models for use in the BBCode list page.
   * @param callback The map callback.
   */
  static map(callback: (tag: TagModel) => any, tags = TAGS) {
    const results = [];

    for (let label in tags) {
      const tag = tags[label];
      if ('alias' in tag) {
        continue;
      }

      results.push(callback(new this(tag)));
    }
    return results;
  }

  tag: TagDefinition;
  
  constructor(tag: Taglike) {
    this.tag = resolveTag(tag);
  }

  get name() {
    return this.tag.name;
  }
  
  get allowsYouTo() {
    return this.tag.allowsYouTo;
  }

  get usage() {
    return this.tag.usage;
  }

  get example() {
    return this.tag.example;
  }

  get note() {
    return this.tag.note;
  }

  get pc3Only() {
    return this.tag.pc3Only;
  }

  render(props: TagRenderProps) {
    return this.tag.render(props);
  }

  private _label: string;
  get label(): string {
    return this._label || (this._label = resolveLabel(this.tag))
  }

  private _aliases: string[];
  get aliases(): string[] {
    return this._aliases || (this._aliases = (() => {
      const results = [];

      for (let label in TAGS) {
        const tag = TAGS[label];
        if ('alias' in tag && tag.alias === this.label) {
          results.push(label);
        }
      }

      return results;
    })());
  }
}