import React from 'react';

const createMarkup = (html) => {
  return {
    __html: html,
  };
};

export default function Post({ post }) {
  const {
    selftext,
    title,
    url,
  } = post;

  return (
    <li>
      <strong>
        <a href={url} target="_blank">
          {title}
        </a>
      </strong>
      <div dangerouslySetInnerHTML={createMarkup(selftext)} />
    </li>
  );
}
