export const restBase = 'https://itsgill.com/itsgill/wp-json/wp/v2/'

export const featuredImage = ( featuredImageObject ) => {
  let imgWidth = featuredImageObject.media_details.sizes.full.width;
  let imgHeight = featuredImageObject.media_details.sizes.full.height;
  let imgURL = featuredImageObject.source_url;
  let img = `<img src="${imgURL}" 
      width="${imgWidth}"
      height="${imgHeight}"
      alt="${featuredImageObject.alt_text}"
      srcset="${imgURL} ${imgWidth}w,
      ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
      ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
      ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
      sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
  return {__html: img}
}
