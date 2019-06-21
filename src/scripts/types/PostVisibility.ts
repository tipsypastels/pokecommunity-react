enum PostVisibility {
  Rejected  = -3,
  Scheduled = -2,
  Drafted   = -1,
  Moderated =  0,
  Published =  1,
  // is this how this works?
  Deleted   =  2,
}

export default PostVisibility;