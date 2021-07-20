/*
 * Import React from 'react';
 * import { LazyLoadImage } from 'react-lazy-load-image-component';
 *
 * const Gallery = ({ image }) => (
 * <div>
 *  <LazyLoadImage
 *    alt={image.alt}
 *    height={image.height}
 *    src={image.src} // use normal <img> attributes as props
 *    width={image.width}
 *  />
 *  <span>{image.caption}</span>
 * </div>
 * );
 *
 * export default MyImage;
 *
 */

import React, { Component } from 'react';

export default class Gallery extends Component {
  render() {
    return <div className="gallery"></div>;
  }
}
