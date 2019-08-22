import { TAGS, TagDefinition, Tag, TagList } from "./tags";

export type Taglike = string | Tag;


/**
 * Given a tag name, tag, or alias, returns the tag it points to.
 */
export function resolveTag(taglike: Taglike): TagDefinition {
  let tag;
  if (typeof taglike !== 'string') {
    tag = taglike;
  } else {
    tag = TAGS[taglike];
  }

  if ('alias' in tag) {
    tag = TAGS[tag.alias];
  }
  return tag;
}

/**
 * Given a tag object, returns its *label* in the tags hash. 
 */
export function resolveLabel(taglike: Taglike): string {
  if (typeof taglike === 'string') {
    return taglike;
  } else {
    taglike = resolveTag(taglike);
  }

  for (let label in TAGS) {
    let tag = resolveTag(TAGS[label]);
    if (tag.name === taglike.name) {
      return label;
    }
  }
}

export function filterTags(search: string): TagList {
  search = search.trim().replace(/[\[\]]/g, '');
  if (!search) {
    return TAGS;
  }

  const regex = new RegExp(search, 'gi');
  const results = {};

  for (let label in TAGS) {
    let tag = resolveTag(label);
    if (label.match(regex) || tag.name.match(regex)) {
      // can't use the label var bc that might belong to an alias
      results[resolveLabel(tag)] = tag;
    }
  }
  return results;
}